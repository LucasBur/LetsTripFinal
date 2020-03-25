import React from 'react';
import jwt_decode from 'jwt-decode'
import Sidebar from './Sidebar';
import { FormRoadmap } from './Forms/Modal/FormRoadmap';
import RoadMapCard from './RoadMapCard';
import '../styles/Dashboard_style.css'
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import DayCalendar from './DayCalendar';

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

        axios.get(`http://localhost:4000/GetRoadMap/${this.props.match.params.id}`, { headers: { "Content-Type": "application/json" }})
        .then(response => {            
            if(!response.data){
                alert('Erreur');
                window.location = '/dashboard';
            } else {                            
                var startDateArr = response.data.startDate.split('-');
                var endDateArr = response.data.endDate.split('-');
                var startTypeDate = new Date(startDateArr[0], startDateArr[1] - 1, startDateArr[2] );
                var endTypeDate = new Date(endDateArr[0], endDateArr[1] - 1, endDateArr[2]);
                var oneDay = 24 * 60 * 60 * 1000;
                // A verif le nbr de jour
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

    // componentDidMount(){
    //     console.log(this.state);
    // }

    render() {
        return (
            <div className="dashboard">
                <Sidebar pseudo={this.state.userPseudo} />
                
                <ListGroup horizontal style={{ marginTop: '50px', marginLeft: '50px', width: '100%', height: '90vh', overflow: "scroll" }}>

                    {Array.from({ length: this.state.dayNbr }, (_, k) => (
                        <DayCalendar key={k} day={k + 1} rmId={this.props.match.params.id} />   
                    ))}                                                                                                            
                                                   
                </ListGroup>                            
            </div>
        );
    };
};

export default MainRoadMap;
