const { State, City } = require('country-state-city')

function getNearbyCities(targetCity) {
    const citiesInState = City.getCitiesOfState("US", `${targetCity.stateCode}`);

   let citiesToDisplay = citiesInState.filter((citySearch) => {
        const distanceX = targetCity.latitude - citySearch.latitude;
        const distanceY = targetCity.longitude - citySearch.longitude;
    
        return(Math.hypot(distanceX, distanceY) < .35)
      })
    return citiesToDisplay
}

module.exports = { getNearbyCities }