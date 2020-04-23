import React from 'react';
import Input from './Input';
import Messages from './Messages';
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
const firebase = require('firebase')

class MainChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            chats: [],
        }
    }

    componentWillMount = () => {
        this.getMessages(50);
    }

    componentDidUpdate = () => {
        const container = document.getElementById('chatview-container');
        if (container)
            container.scrollTo(0, container.scrollHeight);
    }

    getMessages = async (rmId) => {
        await firebase.firestore().collection('groupChats').doc(rmId.toString()).collection('messages')
            .onSnapshot(async doc => {
                const chats = doc.docs.map(_doc => _doc.data());
                await this.setState({
                    chats: chats
                })
            }
            )
    }

    submitMessage = (data) => {
        firebase.firestore().collection('groupChats').doc('50').collection('messages')
            .add(data).then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    }

    render() {
        return (
            <div style={{ width: '100%' }}>
                <Row style={{ position: 'sticky', top: '0', zIndex: '1', backgroundColor: 'white', borderBottom: '1px solid gray' }}>
                    <Col>
                        <div style={{ display: "flex", justifyContent: 'space-between', width: '530px' }}>
                            <div>
                                <Image
                                    src='https://user.oc-static.com/files/6001_7000/6410.jpg'
                                    width='70'
                                    height='70'
                                    roundedCircle />
                            </div>
                            <div>
                                <h1>{this.props.rmName} - Group Chat</h1>
                                <h6 style={{ fontWeight: '300' }}>{this.props.rmNbrParticipants} Membres</h6>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row id="chatview-container">
                    <Col>
                        <Messages
                            chats={this.state.chats}
                            userPseudo={this.props.userPseudo} />
                    </Col>
                </Row>

                <Row style={{ position: 'sticky', bottom: '0', zIndex: '1', marginTop: '10px' }}>
                    <Col>
                        <Input
                            submitMessage={this.submitMessage}
                            userPseudo={this.props.userPseudo} />
                    </Col>
                </Row>
            </div>
        )
    }
}

export default MainChat;