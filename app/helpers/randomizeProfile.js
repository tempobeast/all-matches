const { randomizeHair, randomizeLocation, randomizeRace, randomizeCity } = require("./helpers");

function randomizeProfile(profileData) {
    const {age, happyPlace, lookingFor, city} = profileData
    
    const randomizedProfileData = {
        happyPlace: happyPlace,
        lookingFor: lookingFor,
        age: age,
        hairColor: randomizeHair(),
        location: randomizeLocation(),
        race: randomizeRace(),
        city: randomizeCity(city).name,
    }   
   
    return randomizedProfileData
}

module.exports = { randomizeProfile }