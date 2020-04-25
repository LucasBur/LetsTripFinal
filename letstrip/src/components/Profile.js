import React from 'react';
import jwt_decode from 'jwt-decode'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row';
import Sidebar from './Sidebar';
import { FormUpdateUser } from './Forms/Update/FormUpdateUser';
import onizukadauphin from '../design/wallpaper/onizukadauphin.jpg'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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

    notify = (type, message) => {
        switch (type) {
            case '':
                toast(message, { autoClose: 4000, position: toast.POSITION.BOTTOM_RIGHT })
                break;
            case 'info':
                toast.info(message)
                break;
            case 'success':
                toast.success(message)
                break;
            case 'error':
                toast.error(message)
                break;
            default:
                break;
        }

    }

    handleUpload = e => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0]
            })
            this.notify('', 'Image reçu, cliquer sur Enregistrer pour la sauvegarder')
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
    }

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
        const urlProfile = '/profile/' + this.state.userId
        return (
            <div className="profile">
                <Sidebar />
                <ul style={{ marginTop: '50px', marginLeft: '50px', width: '100%', height: '90vh', overflow: 'auto' }}>
                    <Col as={Row} style={{ alignItems: 'center' }}>
                        <Col sm={5}>
                            {this.state.url === '' ?
                                <div>
                                    <img src={onizukadauphin} width='250' height='250' alt='onizuka' />
                                </div>
                                :
                                <div>
                                    <img src={this.state.url} width='250' height='250' alt='profil' />
                                </div>
                            }
                        </Col>
                        <Col sm={7}>
                            <h1> {this.state.userFirst_name} {this.state.userLast_name} </h1>
                            <span>
                                <a href={urlProfile} alt='email'> {this.state.userEmail} </a>
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
                            urlPic={this.state.url}
                            getUser={this.getUser}
                            handleUpload={this.handleUpload}
                            onUpload={this.onUpload}
                            notify={this.notify} />
                    </li>
                </ul>
            </div>
        )
    }
}

export default Profile;