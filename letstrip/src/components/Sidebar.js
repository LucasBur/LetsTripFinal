import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import auth from '../auth';
import map from '../design/icons/map.svg'
import contact from '../design/icons/contact.svg'
import setting from '../design/icons/setting.svg'
import disconnect from '../design/icons/disconnect.svg'
import onizukadauphin from '../design/wallpaper/onizukadauphin.jpg'
import '../styles/Sidebar_style.css'

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef()
        this.openProfileSetting = this.openProfileSetting.bind(this);
        this.state = {
            userId: '',
            userFirst_name: '',
            userLast_name: '',
            userPseudo: '',
            userEmail: ''
        };
    }

    handleClick() {
        const wrapper = this.wrapperRef.current;
        wrapper.classList.toggle('is-nav-open');
    }

    componentWillMount() {
        const token = localStorage.token;
        const decoded = jwt_decode(token);
        this.setState({
            userId: decoded.id,
            userFirst_name: decoded.firstname,
            userLast_name: decoded.lastname,
            userPseudo: decoded.pseudo,
            userEmail: decoded.email,
        });
    }

    openProfileSetting() {
        window.location=`/profile/${this.state.userId}`
    }

    render() {
        return (
            <div ref={this.wrapperRef} className="wrapper is-nav-open" >
                <div className="nav">
                    <button className="nav__icon" type="menu-fold" onClick={() => this.handleClick()}> ></button>
                    <div className="nav__body">
                        <h1>Let's Trip</h1>
                        <img src={onizukadauphin} width='100%' alt='onizukadauphin' />
                        <h4>{this.state.userPseudo}</h4>
                        <ul>
                            <li style={{ listStyleImage: `url(${map})` }}> 
                                <a href='/dashboard'> Mes RoadMaps </a></li>
                            <li style={{ listStyleImage: `url(${setting})` }}> 
                                <button onClick={this.openProfileSetting}>Paramétrer mon compte</button></li>
                            <li style={{ listStyleImage: `url(${contact})` }}>
                                <a href='/dashboard'>Contact</a> </li>
                            <li style={{ listStyleImage: `url(${disconnect})` }} >
                                <a href='/' onClick={auth.logout}>Deconnexion</a></li>
                        </ul>

                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;


