import React, { Component, useState } from 'react';
import auth from '../auth';
import map from '../design/icons/map.svg'
import contact from '../design/icons/contact.svg'
import setting from '../design/icons/setting.svg'
import '../styles/Sidebar_styles.css'

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef()
    }

    handleClick() {
        const wrapper = this.wrapperRef.current;
        wrapper.classList.toggle('is-nav-open');
    }

    render() {
        return (
            <div ref={this.wrapperRef} className="wrapper" >
                <div className="nav">
                    <button className="nav__icon" type="menu-fold" onClick={() => this.handleClick()}>></button>
                    <div className="nav__body">
                        <h1>Let's Trip</h1>
                        <h4>{this.props.pseudo}</h4>
                        <ul>
                            <li style={{ listStyleImage:`url(${map})` }}> <a href='/dashboard'> Mes RoadMaps </a></li>
                            <li style={{listStyleImage:`url(${setting})`}}> <a href='/dashboard'>Paramétrer mon compte</a></li>
                            <li style={{listStyleImage:`url(${contact})`}}><a href='/dashboard'>Contact</a></li>
                            <li><a href='/' onClick={auth.logout}>Deconnexion</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;


  