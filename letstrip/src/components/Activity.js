import React from 'react';
import '../styles/Dashboard_style.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { FormActivityUpdate } from './Forms/Modal/FormActivityUpdate';
import { FormActivityLocalisation } from './Forms/Modal/FormActivityLocalisation'

class Activity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    };

    render() {
        return (
            <div style={{marginTop:'20px'}}>
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
                            <Row style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <FormActivityUpdate
                                    title={this.props.info.title}
                                    description={this.props.info.description}
                                    dayNumber={this.props.dayNbr}
                                    day={this.props.info.day}
                                    startHour={this.props.info.startHour}
                                    endHour={this.props.info.endHour}
                                    id={this.props.info.id} />
                                <FormActivityLocalisation
                                    id={this.props.info.id}
                                    lat={this.props.info.latitude}
                                    lng={this.props.info.longitude}
                                    rmId={this.props.rmId}
                                    day={this.props.info.day}
                                    getActivities={this.props.getActivities} />
                                <Button variant="outline-danger"
                                    size="sm"
                                    onClick={() => this.props.deleteActivity(this.props.info.id)}>
                                    Supprimer</Button>
                            </Row>
                        </Container>
                    </Card.Footer>
                </Card>
            </div>
        );
    };
};

export default Activity;