import { useContext, useState } from "react";
import { Container, Form, Button, Table, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { ProductTypeContext } from "../../../providers/ProductType";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const ProductType = (props) => {
    const { productType } = useContext(ProductTypeContext)
    const [searchText, setSearchText] = useState("")
    const [description, setDescription] = useState(undefined)
    const [tax, setTax] = useState(0)
    const [sortConfig, setSortConfig] = useState({ column: null, direction: "asc" })

    const createProductType = () => {
        if (description === undefined || description === "" || tax < 0) return

        const json = {
            tax: tax,
            description: description
        }

        fetch("http://localhost:8080/api/product-type", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        })
            .then(response => response.json())
            .then(result => {
                Swal.fire({
                    title: "Product Type created!",
                    text: "With Success!",
                    icon: "success",
                    confirmButtonText: "Ok",
                }).then(() => {
                    window.location.reload()
                })
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }

    const confirmButton = ($item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8080/api/product-type/${$item.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(response => response.json())
                    .then(result => {
                        if (result.status) {
                            return Swal.fire(`${$item.description} was deleted`, "With Success!", "success")
                                .then(() => {
                                    window.location.reload()
                                })
                        }
                        Swal.fire(`${$item.description} can not be removed`, "delete other files associate", "fail")
                    })
                    .catch(error => {
                        Swal.fire(`${$item.description} can not be removed`, "delete other files associate", "fail")
                    })
            }
        })
    };

    const editButton = async ($item) => {
        const { value: formValues } = await Swal.fire({
            title: "Change Product Type",
            html:
                `<input id="swal-input1" type="text" placeholder="${$item.description}" class="description-edit swal2-input">` +
                `<input id="swal-input2" type="number" value="${$item.tax}" class="tax-edit swal2-input">`,
            focusConfirm: false,
            showCancelButton: true,
            cancelButtonColor: "#d33",
            preConfirm: () => {
                return {
                    description: document.getElementById("swal-input1").value,
                    tax: document.getElementById("swal-input2").value,
                };
            },
        })

        if (formValues) {
            fetch(`http://localhost:8080/api/product-type/${$item.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            })
                .then(response => response.json())
                .then(result => {
                    console.log(result.status === true)
                    if (result.status === true) {
                        return Swal.fire({
                            title: "Product Type updated!",
                            text: "With Success!",
                            icon: "success",
                            confirmButtonText: "Ok",
                        }).then(() => {
                            window.location.reload()
                        })
                    }
                    Swal.fire({
                        title: "Something went wrong!",
                        text: "verify the data and try again!",
                        icon: "error",
                        confirmButtonText: "Ok",
                    })

                })
                .catch(error => {
                    console.error('Error:', error)
                })
        }
    };

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

    const sortedProductType = productType
        ? [...productType].sort((a, b) => {
            if (sortConfig.column) {
                const keyA = a[sortConfig.column];
                const keyB = b[sortConfig.column];
                if (keyA < keyB) return sortConfig.direction === "asc" ? -1 : 1;
                if (keyA > keyB) return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        })
        : [];

    const filteredProductType = sortedProductType.filter((item) =>
        item.description.toLowerCase().includes(searchText.toLowerCase())
    )

    return (
        <>
            <Container>
                <Form>
                    <Row>
                        <Col md={8}>
                            <Form.Group className="mb-3" controlId="formProductType">
                                <Form.Label>Description Product type</Form.Label>
                                <Form.Control onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Product type description here" required />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Label>Tax</Form.Label>
                            <Form.Control onChange={(e) => setTax(e.target.value)} type="number" id="tax" required />
                        </Col>
                    </Row>
                    <Button className="mt-2" onClick={() => createProductType()}>Create</Button>
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
                                            onClick={() => handleSort("description")}
                                        >
                                            Description ↕
                                        </Button>
                                    </th>
                                    <th>
                                        <Button
                                            className="bold"
                                            variant="black"
                                            onClick={() => handleSort("tax")}
                                        >
                                            Tax ↕
                                        </Button>
                                    </th>
                                    <th>
                                        <Button
                                            className="bold"
                                            variant="black"
                                            onClick={() => handleSort("Action")}
                                        >
                                            Action
                                        </Button>
                                    </th>
                                </tr>
                            </thead>
                            <TransitionGroup component="tbody">
                                {filteredProductType.map((item, index) => (
                                    <CSSTransition key={index} classNames="fade" timeout={500}>
                                        <tr>
                                            <td>{item.id}</td>
                                            <td>{item.description}</td>
                                            <td>{item.tax}</td>
                                            <td>
                                                <Button
                                                    className="m-1"
                                                    variant="warning"
                                                    onClick={() => editButton(item)}
                                                >
                                                    Edit
                                                </Button>
                                                <Button
                                                    className="m-1"
                                                    variant="danger"
                                                    onClick={() => confirmButton(item)}
                                                >
                                                    Delete
                                                </Button>
                                            </td>
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
};
