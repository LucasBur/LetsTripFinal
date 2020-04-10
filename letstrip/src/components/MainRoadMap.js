import React from 'react';
import jwt_decode from 'jwt-decode'
import Sidebar from './Sidebar';
import Button from 'react-bootstrap/Button'
import Calendar from './Calendar'
import '../styles/MainRoadmap_style.css'

class MainRoadMap extends React.Component {
    constructor(props) {
        super(props);
        this.sidebarSettings = this.sidebarSettings.bind(this)
        this.state = {
            userId: '',
            userFirst_name: '',
            userLast_name: '',
            userPseudo: '',
            userEmail: '',
            roadMapId: '',
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
    }

    sidebarSettings = () => {
        return (
            <ul>
                <li><Button onClick={this.toCalendar}>Calendrier</Button></li>
                <li><Button onClick={this.toFormUpdateRoadmap}>Paramétrer la Roadmap</Button></li>
            </ul>
        )
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

    render() {
        return (
            <div className="mainroadmap">
                <Sidebar
                    sidebarSettings={this.sidebarSettings()} />
                <ul style={{
                    marginTop: '50px',
                    marginLeft: '50px',
                    width: '100%',
                    height: '90vh',
                    overflow: "scroll"
                }}>
                    <Calendar
                        showCalendar={this.state.showCalendar}
                        showFormUpdateRoadmap={this.state.showFormUpdateRoadmap}
                        navigationSidebar={this.navigationSidebar}
                        toCalendar={this.toCalendar}
                        toFormUpdateRoadmap={this.toFormUpdateRoadmap}
                        roadMapId={this.state.roadMapId} />
                </ul>
            </div>
        );
    };
};

export default MainRoadMap;