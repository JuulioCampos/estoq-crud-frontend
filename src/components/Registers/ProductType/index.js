import { useContext } from "react";
import { Container, Form, Button, Table, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";
import { ProductTypeContext } from "../../../providers/ProductType";

export const ProductType = (props) => {
    const { productType, setProductType } = useContext(ProductTypeContext);

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
              `<input id="swal-input1 description-edit" type="text" placeholder="${item.description}" class="swal2-input">` +
              `<input id="swal-input2 tax-edit" type="number" value="${item.tax}" class="swal2-input">`,
            focusConfirm: false,
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
                            <Form.Control
                                type="number"
                                id="tax"
                            />
                        </Col>
                    </Row>
                    <Button className="mt-2">Create</Button>
                </Form>
            </Container>
            <hr className="mt-5" />
            <h2 className="text-center">Your Product Types</h2>
            <div className="table-product-type-list">
                <Container>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id.</th>
                                <th>Description</th>
                                <th>Tax</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                productType.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.description}</td>
                                            <td>{item.tax}</td>
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