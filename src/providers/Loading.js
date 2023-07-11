import React from "react";

export const LoadingContext = React.createContext();

export const LoadingProvider = (props) => {
    const [isLoading, setIsLoading] = React.useState(true)

    return (<LoadingContext.Provider value={{isLoading, setIsLoading}}>
        {props.children}
    </LoadingContext.Provider>)
}