import { Tabs, Tab } from "react-bootstrap"
import { ProductType } from "./ProductType"
import { Product } from "./Product"
import { useEffect, useState } from "react";
import { useLocation } from "react-router";

export const RegistersProduct = (props) => {
    const location = useLocation().pathname;

    const [key, setKey] = useState('productType');

    useEffect(() => {
        if (location.includes("product-type")) {
            setKey('product-type')
        } else {
            setKey('product')
        }
    }, [key, location])

    return (
        <Tabs
            defaultActiveKey="product-type"
            transition={true}
            id="tabsProduct"
            activeKey={key}
            onSelect={(k) => window.location.href = `/register-product/${k}`}
            className="mb-3"
        >
            <Tab eventKey="product-type" title="Product Type">
                <ProductType />
            </Tab>
            <Tab eventKey="product" title="Products">
                <Product />
            </Tab>
        </Tabs>
    )
}