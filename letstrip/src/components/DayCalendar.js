import React from 'react';
import jwt_decode from 'jwt-decode'
import Sidebar from './Sidebar';
import { FormRoadmap } from './Forms/Modal/FormRoadmap';
import RoadMapCard from './RoadMapCard';
import '../styles/Dashboard_style.css'
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';

class DayCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
   
        };
    };

    componentWillMount() {
     
    }

    // componentDidMount(){
    //     console.log(this.state);
    // }

    render() {
        return (
            <div>
                <ListGroup.Item style={{width: "300px"}}>
                    <h5>Jour {this.props.day}</h5>
                </ListGroup.Item>
            </div>
        );
    };
};

export default DayCalendar;
