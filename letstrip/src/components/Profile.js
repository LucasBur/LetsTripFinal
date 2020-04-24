import React from 'react';
import jwt_decode from 'jwt-decode'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import Sidebar from './Sidebar';
import { FormUpdateUser } from './Forms/Update/FormUpdateUser';
import onizukadauphin from '../design/wallpaper/onizukadauphin.jpg'
import '../styles/Profile_style.css'
const firebase = require('firebase')

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpload = this.handleUpload.bind(this)
        this.onUpload = this.onUpload.bind(this)
        this.state = {
            userId: '',
            userFirst_name: '',
            userLast_name: '',
            userPseudo: '',
            userEmail: '',
            showAvatar: true,
            image: null,
            url: '',
        };
    }

    handleUpload = e => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0]
            })
        }
    }

    onUpload = () => {
        const image = this.state.image;
        const uploadTask = firebase.storage().ref(`images/${this.state.userId}/${this.state.userId}`).put(image);
        uploadTask.on('state_changed',
            snapshot => {

            },
            error => {
                console.log(error);
            },
            () => {
                firebase.storage().ref(`images/${this.state.userId}`).child(this.state.userId.toString()).getDownloadURL().then(url => {
                    this.setState({ url: url })
                })
            })
    }

    async componentWillMount() {
        await this.getUser()
        firebase.storage().ref(`images/${this.state.userId}`).child(this.state.userId.toString()).getDownloadURL().then(url => {
            this.setState({ url: url })
        })
        // const data = await firebase.storage().ref(`images/1`).listAll()
        // const path = data.items[0].location.path
        // console.log(path)
        // .getDownloadURL().then(url => {
        //     this.setState({ url: url })
        // })
    }

    // getNameFile = (data) => {
    //     for (let i =0; i < data.length; i++) {
    //         console.log(data)
    //     }
    // }

    getUser = () => {
        const token = localStorage.token;
        const decoded = jwt_decode(token);
        this.setState({
            userId: decoded.id,
            userFirst_name: decoded.firstname,
            userLast_name: decoded.lastname,
            userPseudo: decoded.pseudo,
            userEmail: decoded.email,
        });
    }

    render() {
        console.log(this.state.url)
        return (
            <div className="profile">
                <Sidebar />
                <ul style={{ marginTop: '50px', marginLeft: '50px', width: '100%', height: '90vh', overflow: 'auto' }}>
                    <Col as={Row} style={{ alignItems: 'center' }}>
                        <Col sm={5}>
                            {/* {
                                this.state.url === '' ? null :  */}

                            <div>
                                <img src={this.state.url} width='50%' alt='onizukadauphin' />
                                <input type='file' onChange={this.handleUpload} />
                            </div>
                            {/* } */}
                        </Col>
                        <Col sm={7}>
                            <h1> {this.state.userFirst_name} {this.state.userLast_name} </h1>
                            <span>
                                <a href="/profile/:id" alt='email'> {this.state.userEmail} </a>
                            </span>

                        </Col>
                    </Col>

                    <h1>Mon Compte</h1>
                    <hr></hr>
                    <li>
                        <FormUpdateUser
                            userId={this.props.match.params.id}
                            userPseudo={this.state.userPseudo}
                            userEmail={this.state.userEmail}
                            userFirstName={this.state.userFirst_name}
                            userLastName={this.state.userLast_name}
                            getUser={this.getUser}
                            onUpload={this.onUpload} />
                    </li>
                </ul>
            </div>
        )
    }
}

export default Profile;