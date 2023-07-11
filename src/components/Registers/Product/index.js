import { Container, Form, Button, Table, Col, Row } from "react-bootstrap";
import Swal from "sweetalert2";

export const Product = (props) => {
    const confirmButton = (item) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    `${item.description} was deleted`,
                    'With Success!',
                    'success'
                )
            }
        })
    }
    const editButton = async (item) => {
        const { value: description } = await Swal.fire({
            input: 'text',
            inputLabel: `Change description "${item.description}"`,
            inputPlaceholder: "New description",
            confirmButtonText: 'Update description!'
        })

        if (description) {
            Swal.fire(`Entered description: ${description}`)
        }
    }
    const productsMock = [
        {
            id: 1,
            product: "amanco amanco",
            productType: "cano",
        },
        {
            id: 2,
            product: "Televisão",
            productType: "Eletronico",
        },
        {
            id: 3,
            product: "Mesa",
            productType: "Alvenaria",
        },
        {
            id: 4,
            product: "Banana",
            productType: "Alimento",
        }
    ]
    // eslint-disable-next-line no-unused-vars
    const productTypeMock = [
        {
            id: 1,
            description: "cano",
        },
        {
            id: 2,
            description: "Eletronico",
        },
        {
            id: 5,
            description: "Alvenaria",
        },
        {
            id: 7,
            description: "Alimento",
        }
    ]


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
                                {productTypeMock.map((item, index) => {
                                    return (
                                        <option value={item.id} key={item.id}>{item.description}</option>
                                    )
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
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id.</th>
                                <th>Product</th>
                                <th>Type</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                productsMock.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.product}</td>
                                            <td>{item.productType}</td>
                                            <td>
                                                <Button className="m-1" variant="warning" onClick={() => editButton(item)}>Edit</Button>
                                                <Button className="m-1" variant="danger" onClick={() => confirmButton(item)}>Delete</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </Container>
            </div>
        </>
    );
}