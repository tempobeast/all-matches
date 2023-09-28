import { useState, useContext } from 'react'
import { PromptDataSubmittedContext } from '../context/promptDataSubmitted';

function MatchPage() {

    const [ profileImageUrl, setProfileImageUrl ] = useState('')
    const [ initialSubmit, setInitialSubmit ] = useState(true)
    const { promptDataSubmitted } = useContext(PromptDataSubmittedContext)
    const { ageLower, ageUpper, happyPlace, lookingFor } = promptDataSubmitted

    function randomNumber (min, max) {
        min = Math.ceil(min);
        max = Math.ceil(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    const hairColor = ["redhead", "blonde", "brunette"];
    const location = ["at the beach", "at a sporting event", "in a forest", "on a sailboat", "at a party"]

    const prompt = `Dating app picture, photo realistic, hyper realistic, ${randomNumber(ageLower, ageUpper)} year old, ${hairColor[randomNumber(0, hairColor.length - 1)]}, ${location[randomNumber(0, location.length - 1)]}, attractive, alluring, ${lookingFor}, sigma 24 mm f/8 lens`

    console.log(prompt)
    
    function handleSubmit(e) {
      e.preventDefault();
      generateImageRequest(prompt)
    }
  
      async function generateImageRequest(imagePrompt) {
  
        try {
          const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              prompt: imagePrompt
            })
          })
  
          if (!response.ok) {
            throw new Error('The image cannot be generated')
          }
  
          const data = await response.json();
  
          setProfileImageUrl(data.data)
  
        } catch (error) {
          console.log(error)
        }
      }

    return(
        <div>
            <h1>Match Page</h1>
            {profileImageUrl ? <img className="match-image"src={profileImageUrl}/> : null}
            <button onClick={handleSubmit}>View Matches</button>
        </div>
    )
}

export default MatchPage