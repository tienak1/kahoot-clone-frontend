import React from "react";
import BodyPresentation from "../../components/Presentation/BodyPresentation/BodyPresentation";
import HeaderPresentation from "../../components/Presentation/HeaderPresentation/HeaderPresentation";
import { Stack } from "@mui/material";

function PresentationDetail() {
  return (
    <div className="container">
      <div className="row">
        <HeaderPresentation />
        <BodyPresentation />
      </div>
    </div>
  );
}

export default PresentationDetail;
