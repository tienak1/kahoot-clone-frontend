import React from "react";
import styles from "./AnswerInput.module.css";
import answerCheck from "../../../assets/answerCheck.svg";

export default function AnswerInput({
  value,
  onChange,
  onClick,
  isAnswerCorrect,
  svg,
  name,
}) {
  return (
    <>
      <img className={styles["answer-icon"]} src={svg} alt="" />
      <input type="text" value={value} onChange={onChange} name={name} />
      <div onClick={onClick} className={styles["answer-check"]}>
        <img
          style={{ visibility: isAnswerCorrect ? "visible" : "hidden" }}
          src={answerCheck}
          alt=""
        />
      </div>
    </>
  );
}
