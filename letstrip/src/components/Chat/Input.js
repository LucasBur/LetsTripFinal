import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'

const Input = (props) => {
    const [chat, setChat] = useState('');

    const handleChange = (event) => setChat(event.target.value);
    const onSubmit = (event) => {
        event.preventDefault();
        let data = {
            date: Date.now(),
            msg: chat,
            pseudo: 'valentin95'
        }
        props.submitMessage(data);
    }

    return (
        <Form style={{ display: 'flex' }} onSubmit={onSubmit}>
            <Form.Control
                onChange={handleChange}
                type='text'
                placeholder='Enter your message ...'
                style={{
                    width: '70%'
                }} />
            <FontAwesomeIcon icon={faCogs} type='submit' />
        </Form>
    )
}

export default Input;