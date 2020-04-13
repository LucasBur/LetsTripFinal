import React, { useState } from 'react';
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
// import Form from 'react-bootstrap/Form';
// import * as Yup from "yup";
// import { Formik } from "formik";
import MapContainer from '../../MapContainer'

export const FormActivityLocalisation = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    var lat = parseFloat(props.lat)
    var lng = parseFloat(props.lng)

    const modalStyle = {
        'width': '90vw',
        'max-width': '90vw',
        'height': '1000px'
    }

    const saveLocalisation = () => {
        const values = {
            lat: lat,
            lng: lng
        }

        axios.put(`http://localhost:4000/SetLocationActivity/${props.id}`,
                    values,
                    { headers: { "Content-Type": "application/json" } })
        .then(() => {
            props.getActivities(props.rmId, props.day)
            handleClose()
        })
    }

    const onChangeLocation = (markerLat, markerLng) => {
        lat = markerLat
        lng = markerLng
    }

    return (
        <>
            <Button variant="outline-success" size="sm" onClick={handleShow}>Localiser 📍</Button>

            <Modal show={show} onHide={handleClose} animation={false} size="lg" dialogClassName={modalStyle}>
                <Modal.Header closeButton>
                    <Modal.Title>Localiser l'activité</Modal.Title>
                </Modal.Header>
                <Modal.Body>                    
                    <MapContainer onChangeLocation={onChangeLocation} lat={lat} lng={lng}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" size="sm" onClick={saveLocalisation}>Enregistré</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}