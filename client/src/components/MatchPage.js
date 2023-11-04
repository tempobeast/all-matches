import { useState, useContext } from "react";
import { PromptDataSubmittedContext } from "../context/promptDataSubmitted";

function MatchPage() {
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});

  const { promptDataSubmitted } = useContext(PromptDataSubmittedContext);

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
    } else if (isLeftSwipe) {
      getNewMatch();
    }
  }

  
  async function generateProfile() {
    try {
      const response = await fetch("/openai/generateprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promptDataSubmitted,
        }),
      });

      if (!response.ok) {
        throw new Error("The profile cannot be generated");
      }
      
      const data = await response.json();
      
      const chatData = JSON.parse(data.chatData.choices[0].message.content);
      const nonChatData = JSON.parse(data.nonChatData);
      
      setProfileInfo({
        ...chatData,
        ...nonChatData,
      });
    } catch (error) {
      console.log(error);
    }
  }
  
  async function generateImageRequest() {
    setIsMatch(false);
    setIsLoading(true);
    
    try {
      const response = await fetch("/openai/generateimage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promptDataSubmitted,
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
  
  function getNewMatch() {
    generateImageRequest();
    generateProfile();
  }

  function handleSubmit(e) {
    e.preventDefault();
    getNewMatch();
  }
  return (
    <div className='match-page content'>
      {isLoading ? (
        <div className='backdrop__container'>
          <div className='backdrop'></div>
          <img
            className='backdrop__flame'
            alt='all matches logo'
            src='all_matches_logo.png'
          />
        </div>
      ) : null}
      <div className='match-image__container'>
        {isMatch ? <h3 className='is-match-text'>✅</h3> : null}
        {profileImageUrl ? (
          <div>
            <img
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className={
                isMatch
                  ? "match-image is-match"
                  : "match-image match-image__before-click"
              }
              src={profileImageUrl}
            />
            <div className='swipe-container'>
              <div className='left-swipe swipe' onClick={() => getNewMatch()}>
                <p className='swipe-emoji'>❌</p>
              </div>
              <div
                className='right-swipe swipe'
                onClick={() => setIsMatch(true)}
              >
                <p className='swipe-emoji'>💚</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div>
        {profileInfo && profileImageUrl ? (
          <div className='profile-info__container'>
            <div className='profile-info'>
              <p className='profile-info__first-name'>
                {profileInfo.first_name}
              </p>
              <p className='profile-info__age'>{profileInfo.age}</p>
            </div>
            <p className='profile-info__location'>🏠{profileInfo.city}</p>
            <p className='profile-info__bio'>{profileInfo.bio}</p>
          </div>
        ) : null}
      </div>
      <button className='view-matches-button' onClick={handleSubmit}>
        View Matches
      </button>
    </div>
  );
}

export default MatchPage;
