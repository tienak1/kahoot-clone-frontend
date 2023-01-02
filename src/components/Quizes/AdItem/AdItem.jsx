import { LikeOutlined, LikeTwoTone } from "@ant-design/icons";
import moment from "moment";
import React from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuiz, likeQuiz } from "../../../actions/quiz";
import "./AdItem.module.css";

function AdItem(props) {
  let { quiz } = props;
  console.log(quiz);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  const dispatch = useDispatch();
  const isLanguageEnglish = true;
  const handleLike = () => {
    if (quiz.likesCount.length > 0) {
      return quiz.likesCount.find((like) => like === user?.result?._id) ? (
        <>
          <LikeTwoTone />
          &nbsp;
          {quiz.likesCount.length > 2
            ? isLanguageEnglish
              ? `You and ${quiz.likesCount.length - 1} others`
              : `Ty i ${quiz.likesCount.length - 1} innych`
            : isLanguageEnglish
            ? `${quiz.likesCount.length} like${
                quiz.likesCount.length > 1 ? "s" : ""
              }`
            : `${quiz.likesCount.length} osób polubiło`}
        </>
      ) : (
        <>
          <LikeOutlined />
          &nbsp;{quiz.likesCount.length}{" "}
          {quiz.likesCount.length === 1
            ? isLanguageEnglish
              ? "Like"
              : "Polubienie"
            : isLanguageEnglish
            ? "Likes"
            : "Polubienia"}
        </>
      );
    }
  };
  return (
    <div className="card p-4 my-3 card-wrapper container">
      <div className="row align-items-center">
        <div className="col-4">
          <img
            src={
              quiz.image ||
              `https://static.vecteezy.com/system/resources/previews/011/894/106/original/cute-happy-santa-claus-png.png`
            }
            alt=""
            className="w-100"
          />
        </div>
        <div className="col-8">
          <h4>{quiz.name}</h4>
          <h5>{quiz.description}</h5>
          <p>{quiz.numberOfQuestions} slides</p>
          <address>
            Owner by <a href="/">Me</a>
          </address>

          <div className="row">
            <div className="col-12">
              <button className="btn btn-success me-2">Present</button>
              <button className="btn btn-success mx-2">Edit</button>
              <button
                className="btn btn-danger mx-2"
                onClick={() => dispatch(deleteQuiz(quiz._id))}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="row mt-3">
            <p>
              <i className="fa-solid fa-clock me-2"></i>
              Created at: {moment(quiz.dateCreated).fromNow()}
            </p>
          </div>
          <div className="row">
            <div className="col-6">{handleLike()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(AdItem);
