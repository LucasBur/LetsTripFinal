import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

class RoadMapCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.deleteRoadMap = this.deleteRoadMap.bind(this);
        this.openRoadMap = this.openRoadMap.bind(this);
    };

    openRoadMap() {
        window.location = `/mainRoadMap/${this.props.info.id}`;
    }

    deleteRoadMap() {
        axios.delete(`http://localhost:4000/DeleteRoadMap/${this.props.info.id}`,
            { headers: { "Content-Type": "application/json" } })
    }

    render() {
        return (
            <Card className="rm-text-center">
                <Card.Header>{this.props.info.name}</Card.Header>
                <Card.Body className="rm-text-body">
                    <Container fluid className="rm-text-container">
                        <Row className='rm-text-row'>
                            <Col>Voyage en {this.props.info.location}</Col>
                            <Col>{this.props.info.nbr_participants} participant(s)</Col>
                            <Col className='rm-text-date'>Du {this.props.info.startDate} au {this.props.info.endDate}</Col>
                            <Col className='rm-text-btn'>
                                <Button variant="dark" onClick={this.openRoadMap}>Consulter</Button>
                                <Button 
                                    variant="danger" 
                                    className="mr-2" 
                                    style={{marginLeft:'15px'}} 
                                    onClick={() => {
                                    window.confirm('Êtes-vous sûr de supprimer votre Roadmap ?') && 
                                    this.props.onDelete(this.props.info.id)
                                }}>Supprimer</Button>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        );
    };
};

export default RoadMapCard;