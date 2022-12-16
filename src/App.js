import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Routes,
  Route,
  unstable_HistoryRouter as HistoryRouter,
} from "react-router-dom";
import { io } from "socket.io-client";
import { createSocket } from "./actions/socket";
import { createBrowserHistory } from "history";
import HostScreen from "./components/Game/HostScreen/HostScreen";
import JoinGame from "./components/Game/JoinGame/JoinGame";
import PlayerScreen from "./components/Game/PlayerScreen/PlayerScreen";
import QuizCreator from "./components/QuizCreator/QuizCreator";
import QuizDetail from "./components/QuizDetail/QuizDetail";
import Quizes from "./components/Quizes/Quizes";
import MyQuizes from "./pages/MyQuizes/MyQuizes";
import Group from "./pages/Group/Group";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import NavbarTemplate from "./templates/Navbar/NavbarTemplate";

export const history = createBrowserHistory();

export default function App() {
  // const socket = io("http://localhost:3001");
  // // Room State
  // const [room, setRoom] = useState("");
  // // Message State
  // const [message, setMessage] = useState("");
  // const [messageReceived, setMessageReceived] = useState("");

  // const joinRoom = () => {
  //   if (room) socket.emit("join_room", room);
  // };

  // const sendMessage = () => {
  //   socket.emit("send_message", { message, room });
  // };

  // useEffect(() => {
  //   socket.on("receive_message", (data) => setMessageReceived(data.message));
  // }, [socket]);

  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io("http://localhost:3001");
    dispatch(createSocket(socket));
    return () => socket.disconnect();
  }, [dispatch]);

  return (
    <HistoryRouter history={history}>
      <Routes>
        <Route path="" element={<NavbarTemplate />}>
          <Route path="" element={<Home />} />
          {/* Route for all user  */}
          <Route path="/signup" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Home />} />
          {/* Route for all user  */}
          {/* Route for teacher, assistant  */}
          <Route path="/creategroup" element={<Group />} />
          <Route path="/group" element={<Group />} />
          {/* Quiz Route  */}
          {/* Display all quizes */}
          <Route path="/quizes" exact element={<Quizes />} />
          {/* Find quizes  */}
          <Route path="/quizes/search" exact element={<Quizes />} />

          <Route path="/quizes/:id" exact element={<QuizDetail />} />
          <Route path="/quizes/create" element={<QuizCreator />} />
          <Route path="/myquizes/:id" exact element={<QuizCreator />} />
          <Route path="/myquizes" exact element={<MyQuizes />} />
          {/* Quiz Route  */}
          {/* Route for teacher, assistant  */}
        </Route>
        {/* Route for student,player  */}
        <Route path="/games/joingame" exact element={<JoinGame />} />
        <Route path="/games/host/:id" exact element={<HostScreen />} />
        <Route path="/games/player/:id" exact element={<PlayerScreen />} />
        {/* Route for student  */}
      </Routes>
    </HistoryRouter>
    // <div>
    //   <input
    //     placeholder="Room Number"
    //     onChange={(e) => setRoom(e.target.value)}
    //   />
    //   <button className="btn btn-primary" onClick={joinRoom}>
    //     Join Room
    //   </button>
    //   <input
    //     placeholder="Message..."
    //     onChange={(e) => setMessage(e.target.value)}
    //   />
    //   <button className="btn btn-secondary" onClick={sendMessage}>
    //     Send Message
    //   </button>
    //   <h1>Message:</h1>
    //   {messageReceived}
    // </div>
  );
}
