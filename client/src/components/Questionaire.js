import { useState, useContext } from "react";
import "../App.css";
import { PromptDataSubmittedContext } from "../context/promptDataSubmitted";
import { useNavigate } from "react-router-dom";
import MultiRangeSlider from 'multi-range-slider-react';


function Questionaire() {
  const { promptDataSubmitted, setPromptDataSubmitted } = useContext(
    PromptDataSubmittedContext
  );
  const [promptData, setPromptData] = useState({
    happyPlace: "",
    ageLower: 18,
    ageUpper: 80,
    lookingFor: "",
  });
    const [minValue, set_minValue] = useState(25);
    const [maxValue, set_maxValue] = useState(50);
    const handleAgeInput = (e) => {
        set_minValue(e.minValue);
        set_maxValue(e.maxValue);
};

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (promptData.ageLower > promptData.ageUpper) {
      alert("Cannot complete request (Date range error)");
      return;
    }

    setPromptDataSubmitted(promptData);
    navigate("/matches");
  }

  function handleChange(e) {
    setPromptData({
      ...promptData,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>
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
            <option>Men/Women</option>
            <option>Non-binary</option>
            <option>All</option>
          </select>
        </div>
        <div className='age-preference'>
          <label>Between</label>
          <div className="slider-container">
            <div className="slider-label-container">
                <input type="number"value={minValue}/>
                <p>and</p>
                <input type="number" value={maxValue}/>
            </div>
            <MultiRangeSlider 
                className='multi-range-slider' 
                min={18} 
                max={80} 
                step={1}
                minValue={minValue} 
                maxValue={maxValue} 
                onInput={(e) => handleAgeInput(e)}
                style={{border: 'none', boxShadow: 'none', padding: '0'}}
                label={false}
                ruler={false}
                barInnerColor="blue"
                />
        </div>
          {/* <p>{promptData.ageLower}</p>
          <input
            type='range'
            min={18}
            max={80}
            name='ageLower'
            value={promptData.ageLower}
            onChange={handleChange}
            className='slider'
          />
          <label>and</label>
          <p>{promptData.ageUpper}</p>
          <input
            type='range'
            min={19}
            max={80}
            name='ageUpper'
            value={promptData.ageUpper}
            onChange={handleChange}
            className='slider'
          /> */}
        </div>
        <label htmlFor='happy-place'>My happy place is...</label>
        <input
          className='happy-place'
          type='text'
          name='happyPlace'
          value={promptData.happyPlace}
          onChange={handleChange}
        />
        <button type='submit'>Next</button>
      </form>
    </div>
  );
}

export default Questionaire;
