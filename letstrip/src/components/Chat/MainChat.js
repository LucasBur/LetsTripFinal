import React from 'react'
import Messages from './Messages';
import Input from './Input';
const firebase = require('firebase')

class MainChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            chats: [],
        }
    }

    componentWillMount = async () => {
        // await firebase
        //     .firestore()
        //     .collection('groupchats')
        //     .where('users', 'array-contains', this.props.userEmail)
        //     .onSnapshot(async res => {
        //         const chats = res.docs.map(_doc => _doc.data());
        //         await this.setState({
        //             user: this.props.userEmail,
        //             chats: chats
        //         })
        //     })
        
        await firebase.firestore().collection('groupChats').doc('50').collection('messages')
            .onSnapshot(doc => console.log('doc : ', doc))
                    

    }


    render() {
        console.log(this.props.userEmail)
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                height: '70vh'
            }}>
                {/* <Messages  /> */}
                <Input />
            </div>
        )
    }
}

export default MainChat;