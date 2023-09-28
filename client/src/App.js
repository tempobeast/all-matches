import logo from "./logo.svg";
import "./App.css";
import { useContext, useState } from "react";
import PromptTest from "./components/PromptTest";
import Questionaire from "./components/Questionaire";
import MatchPage from "./components/MatchPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PromptDataSubmittedContext } from "./context/promptDataSubmitted";

function App() {
  const { promptDataSubmitted, setPromptDataSubmitted } = useContext(PromptDataSubmittedContext);

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          {promptDataSubmitted.lookingFor ? (
            <Route path='/matches' element={<MatchPage />} />
          ) : (
            <Route path='/' element={<Questionaire />} />
          )}
          <Route path='/prompt-test' element={<PromptTest />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
