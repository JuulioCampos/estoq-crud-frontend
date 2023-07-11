import { Tabs, Tab, Container, Form, Button } from "react-bootstrap";

export const ProductType = (props) => {
    return (
        <Tabs
            defaultActiveKey="productType"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
        >
            <Tab eventKey="productType" title="Product Type">
                <Container>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Product Type</Form.Label>
                            <Form.Control type="text" placeholder="Description" />
                        </Form.Group>
                        <Button>Create</Button>
                    </Form>
                </Container>
                <br />
                <br />
                <hr />
                <h2 className="text-center">Your Product Types</h2>
            </Tab>
            <Tab eventKey="products" title="Products">
                Tab content for Profile
            </Tab>
            <Tab eventKey="percents-price" title="Percents/Price">
                Tab content for Contact
            </Tab>
        </Tabs>
    );
}