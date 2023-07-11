import { Tabs, Tab } from "react-bootstrap"
import { ProductType } from "./ProductType"
import { Product } from "./Product"

export const RegistersProduct = (props) => {
    return (
        <Tabs
            defaultActiveKey="productType"
            transition={false}
            id="tabsProduct"
            className="mb-3"
        >
            <Tab eventKey="productType" title="Product Type">
                <ProductType />
            </Tab>
            <Tab eventKey="products" title="Products">
                <Product />
            </Tab>
        </Tabs>
    )
}