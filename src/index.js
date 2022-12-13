import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Registration from "./pages/Registration/Registration";
import Group from "./pages/Group/Group";
import NavbarTemplate from "./templates/Navbar/NavbarTemplate";

import Thunk from "redux-thunk";
import { legacy_createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import Presentation from "./pages/Presentation/Presentation";
import PresentationDetail from "./pages/PresentationDetail/PresentationDetail";
import { GoogleOAuthProvider } from "@react-oauth/google";
import PlayerHome from "./pages/PlayerHome/PlayerHome";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = legacy_createStore(reducers, {}, applyMiddleware(Thunk));

root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GCLIENT_ID}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<NavbarTemplate />}>
            <Route path="" element={<Home />} />
            <Route path="/play" />
            <Route path="/signup" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Home />} />
            <Route path="/creategroup" element={<Group />} />
            <Route path="/group" element={<Group />} />
            <Route path="/presentation" element={<Presentation />} />
            <Route path="/presentationdetail">
              <Route path=":name" element={<PresentationDetail />} />
            </Route>
            {/* <Route path="/player" element={<PlayerHome />} />
            <Route path="/player/play" element={<PlayerHome />} /> */}
          </Route>
          <Route path="/player" element={<PlayerHome />} />
          <Route path="/player/play" element={<PlayerHome />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);

reportWebVitals();
