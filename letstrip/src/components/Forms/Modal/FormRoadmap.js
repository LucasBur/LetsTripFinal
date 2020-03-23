import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'

export const FormRoadmap = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return <>
        <Button style={{ background: '#6666ff', border:'none' }} onFocus='none' onClick={handleShow}>
            Nouvelle Roadmap
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Créer votre Roadmap</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formGridName1">
                        <Form.Label>Nom</Form.Label>
                        <Form.Control placeholder="Asia Roadtrip" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Nombres de Participants</Form.Label>
                        {/* <input type='number' min='1'/> */}
                        <Form.Control size="sm" type='number' min='1' />
                    </Form.Group>

                    <Form.Group controlId="formGridDate2">
                        <Form.Label>Date de départ</Form.Label>
                        <Form.Control type='datetime-local'></Form.Control>
                        <Form.Label>Date de fin</Form.Label>
                        <Form.Control type='datetime-local'></Form.Control>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Pays de destination</Form.Label>
                            <Form.Control size="sm" />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridBudget">
                            <Form.Label>Budget</Form.Label>
                                <Form.Control size="sm" type='number' min='1' placeholder='1500€'/>
                        </Form.Group>
                    </Form.Row>

                    <Button variant="primary" type="submit" onClick={handleClose}>
                        Submit
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    </>
}