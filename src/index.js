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

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = legacy_createStore(reducers, {}, applyMiddleware(Thunk));

root.render(
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
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
