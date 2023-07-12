import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export const ModalForm = (props) => {
  const [formValues, setFormValues] = useState({});
  const [showModal, setShowModal] = useState(true); // Estado para controlar a exibição do modal

  const handleChange = (event, id) => {
    const { value } = event.target;
    setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  const handleSave = () => {
    props.onSave(formValues);
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Row>
            {props.data.map((field) => (
              <React.Fragment key={field.id}>
                <Col>
                  <Form.Label htmlFor={field.id}>{field.label}</Form.Label>
                </Col>
                <Col>
                  {field.type === 'text' ? (
                    <Form.Control
                      type="text"
                      id={field.id}
                      value={formValues[field.id] || ''}
                      onChange={(event) => handleChange(event, field.id)}
                    />
                  ) : field.type === 'number' ? (
                    <Form.Control
                      type="number"
                      id={field.id}
                      value={formValues[field.id] || ''}
                      onChange={(event) => handleChange(event, field.id)}
                    />
                  ) : field.type === 'select' ? (
                    <Form.Control
                      as="select"
                      id={field.id}
                      value={formValues[field.id] || ''}
                      onChange={(event) => handleChange(event, field.id)}
                    >
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Form.Control>
                  ) : null}
                </Col>
              </React.Fragment>
            ))}
          </Row>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleSave}>
          Save changes
        </Button>
        <Button variant="danger" onClick={handleClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
