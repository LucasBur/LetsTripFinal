import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import * as Yup from "yup";
import { Formik } from "formik";

export const FormUpdatePassword = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changePassword = async (values) => {
        try {
            const updatePw = await axios.put(`http://localhost:4000/update-password/${values.id}`,
                values, { headers: { "Content-Type": "application/json" } });
            console.log('updatePw : ', updatePw)
            if (updatePw.data === false) {
                props.notify('error', 'Mot de passe incorrect ✘')
            }
            else {
                localStorage.setItem('token', updatePw.data);
                props.notify('success', 'Mot de passe mis à jour ✔')
            }

        } catch (error) {
            console.error(error)
        }
    }

    return <Formik
        initialValues={{
            id: `${props.userId}`,
            currentPassword: '',
            newPassword: '', passwordConfirmation: ''
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log(values)
            changePassword(values)
            handleClose()
            resetForm();
            setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
            currentPassword: Yup.string()
                .required("Mot de passe requis."),
            newPassword: Yup.string()
                .required("Nouveau Mot de passe requis.")
                .min(8, "8 caractères minimum.")
                .matches(/(?=.*[0-9])/, "Doit contenir minimum 1 chiffre"),
            passwordConfirmation: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        })}>

        {props => {
            const { values, touched,
                errors, isSubmitting,
                handleChange, handleBlur,
                handleSubmit } = props;

            return (
                <>
                    <Button variant="outline-dark" size="sm" className="mr-1" onClick={handleShow}>
                        Modifier votre Mot de Passe
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Modifier votre Mot de Passe</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <Form onSubmit={handleSubmit}>

                                <Form.Group controlId="formGridName1">
                                    <Form.Label>Votre Mot de Passe actuel</Form.Label>
                                    <Form.Control
                                        name="currentPassword"
                                        type="password"
                                        value={values.currentPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.currentPassword && touched.currentPassword && "error"} />
                                    {errors.password && touched.password && (
                                        <div className="input-feedback">{errors.currentPassword}</div>
                                    )}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Nouveau Mot de Passe</Form.Label>
                                    <Form.Control
                                        name="newPassword"
                                        type="password"
                                        value={values.newPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.newPassword && touched.newPassword && "error"} />
                                    {errors.newPassword && touched.newPassword && (
                                        <div className="input-feedback">{errors.newPassword}</div>
                                    )}
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label>Confirmer nouveau Mot de Passe</Form.Label>
                                    <Form.Control
                                        name="passwordConfirmation"
                                        type="password"
                                        value={values.passwordConfirmation}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.passwordConfirmation && touched.passwordConfirmation && "error"} />
                                    {errors.passwordConfirmation && touched.passwordConfirmation && (
                                        <div className="input-feedback">{errors.passwordConfirmation}</div>
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