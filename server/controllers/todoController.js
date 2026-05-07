const { sql, poolPromise } = require("../config/db");

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Todos");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Add todo
exports.addTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const pool = await poolPromise;

    await pool
      .request()
      .input("text", sql.NVarChar, text)
      .query("INSERT INTO Todos (text) VALUES (@text)");

    res.send("Todo added");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;

    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Todos WHERE id = @id");

    res.send("Todo deleted");
  } catch (err) {
    res.status(500).send(err.message);
  }
};