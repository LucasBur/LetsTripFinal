import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import auth from '../auth';
import '../styles/Sidebar_style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRoute, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef()
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

    render() {
        return (
            <div ref={this.wrapperRef} className="wrapper is-nav-open" >
                <div className="nav-dashboard">
                    <button className="nav__icon" type="menu-fold" onClick={() => this.handleClick()}> ≡ </button>
                    <div className="nav__body">
                        <h3>Let's Trip</h3>
                        <ul>
                            <li>                                
                                <FontAwesomeIcon icon={faRoute} size="lg" className="mr-2" />
                                <a href='/dashboard'>Mes Roadmaps </a>                                
                            </li>
                            <li> 
                                <FontAwesomeIcon icon={faUser} size="lg" className="mr-2" />
                                <button onClick={() => window.location=`/profile/${this.state.userId}`}>Mon Compte</button>
                            </li>                            
                            <li>
                                <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-2" />
                                <a href='/' onClick={auth.logout}>Deconnexion</a>
                            </li>
                        </ul>

                        {this.props.sidebarSettings}
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;


