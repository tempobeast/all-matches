import { useState, useContext } from "react";
import "../App.css";
import { PromptDataSubmittedContext } from "../context/promptDataSubmitted";
import { useNavigate } from "react-router-dom";
import MultiRangeSlider from "multi-range-slider-react";
import Location from "./Location";

function Questionaire() {
  const navigate = useNavigate();
  const { setPromptDataSubmitted } = useContext(PromptDataSubmittedContext);
  const [ userCity, setUserCity] = useState({});
  const [promptData, setPromptData] = useState({
    happyPlace: "",
    lookingFor: "women",
  });
  const [minValue, setMinValue] = useState(25);
  const [maxValue, setMaxValue] = useState(35);
  const handleAgeInput = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  function handleSubmit(e) {
    e.preventDefault();

    function randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    setPromptDataSubmitted({
      happyPlace: promptData.happyPlace,
      lookingFor: promptData.lookingFor,
      age: randomNumber(minValue, maxValue),
      city: userCity,
    });
    navigate("/matches");
  }

  function handleChange(e) {
    setPromptData({
      ...promptData,
      [e.target.name]: e.target.value,
    });
  }


  return (
    <div className='content'>
      <h2>About You</h2>
      <p className='about-intro'>
        Tell us a little bit about yourself and what you are looking for
      </p>
      <form onSubmit={handleSubmit} className='dating-preference-form'>
        <label htmlFor='looking-for'>Looking for: </label>
        <div className='select'>
          <select
            className='looking-for'
            value={promptData.lookingFor}
            onChange={handleChange}
            name='lookingFor'
            required
          >
            <option>select:</option>
            <option>Women</option>
            <option>Men</option>
            <option>Men and Women</option>
            <option>Non-binary</option>
            <option>All</option>
          </select>
        </div>
        <div className='age-preference'>
          <label>Between</label>
          <div className='slider-container'>
            <div className='slider-label-container'>
              <p>{minValue}</p>
              <p>and</p>
              <p>{maxValue}</p>
            </div>
            <MultiRangeSlider
              className='multi-range-slider'
              min={18}
              max={80}
              step={1}
              minValue={minValue}
              maxValue={maxValue}
              onInput={(e) => handleAgeInput(e)}
              style={{ border: "none", boxShadow: "none", padding: "0" }}
              label={false}
              ruler={false}
              barInnerColor='blue'
            />
          </div>
        </div>
        <label htmlFor='happy-place'>My happy place is...</label>
        <input
          className='happy-place'
          type='text'
          name='happyPlace'
          value={promptData.happyPlace}
          onChange={handleChange}
        />
        <hr></hr>
        <Location setUserCity={setUserCity} userCity={userCity} />
        <hr></hr>
        <button type='submit'>Next</button>
      </form>
    </div>
  );
}

export default Questionaire;
