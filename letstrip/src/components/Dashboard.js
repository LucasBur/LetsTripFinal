import React from 'react';
import jwt_decode from 'jwt-decode'
import Sidebar from './Sidebar';
import { FormRoadmap } from './Forms/Modal/FormRoadmap';
import axios from 'axios';
import RoadMapCard from './RoadMapCard';
import '../styles/Dashboard_style.css'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            first_name: '',
            last_name: '',
            email: '',
            pseudo: '',
            roadMapsList: [],
            errors: {},
        };
    };


    // utiliser componentWillMount pour l'instant
    componentWillMount() {
        const token = localStorage.token;
        const decoded = jwt_decode(token);
        this.setState({
            id: decoded.id,
            first_name: decoded.firstname,
            last_name: decoded.lastname,
            pseudo: decoded.pseudo,
            email: decoded.email,
        });
        console.log(decoded)
        this.getRoadmapData(decoded);
    }

    getRoadmapData(decoded) {
        axios.get(`http://localhost:4000/GetAllRoadMaps/${decoded.id}`)
            .then(response => {
                this.setState({
                    roadMapsList: response.data
                });
            });
    }

    // componentWillUpdate(preProps, preState) {
    //     const token = localStorage.token;
    //     const decoded = jwt_decode(token);

    // }

    render() {
        
        const items = this.state.roadMapsList.map((element, i) => (
            <li key={i}> <RoadMapCard info={element} /> </li>
        ));

        return (
            <div className='dashboard'>
                <Sidebar/>

                <ul style={{ marginTop: '50px', marginLeft: '50px', width: '100%', height: '90vh', overflow: 'auto' }}>
                    <FormRoadmap id={this.state.id}/>
                    {items}

                </ul>
            </div>
        );
    };
};

export default Dashboard;
