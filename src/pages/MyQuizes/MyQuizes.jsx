import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getTeacherQuizes,
  createQuiz,
  getPublicQuizes,
} from "../../actions/quiz";
import MyQuiz from "./MyQuiz/MyQuiz";
import { history } from "../../App";
import "../../assets/scss/components/MyQuizes.scss";

export default function MyQuizes() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const isLanguageEnglish = true;

  const [quizData, setQuizData] = useState({
    name: "",
    creatorName: `${user?.name}`,
    backgroundImage: "",
    description: "",
    pointsPerQuestion: 1,
    isPublic: true,
    tags: [],
    questionList: [],
  });
  const [isQuizPublic, setIsQuizPublic] = useState(true);

  useEffect(() => {
    dispatch(getTeacherQuizes(user._id));
    dispatch(getPublicQuizes(1));
  }, [dispatch]);

  const { quizes } = useSelector((state) => {
    return state.quiz;
  });

  const handleQuizSubmit = () => {
    dispatch(createQuiz(quizData, history));
  };

  const handleQuizChange = (e) => {
    setQuizData({ ...quizData, [e.target.name]: e.target.value });
  };

  return (
    <div className="wrapper">
      <div className="quizes-list">
        <div className="quiz-settings">
          <h2>
            {isLanguageEnglish ? "Create new presentation" : "Stwórz nowy quiz"}
          </h2>
          <div className="quiz-form">
            <div className="option-label">
              <label className="text-white fw-bold">
                {isLanguageEnglish ? "Title" : "Nazwa"}
              </label>
            </div>
            <input
              value={quizData.name}
              type="text"
              name="name"
              onChange={handleQuizChange}
              className="form-control"
              style={{
                width: "98%",
              }}
            />
            <div className="option-label">
              <label className="text-white fw-bold">
                {isLanguageEnglish ? "Description" : "Opis"}
              </label>
            </div>
            <input
              value={quizData.description}
              type="text"
              name="description"
              onChange={handleQuizChange}
              className="form-control"
              style={{
                width: "98%",
              }}
            />
            <div className="option-buttons">
              <button
                onClick={() => {
                  setIsQuizPublic(true);
                  setQuizData({ ...quizData, isPublic: true });
                }}
                className="option-button"
                style={{
                  backgroundColor: isQuizPublic
                    ? "rgb(19, 104, 206)"
                    : "inherit",
                  color: isQuizPublic ? "white" : "rgb(110, 110, 110)",
                }}
              >
                {isLanguageEnglish ? "Public" : "Publiczny"}
              </button>
              <button
                onClick={() => {
                  setIsQuizPublic(false);
                  setQuizData({ ...quizData, isPublic: false });
                }}
                className="option-button"
                style={{
                  backgroundColor: isQuizPublic
                    ? "inherit"
                    : "rgb(19, 104, 206)",
                  color: isQuizPublic ? "rgb(110, 110, 110)" : "white",
                }}
              >
                {isLanguageEnglish ? "Private" : "Prywatny"}
              </button>
            </div>
            <button onClick={handleQuizSubmit} className="submit-button">
              {isLanguageEnglish
                ? "Create new presentation"
                : "Stwórz nowy quiz"}
            </button>
          </div>
        </div>
        {quizes?.map((quiz) => (
          <MyQuiz key={quiz._id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}
