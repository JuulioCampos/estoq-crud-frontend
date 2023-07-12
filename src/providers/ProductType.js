import React from "react";

export const ProductTypeContext = React.createContext()

export const ProductTypeProvider = (props) => {
    const [productType, setProductType] = React.useState(null)

    return (<ProductTypeContext.Provider value={{ productType, setProductType }}>
        {props.children}
    </ProductTypeContext.Provider>)
}