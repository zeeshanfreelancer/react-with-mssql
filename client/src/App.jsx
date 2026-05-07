import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const API = "http://localhost:5000/api/todos";

  const getTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (!text.trim()) return;

    await axios.post(API, { text: text.trim() });
    setText("");
    getTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    getTodos();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Todos</h1>
        <p className="app-subtitle">Stay on top of what matters</p>
      </header>

      <div className="card">
        <div className="form-row">
          <input
            className="input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What needs doing?"
            aria-label="New todo"
          />
          <button type="button" className="btn btn-primary" onClick={addTodo}>
            Add
          </button>
        </div>
      </div>

      {todos.length === 0 ? (
        <p className="empty">No tasks yet. Add one above.</p>
      ) : (
        <ul className="list">
          {todos.map((todo) => (
            <li key={todo.id} className="list-item">
              <span className="list-text">{todo.text}</span>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => deleteTodo(todo.id)}
                aria-label={`Delete: ${todo.text}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
