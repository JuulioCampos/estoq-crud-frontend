import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap"
import Swal from "sweetalert2";

export const RegisterSale = (props) => {

    const products = [
        {
            id: 1,
            product: "Cano PVC",
            price: "21.2",
            product_type: "Cano",
            product_type_id: 1,
        },
        {
            id: 2,
            price: "25.52",
            product: "Televisão",
            product_type: "Eletronico",
            product_type_id: 2,
        },
        {
            id: 3,
            price: "31.01",
            product: "Mesa",
            product_type: "Alvenaria",
            product_type_id: 5,
        },
        {
            id: 4,
            price: "212.2",
            product: "Banana",
            product_type: "Alimento",
            product_type_id: 7,
        }
    ]

    const productTypes = [
        {
            id: 1,
            description: "Cano",
            tax: "1.2",
        },
        {
            id: 2,
            description: "Eletronico",
            tax: "1.2",
        },
        {
            id: 5,
            description: "Alvenaria",
            tax: "1.1",
        },
        {
            id: 7,
            description: "Alimento",
            tax: "1.5",
        }
    ]
    const [productId, setProductId] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(0);

    const calculateTotal = () => {
        if (productId === null || quantity === null) return;
        const productPrice = products.find(item => parseInt(item.id) === parseInt(productId));
        const productType = productTypes.find(item => parseInt(item.id) === parseInt(productId));
        const total = (productPrice.price * quantity) * productType.tax;
        setTotal(total.toFixed(2));
    }
    const createSale = () => {
        calculateTotal();

        if (productId === null || quantity === null || total === null) {
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
                        <Col md={4}>
                            <Form.Label htmlFor="quantity">Choose a Product</Form.Label>
                            <Form.Select aria-label="Select Product" id={"product"} onChange={
                                (e) => {
                                    setProductId(e.target.value)
                                    calculateTotal()
                                }
                            } required>
                                <option hidden>Select Here</option>
                                {products.map(item => (
                                    <option key={item.id} value={item.id}>{item.product} </option>
                                ))}
                            </Form.Select>
                        </Col>
                        <Col md={3}>
                            <Form.Label htmlFor="quantity">Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                id="quantity"
                                placeholder="1"
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
                            <Form.Label htmlFor="quantity">Total with tax</Form.Label>
                            <Form.Control
                                type="text"
                                id="quantity"
                                disabled
                                value={`$ ${total || "0.00"}`}
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