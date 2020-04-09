import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import Sidebar from './Sidebar';
import ListGroup from 'react-bootstrap/ListGroup';
import DayCalendar from './DayCalendar';
import { FormNewActivity } from './Forms/Modal/FormNewActivity';
import '../styles/MainRoadmap_style.css'
import Calendar from './Calendar'
import MapContainer from './MapContainer'

class MainRoadMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userFirst_name: '',
            userLast_name: '',
            userPseudo: '',
            userEmail: '',
            roadMapId: ''            
        };
    };

    componentWillMount() {
        const token = localStorage.token;
        const decoded = jwt_decode(token);
        this.setState({
            userId: decoded.id,
            userFirst_name: decoded.firstname,
            userLast_name: decoded.lastname,
            userPseudo: decoded.pseudo,
            userEmail: decoded.email,
            roadMapId: this.props.match.params.id
        });    
    }

    render() {
        return (
            <div className="mainroadmap">
                <Sidebar />
                <ul style={{ marginTop: '50px', marginLeft: '50px', width: '60%', height: '90vh', overflow: "scroll" }}>
                    <Calendar roadMapId={this.state.roadMapId}/>
                    {/* <MapContainer /> */}
                </ul>
            </div>
        );
    };
};

export default MainRoadMap;