import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuizes } from "../../actions/quiz";
import AdItem from "../../components/Quizes/AdItem/AdItem";
import "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const { quizes } = useSelector((state) => state.quiz);
  useSelector((state) => console.log(state));
  console.log("HOME ", quizes);
  useEffect(() => {
    dispatch(getQuizes());
  }, []);
  const renderAdItem = () => {
    return quizes.map((item) => (
      <div className="col-6">
        <AdItem quiz={item} key={item.index} />
      </div>
    ));
  };
  return (
    <div className="container-fluid bg-dark">
      <div className="row">
        <form className="search w-75 my-2">
          <input
            placeholder="Search here by name.."
            className="form-control my-1"
          />
          <input
            placeholder="Search here by tag..."
            className="form-control my-1"
          />
          <button
            className="btn btn-primary"
            type="submit"
            style={{ margin: "0 auto" }}
          >
            Search
          </button>
        </form>
      </div>
      <div className="row">{renderAdItem()}</div>
    </div>
  );
}
