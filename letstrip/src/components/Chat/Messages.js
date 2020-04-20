import React from 'react';
import Card from 'react-bootstrap/Card'

const Messages = (props) => {
    return (
        <Card style={{
            width:'300px',
        }}>
            <Card.Body>
                <Card.Title>User95</Card.Title>
                <Card.Text>Hey bro! How are you??</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Messages;