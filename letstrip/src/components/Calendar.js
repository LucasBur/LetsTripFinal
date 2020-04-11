import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { FormUpdateRoadmap } from './Forms/Update/FormUpdateRoadmap';
import DayCalendar from './DayCalendar';
import { FormNewActivity } from './Forms/Modal/FormNewActivity';
import '../styles/MainRoadmap_style.css'

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userFirst_name: '',
            userLast_name: '',
            userPseudo: '',
            userEmail: '',
            id: '',
            name: '',
            password: '',
            nbr_participants: '',
            location: '',
            startDate: '',
            endDate: '',
            budget: '',
            leader: '',
            dayNbr: '',
            refreshActivity: true,
        };
        this.getRoadmap = this.getRoadmap.bind(this)
    };

    componentDidMount() {
        const token = localStorage.token;
        const decoded = jwt_decode(token);
        this.setState({
            userId: decoded.id,
            userFirst_name: decoded.firstname,
            userLast_name: decoded.lastname,
            userPseudo: decoded.pseudo,
            userEmail: decoded.email,
        });
        this.getRoadmap(this.props.roadMapId)
    }

    getRoadmap(id) {
        axios.get(`http://localhost:4000/GetRoadMap/${id}`,
            { headers: { "Content-Type": "application/json" } })
            .then(response => {
                if (!response.data) {
                    alert('Erreur');
                    window.location = '/dashboard';
                } else {
                    this.setState({
                        dayNbr: this.convertToDay(response.data)
                    });
                }
            });
    }

    convertToDay = (response) => {
        const startDateArr = response.startDate.split('-');
        const endDateArr = response.endDate.split('-');
        const startTypeDate = new Date(startDateArr[0], startDateArr[1] - 1, startDateArr[2]);
        const endTypeDate = new Date(endDateArr[0], endDateArr[1] - 1, endDateArr[2]);
        const oneDay = 24 * 60 * 60 * 1000;
        const dayDiff = Math.ceil(Math.abs((startTypeDate - endTypeDate) / oneDay));
        return dayDiff
    }

    refreshActivity = () => {
        this.setState({
            refreshActivity: !this.state.refreshActivity
        })
    }

    render() {
        return (
            <div>
                <FormNewActivity
                    rmId={this.props.roadMapId}
                    dayNumber={this.state.dayNbr}
                    id={this.props.roadMapId}
                    refreshActivity={this.refreshActivity} />

                <ListGroup horizontal>
                    {Array.from({ length: this.state.dayNbr }, (_, k) => (
                        <li key={k}>
                            <DayCalendar
                                rmId={this.props.roadMapId}
                                dayNbr={this.state.dayNbr}
                                day={k + 1}
                                refresh={this.refreshActivity} />
                        </li>
                    ))}
                </ListGroup>
            </div>
        );
    };
};

export default Calendar;