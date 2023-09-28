import React, { useState } from "react";

const PromptDataSubmittedContext = React.createContext();

function PromptDataSubmittedProvider ({ children }) {
    const [ promptDataSubmitted, setPromptDataSubmitted ] = useState({
        happyPlace: "",
        ageLower: 18,
        ageUpper: 80,
        lookingFor: ''
    })

    return (
        <PromptDataSubmittedContext.Provider value={{ promptDataSubmitted, setPromptDataSubmitted }}>
            {children}
        </PromptDataSubmittedContext.Provider>
    )
}

export { PromptDataSubmittedContext, PromptDataSubmittedProvider }