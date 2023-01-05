import React, { useEffect } from "react";
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
import JoinGroup from "./components/JoinGroup/JoinGroup";

export const history = createBrowserHistory();

export default function App() {
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
          {/* Route for all user  */}
          {/* Route for teacher, assistant  */}
          <Route path="/group" element={<Group />} />
          {/* Quiz Routes  */}
          {/* Display all Quizes  */}
          <Route path="/quizes" exact element={<Quizes />} />
          {/* Search Quiz  */}
          <Route path="/quizes/search" exact element={<Quizes />} />
          {/* View Quiz Details  */}
          <Route path="/quizes/:id" exact element={<QuizDetail />} />
          {/* Edit Question  */}
          <Route path="/myquizes/:id" exact element={<QuizCreator />} />
          {/* Create new Quizes  */}
          <Route path="/myquizes" exact element={<MyQuizes />} />
          {/* Route for teacher, assistant  */}
          <Route path="/group" element={<Group />} />
          <Route path="/group/join">
            <Route path=":groupId" element={<JoinGroup />} />
          </Route>
        </Route>
        {/* Route for student,player  */}
        <Route path="/games/joingame" exact element={<JoinGame />} />
        <Route path="/games/host/:id" exact element={<HostScreen />} />
        <Route path="/games/player/:id" exact element={<PlayerScreen />} />
        {/* Route for student  */}
        <Route path="*" element={<Home />} />
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
