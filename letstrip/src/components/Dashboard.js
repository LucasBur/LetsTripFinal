import React from 'react';
import jwt_decode from 'jwt-decode'
import Sidebar from './Sidebar';
import { FormRoadmap } from './Forms/Modal/FormRoadmap';
import axios from 'axios';
import RoadMapCard from './RoadMapCard';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/Dashboard_style.css'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.getRoadmapData = this.getRoadmapData.bind(this);
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
        console.log('decoded:', decoded)
        this.setState({
            id: decoded.id,
            first_name: decoded.firstname,
            last_name: decoded.lastname,
            pseudo: decoded.pseudo,
            email: decoded.email,
        });
        this.getRoadmapData(decoded.id);
    }

    getRoadmapData(id) {
        axios.get(`http://localhost:4000/GetAllRoadMaps/${id}`)
            .then(response => {
                console.log('response :', response)
                this.setState({
                    roadMapsList: response.data
                });
            });
    }

    onDelete(id) {
        axios.delete(`http://localhost:4000/DeleteRoadMap/${id}`,
            { headers: { "Content-Type": "application/json" } });
        this.setState({
            roadMapsList: this.state.roadMapsList.filter(element => element.id !== id)
        })
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

    render() {
        console.log(this.state.roadMapsList)
        const items = this.state.roadMapsList.map((element, i) => (
            <li key={i}> <RoadMapCard onDelete={this.onDelete} info={element} /> </li>
        ));
        return (
            <div className='dashboard'>
                <Sidebar />

                <ul style={{ marginTop: '50px', marginLeft: '50px', width: '100%', height: '90vh', overflow: 'auto' }}>
                    <FormRoadmap
                        id={this.state.id} 
                        roadMapsList={this.state.roadMapsList}
                        getRoadmapData={this.getRoadmapData}
                        notify={this.notify} />

                    {items}
                </ul>
            </div>
        );
    };
};

export default Dashboard;