import React from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode'
import MainChat from './Chat/MainChat';
import Sidebar from './Sidebar';
import Calendar from './Calendar'
import Card from 'react-bootstrap/Card'
import { FormUpdateRoadmap } from './Forms/Update/FormUpdateRoadmap';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/MainRoadmap_style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs, faCalendarAlt, faMapMarkedAlt, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import MainMap from './MainMap'
import { FormInviteToRoadMap } from './Forms/Update/FormInviteToRoadMap'
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
            showMainMap: false,
            showMainChat: false
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
            showFormUpdateRoadmap: false,
            showMainMap: false,
            showMainChat: false
        })
    }

    toFormUpdateRoadmap = () => {
        this.setState({
            showCalendar: false,
            showFormUpdateRoadmap: true,
            showMainMap: false,
            showMainChat: false
        })
    }

    toMainMap = () => {
        this.setState({
            showCalendar: false,
            showFormUpdateRoadmap: false,
            showMainMap: true,
            showMainChat: false
        })
    }

    toMainChat = () => {
        this.setState({
            showCalendar: false,
            showFormUpdateRoadmap: false,
            showMainMap: false,
            showMainChat: true
        })
    }

    sidebarSettings = () => {
        return (
            <ul>
                <li>
                    <FontAwesomeIcon icon={faCogs} size="lg" className="mr-2" />
                    <button onClick={this.toFormUpdateRoadmap}>Ma Roadmap</button>
                </li>
                <li>
                    <FontAwesomeIcon icon={faCalendarAlt} size="lg" className="mr-2" />
                    <button onClick={this.toCalendar}>Calendrier</button>
                </li>
                <li>
                    <FontAwesomeIcon icon={faMapMarkedAlt} size="lg" className="mr-2" />
                    <button onClick={this.toMainMap}>Map</button>
                </li>
                <li>
                    <FontAwesomeIcon icon={faCommentDots} size="lg" className="mr-2" />
                    <button onClick={this.toMainChat}>Chat</button>
                </li>
            </ul>
        )
    }

    notify = (type, message) => {
        switch (type) {
            case '':
                toast(message, { autoClose: 3000 })
                break;
            case 'info':
                toast.info(message)
                break;
            case 'success':
                toast.success(message)
                break;
            case 'error':
                toast.error(message)
                break;
            default:
                break;
        }

    }

    renderContent = () => {
        var content;
        if (this.state.showCalendar) {
            content = (
                <Calendar
                    roadMapId={this.state.roadMapId}
                    notify={this.notify} />
            )
        } else if (this.state.showFormUpdateRoadmap) {
            content = (
                <div>
                    <Card className="mb-3">
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

                    <Card>
                        <Card.Header>
                            Inviter des membres à la RoadMap
                        </Card.Header>
                        <Card.Body>
                            <FormInviteToRoadMap roadMapId={this.state.roadMapId}/>
                        </Card.Body>
                    </Card>                    
                </div>
            )
        } else if (this.state.showMainMap) {
            content = (
                <MainMap roadMapId={this.state.roadMapId} />
            )
        } else if (this.state.showMainChat) {
            content = (
                <MainChat 
                    userPseudo={this.state.userPseudo} 
                    rmId={this.state.roadMapId} 
                    rmName={this.state.name} 
                    rmNbrParticipants={this.state.nbr_participants} />
            )
        }

        return (
            <div>
                {content}
            </div>
        )
    }

    render() {
        return (
            <div className="mainroadmap">
                <Sidebar sidebarSettings={this.sidebarSettings()} />
                <ul id="ul_container" style={{
                    marginTop: '50px',
                    marginLeft: '50px',
                    width: '100%',
                    height: '90vh',
                    overflow: "auto"
                }}>

                    {this.renderContent()}
                </ul>
            </div>
        );
    };
};

export default MainRoadMap;