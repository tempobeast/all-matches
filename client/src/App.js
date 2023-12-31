import logo from "./logo.svg";
import "./App.css";
import { useContext, useState } from "react";
import Questionaire from "./components/Questionaire";
import MatchPage from "./components/MatchPage";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PromptDataSubmittedContext } from "./context/promptDataSubmitted";

function App() {
  const { promptDataSubmitted, setPromptDataSubmitted } = useContext(PromptDataSubmittedContext);

  return (
    <div className='App'>

      <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/matches' element={<MatchPage />} />
            <Route path='/' element={<Questionaire />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
