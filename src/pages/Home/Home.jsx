import { CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getQuizes, getQuizesBySearch } from "../../actions/quiz";
import AdItem from "../../components/Quizes/AdItem/AdItem";
import "./Home.module.css";
import history from "../../App";

export default function Home() {
  const dispatch = useDispatch();
  const { quizes } = useSelector((state) => state.quiz);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getQuizes());
    if (search) dispatch(getQuizesBySearch({ search: search }));
  }, [search]);

  const renderAdItem = () => {
    return quizes.map((item) => (
      <div className="col-6">
        <AdItem quiz={item} key={item.index} />
      </div>
    ));
  };

  const searchPost = () => {
    if (search.trim() !== "") {
      console.log(search.trim());
      dispatch(getQuizesBySearch({ search: search }));
      //history.push(`/quizes/search?searchQuery=${search || "none"}`);
    } else {
      history.push("/quizes");
    }
  };
  return (
    <div className="container-fluid bg-dark">
      <div className="row">
        <form className="search w-75 my-2">
          <input
            placeholder="Search here by name.."
            className="form-control my-1"
            onChange={(e) => setSearch(e.target.value)}
          />
          {/* <input
            placeholder="Search here by tag..."
            className="form-control my-1"
          /> */}
          <button
            className="btn btn-primary"
            style={{ margin: "0 auto" }}
            onClick={() => searchPost()}
          >
            Search
          </button>
        </form>
      </div>
      <div className="row">{renderAdItem()}</div>
    </div>
  );
}
