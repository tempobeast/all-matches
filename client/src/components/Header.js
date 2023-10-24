import "../App.css";
import React from "react";
import { useNavigate } from "react-router-dom";


function Header() {

  const navigate = useNavigate();

  return (
    <div className="header">
        <img className="header__flame" src="/all_matches_logo.png" onClick={() => navigate("/")}/>
    </div>
  );
}
export default Header;