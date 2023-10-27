import React, { useState, useContext, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import { PromptDataSubmittedContext } from "../context/promptDataSubmitted";
import { StatesContext } from "../context/states";

function Location({ setCityLocation }) {
  const { states, setStates } = useContext(StatesContext);
  const [stateLocation, setStateLocation] = useState({});
  const [citiesInState, setCitiesInState] = useState([]);

  useEffect(() => {
    setStates(State.getStatesOfCountry("US"));
  }, [setStates]);

  const statesToDisplay = states.map((state) => (
    <option key={state.isoCode} value={state.isoCode}>
      {state.name}
    </option>
  ));

  const citiesToDisplay = !stateLocation
    ? null
    : citiesInState.map((city) => (
        <option key={city.name} value={city.name}>
          {city.name}
        </option>
      ));

  function handleStateChange(e) {
    const state = states.find((state) => state.isoCode === e.target.value);
    setStateLocation(state);
    setCitiesInState(City.getCitiesOfState("US", `${e.target.value}`));
    setCityLocation({})
  }

  function handleCityChange(e) {
    const city = citiesInState.find((city) => city.name === e.target.value);
    setCityLocation(city);
  }

  return (
    <div>
      <select
        onChange={handleStateChange}
        name='state'
        className='state-select'
        defaultValue={"Select State:"}
      >
        <option value='Select State:' disabled>
          Select State:
        </option>
        {statesToDisplay}
      </select>
      {citiesInState.length > 0 ? (
        <select
          onChange={handleCityChange}
          name='city'
          defaultValue={"Select City:"}
        >
          <option defaultValue='Select City:' disabled>
            Select City:
          </option>
          {citiesToDisplay}
        </select>
      ) : null}
    </div>
  );
}

export default Location;