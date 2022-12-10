import React from "react";
import { Input } from "antd";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function ModalPresentation() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handleCreateNewPresentation = () => {
    if (name) {
      //   return <Navigate to={`/presentationdetail/${name}`} />;

      navigate(`/presentationdetail/${name}`);
    }
    return;
  };
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title fs-5" id="exampleModalLabel">
              Create new presentation
            </h6>
          </div>
          <div className="modal-body">
            <Input
              placeholder="Presentation name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => handleCreateNewPresentation()}
              data-bs-dismiss="modal"
            >
              Create Presentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
