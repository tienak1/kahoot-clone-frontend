import { LikeOutlined, LikeTwoTone } from "@ant-design/icons";
import moment from "moment";
import React from "react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteQuiz, likeQuiz } from "../../../actions/quiz";
import "./AdItem.module.css";
import { history } from "../../../App";
import { createGame } from "../../../actions/game";
import { createLeaderboard } from "../../../actions/leaderboard";

function AdItem(props) {
  let { quiz } = props;
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const isLanguageEnglish = true;
  const socket = useSelector((state) => state.socket.socket);
  const handleLike = () => {
    if (quiz.likesCount.length > 0) {
      return quiz.likesCount.find((like) => like === user?.result?._id) ? (
        <>
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
          &nbsp;{quiz.likesCount.length}
          {quiz.likesCount.length === 1
            ? isLanguageEnglish
              ? " Like"
              : "Polubienie"
            : isLanguageEnglish
            ? " Likes"
            : "Polubienia"}
        </>
      );
    }
  };
  const openQuizDetailsPage = (e) => {
    history.push(`/quizes/${quiz._id}`);
  };
  const addGame = async () => {
    let gameData = {
      quizId: quiz._id,
      isLive: true,
      pin: String(Math.floor(Math.random() * 9000) + 1000),
      userId: JSON.parse(localStorage.getItem("user"))._id,
    };
    console.log("ADD GAME", history);
    const newGame = await dispatch(createGame(gameData, history));

    let leaderboardData = { gameId: newGame._id, playerResultList: [] };

    const newLeaderboard = await dispatch(createLeaderboard(leaderboardData));
    socket.emit("init-game", newGame, newLeaderboard);
  };
  return (
    <div className="card p-4 my-3 card-wrapper container">
      <div className="row align-items-center">
        <div
          className="col-4"
          style={{ cursor: "pointer" }}
          onClick={openQuizDetailsPage}
        >
          <img
            src={
              quiz.image ||
              `https://static.vecteezy.com/system/resources/previews/011/894/106/original/cute-happy-santa-claus-png.png`
            }
            // backgroundImage: "url('" + quiz.backgroundImage + "')",
            alt=""
            className="w-100"
          />
        </div>
        <div className="col-8" style={{ cursor: "pointer" }}>
          <h4>{quiz.name}</h4>
          <h5>{quiz.description}</h5>
          <p>{quiz.numberOfQuestions} slides</p>
          <address>
            Owner by <a href="/">Me</a>
          </address>

          <div className="row">
            <div className="col-12">
              <button className="btn btn-success me-2" onClick={addGame}>
                Present
              </button>
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
            <p>{quiz.tags.map((tag) => `#${tag} `)}</p>
          </div>
          <div className="row">
            <div className="col-6">
              <i
                class="fa-solid fa-heart"
                onClick={() => dispatch(likeQuiz(quiz._id, user._id))}
              ></i>
              {handleLike()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(AdItem);
