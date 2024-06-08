import React from 'react';

const Todo = () => {
  return (
    <div className="container my-5 bg-dark">
      <div className="text-center p-2 m-3 text-white">
        <h1>Todo List Fetch</h1>
      </div>
      <input
        className="form-control form-control-lg mb-2"
        type="text"
        placeholder="What's for the day?"
      />
      <div className="todo-content-box p-3">

        <div className="card p-3 mb-2 todo-item">
          <div className="d-flex align-items-center justify-content-between w-100">
            <input type="checkbox" className="form-check-input" />
            <p className="flex-grow-1 m-0 text-center todo-text">Feed the cat</p>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>

        <div className="card p-3 mb-2 todo-item">
          <div className="d-flex align-items-center justify-content-between w-100">
            <input type="checkbox" className="form-check-input" />
            <p className="flex-grow-1 m-0 text-center todo-text">Do 500 push ups</p>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>

        <div className="card p-3 mb-2 todo-item">
          <div className="d-flex align-items-center justify-content-between w-100">
            <input type="checkbox" className="form-check-input" />
            <p className="flex-grow-1 m-0 text-center todo-text">Don't talk about fight club</p>
            <button className="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;

