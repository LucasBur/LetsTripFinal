import React from 'react';
import jwt_decode from 'jwt-decode'
import Sidebar from './Sidebar';
import RoadMapCard from './RoadMapCard';
import Button from 'react-bootstrap/Button'
import '../styles/Dashboard_style.css'

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            pseudo: '',
            errors: {}
        };
    };

    componentDidMount() {
        const token = localStorage.token;
        const decoded = jwt_decode(token);
        this.setState({
            first_name: decoded.firstname,
            last_name: decoded.lastname,
            pseudo: decoded.pseudo,
            email: decoded.email
        });
        console.log(decoded);
    }

    render() {
        return (
                <div className='dashboard'>
                    <Sidebar pseudo={this.state.pseudo} />
                    <ul style={{ marginTop: '50px', marginLeft:'50px', width:'100%' }}>
                        <Button>Nouvelle Roadmap</Button>
                        <li><RoadMapCard /></li>
                        <li><RoadMapCard /></li>
                        <li><RoadMapCard /></li>
                    </ul>
                </div>
        );
    };
};

export default Dashboard;