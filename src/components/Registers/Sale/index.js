import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap"
import Swal from "sweetalert2";
import { ProductTypeContext } from "../../../providers/ProductType";
import { ProductContext } from "../../../providers/Product";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const RegisterSale = (props) => {
    const { product } = useContext(ProductContext)
    const { productType } = useContext(ProductTypeContext)

    const products = product;
    const productTypes = productType;
    const [productId, setProductId] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [amount, setAmount] = useState(0)
    const [tax, setTax] = useState(0)
    const [searchText, setSearchText] = useState("")
    const [sortConfig, setSortConfig] = useState({ column: null, direction: "asc" })
    const [salesList, setSalesList] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/sales')
                const json = await response.json()
                setSalesList(json)
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                })
            }
        };

        fetchData()
    }, [])

    const calculateTotal = () => {
        if (productId === null || quantity === null) return;
        const productPrice = products.find(item => parseInt(item.id) === parseInt(productId))
        const productType = productTypes.find(item => parseInt(item.id) === parseInt(productId))
        const taxPay = (productPrice.price * quantity) * productType.tax;
        const amount = (productPrice.price * quantity) + taxPay;
        setTax(taxPay.toFixed(2))
        setAmount(amount.toFixed(2))
    }

    const createSale = () => {
        calculateTotal()

        if (productId === null || quantity === null || amount === null) {
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'You must fill all the fields!',
            })
        }
        const json = {
            product_id: productId,
            amount: amount,
            quantity: quantity
        }

        fetch("http://localhost:8080/api/sales", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        })
            .then(response => response.json())
            .then(result => {
                if (result.status) {
                    return Swal.fire({
                        icon: 'success',
                        title: 'Wooow!',
                        text: 'Sale created with success!',
                    }).then(() => {
                        window.location.reload()
                    })
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Wooow!',
                    text: 'Sale created with success!',
                })

            })
            .catch(error => {
                console.error('Error:', error)
            })
    }
    const handleSearchChange = (e) => {
        const value = e.target.value || "";
        setSearchText(value)
    };

    const handleSort = (column) => {
        setSortConfig((prevSortConfig) => {
            if (prevSortConfig.column === column && prevSortConfig.direction === "asc") {
                return { column, direction: "desc" };
            }
            return { column, direction: "asc" };
        })
    };
    console.log(product)
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
                                {product && product.map(item => (
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
                            <Form.Label htmlFor="tax-value">Total tax</Form.Label>
                            <Form.Control
                                type="text"
                                id="tax-value"
                                disabled
                                value={`$ ${tax || "0.00"}`}
                            />
                        </Col>
                        <Col md={3}>
                            <Form.Label htmlFor="amount">Amount</Form.Label>
                            <Form.Control
                                type="text"
                                id="amount"
                                disabled
                                value={`$ ${amount || "0.00"}`}
                            />
                        </Col>
                    </Row>
                    <Button type={"submit"} className="mt-2" onClick={(e) => {
                        e.preventDefault()
                        createSale()
                    }}>Create Sale</Button>
                </Form>
            </Container>

            <hr className="mt-5" />
            <h2 className="text-center">Your Product Types</h2>
            <div className="table-product-type-list">
                <Container>
                    <Form>
                        <Form.Group className="mb-3" controlId="formSearch">
                            <Form.Control
                                type="text"
                                placeholder="Search by description"
                                value={searchText}
                                onChange={handleSearchChange}
                            />
                        </Form.Group>
                    </Form>
                    <div className="table-responsive">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>
                                        <Button
                                            className="bold"
                                            variant="black"
                                            onClick={() => handleSort("id")}
                                        >
                                            id ↕
                                        </Button>
                                    </th>
                                    <th>
                                        <Button
                                            className="bold"
                                            variant="black"
                                            onClick={() => handleSort("product")}
                                        >
                                            Product ↕
                                        </Button>
                                    </th>
                                    <th>
                                        <Button
                                            className="bold"
                                            variant="black"
                                            onClick={() => handleSort("quantity")}
                                        >
                                            Quantity ↕
                                        </Button>
                                    </th>
                                    <th>
                                        <Button
                                            className="bold"
                                            variant="black"
                                            onClick={() => handleSort("amount")}
                                        >
                                            Amount ↕
                                        </Button>
                                    </th>
                                </tr>
                            </thead>
                            <TransitionGroup component="tbody">
                                {salesList && salesList.map((item, index) => (
                                    <CSSTransition key={index} classNames="fade" timeout={500}>
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.product}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.amount}</td>
                                        </tr>
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        </Table>
                    </div>
                </Container>
            </div>
        </>
    )
}