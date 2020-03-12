import React from 'react';
import Register from './Inscription/Register';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import connect from '../design/icons/lock-solid.svg';
import map from '../design/icons/map-marked-alt-solid.svg';
import {
    Route,
    NavLink
} from "react-router-dom";
import '../styles/Homepage_style.css'

const HPForm = props => {
    return (
        <Form>
            <h3>{props.titleH3} <img src={props.logo} width="30" height='30'></img> </h3>
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
            {props.ifRegistering ? <NavLink to='/register'>créez un compte</NavLink> : null}
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
                    <article>
                        <h3>Organiser votre voyage facilement <br />
                            en groupe ou seul tout <br /> no stress ma gueule</h3>

                        <p>Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500,
                                quand un imprimeur anonyme assembla <br /> ensemble des morceaux de texte pour réaliser
                                un livre spécimen de polices de texte.</p>
                    </article>
                    </header>


                    <div className="homepage-forms">
                        
                            <Route exact path='/'>
                                <HPForm
                                    logo={map}
                                    titleH3='Rejoindre une Roadmap'
                                    formLabelName="Nom de la Roadmap"
                                    formLabelPw='Mot de passe de la Roadmap'
                                    typeForm='nameRoadmap'
                                    typePassword='passwordRoadmap'
                                    ifRegistering={this.state.registering(false)}
                                />

                                <HPForm
                                    logo={connect}
                                    titleH3='Connectez-vous'
                                    formLabelName="E-mail"
                                    formLabelPw='Mot de passe'
                                    typeForm='email'
                                    typePassword='password'
                                    ifRegistering={this.state.registering(true)}
                                />
                            </Route>

                            <Route path="/register" component={Register} />

                    </div>
                </div>
            </div>
        )
    }
}

export default Homepage;