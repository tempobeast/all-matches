import "../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";


function Header() {

  const navigate = useNavigate();

  return (
    <div className="header">
      <h1 className="title"><strong>all</strong><em>matches</em></h1>
        <img className="header__flame" src="/all_matches_logo.png" onClick={() => navigate("/")}/>
    </div>
  );
}
export default Header;