import { useState, useContext, TouchEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { PromptDataSubmittedContext } from '../context/promptDataSubmitted';

function MatchPage() {

    const [ profileImageUrl, setProfileImageUrl ] = useState('');
    const [ initialSubmit, setInitialSubmit ] = useState(true);
    
    const { promptDataSubmitted } = useContext(PromptDataSubmittedContext);
    const { ageLower, ageUpper, happyPlace, lookingFor } = promptDataSubmitted;
    const navigate = useNavigate();

    //Touch Event Test

    // const [ touchStart, setTouchStart ] = useState(null);
    // const [ touchEnd, setTouchEnd ] = useState(null);
    // const [ touchDistance, setTouchDistance ] = useState(null);

    // const minSwipeDistance = 50;
    
    // function onTouchStart(e) {
    //     setTouchEnd(null);
    //     setTouchStart(e.targetTouches[0].clientX)
    //     console.log(e)
    // }

    // function onTouchMove(e) {
    //     setTouchEnd(e.targetTouches[0].clientX);
    // }

    // function onTouchEnd() {
    //     if (!touchStart || !touchEnd) return;
    //     const distance = touchStart - touchEnd;
    //     setTouchDistance(-distance)
    //     const isLeftSwipe = distance > minSwipeDistance;
    //     const isRightSwipe = distance < -minSwipeDistance;
    //     if (isLeftSwipe || isRightSwipe) {
    //         console.log('swipe', isLeftSwipe ? "left" : "right")
    //     }
    // }

    function randomNumber (min, max) {
        min = Math.ceil(min);
        max = Math.ceil(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    const hairColor = ["redhead", "blonde", "brunette", "blonde", "brunette", "brunette", "blonde"];
    const location = ["at the beach", "at a sporting event", "in a forest", "on a sailboat", "at a party", "on a train", "backpacking"]

    const prompt = `Dating app picture, photo realistic, hyper realistic, ${randomNumber(ageLower, ageUpper)} year old, ${hairColor[randomNumber(0, hairColor.length - 1)]}, ${location[randomNumber(0, location.length - 1)]}, attractive, alluring, ${lookingFor}, sigma 24 mm f/8 lens, smiling`
    
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
            <button onClick={() => navigate('/')}>Back</button>
            <h1>Match Page</h1>
            {profileImageUrl ? <img className="match-image"src={profileImageUrl}/> : null}
            {/* <img onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd} className='match-image' src='https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*'/> */}
            <button onClick={handleSubmit}>View Matches</button>
        </div>
    )
}

export default MatchPage