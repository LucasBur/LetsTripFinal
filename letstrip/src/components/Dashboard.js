import React, { useState } from 'react';
import jwt_decode from 'jwt-decode'
import Sidebar from './Sidebar';
import RoadMapCard from './RoadMapCard';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import '../styles/Dashboard_style.css'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            pseudo: '',
            errors: {}
        };
    };

    componentDidMount() {
        const token = localStorage.token;
        const decoded = jwt_decode(token);
        this.setState({
            first_name: decoded.firstname,
            last_name: decoded.lastname,
            pseudo: decoded.pseudo,
            email: decoded.email
        });
        console.log(decoded);
    }

    render() {
        const ModalForm = () => {
            const [show, setShow] = useState(false);
            const handleClose = () => setShow(false);
            const handleShow = () => setShow(true);
            return <>
                <Button variant="primary" onClick={handleShow}>
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
                                    <Form.Control size="sm" type='number' min='1'/>
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
        return (
            <div className='dashboard'>
                <Sidebar pseudo={this.state.pseudo} />

                <ul style={{ marginTop: '50px', marginLeft: '50px', width: '100%' }}>
                    <ModalForm />
                    <li><RoadMapCard /></li>
                    <li><RoadMapCard /></li>
                    <li><RoadMapCard /></li>
                </ul>
            </div>
        );
    };
};

export default Dashboard;
