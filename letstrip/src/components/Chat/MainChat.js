import React from 'react'
import Messages from './Messages';
import Input from './Input';
const firebase = require('firebase')

class MainChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chats: null,
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged(async _usr => {
            console.log(_usr)
            if (!_usr)
                console.log('n est pas user')
            else {
                await firebase
                    .firestore()
                    .collection('chats')
                    .where('users', 'array-contains', _usr.email)
                    .onSnapshot(async res => {
                        const chats = res.docs.map(_doc => _doc.data());
                        await this.setState({
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
                <Messages />
                <Input />
            </div>
        )
    }
}

export default MainChat;