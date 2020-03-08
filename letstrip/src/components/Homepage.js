import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import '../styles/Homepage_style.css'

class Homepage extends React.Component {
    render() {
        return (
            <div className='homepage'>
                <div>
                    <header>
                        <h1>Let's Trip</h1>
                    </header>

                    <article>
                        <h3>Le Lorem Ipsum est simplement du faux texte <br />
                            employé dans la composition et la mise en page <br /> avant impression.</h3>

                            <p>Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, 
                                quand un imprimeur anonyme assembla <br/> ensemble des morceaux de texte pour réaliser 
                                un livre spécimen de polices de texte.</p>
                    </article>

                    <div className="homepage-forms">
                        <Form>
                            <h3>Rejoindre une Roadmap</h3>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Nom de la Roadmap</Form.Label>
                                <Form.Control 
                                    style={{backgroundColor: '#ECECEC'}}
                                    type="nameRoadmap"/>

                                <Form.Label>Mot de passe de la Roadmap</Form.Label>
                                <Form.Control
                                    style={{backgroundColor: '#ECECEC'}}
                                    type="passwordRoadmap"/>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Valider
                            </Button>
                        </Form>
                        
                        <Form>
                            <h3>Connectez-vous</h3>
                            <Form.Group controlId="formBasicEmail"> 
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control 
                                    style={{backgroundColor: '#ECECEC'}}
                                    type="nameRoadmap" />

                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control 
                                    style={{backgroundColor: '#ECECEC'}}
                                    type="password"/>
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Valider
                            </Button>
                            <a href='/'>créez un compte</a>
                        </Form>
                    </div>
                </div>

            </div>
        )
    }
}

export default Homepage;