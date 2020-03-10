import React from 'react';
import Register from './Inscription/Register';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink
} from "react-router-dom";
import '../styles/Homepage_style.css'

const HPForm = props => {
    return (
        <Form>
            <h3>{props.titleH3}</h3>
            <Form.Group>
                <Form.Label className='formLabel'>{props.formLabelName}</Form.Label>
                <Form.Control
                    style={{ backgroundColor: '#ECECEC' }}
                    type={props.typeForm} />

                <Form.Label className='formLabel'>{props.formLabelPw}</Form.Label>
                <Form.Control
                    style={{ backgroundColor: '#ECECEC' }}
                    type="passwordRoadmap" />
            </Form.Group>

            <Button variant="primary" type="submit">
                Valider
            </Button>
            {props.ifRegistering ? <NavLink to='/register'>créez un compte</NavLink> : <div></div>}
        </Form>
    )
}

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registering: Boolean
        }
    }
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
                                quand un imprimeur anonyme assembla <br /> ensemble des morceaux de texte pour réaliser
                                un livre spécimen de polices de texte.</p>
                    </article>

                    <div className="homepage-forms">
                        
                            <Route exact path='/'>
                                <HPForm
                                    titleH3='Rejoindre une Roadmap'
                                    formLabelName="Nom de la Roadmap"
                                    formLabelPw='Mot de passe de la Roadmap'
                                    typeForm='nameRoadmap'
                                    typePassword='passwordRoadmap'
                                    ifRegistering={this.state.registering(false)}
                                />

                                <HPForm
                                    titleH3='Connectez-vous'
                                    formLabelName="E-mail"
                                    formLabelPw='Mot de passe'
                                    typeForm='email'
                                    typePassword='password'
                                    ifRegistering={this.state.registering(true)}
                                />
                            </Route>

                            <Route path="/register" component={Register}>

                            </Route>

                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage;