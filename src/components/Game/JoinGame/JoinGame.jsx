import React, { useEffect, useState, useRef } from "react";
import styles from "./JoinGame.module.css";
//import { useHistory } from "react-router-dom";
import { history } from "../../../App";

import { CircularProgress } from "@material-ui/core";
import { createPlayerResult } from "../../../actions/playerResult";
import { addPlayer } from "../../../actions/game";
import { useDispatch, useSelector } from "react-redux";

export default function JoinGame() {
  const user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const [isPlayerAdded, setIsPlayerAdded] = useState(false);
  const pinRef = useRef("");
  //const history = useHistory();
  const socket = useSelector((state) => state.socket.socket);
  const isLanguageEnglish = true;

  useEffect(() => {
    socket?.on("move-to-game-page", (gameId) => {
      dispatch(
        createPlayerResult({
          playerId: user._id,
          gameId: gameId,
          score: 0,
          answers: [],
        })
      );
      history.push(`/games/player/${gameId}`);
    });
  }, [socket, dispatch, history, user._id]);

  const result = (message, playerId, gameId) => {
    if (message === "correct") {
      dispatch(addPlayer(gameId, playerId));
      setIsPlayerAdded(true);
    } else {
      alert("You entered wrong pin or game is not exist");
    }
  };

  const joinGame = () => {
    socket.emit(
      "add-player",
      user,
      socket.id,
      pinRef.current.value,
      (message, playerId, gameId) => {
        result(message, playerId, gameId);
      }
    );
  };

  return (
    <div
      className="container-fluid"
      style={{
        backgroundColor: "#8BC6EC",
        backgroundImage: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",

        height: "100vh",
        marginTop: "-50px",
      }}
    >
      {!isPlayerAdded ? (
        <div className="text-center">
          <h1 className="text-white pt-5" style={{ fontWeight: "bold" }}>
            {isLanguageEnglish ? "Join game" : "Dołącz do gry"}
          </h1>
          <div className="d-flex justify-content-center">
            <input
              type="text"
              ref={pinRef}
              placeholder={isLanguageEnglish ? "Game PIN" : "Wpisz tutaj pin"}
              className="fs-3 p-2"
            />
            <button onClick={joinGame} className="bg-dark text-white">
              {isLanguageEnglish ? "Enter" : "Wyślij"}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.section}>
          <h2>
            {isLanguageEnglish ? "You joined the game" : "Dołączyłeś do gry"}
          </h2>
          <h4>
            {isLanguageEnglish
              ? "Waiting on a host to start the game"
              : "Zaczekaj na rozpoczęcie gry przez hosta"}
          </h4>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
