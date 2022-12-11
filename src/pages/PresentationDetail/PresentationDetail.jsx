import React from "react";
import { useParams } from "react-router-dom";
import HeaderPresentation from "../../components/HeaderPresentation/HeaderPresentation";
import ListSlide from "../../components/ListSlide/ListSlide";
import SlideEdit from "../../components/SlideEdit/SlideEdit";
import SlideView from "../../components/SlideView/SlideView";

export default function PresentationDetail() {
  const params = useParams();
  console.log(params.name);
  return (
    <div className="container">
      <div className="row">
        <HeaderPresentation />
        <div className="col-2 mt-4">
          <button
            className="btn btn-primary mb-3"
            style={{
              borderRadius: "2px",
            }}
          >
            New Slide
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-2">
          <ListSlide />
        </div>
        <div className="col-7">
          <SlideView />
        </div>
        <div className="col-3">
          <SlideEdit />
        </div>
      </div>
    </div>
  );
}
