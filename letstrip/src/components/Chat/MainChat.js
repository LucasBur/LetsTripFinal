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
            url: ''
        }
    }

    componentWillMount = () => {
        this.getMessages(this.props.rmId);
        firebase.storage().ref(`images/${this.props.userId}`).child(this.props.userId.toString()).getDownloadURL().then(url => {
            this.setState({ url: url })
        })
    }

    getMessages = async (rmId) => {
        await firebase.firestore().collection('groupChats').doc(rmId.toString()).collection('messages').orderBy('date')
            .onSnapshot(async doc => {
                const chats = doc.docs.map(_doc => _doc.data());
                await this.setState({
                    chats: chats
                })
            }
            )
    }

    submitMessage = (data) => {
        firebase.firestore().collection('groupChats').doc(this.props.rmId).collection('messages')
            .add(data).then(function () {
                console.log("Document successfully written!");
            })
            .catch(function (error) {
                console.error("Error writing document: ", error);
            });
    }

    click = (e) => {
        e.preventDefault()
        firebase.firestore().collection('groupChats').doc('1').collection('messages/1')
        .add({msg :'dogo'}).then(function () {
            console.log("Document successfully written!");
        })
        .catch(function (error) {
            console.error("Error writing document: ", error);
        });
    }

    render() {
        const container = {
            width: '100%', height: '90vh', display: 'flex', justifyContent: 'space-between', flexDirection: 'column'
        }
        const headerStyle = {
            position: 'sticky', top: '0', zIndex: '1', backgroundColor: 'white', borderBottom: '1px solid gray'
        }

        const headerChildStyle = {
            display: "flex", justifyContent: 'space-between', width: '560px'
        }

        const footerStyle = {
            position: 'sticky', zIndex: '1', bottom: '0'
        }
        return (
            <div style={container}>
                <button onClick={this.click.bind(this)}>click</button>
                <Col>
                    <Row style={headerStyle}>
                        <Col>
                            <div style={headerChildStyle}>
                                <div>
                                    <Image
                                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTL08lwqPFI-S8kfnAm2tKVq-9RZmXWoVZaL2aKHgp1F7MwwTwp&usqp=CAU'
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
                    <Row>
                        <Col>
                            <Messages
                                chats={this.state.chats}
                                userPseudo={this.props.userPseudo}
                                urlProfil={this.state.url} />
                        </Col>
                    </Row>
                </Col>

                <Row style={footerStyle}>
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