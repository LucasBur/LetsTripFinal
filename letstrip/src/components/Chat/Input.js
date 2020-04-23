import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const Input = (props) => {
    const [chat, setChat] = useState('');
    const handleChange = (event) => setChat(event.target.value);
    const onSubmit = (event) => {
        event.preventDefault();
        if (chat === '') {
            console.log('empty msg')
        } else {
            let data = {
                date: Date.now(),
                msg: chat,
                pseudo: props.userPseudo
            }
            setChat('')
            props.submitMessage(data);
        }
    }

    return (
        <Form onSubmit={onSubmit}>
            <InputGroup >
                <Form.Control
                    style={{ height: '50px' }}
                    value={chat}
                    onChange={handleChange}
                    type='text'
                    placeholder='Enter your message ...'
                />
                <InputGroup.Append>
                    <Button type='submit' style={{ width: '100px' }}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </Form>
    )
}

export default Input;