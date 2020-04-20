import React from 'react'
import Messages from './Messages';
import Input from './Input';
const firebase = require('firebase')

class MainChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : null,
            chats: [],
        }
    }

    componentWillMount = () => {
        firebase.auth().onAuthStateChanged(async _usr => {
            if (!_usr)
                console.log('n est pas user')
            else {
                await firebase
                    .firestore()
                    .collection('groupchats')
                    .where('users', 'array-contains', _usr.email)
                    .onSnapshot(async res => {
                        const chats = res.docs.map(_doc => _doc.data());
                        await this.setState({
                            user: _usr.email,
                            chats: chats
                        })
                    })
            }
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
                <Messages chats={this.state.chats[0]} />
                <Input />
            </div>
        )
    }
}

export default MainChat;