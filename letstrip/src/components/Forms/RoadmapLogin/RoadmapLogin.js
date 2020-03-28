import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


class RoadmapLogin extends React.Component {

    render() {
        return (
            <Form>
                <h6>Rejoindre une Roadmap</h6>
                <Form.Group style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100px',
                    marginTop: "10px"
                }}>
                    {/* <Form.Label className='formLabel'>Nom de la Roadmap</Form.Label> */}
                    <Form.Control
                        placeholder='Nom Roadmap'
                        type="name" />

                    {/* <Form.Label className='formLabel'>Mot de passe de la Roadmap</Form.Label> */}
                    <Form.Control
                        placeholder='Mot de passe Roadmap'
                        type="password" />
                </Form.Group>

                <Button style={{backgroundColor:"#6666ff"}} variant="primary" size="md" block type="submit">
                    Valider
                </Button>
            </Form>
        )
    }
}

export default RoadmapLogin;