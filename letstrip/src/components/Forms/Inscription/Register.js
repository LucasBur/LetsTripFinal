import React from 'react';
import auth from '../../../auth';
import Button from 'react-bootstrap/Button'
import * as Yup from "yup";
import { Formik } from "formik";
import '../../../styles/Register_styles.css'

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
                        <div className="homepage-register-form">
                            <h3 style={{ textAlign: 'center' }}>Rejoignez-nous</h3>
                            <form onSubmit={handleSubmit} className="register-form">
                                <div className='register-form-global-div'>
                                    <div>
                                        <label htmlFor="pseudo">Pseudo</label>
                                        <input
                                            name="pseudo"
                                            type="text"
                                            value={values.pseudo}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.pseudo && touched.pseudo && "error"} />
                                        {errors.pseudo && touched.pseudo && (
                                            <div className="input-feedback">{errors.pseudo}</div>
                                        )}


                                        <label htmlFor="lastname">Nom de Famille</label>
                                        <input
                                            name="lastname"
                                            type="text"
                                            value={values.lastname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.lastname && touched.lastname && "error"} />
                                        {errors.lastname && touched.lastname && (
                                            <div className="input-feedback">{errors.lastname}</div>
                                        )}


                                        <label htmlFor="firstname">Prénom</label>
                                        <input
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

                                    <div className='register-form-emailpw'>

                                        <label htmlFor="email">Email</label>
                                        <input
                                            name="email"
                                            type="text"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.email && touched.email && "error"} />
                                        {errors.email && touched.email && (
                                            <div className="input-feedback">{errors.email}</div>
                                        )}


                                        <label htmlFor="email">Password</label>
                                        <input
                                            name="password"
                                            type="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.password && touched.password && "error"} />
                                        {errors.password && touched.password && (
                                            <div className="input-feedback">{errors.password}</div>
                                        )}
                                    </div>
                                </div>

                                <div className='register-form-button'>
                                    <Button onClick={this.props.registerFormProps}
                                        variant="secondary"
                                        size="sm">Vous êtes déjà membre ?</Button>
                                    <Button type="submit" disabled={isSubmitting}>
                                        Login
                                    </Button>
                                </div>
                            </form>
                        </div>
                    );
                }}
            </Formik>


        )
    }
}

export default Register;