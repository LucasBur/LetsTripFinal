import React from 'react';
import '../styles/Dashboard_style.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { FormActivityUpdate } from './Forms/Modal/FormActivityUpdate';

class Activity extends React.Component {
    constructor(props) {
        super(props);        
        this.state = {
        };
    };

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
                            <Row style={{display: 'flex', justifyContent:'space-between'}}>
                                <FormActivityUpdate 
                                    title={this.props.info.title} 
                                    description={this.props.info.description} 
                                    dayNumber={this.props.dayNbr}
                                    day={this.props.info.day} 
                                    startHour={this.props.info.startHour} 
                                    endHour={this.props.info.endHour} 
                                    id={this.props.info.id} />
                                <Button variant="outline-danger" 
                                        size="sm" 
                                        onClick={() => this.props.deleteActivity(this.props.info.id)}>Supprimer</Button>
                            </Row>
                        </Container>
                    </Card.Footer>
                </Card>
            </div>
        );
    };
};

export default Activity;