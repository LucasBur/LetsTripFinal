import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
// import CardColumns from 'react-bootstrap/CardColumns'
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
    
    deleteRoadMap() {
        axios.delete(`http://localhost:4000/DeleteRoadMap/${this.props.info.id}`,
            { headers: { "Content-Type": "application/json" } })
    }

    openRoadMap() {
        window.location = `/mainRoadMap/${this.props.info.id}`;
    }

    render() {
        return (
            <Card className="text-center">
                <Card.Header>{this.props.info.name}</Card.Header>
                <Card.Body>
                    <Container fluid>
                        <Row>
                            <Col>Voyage en {this.props.info.location}</Col>
                            <Col>{this.props.info.nbr_participants} participant(s)</Col>
                            <Col>Du {this.props.info.startDate} au {this.props.info.endDate}</Col>
                            <Col>
                                <Button variant="dark" onClick={this.openRoadMap}>Consulter</Button>
                                <Button variant="danger" className="mr-2" onClick={this.deleteRoadMap}>Supprimer</Button>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        );
    };
};

export default RoadMapCard;