import React from 'react';
import jwt_decode from 'jwt-decode'
import auth from '../auth';
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'

class RoadMapList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            errors: {}
        };
    }

    componentDidMount() {
        const token = localStorage.token
        const decoded = jwt_decode(token)
        this.setState({
            first_name: decoded.firstname,
            last_name: decoded.lastname,
            email: decoded.email
        })
        console.log(decoded)
    }


    render() {
        return (
            <div>
                <Navbar>
                    <Button onClick={auth.logout}>logout</Button>
                </Navbar>
                <h1>hello  {this.state.first_name}</h1>
            </div>
        );
    }
}

export default RoadMapList;