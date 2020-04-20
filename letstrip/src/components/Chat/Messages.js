import React from 'react';
import Card from 'react-bootstrap/Card'

const Messages = (props) => {
    return (
        props.chats === undefined ? <div>Loading ... </div> : props.chats.messages.map((_msg, _index) => {
            console.log(_msg)
            return (
                <Card key={_index} style={{
                    width: '300px',
                }}>
                    <Card.Body>
                        <Card.Title>{_msg.sender}</Card.Title>
                        <Card.Text>
                            {_msg.message}
                        </Card.Text>
                    </Card.Body>
                </Card>
            )
        })


    )
}

export default Messages;