import React from "react";
import { useSelector } from "react-redux";
import AdItem from "../../components/AdItem/AdItem";
import "./Home.module.css";

export default function Home() {
  const { playerResults } = useSelector((state) => state.playerResult);
  console.log(playerResults);
  const arrayImage = [
    "./img/xmas1.jpg",
    "./img/xmas2.jpg",
    "./img/xmas3.jpg",
    "./img/xmas4.jpg",
  ];
  const renderAdItem = () => {
    return arrayImage.map((item, index) => {
      return (
        <div className="col-6" key={index}>
          <AdItem image={item} key={index} />
        </div>
      );
    });
  };
  return (
    <div className="container-fluid bg-dark">
      <div className="row">{renderAdItem()}</div>
    </div>
  );
}
