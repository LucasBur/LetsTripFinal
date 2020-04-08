import React, { Component } from 'react';
import Register from './Forms/Inscription/Register';
import RoadmapLogin from './Forms/RoadmapLogin/RoadmapLogin'
import Login from './Forms/Login/Login';
import Nav from 'react-bootstrap/Nav'
import '../styles/Sidebar_Homepage_style.css'

class SidebarHomepage extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef()
        this.openProfileSetting = this.openProfileSetting.bind(this);
        this.connexion = this.connexion.bind(this)
        this.signup = this.signup.bind(this)
        this.state = {
            showRegister: false,
            showConnexion: true,
        }
    }

    connexion() {
        this.setState((prevState, props) => {
            return {
                showConnexion: true,
                showRegister: false
            }
        })
    }

    signup() {
        this.setState((prevState, props) => {
            return {
                showRegister: true,
                showConnexion: false
            }
        })
    }

    showForm() {
        if (this.state.showConnexion === true) {
            return (
                <div>
                    <h3 style={{ textAlign: 'center', marginTop:'50px' }}>Organiser vos voyages</h3>
                    <div className="homepage-login-forms">

                        <RoadmapLogin />
                        <Login />
                    </div>

                </div>
            )
        } else {
            return <Register />
        }
    }

    handleClick() {
        const wrapper = this.wrapperRef.current;
        wrapper.classList.toggle('right-is-nav-open');
    }

    openProfileSetting() {
        window.location = `/profile/${this.state.userId}`
    }

    render() {
        return (
            <div ref={this.wrapperRef} className="right-wrapper right-is-nav-open" >
                <div className="right-nav">
                    <button
                        className="right-nav__icon"
                        type="menu-fold"
                        onClick={() => this.handleClick()}> ></button>
                    <div className="right-nav__body">
                        <Nav fill variant="tabs" defaultActiveKey="/home">
                            <Nav.Item>
                                <Nav.Link
                                    style={{ color: "#6666ff" }}
                                    onClick={this.connexion}
                                    href="#">Connexion </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    style={{ color: "#6666ff" }}
                                    onClick={this.signup}
                                    eventKey="link-1">Inscription</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <h2 style={{
                            textAlign:'center',
                            marginTop:'30px'
                        }}>Let's Trip</h2>
                        {this.showForm()}
                    </div>
                </div>
            </div>
        );
    }
}

export default SidebarHomepage;


