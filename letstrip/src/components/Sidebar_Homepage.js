import React, { Component } from 'react';
import Register from './Forms/Inscription/Register';
import RoadmapLogin from './Forms/RoadmapLogin/RoadmapLogin'
import Login from './Forms/Login/Login';
import '../styles/Sidebar_Homepage_style.css'

class Sidebar_Homepage extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef()
        this.openProfileSetting = this.openProfileSetting.bind(this);
        this.registerForm = this.registerForm.bind(this)
        this.state = {
            showRegister: false,
        }
    }

    registerForm() {
        this.setState((prevState, props) => {
            return {showRegister: !prevState.showRegister}
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
                    <button className="right-nav__icon" type="menu-fold" onClick={() => this.handleClick()}> ></button>
                    <div className="right-nav__body">
                        <h1>Let's Trip</h1>
                        {/* <img src={onizukadauphin} width='100%' alt='onizukadauphin' /> */}
                        <h4>Welcome motherfucker</h4>

                        {this.showFormRegister()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar_Homepage;


