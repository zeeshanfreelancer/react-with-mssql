const sql = require("mssql/msnodesqlv8");

require("dotenv").config({ path: `${__dirname}/../.env` });

const server = process.env.DB_SERVER?.trim();
const database = process.env.DB_NAME?.trim();

if (!server || !database) throw new Error("Missing DB_SERVER or DB_NAME in server/.env");

const poolPromise = new sql.ConnectionPool({
  connectionString: `Driver={ODBC Driver 17 for SQL Server};Server={${server}};Database={${database}};Trusted_Connection={Yes};Encrypt={No};TrustServerCertificate={Yes};`,
})
  .connect()
  .then((pool) => (console.log("Connected to MSSQL"), pool))
  .catch((err) => {
    console.error("DB Connection Failed:", err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise,
};
