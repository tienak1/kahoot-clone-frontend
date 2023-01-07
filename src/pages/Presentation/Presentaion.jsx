import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { createNewPresentation } from "../../actions/presentation";
import history from "../../App";

function Presentaion() {
  const [presentationName, setPresentationName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const handleCreatePresentation = () => {
    dispatch(createNewPresentation({ presentationName, description }, history));
  };
  return (
    <form className="p-3" style={{ margin: "0 auto" }}>
      <p className="mb-0 fs-5">Presentation Name</p>
      <input
        type="text"
        className="form-group my-1 w-100 text-white"
        placeholder="name of presentation..."
        onChange={(e) => setPresentationName(e.target.value)}
      />
      <p className="mb-0 fs-5 mt-3">Description</p>
      <input
        type="text"
        className="form-group my-1 w-100 text-white"
        placeholder="description..."
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="btn btn-primary w-100 mt-2"
        onClick={() => handleCreatePresentation()}
      >
        Create
      </button>
    </form>
  );
}

export default Presentaion;
