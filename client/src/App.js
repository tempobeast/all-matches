import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import PromptTest from './components/PromptTest'
import Questionaire from './components/Questionaire';
import MatchPage from './components/MatchPage';

function App() {

  return (
    <div className="App">
      {/* <PromptTest /> */}
      <Questionaire />
      <MatchPage />
    </div>
  );
}

export default App;
