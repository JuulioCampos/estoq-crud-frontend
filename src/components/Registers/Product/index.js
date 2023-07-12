import { useContext, useState } from "react";
import { Container, Form, Button, Table, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { ProductContext } from "../../../providers/Product";
import { ProductTypeContext } from "../../../providers/ProductType";

export const Product = (props) => {
    const { product } = useContext(ProductContext);
    const { productType } = useContext(ProductTypeContext);
    const [searchText, setSearchText] = useState("");
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productTypeId, setProductTypeId] = useState(null);
    const [sortConfig, setSortConfig] = useState({ column: null, direction: "asc" });

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
                            return Swal.fire(`Product was deleted`, "With Success!", "success")
                                .then(() => {
                                    window.location.reload();
                                });
                        }
                        Swal.fire(`Product can not be removed`, "delete other files associate", "fail")
                    })
                    .catch(error => {
                        Swal.fire(`Product can not be removed`, "delete other files associate in Sales", "fail")
                    });
            }
        });
    };

    const editButton = async ($item) => {
        const { value: formValues } = await Swal.fire({
            title: "Change Product Type",
            html:
                `<input style="margin: 10px;" id="swal-input1" type="text" placeholder="${$item.product}" class="swal2-input">` +
                `<input style="margin: 10px;" id="swal-input2" type="number" value="${$item.price}" class="swal2-input">` +
                `<select style="width: 88%;height: 2.625em;padding: 10px 0; border-radius: 4px; border: 2px solid lightblue;" id="swal-input3"  class="swal2-input">` +
                productType.map((product, index) => {
                    return (
                        `<option value="${product.id}" key="${index}" ${product.id === $item.product_type_id ? "selected" : ""
                        }>${product.description}</option>`
                    );
                }) +
                `</select>`,
            focusConfirm: false,
            confirmButtonText: "Yes, change it!",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            preConfirm: () => {
                return {
                    product: document.getElementById("swal-input1").value,
                    price: document.getElementById("swal-input2").value,
                    product_type_id: document.getElementById("swal-input3").value,
                };
            },
        });

        if (formValues) {
            fetch(`http://localhost:8080/api/product/${$item.id}`, {
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
                            title: "Product updated!",
                            text: "With Success!",
                            icon: "success",
                            confirmButtonText: "Ok",
                        }).then(() => {
                            window.location.reload();
                        });
                    }
                    Swal.fire({
                        title: "Something went wrong!",
                        text: "verify the data and try again!",
                        icon: "error",
                        confirmButtonText: "Ok",
                    })

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    const createProduct = () => {
        if (productName === "" || productTypeId ==- null || productPrice < 0) return

        const json = {
            product: productName,
            price: productPrice,
            product_type_id: productTypeId,
        }

        fetch("http://localhost:8080/api/product", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(json),
        })
            .then(response => response.json())
            .then(result => {
                Swal.fire({
                    title: "Product created!",
                    text: "With Success!",
                    icon: "success",
                    confirmButtonText: "Ok",
                }).then(() => {
                    window.location.reload();
                });
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const handleSearchChange = (e) => {
        const value = e.target.value || "";
        setSearchText(value);
    };

    const handleSort = (column) => {
        setSortConfig((prevSortConfig) => {
            if (prevSortConfig.column === column && prevSortConfig.direction === "asc") {
                return { column, direction: "desc" };
            }
            return { column, direction: "asc" };
        });
    };

    const sortedProduct = product
        ? [...product].sort((a, b) => {
            if (sortConfig.column) {
                const keyA = a[sortConfig.column];
                const keyB = b[sortConfig.column];
                if (keyA < keyB) return sortConfig.direction === "asc" ? -1 : 1;
                if (keyA > keyB) return sortConfig.direction === "asc" ? 1 : -1;
            }
            return 0;
        })
        : [];

    const filteredProduct = sortedProduct.filter((item) =>
        item.product.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <>
            <Container>
                <Form>
                    <Row>
                        <Col md={5}>
                            <Form.Group className="mb-3" controlId="formProductType">
                                <Form.Label>Product</Form.Label>
                                <Form.Control onChange={(e) => setProductName(e.target.value)} type="text" placeholder="Product name" />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3" controlId="formProductType">
                                <Form.Label>Price</Form.Label>
                                <Form.Control onChange={(e) => setProductPrice(e.target.value)} type="number" placeholder="Price" />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Label>Product Type</Form.Label>
                            <Form.Select onChange={(e) => setProductTypeId(e.target.value)}>
                                <option hidden>Select type</option>
                                {productType &&
                                    productType.map((item, index) => {
                                        return (
                                            <option value={item.id} key={item.id}>
                                                {item.description}
                                            </option>
                                        );
                                    })}
                            </Form.Select>
                        </Col>
                    </Row>
                    <Button onClick={(e) => {
                        e.preventDefault()
                        createProduct();
                    }} className="mt-2">Create</Button>
                </Form>
            </Container>
            <hr className="mt-5" />
            <h2 className="text-center">Your Product List</h2>
            <div className="table-product-type-list">
                <Container>
                    <Form>
                        <Form.Group className="mb-3" controlId="formSearch">
                            <Form.Control
                                type="text"
                                placeholder="Search by product"
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
                                        <Button className="bold" variant="black" onClick={() => handleSort("id")}>
                                            Id. ↕
                                        </Button>
                                    </th>
                                    <th>
                                        <Button className="bold" variant="black" onClick={() => handleSort("product")}>
                                            Product ↕
                                        </Button>
                                    </th>
                                    <th>
                                        <Button className="bold" variant="black" onClick={() => handleSort("price")}>
                                            Price ↕
                                        </Button>
                                    </th>
                                    <th>
                                        <Button className="bold" variant="black" onClick={() => handleSort("type")}>
                                            Type ↕
                                        </Button>
                                    </th>
                                    <th>
                                        <Button className="bold" variant="black" onClick={() => handleSort("action")}>
                                            Action
                                        </Button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProduct.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.product}</td>
                                        <td>${item.price}</td>
                                        <td>{item.description}</td>
                                        <td>
                                            <Button className="m-1" variant="warning" onClick={() => editButton(item)}>
                                                Edit
                                            </Button>
                                            <Button className="m-1" variant="danger" onClick={() => confirmButton(item)}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Container>
            </div >
        </>
    );
};
