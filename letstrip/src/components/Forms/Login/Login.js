import React from 'react';
import auth from '../../../auth'
import { Formik } from "formik";
import * as Yup from "yup";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
                            <h6>Connectez-vous</h6>
                            <Form.Group style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                height: '110px',
                            }}>
                                {/* <Form.Label className='formLabel'>E-mail</Form.Label> */}
                                <Form.Control
                                    placeholder='E-mail'
                                    type='text'
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.email && touched.email && (
                                    <div className="input-feedback">{errors.email}</div>
                                )}

                                {/* <Form.Label className='formLabel'>Mot de passe</Form.Label> */}
                                <Form.Control
                                    placeholder='Mot de passe'
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

                            <Form.Group>
                                <Button 
                                    style={{backgroundColor:"#6666ff"}} 
                                    variant="primary" 
                                    size="md" 
                                    block 
                                    type="submit" 
                                    disabled={isSubmitting}>
                                    Valider
                            </Button>
                            </Form.Group>
                        </Form>
                    )}
            </Formik>
        )
    }
}

export default Login;