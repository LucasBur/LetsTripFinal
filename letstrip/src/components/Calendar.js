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
            showRodmapDetails: true,
            showFormUpdateRoadmap: false,
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
                        budget: response.data.budget,
                        dayNbr: dayDiff
                    });
                }
            });
    }

    refreshActivity = () => {
        this.setState({
            refreshActivity: !this.state.refreshActivity
        })
    }

    switchRender = () => {
        this.setState({
            showRodmapDetails: !this.state.showRodmapDetails,
            showFormUpdateRoadmap: !this.state.showFormUpdateRoadmap
        })
    }

    roadmapDetails_FormUpdate = () => {
        const isLeader = (lead) => {
            return (
                <div>
                    {lead ? <li> <strong>Chef</strong> : {this.state.userPseudo} </li> : null}
                </div>
            )
        }
        return (
            this.state.showRodmapDetails ? <Accordion defaultActiveKey="1">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            {this.state.name} - {this.state.location}
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <Card.Title>
                                <Button onClick={this.switchRender.bind(this)}>Modifier la Roadmap</Button>
                            </Card.Title>
                            <ul style={{ listStyle: 'none' }}>
                                <li> <strong>Début</strong> : {this.state.startDate} </li>
                                <li> <strong>Fin</strong> : {this.state.endDate} ({this.state.dayNbr} jours) </li>
                                <li> <strong>Nombre de participants</strong> : {this.state.nbr_participants} </li>
                                {isLeader(this.state.leader)}
                            </ul>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion> : <Accordion defaultActiveKey="1"><Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Mettez à jour les détails de la Roadmap
                                                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey='1'>
                    <Card.Body>
                        <FormUpdateRoadmap
                            rmId={this.state.id}
                            rmName={this.state.name}
                            rmPassword={this.state.password}
                            rmNbrParticipants={this.state.nbr_participants}
                            rmStartDate={this.state.startDate}
                            rmEndDate={this.state.endDate}
                            rmLocation={this.state.location}
                            rmBudget={this.state.budget}
                            rmLeader={this.state.leader}
                            getRoadmap={this.getRoadmap}
                            switchRender={this.switchRender} />
                    </Card.Body>
                </Accordion.Collapse>
            </Card></Accordion>
        )
    }


    render() {
        return (
            <div>
                <FormNewActivity
                    rmId={this.props.roadMapId}
                    dayNumber={this.state.dayNbr}
                    id={this.props.roadMapId}
                    refreshActivity={this.refreshActivity} />
                <li>
                    {this.roadmapDetails_FormUpdate()}
                </li>
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