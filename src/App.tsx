import React from "react";
import "./App.css";
import { AppProvider } from "./AppContext";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Surveys from "./pages/surveys";
import SingleSurvey from "./pages/single-survey";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <header className="App-header">
          <h3>Survey Creator</h3>
          <ul className="flex">
            <li className="mx-1">
              {" "}
              <a href="/">Home</a>{" "}
            </li>
            <li className="mx-1">
              {" "}
              <a href="/surveys">Surveys</a>{" "}
            </li>
          </ul>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/surveys" element={<Surveys />} />
          <Route path="/survey/:id" element={<SingleSurvey />} />
          {/* <Route path="/surveys/:id/step/:step" element={<Survey />} /> */}
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
