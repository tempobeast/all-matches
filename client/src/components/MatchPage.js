import { useState, useContext, useEffect } from "react";
import { PromptDataSubmittedContext } from "../context/promptDataSubmitted";
import { CitiesInStateContext } from "../context/citiesInState";
import { hairColor, location, race } from '../helpers/promptDataSeeds'

function MatchPage() {
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const [profileInfo, setProfileInfo] = useState("");
  const [profileImageFinal, setProfileImageFinal] = useState("");
  const [profilePromptFinal, setProfilePromptFinal] = useState("");

  const { promptDataSubmitted } = useContext(PromptDataSubmittedContext);
  const { ageLower, ageUpper, happyPlace, lookingFor, city } = promptDataSubmitted;
  const { citiesInState, setCitiesInState } = useContext(CitiesInStateContext)
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

  //randomizes data for first submit
  useEffect(() => {
    randomizeProfileData();
  }, []);
  
  function randomizeProfileData() {
    const profileAge = randomNumber(ageLower, ageUpper);
    const profileHairColor = hairColor[randomNumber(hairColor.length - 1)];
    const profileLocation = location[randomNumber(location.length - 1)];
    const profileRace = race[randomNumber(race.length - 1)];
    const matchesCity = nearbyCities[randomNumber(nearbyCities.length - 1)]

    const imagePrompt = `Dating app picture, photo realistic, hyper realistic, ${profileAge} year old, ${profileRace}, ${profileHairColor}, ${profileLocation}, attractive, alluring, ${lookingFor}, sigma 24 mm f/8 lens, smiling, ${happyPlace}`;
    setProfileImageFinal(imagePrompt);
    const profilePrompt = `In JSON - first_name: random name for a ${lookingFor}, age: ${profileAge}, location: ${matchesCity.name} and bio: dating app profile bio involving ${
      happyPlace || profileLocation
    }.`;
    setProfilePromptFinal(profilePrompt);
  }

  function randomNumber(arrayLength) {
    return Math.floor(Math.random() * arrayLength);
  }

  //takes user's location and .3 degree lat,long radius for matches
  // const nearbyCities = citiesInState.filter((citySearch) => {
  //   return (
  //     parseFloat(citySearch.latitude) > parseFloat(city.latitude) - 0.3 &&
  //     parseFloat(citySearch.latitude) < parseFloat(city.latitude) + 0.3 &&
  //     parseFloat(citySearch.longitude) > parseFloat(city.longitude) - 0.3 &&
  //     parseFloat(citySearch.longitude) < parseFloat(city.longitude) + 0.3
  //   );
  // });
  
  const nearbyCities = citiesInState.filter((citySearch) => {
    const distanceX = city.latitude - citySearch.latitude;
    const distanceY = city.longitude - citySearch.longitude;

    return(Math.hypot(distanceX, distanceY) < .35)
  })

  console.log(nearbyCities)

  function getNewMatch() {
    generateImageRequest(profileImageFinal);
    generateProfile(profilePromptFinal);
  }

  function handleSubmit(e) {
    e.preventDefault();
    getNewMatch();
    randomizeProfileData();
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

      setProfileInfo(JSON.parse(data.data.choices[0].message.content));
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
            <div className="swipe-container">
              <div className="left-swipe swipe" onClick={() => getNewMatch() }>
                <p className="swipe-emoji">❌</p>
              </div>
              <div className="right-swipe swipe" onClick={() => setIsMatch(true)}>
                <p className="swipe-emoji">💚</p>
              </div>
            </div>
          </div>
          ) : null}
      </div>
      <div>
          {profileInfo && profileImageUrl ? (
            <div className='profile-info__container'>
              <div className='profile-info'>
                <p className='profile-info__first-name'>{profileInfo.first_name}</p>
                <p className='profile-info__age'>{profileInfo.age}</p>
              </div>
              <p className="profile-info__location">🏠{profileInfo.location}</p>
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
