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
import "../../../assets/scss/components/Quiz.scss";

export default function Quiz({ quiz }) {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const socket = useSelector((state) => state.socket.socket);

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
      </div>
    </div>
  );
}
