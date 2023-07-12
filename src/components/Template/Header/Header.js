import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export const Header = (props) => {
        return (
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">Test simple crud</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link className={props.location.includes("register-product") ? "bold": ""} href="/register-product/product-type">{props.location.includes("register-product") ? '[Product registration]': "Product registration"} </Nav.Link>
                            <Nav.Link className={props.location === "/register-sale" ? "bold": ""} href="/register-sale">{props.location === "/register-sale" ? "[Register sale]": "Register sale"}</Nav.Link>
                            <Nav.Link className={props.location === "/sales" ? "bold": ""} href="/sales">{props.location === "/sales" ? "[Sales]": "Sales"}</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }