import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import {
    NavLink
} from "react-router-dom";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {
            pseudo: '',
            lastName: '',
            firstName: '',
            email: '',
            password: ''
        }
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        const newInscription = {
            pseudo: this.state.pseudo,
            firstName: this.state.firstName,
            lastname: this.state.lastName,
            email: this.state.email,
            password: this.state.password
        }
        this.setState({
            pseudo: '',
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        })
        console.log(newInscription)
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <h3>Rejoignez-nous</h3>
                <Form.Group>
                    <Form.Control 
                        name='pseudo' 
                        type="name" 
                        placeholder="Pseudo *" 
                        value={this.state.pseudo} 
                        onChange={this.handleChange} />
                    <Form.Control 
                        name='firstName' 
                        type="name" 
                        placeholder="Prénom *" 
                        value={this.state.firstName} 
                        onChange={this.handleChange} />
                    <Form.Control 
                        name='lastName' 
                        type="name" 
                        placeholder="Nom *" 
                        value={this.state.lastName} 
                        onChange={this.handleChange} />
                    <Form.Control 
                        name='email' 
                        type="email" 
                        placeholder="E-mail *" 
                        value={this.state.email} 
                        onChange={this.handleChange} />
                    <Form.Control 
                        name='password' 
                        type="password" 
                        placeholder="Password *" 
                        value={this.state.password} 
                        onChange={this.handleChange} />
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