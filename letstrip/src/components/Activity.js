import React from 'react';
import jwt_decode from 'jwt-decode'
import Sidebar from './Sidebar';
import { FormRoadmap } from './Forms/Modal/FormRoadmap';
import RoadMapCard from './RoadMapCard';
import '../styles/Dashboard_style.css'
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    };

    componentWillMount() {
        console.log(this.props.info);
    }

    // componentDidMount(){
    //     console.log(this.state);
    // }

    render() {
        return (
            <div>
                <Card>
                    <Card.Title>{this.props.info.title}</Card.Title>
                    <Card.Body>
                        {this.props.info.startHour} à {this.props.info.endHour}
                    </Card.Body>
                </Card>      
            </div>
        );
    };
};

export default Activity;
