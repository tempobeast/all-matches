import React, { useState } from "react";

const StatesContext = React.createContext();

function StatesProvider ({ children }) {
    const [ states, setStates ] = useState([])

    return (
        <StatesContext.Provider value={{ states, setStates }}>
            {children}
        </StatesContext.Provider>
    )
}

export { StatesContext, StatesProvider }