import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import NavbarTemplate from "./templates/Navbar/NavbarTemplate";
import Thunk from "redux-thunk";
import { legacy_createStore, applyMiddleware } from "redux";
import { Provider, useSelector } from "react-redux";
import reducers from "./reducers";

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
          <Route path="/creategroup" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
