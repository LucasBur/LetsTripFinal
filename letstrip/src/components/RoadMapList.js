import React from 'react';
import Button from 'react-bootstrap/Button'

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
                <Button variant="primary" onClick={this.createRoadMap}>
                    Créer une Road Map
                </Button>                
            </div>
        );
    }
}

export default RoadMapList;