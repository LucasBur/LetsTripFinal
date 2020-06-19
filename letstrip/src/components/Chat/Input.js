import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faSmile } from '@fortawesome/free-solid-svg-icons'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

const Input = (props) => {
    const [chat, setChat] = useState('');
    const [showEmoji, setShowEmoji] = useState(false)

    const handleChange = (event) => setChat(event.target.value);

    const handleEmoji = () => {
        setShowEmoji(!showEmoji)
    }

    const addEmoji = (event) => {
        let emoji = event.native;
        setChat(chat + emoji)
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (chat === '') {
            console.log('empty msg')
        }
        else {
            let data = {
                date: Date.now(),
                msg: chat,
                pseudo: props.userPseudo,
                id: props.userId
            }
            setChat('')
            props.submitMessage(data);
            setShowEmoji(false)
        }
    }

    const buttonStyle = {
        width: '100px', backgroundColor: '#6666ff', borderColor: '#6666ff'
    };
    const buttonStylePhone = {
        width: '40px', backgroundColor: '#6666ff', borderColor: '#6666ff'
    }

    const buttonStyle2phone = {
        width: '40px', backgroundColor: '#ffc107', borderColor: '#ffc107'
    };
    const buttonStyle2 = {
        width: '100px', backgroundColor: '#ffc107', borderColor: '#ffc107'
    }
    const emojiStyle = {
        width: '315px'
    };

    return (
        <div>
            {showEmoji ? <InputGroup.Append style={emojiStyle}>
                <span>
                    <Picker onSelect={addEmoji} style={window.innerWidth < 376 ? emojiStyle : null} />
                </span>
            </InputGroup.Append> : null}

            <Form onSubmit={onSubmit}>
                <InputGroup>
                    <Form.Control
                        style={{ height: '50px' }}
                        value={chat}
                        onChange={handleChange}
                        type='text'
                        placeholder='Enter your message ...'
                    />
                    <InputGroup.Append>
                        <Button
                            style={
                                window.innerWidth < 376 ?
                                    buttonStyle2phone : buttonStyle2
                            }
                            onClick={handleEmoji}>
                            <FontAwesomeIcon icon={faSmile} />
                        </Button>
                    </InputGroup.Append>

                    <InputGroup.Append>
                        <Button type='submit'
                            style={window.innerWidth < 378 ? buttonStylePhone : buttonStyle}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>
        </div>
    )
}

export default Input;