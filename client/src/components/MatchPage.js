import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PromptDataSubmittedContext } from "../context/promptDataSubmitted";

function MatchPage() {
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [profileInfo, setProfileInfo] = useState("");
  const [profileImageFinal, setProfileImageFinal] = useState("")
  const [profilePromptFinal, setProfilePromptFinal] = useState("")

  const { promptDataSubmitted } = useContext(PromptDataSubmittedContext);
  const { ageLower, ageUpper, happyPlace, lookingFor } = promptDataSubmitted;
  const navigate = useNavigate();

  

  //Touch Event Test

  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [touchDistance, setTouchDistance] = useState(null);

  const minSwipeDistance = 50;

  function onTouchStart(e) {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }

  function onTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX);
  }

  function onTouchEnd() {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    setTouchDistance(-distance);
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isRightSwipe) {
      setIsMatch(true);
    } else if(isLeftSwipe) {
      getNewMatch();
    }
  }

  function randomNumber(min, max) {
    min = Math.ceil(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min) + min);
  }

  //    const lookingForGender = '';
  //     const selectAll = ["man", "woman", "non-binary"]

  //    if (lookingFor === "All") {
  //     lookingForGender = selectAll[randomNumber(0, selectAll.length - 1)]
  //    } else if(lookingFor === "Men/Women") {
  //     lookingForGender = selectAll.pop()[randomNumber(0, selectAll.length - 2)]
  //    } else if( lookingFor === "Men" || lookingFor === "Women") {
  //     lookingFor =
  //    }

  const hairColor = [
    "redhead",
    "blonde",
    "brunette",
    "blonde",
    "brunette",
    "brunette",
    "blonde",
  ];
  const location = [
    "at the beach",
    "at a sporting event",
    "in a forest",
    "on a sailboat",
    "at a party",
    "on a train",
    "backpacking",
  ];

  const race = [
    "black",
    "caucasian",
    "latinx",
    "asian"
  ]

  function randomizeProfileData() {
    const profileAge = randomNumber(ageLower, ageUpper);
    const profileHairColor = hairColor[randomNumber(0, hairColor.length - 1)];
    const profileLocation = location[randomNumber(0, location.length - 1)];
    const profileRace = race[randomNumber(0, race.length - 1)]

    const imagePrompt = `Dating app picture, photo realistic, hyper realistic, ${profileAge} year old, ${profileRace}, ${profileHairColor}, ${profileLocation}, attractive, alluring, ${lookingFor}, sigma 24 mm f/8 lens, smiling, ${happyPlace}`;
    setProfileImageFinal(imagePrompt)
    const profilePrompt = `${profileAge} year old ${lookingFor} who loves ${happyPlace || "life"}.`;
    setProfilePromptFinal(profilePrompt)

    getNewMatch()
  }

  function getNewMatch() {
    generateImageRequest(profileImageFinal);
    generateProfile(profilePromptFinal);
  }

  function handleSubmit(e) {
    e.preventDefault();
    randomizeProfileData()
  }

  async function generateProfile(profilePrompt) {
    try {
      const response = await fetch("/openai/generateprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          profilePrompt: profilePrompt,
        }),
      });

      if (!response.ok) {
        throw new Error("The profile cannot be generated");
      }

      const data = await response.json();

      setProfileInfo(data.data.choices[0].message.content);
    } catch (error) {
      console.log(error);
    }
  }

  async function generateImageRequest(imagePrompt) {
    setIsMatch(false);
    setIsLoading(true);

    try {
      const response = await fetch("/openai/generateimage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: imagePrompt,
        }),
      });

      if (!response.ok) {
        throw new Error("The image cannot be generated");
      }

      const data = await response.json();

      setProfileImageUrl(data.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    randomizeProfileData()
  },[])

  return (
    <div className="match-page">
      {isLoading ? <div className='backdrop'></div> : null}
      {isLoading ? <img className="backdrop__flame" alt="all matches logo" src="all_matches_logo.png"/> : null}
      <button onClick={() => navigate("/")}>Back</button>
      <h1>Match Page</h1>
      <div className={isMatch ? "is-match match-profile" : "match-profile"}>
        {isMatch ? <h3 className='is-match-text'>✅</h3> : null}
        <p className='profile-info'>{profileInfo}</p>
        {profileImageUrl ? (
          <img
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            className={
              isMatch ? "match-image" : "match-image match-image__before-click"
            }
            src={profileImageUrl}
          />
        ) : null}
      </div>
      <button className='view-matches-button' onClick={handleSubmit}>
        View Matches
      </button>
    </div>
  );
}

export default MatchPage;
