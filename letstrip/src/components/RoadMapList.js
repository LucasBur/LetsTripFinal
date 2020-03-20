import React from 'react';
import auth from '../auth';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'

class RoadMapList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.createRoadMap = this.createRoadMap.bind(this);
    }

    createRoadMap = () => {
        console.log('azdazdazdazd');
    }

    render() {
        return (         
            <div>
                <Navbar>
                    <Button onClick={auth.logout}>logout</Button>
                </Navbar>
                <h1>hello  </h1>
                <Button variant="primary" onClick={this.createRoadMap}>
                    Créer une Road Map
                </Button>                
            </div>
        );
    }
}

export default RoadMapList;