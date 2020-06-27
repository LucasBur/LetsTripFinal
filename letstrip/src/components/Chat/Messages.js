import React, { useEffect, useRef, useState } from 'react';
import Image from 'react-bootstrap/Image'
import moment from 'moment';
moment.locale('fr')
const firebase = require('firebase')

const Messages = (props) => {
    const [url, setUrl] = useState('')

    useEffect(() => {
        if (divRef.current !== null) {
            divRef.current.scrollIntoView({ behavior: 'smooth' })
        }
        getProfilePictures(props.chats.id)
    })
    const getProfilePictures = async (id) => {
        await
            firebase.storage().ref(`images/${id}`).child(id.toString()).getDownloadURL().then(url => {
                setUrl(url)
            })
    }

    const divRef = useRef(null);

    const dateMsg = (date, pseudo) => {
        let currentTime = Date.now();
        if (moment(date).format('MMMM Do YYYY') !== moment(currentTime).format('MMMM Do YYYY')) {
            return (
                <span className='date-msg-1'>
                    <h6>{pseudo}</h6>
                    <time style={{ color: 'gray', fontSize: '0.8rem' }}>{moment(date).format('MMMM Do, HH:mm:ss')}</time>
                </span>
            )
        } else if (moment(date).format('MMMM Do YYYY, HH:mm:ss') === 'Invalid date') {
            return (
                <span style={{ width: '150px' }}>
                    <h6>{pseudo}</h6>
                </span>
            )
        } else {
            return (
                <span className='date-msg-2'>
                    <h6>{pseudo}</h6>
                    <time style={{ color: 'gray', fontSize: '0.8rem' }}>{moment(date).format('HH:mm')}</time>
                </span>
            )
        }
    }

    const containerStyle = {
        display: 'flex', marginTop: '10px'
    }

    const msgStyle = {
        wordWrap: 'break-word', width: '80%', fontSize: '0.9rem'
    }

    return (
        <div style={containerStyle} ref={divRef}>
            <Image
                src={url}
                width='40px'
                height='40px'
                roundedCircle />
            <div style={{ marginLeft: '10px', width: '100%' }}>
                {dateMsg(props.chats.date, props.chats.pseudo)}
                <p style={msgStyle}>{props.chats.msg}</p>
            </div>
        </div>
    )
}

export default Messages;