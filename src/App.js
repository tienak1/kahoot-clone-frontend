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

export const history = createBrowserHistory();

export default function App() {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   const socket = io("http://localhost:3000");
  //   socket.on("connection", () => {
  //     console.log(`You are connected with id: ${socket.id}`);
  //   });
  //   dispatch(createSocket(socket));
  //   return () => socket.disconnect();
  // }, [dispatch]);

  // const socket = io("http://localhost:3001");
  // socket.on("connection", () => {
  //   console.log(`You are connected with id: ${socket.id}`);
  // });
  // socket.emit("user connected");

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
          <Route path="/quizes" exact element={<Quizes />} />
          <Route path="/quizes/search" exact element={<Quizes />} />
          <Route path="/quizes/:id" exact element={<QuizDetail />} />
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
  );
}
