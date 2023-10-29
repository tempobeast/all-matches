import React, { useState } from "react";

const CitiesInStateContext = React.createContext();

function CitiesInStateProvider ({ children }) {
    const [ citiesInState, setCitiesInState ] = useState([])

    return (
        <CitiesInStateContext.Provider value={{ citiesInState, setCitiesInState }}>
            {children}
        </CitiesInStateContext.Provider>
    )
}

export { CitiesInStateContext, CitiesInStateProvider }