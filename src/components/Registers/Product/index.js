import { useContext, useState } from "react";
import { Container, Form, Button, Table, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { ProductContext } from "../../../providers/Product";
import { ProductTypeContext } from "../../../providers/ProductType";

export const Product = (props) => {
    const { product, setProduct } = useContext(ProductContext);
    const { productType, setProductType } = useContext(ProductTypeContext);
    const [searchText, setSearchText] = useState("");
    const [sortConfig, setSortConfig] = useState({ column: null, direction: "asc" });

    const confirmButton = (item) => {
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
                Swal.fire(`${item.description} was deleted`, "With Success!", "success");
            }
        });
    };

    const editButton = async (item) => {
        const { value: formValues } = await Swal.fire({
            title: "Change Product Type",
            html:
                `<input style="margin: 10px;" id="swal-input1 description-edit" type="text" placeholder="${item.product}" class="swal2-input">` +
                `<input style="margin: 10px;" id="swal-input2 description-edit" type="number" value="${item.price}" class="swal2-input">` +
                `<select style="width: 88%;height: 2.625em;padding: 10px 0; border-radius: 4px; border: 2px solid lightblue;" id="swal-input3"  class="swal2-input">` +

                productType &&
                productType.map((product, index) => {
                    return (
                        `<option value="${product.id}" key="${index}" ${product.id === item.product_type_id ? "selected" : ""
                        }>${product.description}</option>`
                    );
                }) +
                `</select>`,
            focusConfirm: false,
            confirmButtonText: "Yes, change it!",
            showCancelButton: true,
            cancelButtonColor: "#d33",
            preConfirm: () => {
                return [
                    document.getElementById("swal-input1").value,
                    document.getElementById("swal-input2").value,
                ];
            },
        });

        if (formValues) {
            Swal.fire(JSON.stringify(formValues));
        }
    };

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
                        <Col md={8}>
                            <Form.Group className="mb-3" controlId="formProductType">
                                <Form.Label>Product</Form.Label>
                                <Form.Control type="text" placeholder="Product name" />
                            </Form.Group>
                        </Col>
                        <Col md={4}>
                            <Form.Label>Product Type</Form.Label>
                            <Form.Select aria-label="Default select example">
                                <option hidden>Select type</option>
                                {productType &&
                                    productType.map((item, index) => {
                                        return (
                                            <option value={item.id} key={item.id}>
                                                {item.description}
                                            </option>
                                        );
                                    })}
                                <option value="2">Two</option>
                            </Form.Select>
                        </Col>
                    </Row>
                    <Button className="mt-2">Create</Button>
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
                </Container>
            </div >
        </>
    );
};
