import React from 'react';
import jwt_decode from 'jwt-decode'
import Sidebar from './Sidebar';
import { FormRoadmap } from './Forms/Modal/FormRoadmap';
import RoadMapCard from './RoadMapCard';
import '../styles/Dashboard_style.css'
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Activity from './Activity';

class DayCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: []
        };
    };

    componentWillMount() {        
        axios.get(`http://localhost:4000/GetActivities/${this.props.rmId}/${this.props.day}`, { headers: { "Content-Type": "application/json" }})
        .then(response => {            
            if(response.data != false){
                console.log(response.data);
                this.setState({
                    activities: response.data
                });
            }            
        });
    }

    // componentDidMount(){
    //     console.log(this.state);
    // }

    render() {        
        return (
            <div>
                <ListGroup.Item>
                    <h3>Jour {this.props.day}</h3>
                </ListGroup.Item>
                <ListGroup.Item style={{width: "300px", height: "600px", overflow:"scroll"}}>                    
                    {this.state.activities.map((element, i) => {
                        return (<Activity key={i} info={element}/>);
                    })}                    
                </ListGroup.Item>
            </div>
        );
    };
};

export default DayCalendar;
