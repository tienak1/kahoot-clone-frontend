import React from "react";
import styles from "./Answer.module.css";
import answerCheck from "../../../assets/answerCheck.svg";

export default function Answer({
  icon,
  body,
  showText,
  isAnswerClicked,
  onClick,
}) {
  return (
    <div className={styles["answer-field"]}>
      <img className={styles["answer-icon"]} src={icon} alt="" />
      {showText ? (
        <h2>{body}</h2>
      ) : (
        <div onClick={onClick} className={styles["answer-check"]}>
          <img
            style={{ visibility: isAnswerClicked ? "visible" : "hidden" }}
            src={answerCheck}
            alt=""
          />
        </div>
      )}
    </div>
  );
}
