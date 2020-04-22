import React from 'react';
import Spinner from 'react-bootstrap/Spinner'
import Image from 'react-bootstrap/Image'
import moment from 'moment';

const Messages = (props) => {

    return (
        props.chats === undefined ?

            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
            :
            props.chats.map((_msg, _index) => {
                console.log(_msg)
                return (
                    // <Card key={_index} style={_msg.pseudo === props.userPseudo ? userStyles1 : userStyles2}>
                    //     <Card.Body>
                    //         <Card.Title>{_msg.pseudo}</Card.Title>
                    //         <Card.Text>
                    //             {_msg.msg}
                    //         </Card.Text>
                    //     </Card.Body>
                    // </Card>


                    <div key={_index} style={{display:'flex', marginTop:'10px', marginLeft:'35px' }}>
                        <Image
                            src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTsnNC4gbMmE2V5uSBoN0UXhTbLKLpei7bn1j8AUso5JgebGpZv&usqp=CAU'
                            width='50px'
                            height='50px'
                            roundedCircle />
                        <div style={{marginLeft:'10px'}}>
                            <span style={{ display: 'flex', width: '300px', justifyContent: 'space-between' }}>
                                <h6>{_msg.pseudo}</h6>
                                <time>{moment(_msg.date).fromNow()}</time>
                            </span>

                            <p style={{wordWrap: 'break-word', width:'80%', fontSize:'0.9rem'}}>{_msg.msg}</p>
                        </div>
                    </div>
                )
            })
    )
}

export default Messages;