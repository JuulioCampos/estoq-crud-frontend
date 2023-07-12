import { useContext, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import Swal from "sweetalert2";
import { ProductTypeContext } from "../../../providers/ProductType";
import { ProductContext } from "../../../providers/Product";

export const RegisterSale = (props) => {
    const { product } = useContext(ProductContext);
    const { productType } = useContext(ProductTypeContext);
    
    const products = product;
    const productTypes = productType;
    const [productId, setProductId] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [amount, setAmount] = useState(0);
    const [tax, setTax] = useState(0);

    const calculateTotal = () => {
        if (productId === null || quantity === null) return;
        const productPrice = products.find(item => parseInt(item.id) === parseInt(productId));
        const productType = productTypes.find(item => parseInt(item.id) === parseInt(productId));
        const taxPay = (productPrice.price * quantity) * productType.tax;
        const amount = (productPrice.price * quantity) + taxPay;
        setTax(taxPay.toFixed(2));
        setAmount(amount.toFixed(2));
    }

    const createSale = () => {
        calculateTotal();

        if (productId === null || quantity === null || amount === null) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'You must fill all the fields!',
            })
        };
        Swal.fire({
            icon: 'success',
            title: 'Wooow!',
            text: 'Sale created with success!',
        })
    }

    return (
        <>
            <h1 className="text-center">Register Sale</h1>
            <Container>
                <Form>
                    <Row>
                        <Col md={3}>
                            <Form.Label htmlFor="quantity">Choose a Product</Form.Label>
                            <Form.Select aria-label="Select Product" id={"product"} onChange={
                                (e) => {
                                    setProductId(e.target.value)
                                    calculateTotal()
                                }
                            } required>
                                <option hidden>Select Here</option>
                                {product && products.map(item => (
                                    <option key={item.id} value={item.id}>{item.product} </option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col md={2}>
                            <Form.Label htmlFor="quantity">Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                id="quantity"
                                placeholder="0"
                                min={1}
                                max={999}
                                onChange={(e) => {
                                    setQuantity(parseInt(e.target.value))
                                    calculateTotal()
                                }}
                                required
                            />
                        </Col>
                        <Col md={3}>
                            <Form.Label htmlFor="quantity">Total tax</Form.Label>
                            <Form.Control
                                type="text"
                                id="tax-value"
                                disabled
                                value={`$ ${tax || "0.00"}`}
                            />
                        </Col>
                        <Col md={3}>
                            <Form.Label htmlFor="quantity">Amount</Form.Label>
                            <Form.Control
                                type="text"
                                id="amount"
                                disabled
                                value={`$ ${amount || "0.00"}`}
                            />
                        </Col>
                    </Row>
                    <Button type={"submit"} className="mt-2" onClick={(e) => {
                        e.preventDefault();
                        createSale();
                    }}>Create Sale</Button>
                </Form>
            </Container>
        </>
    )
}