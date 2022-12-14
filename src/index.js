import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Thunk from "redux-thunk";
import { legacy_createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./reducers";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = legacy_createStore(reducers, {}, applyMiddleware(Thunk));

root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GCLIENT_ID}>
    <Provider store={store}>
      <App className="app" />
    </Provider>
  </GoogleOAuthProvider>
);
