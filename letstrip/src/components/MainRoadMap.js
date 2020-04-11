import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import Sidebar from './Sidebar';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Calendar from './Calendar'
import { FormUpdateRoadmap } from './Forms/Update/FormUpdateRoadmap';
import '../styles/MainRoadmap_style.css'

class MainRoadMap extends React.Component {
    constructor(props) {
        super(props);
        this.sidebarSettings = this.sidebarSettings.bind(this)
        this.getRoadmap = this.getRoadmap.bind(this)
        this.state = {
            userId: '',
            userFirst_name: '',
            userLast_name: '',
            userPseudo: '',
            userEmail: '',
            roadMapId: '',
            id: '',
            name: '',
            password: '',
            nbr_participants: '',
            location: '',
            startDate: '',
            endDate: '',
            budget: '',
            leader: '',
            showCalendar: true,
            showFormUpdateRoadmap: false,
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
        this.getRoadmap(this.props.match.params.id)
    }

    getRoadmap = (id) => {
        axios.get(`http://localhost:4000/GetRoadMap/${id}`,
            { headers: { "Content-Type": "application/json" } })
            .then(response => {
                if (!response.data) {
                    alert('Erreur');
                    window.location = '/dashboard';
                } else {
                    this.setState({
                        id: response.data.id,
                        name: response.data.name,
                        password: response.data.password,
                        nbr_participants: response.data.nbr_participants,
                        location: response.data.location,
                        startDate: response.data.startDate,
                        endDate: response.data.endDate,
                        leader: response.data.leader,
                        budget: response.data.budget
                    });
                }
            });
    }


    toCalendar = () => {
        this.setState({
            showCalendar: true,
            showFormUpdateRoadmap: false
        })
    }

    toFormUpdateRoadmap = () => {
        this.setState({
            showCalendar: false,
            showFormUpdateRoadmap: true
        })
    }

    sidebarSettings = () => {
        return (
            <ul>
                <li><Button onClick={this.toCalendar}>Calendrier</Button></li>
                <li><Button onClick={this.toFormUpdateRoadmap}>Paramétrer la Roadmap</Button></li>
            </ul>
        )
    }

    showContent = () => {
        return (
            <div>
                {
                    this.state.showCalendar ? <Calendar roadMapId={this.state.roadMapId} /> : <Card>
                        <Card.Header>
                            Mettez à jour les informations de la Roadmap
                </Card.Header>
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
                                switchContent={this.toCalendar} />
                        </Card.Body>
                    </Card>
                }
            </div>
        )
    }

    render() {
        return (
            <div className="mainroadmap">
                <Sidebar sidebarSettings={this.sidebarSettings()} />
                <ul style={{
                    marginTop: '50px',
                    marginLeft: '50px',
                    width: '100%',
                    height: '90vh',
                    overflow: "scroll"
                }}>
                    {this.showContent()}
                </ul>
            </div>
        );
    };
};

export default MainRoadMap;