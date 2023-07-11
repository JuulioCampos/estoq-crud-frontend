import { useContext, useState } from "react";
import { Container, Form, Button, Table, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { ProductTypeContext } from "../../../providers/ProductType";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export const ProductType = (props) => {
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
                `<input id="swal-input1 description-edit" type="text" placeholder="${item.description}" class="swal2-input">` +
                `<input id="swal-input2 tax-edit" type="number" value="${item.tax}" class="swal2-input">`,
            focusConfirm: false,
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
                            <Form.Label>Tax</Form.Label>
                            <Form.Control type="number" id="tax" />
                        </Col>
                    </Row>
                    <Button className="mt-2">Create</Button>
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
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>
                                    <Button className="bold" variant="black" onClick={() => handleSort("id")}>
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
                                    <Button className="bold" variant="black" onClick={() => handleSort("tax")}>
                                        Tax ↕
                                    </Button>
                                </th>
                                <th>
                                    <Button className="bold" variant="black" onClick={() => handleSort("Action")}>
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
                                            <Button className="m-1" variant="warning" onClick={() => editButton(item)}>
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
                </Container>
            </div>
        </>
    );
};
