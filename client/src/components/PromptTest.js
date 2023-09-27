import { useState } from 'react'

function PromptTest() {

    const [ profileImageUrl, setProfileImageUrl ] = useState('')
    const [ promptDetails, setPromptDetails ] = useState('')
    
    function handleSubmit(e) {
      e.preventDefault();
      generateImageRequest(promptDetails)
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
            <h1>Generate image</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='prompt'>Prompt:</label>
                <textarea  name="prompt" value={promptDetails} onChange={(e) => setPromptDetails(e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
            {profileImageUrl ? <img src={profileImageUrl}/> : null}
        </div>
    )
}

export default PromptTest