import React from 'react';
import Input from './Input';
import Messages from './Messages';
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

    getMessages = async (rmId) => {
        await firebase.firestore().collection('groupChats').doc(rmId.toString()).collection('messages')
            .onSnapshot(doc => {
                const data = [];
                doc.forEach(el => {
                    data.push(el.data())
                })
                this.setState({
                    chats: [...this.state.chats, data]
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
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                height: '70vh'
            }}>
                <Messages 
                    chats={this.state.chats[0]} />
                <Input 
                    submitMessage={this.submitMessage}
                    userEmail={this.props.userEmail} />
            </div>
        )
    }
}

export default MainChat;