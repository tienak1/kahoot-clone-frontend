import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Quiz.module.css";
import { likeQuiz, deleteQuiz } from "../../../actions/quiz";
import { history } from "../../../App";
import moment from "moment";
import { DeleteFilled, LikeOutlined, LikeTwoTone } from "@ant-design/icons";
import { PlayCircleFilled } from "@ant-design/icons";
import { createGame } from "../../../actions/game";
import { createLeaderboard } from "../../../actions/leaderboard";

export default function Quiz({ quiz }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const socket = useSelector((state) => state.socket.socket);
  const isLanguageEnglish = true;
  const openQuizDetailsPage = (e) => {
    history.push(`/quizes/${quiz._id}`);
  };
  // render likes, handle like
  const Likes = () => {
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
    return (
      <>
        <LikeOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
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
    <div className={styles["quiz-card"]}>
      <div className={styles["image-container"]}>
        <h3 className={styles["quiz-creator"]}>{quiz.creatorName}</h3>
        <h3 className={styles["quiz-date"]}>
          {moment(quiz.dateCreated).fromNow()}
        </h3>
        <div
          onClick={openQuizDetailsPage}
          className={styles["quiz-image"]}
          style={{
            backgroundImage: "url('" + quiz.backgroundImage + "')",
            cursor: "pointer",
          }}
        ></div>
        <h3 className={styles["quiz-question-number"]}>
          {isLanguageEnglish ? "Questions:" : "Pytania:"}{" "}
          {quiz.numberOfQuestions}
        </h3>
      </div>
      <div className={styles["card-body"]}>
        <h4 className={styles["quiz-tags"]}>
          {quiz.tags.map((tag) => `#${tag} `)}
        </h4>
        <h2 className={styles["quiz-title"]}>{quiz.name}</h2>
        <small className={styles["quiz-description"]}>{quiz.description}</small>
        <button
          className={styles["like-button"]}
          onClick={() => dispatch(likeQuiz(quiz._id))}
        >
          <Likes />
        </button>
        <button
          className="btn btn-danger"
          onClick={() => dispatch(deleteQuiz(quiz._id))}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
