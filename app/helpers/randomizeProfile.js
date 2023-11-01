const { randomizeHair, randomizeLocation, randomizeRace, randomizeCity } = require("./helpers");

function randomizeProfile(profileData) {
    console.log(profileData)
    const {age, happyPlace, lookingFor, city} = profileData
    
    const randomizedProfileData = {
        happyPlace: happyPlace,
        lookingFor: lookingFor,
        age: age,
        hairColor: randomizeHair(),
        location: randomizeLocation(),
        race: randomizeRace(),
        city: randomizeCity(city).name
    }   
    // const profileAge = randomNumber(ageLower, ageUpper);
    //     const profileHairColor = randomizeHair()
        // const profileLocation = randomizeLocation()
        // const profileRace = randomizeRace()
        // const matchesCity = randomizeCity(city)


        // const imagePrompt = `Dating app picture, photo realistic, hyper realistic, ${profileAge} year old, ${profileRace}, ${profileHairColor}, ${profileLocation}, attractive, alluring, ${lookingFor}, sigma 24 mm f/8 lens, smiling, ${happyPlace}`;
        // setProfileImageFinal(imagePrompt);
        // const profilePrompt = `In JSON - first_name: random name for a ${lookingFor}, age: ${profileAge}, location: ${matchesCity.name} and bio: dating app profile bio involving ${
        //   happyPlace || profileLocation
        // }.`;
        return randomizedProfileData
}

module.exports = { randomizeProfile }