import React from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Activity from './Activity';
import '../styles/Dashboard_style.css'

class DayCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activities: []
        };
    };

    componentWillMount() {
        axios.get(`http://localhost:4000/GetActivities/${this.props.rmId}/${this.props.day}`,
            { headers: { "Content-Type": "application/json" } }).then(response => {
                if (response.data !== false) {
                    console.log(response.data);
                    this.setState({
                        activities: response.data
                    });
                }
            });
    }

    render() {
        return (
            <div>
                <ListGroup.Item>
                    <h3>Jour {this.props.day}</h3>
                </ListGroup.Item>
                <ListGroup.Item style={{width: "300px", height: "600px", overflow:"scroll"}}>                    
                    {this.state.activities.map((element, i) => {
                        return (<Activity key={i} info={element} dayNbr={this.props.dayNbr}/>);
                    })}                    
                </ListGroup.Item>
            </div>
        );
    };
};

export default DayCalendar;
