const path = require("path");
const sql = require("mssql/msnodesqlv8");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const server = process.env.DB_SERVER?.trim();
const database = process.env.DB_NAME?.trim();
const driver =
  process.env.DB_DRIVER?.trim() || "ODBC Driver 17 for SQL Server";
const instanceName = process.env.DB_INSTANCE?.trim();
const port = process.env.DB_PORT?.trim();

if (!server) {
  throw new Error("Missing DB_SERVER in server/.env");
}

if (!database) {
  throw new Error("Missing DB_NAME in server/.env");
}

const serverTarget = instanceName
  ? `${server}\\${instanceName}`
  : port
    ? `${server},${port}`
    : server;

const config = {
  server,
  database,
  driver,
  connectionString: `Driver={${driver}};Server={${serverTarget}};Database={${database}};Trusted_Connection={Yes};Encrypt={No};TrustServerCertificate={Yes};`,
  options: {
    encrypt: false,
    trustServerCertificate: true,
    trustedConnection: true,
    ...(instanceName ? { instanceName } : {}),
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => {
    console.error("DB Connection Failed:", err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise,
};
