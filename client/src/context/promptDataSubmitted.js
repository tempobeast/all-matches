import React, { useState } from "react";

const PromptDataSubmittedContext = React.createContext();

function PromptDataSubmittedProvider ({ children }) {
    const [ promptDataSubmitted, setPromptDataSubmitted ] = useState({
        happyPlace: "",
        lookingFor: '',
        age: '',
        city: {},
    })

    return (
        <PromptDataSubmittedContext.Provider value={{ promptDataSubmitted, setPromptDataSubmitted }}>
            {children}
        </PromptDataSubmittedContext.Provider>
    )
}

export { PromptDataSubmittedContext, PromptDataSubmittedProvider }