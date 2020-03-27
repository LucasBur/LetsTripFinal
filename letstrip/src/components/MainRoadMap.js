import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import Sidebar from './Sidebar';
import ListGroup from 'react-bootstrap/ListGroup';
import DayCalendar from './DayCalendar';
import { FormNewActivity } from './Forms/Modal/FormNewActivity';
import '../styles/MainRoadmap_style.css'

class MainRoadMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            userId: '',
            userFirst_name: '',
            userLast_name: '',
            userPseudo: '',
            userEmail: ''
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
        });

        axios.get(`http://localhost:4000/GetRoadMap/${this.props.match.params.id}`,
            { headers: { "Content-Type": "application/json" } })
            .then(response => {
                console.log(response)
                if (!response.data) {
                    alert('Erreur');
                    window.location = '/dashboard';
                } else {
                    const startDateArr = response.data.startDate.split('-');
                    const endDateArr = response.data.endDate.split('-');
                    const startTypeDate = new Date(startDateArr[0], startDateArr[1] - 1, startDateArr[2]);
                    const endTypeDate = new Date(endDateArr[0], endDateArr[1] - 1, endDateArr[2]);
                    const oneDay = 24 * 60 * 60 * 1000;
                    const dayDiff = Math.ceil(Math.abs((startTypeDate - endTypeDate) / oneDay));
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        password: response.data.password,
                        nbr_participants: response.data.nbr_participants,
                        location: response.data.location,
                        startDate: response.data.startDate,
                        endDate: response.data.endDate,
                        leader: response.data.leader,
                        dayNbr: dayDiff
                    });
                }
            });
    }

    render() {
        return (
            <div className="mainroadmap">
                <Sidebar />
                <ul style={{ marginTop: '50px', marginLeft: '50px', width: '100%', height: '90vh', overflow: "scroll" }}>
                    <li> <FormNewActivity dayNumber={this.state.dayNbr} id={this.props.match.params.id} /> </li>
                    <ListGroup horizontal>
                        {Array.from({ length: this.state.dayNbr }, (_, k) => (
                            <li key={k}>
                                <DayCalendar
                                    rmId={this.state.id}
                                    dayNbr={this.state.dayNbr}
                                    day={k + 1} />
                            </li>
                        ))}
                    </ListGroup>
                </ul>
            </div>
        );
    };
};

export default MainRoadMap;