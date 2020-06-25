import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as Yup from "yup";
import { Formik } from "formik";

export const FormUpdateEmail = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changeEmail = async (values) => {
        try {
            const updateEmail = await axios.put(`http://localhost:4000/update-email/${values.id}`,
                values, { headers: { "Content-Type": "application/json" } });
            console.log('updatePw : ', updateEmail)
            localStorage.setItem('token', updateEmail.data);
            props.notify('success', 'Email mis à jour ✔')

        } catch (error) {
            console.error(error)
        }
    }

    return <Formik
        initialValues={{
            id: `${props.userId}`, email : ''
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log(values)
            changeEmail(values)
            handleClose()
            resetForm();
            setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
            newEmail: Yup.string()
                .email('Email non valide')
                .required("Nouvel Email requis"),
        })}>

        {props => {
            const { values, touched,
                errors, isSubmitting,
                handleChange, handleBlur,
                handleSubmit } = props;

            return (
                <>
                    <Button variant="outline-dark" size="sm" className="mr-1" onClick={handleShow}>
                        Modifier votre E-mail
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modifier votre Mot de Passe</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="formGridName1">
                                    <Form.Label>Entrer la nouvelle adresse E-mail</Form.Label>
                                    <Form.Control
                                        placeholder="E-mail"
                                        name="newEmail"
                                        type="text"
                                        value={values.newEmail}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.newEmail && touched.newEmail && "error"} />
                                    {errors.newEmail && touched.newEmail && (
                                        <div className="input-feedback">{errors.newEmail}</div>
                                    )}
                                </Form.Group>

                                <Button style={{ backgroundColor: "#6666ff" }} type="submit" disabled={isSubmitting}>
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