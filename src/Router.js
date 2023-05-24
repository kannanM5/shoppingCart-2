import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainComponent from "./MainComponent";

export default function RouterConfigure() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainComponent />} />
      </Routes>
    </Router>
  );
}
