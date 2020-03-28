import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import * as Yup from "yup";
import { Formik } from "formik";
import auth from '../../../auth';

export const FormUpdateUser = (props) => {
    const email = props.userEmail;
    const pseudo = props.userPseudo;
    const firstName = props.userFirstName;
    const lastName = props.userLastName;

    const updateUserSetting = async (values) => {
        try {
            await auth.updateUserProfile(values);
            window.location = '/profile/'+props.id
        } catch (error) {
            console.log(error)
        }
    };

    return <Formik
        initialValues={{
            id: `${props.userId}`, pseudo: "", firstName: "", lastName: "", email: ""
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            updateUserSetting(values);
            resetForm();
            setSubmitting(false);
        }}
        validationSchema={Yup.object().shape({
            pseudo: Yup.string().required("pseudo requis.")
                .min(2, "2 caractères minimum"),
            email: Yup.string()
                .email('Email non valide')
                .required("Email requis"),
            firstName: Yup.string().required("Prénom requis.")
                .min(2, "2 caractères minimum"),
            lastName: Yup.string().required("Nom de famille requis.")
                .min(2, "2 caractères minimum"),
        })}>

        {props => {
            const { values, touched,
                errors, isSubmitting,
                handleChange, handleBlur,
                handleSubmit } = props;
            return (
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row}>
                        <Form.Label column sm="5">
                            Pseudo
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                placeholder={pseudo}
                                name="pseudo"
                                value={values.pseudo}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.pseudo && touched.pseudo && "error"} />
                            {errors.pseudo && touched.pseudo && (
                                <div className="input-feedback">{errors.pseudo}</div>
                            )}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="5">
                            Email
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                placeholder={email}
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.email && touched.email && "error"} />
                            {errors.email && touched.email && (
                                <div className="input-feedback">{errors.email}</div>
                            )}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="5">
                            Password
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control readOnly type="password" placeholder="Password" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="5">
                            Prénom
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                placeholder={firstName}
                                name="firstName"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.firstName && touched.firstName && "error"}
                            />
                            {errors.firstName && touched.firstName && (
                                <div className="input-feedback">{errors.firstName}</div>
                            )}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="5">
                            Nom de famille
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control
                                placeholder={lastName}
                                name="lastName"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.lastName && touched.lastName && "error"} />
                            {errors.lastName && touched.lastName && (
                                <div className="input-feedback">{errors.lastName}</div>
                            )}
                        </Col>
                    </Form.Group>

                    <Button id="button-formupdateuser-submit" type="submit" disabled={isSubmitting}>
                        Submit
                    </Button>

                </Form>
            )
        }}
    </Formik>
}