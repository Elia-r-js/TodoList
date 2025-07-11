import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { routes } from "./routes/Routes";
import Header from "./layout/Header/Header";
import BuildRouter from "./Utils/BuildRoutes";

export default function App() {
  return (
    <Router>
        <Header/>
      <Routes>
        {BuildRouter(routes)}
      </Routes>
    </Router>
  );
}
