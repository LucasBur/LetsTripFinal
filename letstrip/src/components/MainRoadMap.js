import React from 'react';
import jwt_decode from 'jwt-decode'
import Sidebar from './Sidebar';
import { FormRoadmap } from './Forms/Modal/FormRoadmap';
import RoadMapCard from './RoadMapCard';
import '../styles/Dashboard_style.css'
import axios from 'axios';

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
           leader: ''
        };
    };

    componentWillMount() {
        axios.get(`http://localhost:4000/GetRoadMap/${this.props.match.params.id}`, { headers: { "Content-Type": "application/json" }})
        .then(response => {            
            if(!response.data){
                alert('Erreur');
                window.location = '/dashboard';
            } else {                
                console.log(response.data);
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    password: response.data.password,
                    nbr_participants: response.data.nbr_participants,
                    location: response.data.location,
                    startDate: response.data.startDate,
                    endDate: response.data.endDate,
                    leader: response.data.leader
                });
            }
        });        
    }

    componentDidMount(){
        console.log(this.state);
    }

    render() {
        return (
            <div className="dashboard">
                <Sidebar pseudo={this.state.pseudo} />
                
                <div style={{ marginTop: '50px', marginLeft: '50px', width: '100%', height: '90vh', overflow: 'auto' }}>
                    <p>azdad</p>                    
                </div>
            </div>
        );
    };
};

export default MainRoadMap;
