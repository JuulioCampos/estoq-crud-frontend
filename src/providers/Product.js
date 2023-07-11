import React from "react";

export const ProductContext = React.createContext();

export const ProductProvider = (props) => {
    const [product, setProduct] = React.useState(null)

    return (<ProductContext.Provider value={{product, setProduct}}>
        {props.children}
    </ProductContext.Provider>)
}