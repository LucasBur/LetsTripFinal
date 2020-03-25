import React, { useState } from 'react';
import auth from '../../../auth';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import * as Yup from "yup";
import { Formik } from "formik";

export const FormActivity = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const createActivity = async (values) => {
    //     try {
    //         await auth.createRoadmap(values);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const option = () => {
        const num = [];
        for (let i = 1; i <= props.dayNumber; i++) {
            num.push(
                <option key={i} value="{i}">{i}</option>
            )
        }
        return num;
    }

    return <Formik
        initialValues={{
            id: `${props.id}`,
            name: "",
            password: "",
            nbr_participants: "",
            location: "",
            startDate: "",
            endDate: "",
            budget: "",
            leader: ``,
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log(values)
            handleClose()
            resetForm();
            setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
            name: Yup.string().required("nom requis.")
                .min(2, "2 caractères minimum"),
            password: Yup.string()
                .required("No password provided.")
                .min(3, "Password is too short - should be 3 chars minimum."),
            nbr_participants: Yup.string().required("Nombre de participant requis.")
                .min(1, "1 personne minimum."),
            location: Yup.string().required("Destination requise.")
                .min(2, "2 caractères minimum."),
            startDate: Yup.string().required("Date de départ requise"),
            endDate: Yup.string().required("Date de retour requise"),
            budget: Yup.string().required("Budget requis").min(0, "Entrer 0 si vous ne savez pas"),
            leader: Yup.bool()
        })}>

        {props => {
            const { values, touched,
                errors, isSubmitting,
                handleChange, handleBlur,
                handleSubmit } = props;

            return (
                <>
                    <Button id='button-newroadmap' onClick={handleShow}>
                        Nouvelle Activité
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Créer votre Activité</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formGridName1">
                                    <Form.Label>Titre de l'Activité</Form.Label>
                                    <Form.Control placeholder="Aller au marché de Barbès"
                                        name="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.name && touched.name && "error"} />
                                    {errors.name && touched.name && (
                                        <div className="input-feedback">{errors.name}</div>
                                    )}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    {/* <input type='number' min='1'/> */}
                                    <Form.Control as="textarea" rows="3" 
                                        placeholder="- Acheter couscous merguez, -Frapper un arabe, -Aller au grec"/>
                                    {errors.nbr_participants && touched.nbr_participants && (
                                        <div className="input-feedback">{errors.nbr_participants}</div>
                                    )}
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Jours</Form.Label>
                                    <Form.Control as="select">
                                        {option()}
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Heure de départ</Form.Label>
                                    <Form.Control name="startHour" type='time'
                                        value={values.startDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.startDate && touched.startDate && "error"} />
                                    {errors.startDate && touched.startDate && (
                                        <div className="input-feedback">{errors.startDate}</div>
                                    )}
                                    <Form.Label>Heure de fin</Form.Label>
                                    <Form.Control name="endHour" type='time'
                                        value={values.endDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.endDate && touched.endDate && "error"}/>
                                    {errors.endDate && touched.endDate && (
                                        <div className="input-feedback">{errors.endDate}</div>
                                    )}
                                </Form.Group>

                                <Button variant="primary" type="submit" disabled={isSubmitting}>
                                    Submit
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </>
            )
        }}
    </Formik>
}