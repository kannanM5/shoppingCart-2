import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import MyApp from "./MyApp";
import ParentComponent from "./Pagination";
import { Provider } from "react-redux";
import store from "../src/redux/store";
import RouterConfigure from "./Router";
// import MainComponent from "./MainComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* <MyApp /> */}
    {/* <MainComponent /> */}
    <RouterConfigure />
    {/* <App /> */}
  </Provider>
);

reportWebVitals();
