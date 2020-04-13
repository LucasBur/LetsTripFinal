import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import { FormUpdateRoadmap } from './Forms/Update/FormUpdateRoadmap';
import Sidebar from './Sidebar';
import Calendar from './Calendar'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/MainRoadmap_style.css'
toast.configure();


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
        switch (this.state.showCalendar) {
            case true:
                return (
                    <ul>
                        <li><Button onClick={this.toFormUpdateRoadmap}>Paramétrer la Roadmap</Button></li>
                    </ul>

                )
                break;
            case false:
                return (
                    <ul>
                        <li><Button onClick={this.toCalendar}>Calendrier</Button></li>
                    </ul>
                )
            default:
                break;
        }
    }

    notify = (type, message) => {
        switch (type) {
            case '':
                toast(message, {autoClose: 3000})
                break;
            case 'info':
                toast.info(message)
                break;
            case 'success':
                toast.success(message)
                break;
            case 'error':
                toast.error(message)
            default:
                break;
        }

    }

    renderContent = () => {
        return (
            <div>
                {
                    this.state.showCalendar ?
                        <Calendar
                            roadMapId={this.state.roadMapId}
                            notify={this.notify} />
                        :
                        <Card>
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
                                    notify={this.notify}
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
                    {this.renderContent()}
                </ul>
            </div>
        );
    };
};

export default MainRoadMap;