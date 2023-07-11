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
        const { value: formValues } = await Swal.fire({
            title: 'Change Product Type',
            html:
                `<input style="margin: 10px;" id="swal-input1 description-edit" type="text" placeholder="${item.product}" class="swal2-input">` +
                `<input style="margin: 10px;" id="swal-input2 description-edit" type="number" value="${item.price}" class="swal2-input">` +
                `<select style="width: 88%;height: 2.625em;padding: 10px 0; border-radius: 4px; border: 2px solid lightblue;" id="swal-input3"  class="swal2-input">` +

                productTypeMock.map((product, index) => {
                    return (
                        `<option value="${product.id}" key="${index}" ${product.id === item.product_type_id ? "selected" : ""}>${product.description}</option>`
                    )
                }) +
                `</select>`
            ,
            focusConfirm: false,
            confirmButtonText: 'Yes, change it!',
            showCancelButton: true,

            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
            }
        })

        if (formValues) {
            Swal.fire(JSON.stringify(formValues))
        }
    }
    const productsMock = [
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
            product_type_id: 3,
        },
        {
            id: 4,
            price: "212.2",
            product: "Banana",
            product_type: "Alimento",
            product_type_id: 4,
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
                                <th>Price</th>
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
                                            <td>${item.price}</td>
                                            <td>{item.product_type}</td>
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