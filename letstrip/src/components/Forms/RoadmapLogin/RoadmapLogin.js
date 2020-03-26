import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import map from '../../../design/icons/map-marked-alt-solid.svg';

class RoadmapLogin extends React.Component {

    render() {
        return (
            <Form>
                <h3>Rejoindre une Roadmap <img src={map} alt='roadmap' width="30" height='30'></img> </h3>
                <Form.Group>
                    <Form.Label className='formLabel'>Nom de la Roadmap</Form.Label>
                    <Form.Control
                        style={{ backgroundColor: '#ECECEC' }}
                        type="name" />

                    <Form.Label className='formLabel'>Mot de passe de la Roadmap</Form.Label>
                    <Form.Control
                        style={{ backgroundColor: '#ECECEC' }}
                        type="password" />
                </Form.Group>

                <Button variant="light" type="submit">
                    Valider
                </Button>
            </Form>
        )
    }
}

export default RoadmapLogin;