import React from "react";

export default function SlideEdit() {
  return (
    <div className="container">
      <div className="row">
        <p className="bold">Slide Type</p>
        <select class="form-select" aria-label="Default select example">
          <option value="1">Mutiple Choice</option>
          <option value="2">Two</option>
          <option value="3">Three</option>
        </select>
        {/* Content  */}
      </div>
      <div className="row mt-4">
        <p className="mb-1">Your Question</p>
        <input className="form-control" type="text" />
      </div>
      <div className="row mt-4">
        <p className="mb-1">Options</p>
        <input
          className="form-control my-1"
          type="text"
          placeholder="Option 1"
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="Option 2"
        />
        <input
          className="form-control my-1"
          type="text"
          placeholder="Option 3"
        />
      </div>
      <div className="row">
        <button className="btn btn-dark mt-4">Add</button>
      </div>
    </div>
  );
}
