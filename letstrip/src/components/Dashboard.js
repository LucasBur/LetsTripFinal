import React from 'react';
import jwt_decode from 'jwt-decode'
import Sidebar from './Sidebar';
import {FormRoadmap }from './Forms/Modal/FormRoadmap';
import RoadMapCard from './RoadMapCard';
import '../styles/Dashboard_style.css'
import axios from 'axios';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            pseudo: '',
            id: '',
            errors: {},
            roadMapsList: []
        };
    };

    componentDidMount() {
        
    }

    componentWillMount() {
        const token = localStorage.token;
        const decoded = jwt_decode(token);
        this.setState({
            first_name: decoded.firstname,
            last_name: decoded.lastname,
            pseudo: decoded.pseudo,
            email: decoded.email,
            id: decoded.id
        });                    

        axios.get(`http://localhost:4000/GetAllRoadMaps/${decoded.id}`, { headers: { "Content-Type": "application/json" }})
        .then(response => {
            this.setState({
                roadMapsList: response.data
            });
            console.log(response.data);
        });        
    }

    render() {
        return (
            <div className='dashboard'>
                <Sidebar pseudo={this.state.pseudo} />

                <ul style={{ marginTop: '50px', marginLeft: '50px', width: '100%', height:'90vh', overflow:'auto' }}>
                    <FormRoadmap />
                    <li><RoadMapCard /></li>
                                  
                </ul>
            </div>
        );
    };
};

export default Dashboard;
