import React from "react";
import { Card } from "antd";
import { useState } from "react";

export default function ListSlide() {
  return (
    <div
      className="container "
      style={{
        height: "68vh",
        overflow: "scroll",
      }}
    >
      <div className="row my-3">
        <Card
          title="Slide 1"
          style={{
            width: "100%",
            border: "1px solid #A8A9AE",
            cursor: "pointer",
          }}
        ></Card>
      </div>
      <div className="row my-3">
        <Card
          title="Slide 1"
          style={{
            width: "100%",
            border: "1px solid #A8A9AE",
            cursor: "pointer",
          }}
        ></Card>
      </div>
      <div className="row my-3">
        <Card
          title="Slide 1"
          style={{
            width: "100%",
            border: "1px solid #A8A9AE",
            cursor: "pointer",
          }}
        ></Card>
      </div>
      <div className="row my-3">
        <Card
          title="Slide 1"
          style={{
            width: "100%",
            border: "1px solid #A8A9AE",
            cursor: "pointer",
          }}
        ></Card>
      </div>
      <div className="row my-3">
        <Card
          title="Slide 1"
          style={{
            width: "100%",
            border: "1px solid #A8A9AE",
            cursor: "pointer",
          }}
        ></Card>
      </div>
    </div>
  );
}
