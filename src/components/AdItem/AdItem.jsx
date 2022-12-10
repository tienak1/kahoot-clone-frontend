import React from "react";
import "./AdItem.module.css";

export default function AdItem(props) {
  let { image } = props;
  return (
    <div className="card p-4 my-3 card-wrapper container">
      <div className="row">
        <div className="col-6">
          <img src={image} alt="" className="w-100" />
        </div>
        <div className="col-6">
          <h4>FOR BUSINESS</h4>
          <h5>
            Boost knowledge and performance by training your team with Kahoot!
          </h5>
          <p>
            Deliver engaging, interactive training (live or self-paced) while
            identifying knowledge gaps for every learner, for only $49/month.
          </p>
          <button className="btn btn-success">Get Kahoot! 360 Pro</button>
        </div>
      </div>
    </div>
  );
}
