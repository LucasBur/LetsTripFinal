import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import {
    NavLink
} from "react-router-dom";

class Register extends React.Component {
    render() {
        return (
            <Form>
                <h3>Rejoignez-nous</h3>
                <Form.Group>
                    <Form.Control type="name" placeholder="Pseudo *" />
                    <Form.Control type="name" placeholder="Prénom *" />
                    <Form.Control type="name" placeholder="Nom *" />
                    <Form.Control type="email" placeholder="E-mail *" />
                    <Form.Control type="password" placeholder="Password *" />
                </Form.Group>


                <Button variant="primary" type="submit">
                    Inscription
                </Button>

                <NavLink to='/'>Vous êtes déjà membre ?</NavLink>
            </Form>
        )
    }
}

export default Register;