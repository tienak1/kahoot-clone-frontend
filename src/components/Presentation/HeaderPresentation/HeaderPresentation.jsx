import { Button, Modal } from "antd";
import React from "react";
import { useState } from "react";
import "./HeaderPresentation.scss";

function HeaderPresentation() {
  //Back to presentation page
  const handleBackToPresentationPage = () =>
    (window.location.href = "http://localhost:3000/presentation");

  // Change name of presentation
  const handleChangePresentationName = () => console.log("do nothing");

  // Share presentation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleSharePresentation = () => console.log("share presentation");

  return (
    <div className="p-3 row align-items-center">
      <div className="col-1">
        <i
          class="fa-solid fa-arrow-left fs-1 ms-3"
          style={{
            cursor: "pointer",
          }}
          onClick={() => handleBackToPresentationPage()}
        ></i>
      </div>
      <div className="col-9">
        <input
          type="text"
          placeholder="Presentation Name"
          className="d-block presentationName"
          onBlur={() => handleChangePresentationName()}
        />
        <small>Created by ...</small>
      </div>
      <div className="col-1">
        {/* <button
          className="btn btn-secondary me-2"
          onClick={() => handleSharePresentation()}
        >
          Share
        </button> */}
        <Button type="ghost" onClick={showModal}>
          <button className="btn btn-secondary mb-5">Share</button>
        </Button>
      </div>
      <div className="col-1">
        <button className="btn btn-primary ms-4">Present</button>
      </div>
      <Modal
        title="Share Link"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Share Link</p>
      </Modal>
    </div>
  );
}

export default HeaderPresentation;
