import React from 'react';
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
// import CardColumns from 'react-bootstrap/CardColumns'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class RoadMapCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 1,
            name: 'Test',
            password: 'Test',
            nbr_participants: 2,
            location: 'France',
            startDate: "01/01/2000",
            endDate: "01/01/2000",
            budget: 1000,
            leader: true 
        };
    };

    render() {
        return (                   
                <Card className="text-center">
                    <Card.Header>{this.state.name}</Card.Header>
                    <Card.Body>
                        <Container fluid>
                            <Row>
                                <Col>Voyage en {this.state.location}</Col>
                                <Col>{this.state.nbr_participants} participant(s)</Col>
                                <Col>Du {this.state.startDate} au {this.state.endDate}</Col>
                                <Col>
                                    <Button variant="danger" className="mr-2">Supprimer</Button>
                                    <Button variant="dark">Consulter</Button>
                                </Col>
                            </Row>
                        </Container>                    
                    </Card.Body>
                </Card>                         
        );
    };
};

export default RoadMapCard;