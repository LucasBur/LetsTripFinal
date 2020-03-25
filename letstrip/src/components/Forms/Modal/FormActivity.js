import React, { useState } from 'react';
import auth from '../../../auth';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as Yup from "yup";
import { Formik } from "formik";

export const FormActivity = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createActivity = async (values) => {
        try {
            await auth.createActivity(values);
        } catch (error) {
            console.log(error)
        }
    }

    const option = () => {
        const num = [];
        for (let i = 1; i <= props.dayNumber; i++) {
            num.push(
                <option key={i} value={i}>{i}</option>
            )
        }
        return num;
    }

    return <Formik
        initialValues={{
            id: `${props.id}`,
            title: "",
            description: "",
            day: "",
            startHour: "",
            endHour:""
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log(values)
            createActivity(values)
            handleClose()
            resetForm();
            setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
            title: Yup.string().required("Titre requis.").min(1, "1 caractères minimum"),
            description: Yup.string(),
            day: Yup.string().required('Veuillez choisir le jour'),
            startHour: Yup.string().required("Choissiez une heure de départ")
                .min(2, "2 caractères minimum."),
            endHour: Yup.string().required("Choisissez une heure de fin"),
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
                                    <Form.Control 
                                        placeholder="Aller au marché de Barbès"
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.title && touched.title && "error"} />
                                    {errors.name && touched.name && (
                                        <div className="input-feedback">{errors.title}</div>
                                    )}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        name="description"
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        as="textarea" rows="3"
                                        placeholder="- Acheter couscous merguez, -Frapper un arabe, -Aller au grec"
                                        className={errors.description && touched.description && "error"} />
                                    {errors.description && touched.description && (
                                        <div className="input-feedback">{errors.description}</div>
                                    )}
                                </Form.Group>

                                <Form.Group controlId="exampleForm.ControlSelect1">
                                    <Form.Label>Jours</Form.Label>
                                    <Form.Control
                                        as="select"
                                        name="day"
                                        value={values.day}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.day && touched.day && "error"} >
                                        {option()}
                                    </Form.Control>
                                    {errors.day && touched.day && (
                                        <div className="input-feedback">{errors.day}</div>
                                    )}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Heure de départ</Form.Label>
                                    <Form.Control 
                                        name="startHour" type='time'
                                        value={values.startHour}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.startHour && touched.startHour && "error"} />
                                    {errors.startHour && touched.startHour && (
                                        <div className="input-feedback">{errors.startHour}</div>
                                    )}
                                    <Form.Label>Heure de fin</Form.Label>
                                    <Form.Control name="endHour" type='time'
                                        value={values.endHour}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.endHour && touched.endHour && "error"} />
                                    {errors.endHour && touched.endHour && (
                                        <div className="input-feedback">{errors.endHour}</div>
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