import React, { useState, useEffect } from 'react';

const Todo = () => {
  const [username, setUsername] = useState('');
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (username) {
      fetchTodos(username);
    }
  }, [username]);

  const fetchTodos = async (username) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/users/${username}`);
      if (response.ok) {
        const data = await response.json();
        setTodos(data.todos);
      } else {
        setError('User not found');
        setTodos([]);
      }
    } catch (error) {
      setError('An error occurred while fetching todos');
    }
  };

  const handleAddTodo = async () => {
    if (!todoText) return;

    const newTodo = { label: todoText, is_done: false };
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTodo)
      });

      if (response.ok) {
        setTodos([...todos, newTodo]);
        setTodoText('');
      } else {
        setError('Failed to add todo');
      }
    } catch (error) {
      setError('An error occurred while adding the todo');
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== todoId));
      } else {
        setError('Failed to delete todo');
      }
    } catch (error) {
      setError('An error occurred while deleting the todo');
    }
  };

  const handleToggleTodo = async (todoId) => {
    const todo = todos.find(todo => todo.id === todoId);
    if (!todo) return;

    const updatedTodo = { ...todo, is_done: !todo.is_done };

    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTodo)
      });

      if (response.ok) {
        setTodos(todos.map(t => (t.id === todoId ? updatedTodo : t)));
      } else {
        setError('Failed to update todo');
      }
    } catch (error) {
      setError('An error occurred while updating the todo');
    }
  };

  return (
    <div className="container my-5 bg-dark">
      <div className="text-center p-2 m-3 text-white">
        <h1>Todo List Fetch</h1>
      </div>
      <input
        className="form-control form-control-lg mb-2"
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="form-control form-control-lg mb-2"
        type="text"
        placeholder="What's for the day?"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <button
        className="btn btn-primary mb-2"
        onClick={handleAddTodo}
      >
        Add Todo
      </button>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="todo-content-box p-3">
        {todos.map(todo => (
          <div key={todo.id} className="card p-3 mb-2 todo-item">
            <div className="d-flex align-items-center justify-content-between w-100">
              <input
                type="checkbox"
                className="form-check-input"
                checked={todo.is_done}
                onChange={() => handleToggleTodo(todo.id)}
              />
              <p className={`flex-grow-1 m-0 text-center todo-text ${todo.is_done ? 'done' : ''}`}>
                {todo.label}
              </p>
              <button
                className="btn btn-danger"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
