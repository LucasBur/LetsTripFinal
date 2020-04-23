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
                            width='40px'
                            height='40px'
                            roundedCircle />
                        <div style={{marginLeft:'10px'}}>
                            <span style={{ display: 'flex', width: '200px', justifyContent: 'space-between' }}>
                                <h6>{_msg.pseudo}</h6>
                                <time style={{color:'gray', fontSize:'0.8rem'}}>{moment(_msg.date).format('h:mm:ss a')}</time>
                            </span>

                            <p style={{wordWrap: 'break-word', width:'80%', fontSize:'0.9rem'}}>{_msg.msg}</p>
                        </div>
                    </div>
                )
            })
    )
}

export default Messages;