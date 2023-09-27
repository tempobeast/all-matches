import { useState } from 'react'
import '../App.css'

function Questionaire() {
    const [ promptData, setPromptData ] = useState({
        happyPlace: "",
        ageLower: 18,
        ageUpper: 80,
        lookingFor: ''
    })
    
    function handleSubmit(e) {
        e.preventDefault()
        if (promptData.ageLower > promptData.ageUpper) {
            alert("Cannot complete request (Date range error)")
            return
        }
        

    }

    function handleChange(e) {
        setPromptData({
            ...promptData, 
            [e.target.name]: e.target.value,
        })
    }

    return (
        <div>
            <h2>About You</h2>
            <p className='about-intro'>Tell us a little bit about yourself and what you are looking for</p>
            <form onSubmit={handleSubmit} className='dating-preference-form'>
                <label htmlFor='looking-for'>Looking for: </label>
                <select className='looking-for' value={promptData.lookingFor} onChange={handleChange} name="lookingFor" required>
                    <option>select:</option>
                    <option>Women</option>
                    <option>Men</option>
                    <option>etc</option>
                    <option>All</option>
                </select>
                <div className='age-preference'>
                    <label>Between</label>
                    <p>{promptData.ageLower}</p>
                    <input type='range' min={18} max={80} name='ageLower' value={promptData.ageLower} onChange={handleChange} className='slider'/>
                    <label>and</label>
                    <p>{promptData.ageUpper}</p>
                    <input type='range' min={19} max={80} name='ageUpper' value={promptData.ageUpper} onChange={handleChange} className='slider'/>
                </div>
                <label htmlFor='happy-place'>My happy place is...</label>
                <input className="happy-place" type='text' name="happyPlace" value={promptData.happyPlace} onChange={handleChange}/>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Questionaire