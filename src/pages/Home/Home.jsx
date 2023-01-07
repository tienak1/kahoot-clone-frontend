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
  const user = JSON.parse(localStorage.getItem("user"));
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

  return (
    <div className="container-fluid bg-dark">
      {user ? (
        <>
          <div className="row">
            <form className="search w-75 my-2">
              <input
                placeholder="Search here by name.."
                className="form-control my-1 h-100"
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
          <div className="row">
            <h2 className="text-white text-center my-2">My Group</h2>
            {renderAdItem()}
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
