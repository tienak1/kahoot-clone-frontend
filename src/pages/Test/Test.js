import React from "react";
import { useSelector } from "react-redux";

export default function Test() {
  const { quizes } = useSelector((state) => state.quiz);
  console.log(quizes);
  return (
    <div>
      {quizes.map((quiz) => (
        <>
          <p>{quiz.name}</p>
          <p>{quiz.description}</p>
        </>
      ))}
    </div>
  );
}
