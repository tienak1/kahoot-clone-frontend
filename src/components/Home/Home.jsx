import React from "react";
import AdItem from "../AdItem/AdItem";

export default function Home() {
  return (
    <div className="container-fluid bg-dark">
      <div className="row">
        <div className="col-6">
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
        </div>
      </div>
    </div>
  );
}
