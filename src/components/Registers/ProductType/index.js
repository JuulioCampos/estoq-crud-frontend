import { Container, Form, Button, Table } from "react-bootstrap";
import Swal from "sweetalert2";

export const ProductType = (props) => {
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
    const mock = [
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
                    <Form.Group className="mb-3" controlId="formProductType">
                        <Form.Label>Product Type</Form.Label>
                        <Form.Control type="text" placeholder="Description" />
                    </Form.Group>
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
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                mock.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{item.id}</td>
                                            <td>{item.description}</td>
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