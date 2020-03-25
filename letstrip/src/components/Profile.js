import React from 'react';
import jwt_decode from 'jwt-decode'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import Sidebar from './Sidebar';
import { FormUpdateUser } from './Forms/Modal/FormUpdateUser';
import onizukadauphin from '../design/wallpaper/onizukadauphin.jpg'
import '../styles/Profile_style.css'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userFirst_name: '',
            userLast_name: '',
            userPseudo: '',
            userEmail: ''
        };
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
            <div className="profile">
                <Sidebar />
                <ul style={{ marginTop: '50px', marginLeft: '50px', width: '100%', height: '90vh', overflow: 'auto' }}>
                    {/* <div style={{display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                        <h1>Mon Compte</h1>
                        <img src={onizukadauphin} width='10%' alt='onizukadauphin' />
                    </div> */}
                    <Col as={Row}>
                        <Col sm={5}>
                            <img src={onizukadauphin} width='70%' alt='onizukadauphin' />
                        </Col>
                        <Col sm={7}>
                            <h1> {this.state.userFirst_name} {this.state.userLast_name} </h1>
                            <span>
                                <a href="#" alt='email'> {this.state.userEmail} </a> - Utilisateur
                            </span>

                        </Col>
                    </Col>


                    <h1>Mon Compte</h1>
                    <hr></hr>
                    <li>
                        <FormUpdateUser
                            userPseudo={this.state.userPseudo}
                            userEmail={this.state.userEmail}
                            userFirstName={this.state.userFirst_name}
                            userLastName={this.state.userLast_name} />
                    </li>
                </ul>
            </div>
        )
    }
}

export default Profile;