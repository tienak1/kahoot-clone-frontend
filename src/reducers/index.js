import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import quiz from "./quiz";
import game from "./game";
import playerResult from "./playerResult";
import leaderboard from "./leaderboard";
import socket from "./socket";
import user from "./user";
import group from "./group";

export default combineReducers({
  auth,
  message,
  quiz,
  game,
  playerResult,
  leaderboard,
  socket,
  user,
  group,
});
