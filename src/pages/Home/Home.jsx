import React from "react";
import AdItem from "../../components/AdItem/AdItem";
import "./Home.module.css";

export default function Home() {
  const arrayImage = [
    "./img/xmas1.jpg",
    "./img/xmas2.jpg",
    "./img/xmas3.jpg",
    "./img/xmas4.jpg",
  ];
  const renderAdItem = () => {
    return arrayImage.map((item, index) => {
      return (
        <div className="col-6">
          <AdItem image={item} key={index} />
        </div>
      );
    });
  };
  return (
    <div className="container-fluid bg-dark">
      <div className="row">
        {renderAdItem()}
        {/* <div className="col-6">
          <AdItem />
        </div>
        <div className="col-6">
          <AdItem />
        </div>
        <div className="col-6">
          <AdItem />
        </div>
        <div className="col-6">
          <AdItem />
        </div> */}
      </div>
    </div>
  );
}
