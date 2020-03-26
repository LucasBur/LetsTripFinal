import React from 'react';
import auth from '../../../auth';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import * as Yup from "yup";
import { Formik } from "formik";
import '../../../styles/Register_style.css'

class Register extends React.Component {
    signupSubmit = async (values) => {
        try {
            await auth.signup(values)
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <Formik
                initialValues={{ pseudo: "", firstname: "", lastname: "", email: "", password: "" }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    this.signupSubmit(values)
                    // console.log(values)
                    resetForm();
                    setSubmitting(false);
                }}
                validationSchema={Yup.object().shape({
                    pseudo: Yup.string().required("Pseudo requis.")
                        .min(2, "2 caractères minimum"),
                    firstname: Yup.string().required("Prénom requis.")
                        .min(2, "2 caractères minimum"),
                    lastname: Yup.string().required("Nom de famille requis.")
                        .min(2, "2 caractères minimum"),
                    email: Yup.string()
                        .email('Email non valide')
                        .required("Email requis"),
                    password: Yup.string()
                        .required("No password provided.")
                        .min(8, "Password is too short - should be 8 chars minimum.")
                        .matches(/(?=.*[0-9])/, "Password must contain a number.")
                })}>

                {props => {
                    const { values, touched,
                        errors, isSubmitting,
                        handleChange, handleBlur,
                        handleSubmit } = props;
                    return (
                        <div>
                            <h3 style={{ textAlign: 'center' }}>Rejoignez-nous</h3>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <div>
                                        <Form.Label>Pseudo</Form.Label>
                                        <Form.Control
                                            name="pseudo"
                                            type="text"
                                            value={values.pseudo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.pseudo && touched.pseudo && "error"} />
                                        {errors.pseudo && touched.pseudo && (
                                            <div className="input-feedback">{errors.pseudo}</div>
                                        )}


                                        <Form.Label>Nom de Famille</Form.Label>
                                        <Form.Control
                                            name="lastname"
                                            type="text"
                                            value={values.lastname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.lastname && touched.lastname && "error"} />
                                        {errors.lastname && touched.lastname && (
                                            <div className="input-feedback">{errors.lastname}</div>
                                        )}


                                        <Form.Label htmlFor="firstname">Prénom</Form.Label>
                                        <Form.Control
                                            name="firstname"
                                            type="text"
                                            value={values.firstname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.firstname && touched.firstname && "error"} />
                                        {errors.firstname && touched.firstname && (
                                            <div className="input-feedback">{errors.firstname}</div>
                                        )}
                                    </div>

                                    <Form.Group>
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            name="email"
                                            type="text"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.email && touched.email && "error"} />
                                        {errors.email && touched.email && (
                                            <div className="input-feedback">{errors.email}</div>
                                        )}


                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            name="password"
                                            type="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.password && touched.password && "error"} />
                                        {errors.password && touched.password && (
                                            <div className="input-feedback">{errors.password}</div>
                                        )}
                                    </Form.Group>
                                </Form.Group>

                                <Form.Group>
                                    <Button onClick={this.props.registerFormProps}
                                        variant="secondary"
                                        style={{background:'none', border:'none'}}>Vous êtes déjà membre ?</Button>
                                    <Button style={{float:'right'}} variant="light" type="submit" disabled={isSubmitting}>
                                        Login
                                    </Button>
                                </Form.Group>
                            </Form>
                        </div>
                    );
                }}
            </Formik>


        )
    }
}

export default Register;