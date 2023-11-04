const { getNearbyCities } = require('./nearbyCities');

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
        "backpacking",
        "visiting a world monument",
        "reading",
        "at the gym",
        "at the theatre",
        "at a crouded bar",
        "in my car"
      ];
      
      //these are too generic. Not sure if they are appropriate. 
       const race = ["black", "caucasian", "latinx", "asian"];
    
       function randomNumber(max=arrayLength, min=0) {
        return Math.floor(Math.random() * (max - min) + min);
      } 

    function randomizeHair() {
        let randomNum = randomNumber(hairColor.length)
        return hairColor[randomNum]
    }
    function randomizeLocation() {
        let randomNum = randomNumber(location.length)
        return location[randomNum]
    }
    function randomizeRace() {
        let randomNum = randomNumber(race.length)
        return race[randomNum]
    }
    function randomizeCity(city) {
        const cities = getNearbyCities(city)
        let randomNum = randomNumber(cities.length)
        return cities[randomNum]
    }

    

module.exports = { randomizeHair, randomizeLocation, randomizeRace, randomNumber, randomizeCity }