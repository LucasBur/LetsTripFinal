import React from 'react';
import auth from '../../../auth'
import { Formik } from "formik";
import * as Yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import connect from '../../../design/icons/lock-solid.svg';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.loginSubmit = this.loginSubmit.bind(this);
    }

    loginSubmit = async (values) => {
        // try {
        //     const {data} = await auth.login(values);
        //     // console.log(data)
        // } catch (error) {
        //     console.log(error)
        // }
        await auth.login(values)
    }

    render() {
        return (
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    this.loginSubmit(values)
                    resetForm();
                    setSubmitting(false);
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .email('Email non valide')
                        .required("Email requis"),
                    password: Yup.string()
                        .required("No password provided.")
                })}>
                {({
                    values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting
                }) => (
                        <Form onSubmit={handleSubmit}>
                            <h3>Connectez-vous <img src={connect} alt='connect' width="30" height='30'></img> </h3>
                            <Form.Group>
                                <Form.Label className='formLabel'>E-mail</Form.Label>
                                <Form.Control
                                    style={{ backgroundColor: '#ECECEC' }}
                                    type='text'
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}

                                <Form.Label className='formLabel'>Mot de passe</Form.Label>
                                <Form.Control
                                    style={{ backgroundColor: '#ECECEC' }}
                                    type="password"
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.password && touched.password && "error"} />
                                {errors.password && touched.password && (
                                    <div className="input-feedback">{errors.password}</div>
                                )}
                            </Form.Group>

                            <Button variant="light" type="submit" disabled={isSubmitting}>
                                Valider
                            </Button>
                            <Button
                                style={{float: 'right', background:'none', border:'none'}}
                                onClick={this.props.registerForm}
                                variant="secondary"
                                size="sm">Pas encore de compte ?
                            </Button>
                        </Form>
                    )}
            </Formik>
        )
    }
}

export default Login;