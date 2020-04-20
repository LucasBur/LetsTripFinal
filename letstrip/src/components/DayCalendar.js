import React from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Activity from './Activity';
import '../styles/Dashboard_style.css'

class DayCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.getActivities = this.getActivities.bind(this)
        this.deleteActivity = this.deleteActivity.bind(this)
        this.state = {
            activities: []
        };
    };

    componentWillReceiveProps(props) {
        this.getActivities(this.props.rmId, this.props.day)
    }

    componentWillMount() {
        this.getActivities(this.props.rmId, this.props.day)
    }

    getActivities(id, day) {
        axios.get(`http://localhost:4000/GetActivities/${id}/${day}`,
            { headers: { "Content-Type": "application/json" } }).then(response => {
                if (response.data !== false) {
                    this.setState({
                        activities: response.data
                    });
                } else {
                    this.setState({
                        activities: []
                    });
                }
            });
    }

    deleteActivity(id) {
        axios.delete(`http://localhost:4000/DeleteActivity/${id}`,
            { headers: { "Content-Type": "application/json" } }).then(() => {
                this.getActivities(this.props.rmId, this.props.day)
            })
    }

    render() {
        return (
            <div>
                <ListGroup.Item>
                    <h3>Jour {this.props.day}</h3>
                </ListGroup.Item>
                <ListGroup.Item style={{ 
                        width: "350px", 
                        height: "600px", 
                        overflow: "scroll", 
                        display:'flex', 
                        flexDirection:'column' }}>
                    {this.state.activities.map((element, i) => {
                        return (
                            <Activity
                                deleteActivity={this.deleteActivity}
                                getActivities={this.getActivities}
                                key={i} info={element}
                                dayNbr={this.props.dayNbr}
                                rmId={this.props.rmId}
                                notify={this.props.notify} />
                        );
                    })}
                </ListGroup.Item>
            </div>
        );
    };
};

export default DayCalendar;