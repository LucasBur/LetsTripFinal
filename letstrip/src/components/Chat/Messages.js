import React from 'react';
import Spinner from 'react-bootstrap/Spinner'
import Image from 'react-bootstrap/Image'
import moment from 'moment';
moment.locale('fr')

const Messages = (props) => {
    const dateMsg = (date, pseudo) => {
        let currentTime = Date.now();
        if (moment(date).format('MMMM Do YYYY') !== moment(currentTime).format('MMMM Do YYYY')) {
            return (
                <span style={{ display: 'flex', width: '400px', justifyContent: 'space-between' }}>
                    <h6>{pseudo}</h6>
                    <time style={{ color: 'gray', fontSize: '0.8rem' }}>{moment(date).format('MMMM Do YYYY, HH:mm:ss')}</time>
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
                <span style={{ display: 'flex', width: '200px', justifyContent: 'space-between' }}>
                    <h6>{pseudo}</h6>
                    <time style={{ color: 'gray', fontSize: '0.8rem' }}>{moment(date).format('HH:mm:ss')}</time>
                </span>
            )
        }
    }

    const containerStyle = {
        display: 'flex', marginTop: '10px', marginLeft: '35px'
    }

    const msgStyle = {
        wordWrap: 'break-word', width: '80%', fontSize: '0.9rem'
    }
    
    return (
        props.chats.length === 0 ?

            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            :
            props.chats.map((_msg, _index) => {
                return (
                    <div key={_index} style={containerStyle}>
                        <Image
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsnNC4gbMmE2V5uSBoN0UXhTbLKLpei7bn1j8AUso5JgebGpZv&usqp=CAU'
                            width='40px'
                            height='40px'
                            roundedCircle />
                        <div style={{ marginLeft: '10px' }}>
                            {dateMsg(_msg.date, _msg.pseudo)}
                            <p style={msgStyle}>{_msg.msg}</p>
                        </div>
                    </div>
                )
            })
    )
}

export default Messages;