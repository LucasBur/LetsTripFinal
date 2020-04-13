import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import auth from '../auth';
import map from '../design/icons/map.svg'
import setting from '../design/icons/setting.svg'
import disconnect from '../design/icons/disconnect.svg'
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
                <div className="nav-dashboard">
                    <button className="nav__icon" type="menu-fold" onClick={() => this.handleClick()}> ≡ </button>
                    <div className="nav__body">
                        <h3>Let's Trip</h3>
                        <ul>
                            <li style={{ listStyleImage: `url(${map})` }}> 
                                <a href='/dashboard'> Mes Roadmaps </a></li>
                            <li style={{ listStyleImage: `url(${setting})` }}> 
                                <button onClick={this.openProfileSetting}>Paramétrer mon compte</button></li>
                            <li style={{ listStyleImage: `url(${disconnect})` }} >
                                <a href='/' onClick={auth.logout}>Deconnexion</a></li>
                        </ul>

                        {this.props.sidebarSettings}
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;


