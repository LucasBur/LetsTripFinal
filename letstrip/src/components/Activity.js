import React from 'react';
import jwt_decode from 'jwt-decode'
import Sidebar from './Sidebar';
import { FormRoadmap } from './Forms/Modal/FormRoadmap';
import RoadMapCard from './RoadMapCard';
import '../styles/Dashboard_style.css'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.deleteActivity = this.deleteActivity.bind(this);
    };

    componentWillMount() {
        console.log(this.props.info);
    }

    // componentDidMount(){
    //     console.log(this.state);
    // }

    deleteActivity(){
        axios.delete(`http://localhost:4000/DeleteActivity/${this.props.info.id}`, { headers: { "Content-Type": "application/json"}});        
    }

    render() {
        return (
            <div>
                <Card className="text-center mt-1">
                    <Card.Header>{this.props.info.title}</Card.Header>
                    <Card.Body>
                        <Container fluid>
                            <Row>{this.props.info.startHour} à {this.props.info.endHour}</Row>
                            <Row>{this.props.info.description}</Row>    
                        </Container>                                                                                            
                    </Card.Body>
                    <Card.Footer>
                        <Container fluid>
                            <Row>
                                <Button className="mr-1" variant="dark" size="sm">Modifier</Button>
                                <Button variant="outline-danger" size="sm" onClick={this.deleteActivity}>Supprimer</Button>
                            </Row>
                        </Container>                        
                    </Card.Footer>                                                      
                </Card>      
            </div>
        );
    };
};

export default Activity;
