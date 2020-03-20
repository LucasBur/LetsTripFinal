import React from 'react';
import Register from './Forms/Inscription/Register';
import Login from './Forms/Login/Login';
import RoadmapLogin from './Forms/RoadmapLogin/RoadmapLogin'
import '../styles/Homepage_style.css'

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.registerForm = this.registerForm.bind(this)
        this.state = {
            showRegister: false,
        }
    }

    registerForm() {
        this.setState({
            showRegister: !this.state.showRegister
        })
    }

    showFormRegister() {
        if (this.state.showRegister === false) {
            return (
                <div className="homepage-login-forms">
                    <RoadmapLogin />
                    <Login registerForm={this.registerForm}/>
                </div>
            )
        }
        else {
            return <Register registerFormProps={this.registerForm} />
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

                    {this.showFormRegister()}

                </div>
            </div>
        )
    }
}

export default Homepage;