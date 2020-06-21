import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import auth from '../../../auth';
import * as Yup from "yup";
import { Formik } from "formik";

export const FormUpdateUser = (props) => {
    const email = props.userEmail;
    const pseudo = props.userPseudo;
    const firstName = props.userFirstName;
    const lastName = props.userLastName;
    const urlPic = props.urlPic;
    const handleUpload = props.handleUpload;
    console.log(urlPic)

    const updateUserSetting = async (values) => {
        try {
            const result = await auth.updateUserProfile(values);
            props.getUser();
            props.notify('success', 'Profil mis à jour ✔');
            return result
        } catch (error) {
            console.log(error)
        }
    };

    return <Formik
        initialValues={{
            id: `${props.userId}`,
            pseudo: `${props.userPseudo}`,
            email: `${email}`,
            firstName: `${props.userFirstName}`,
            lastName: `${props.userLastName}`,
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            updateUserSetting(values);
            props.onUpload()
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

                    {
                        urlPic === '' || urlPic === null || urlPic === undefined ?
                            <Form.Group as={Row}>
                                <Form.Label column sm="5">
                                    <label style={{ marginTop: '50px' }}>-</label>
                                </Form.Label>
                                <Col sm='7' style={{ display: 'flex' }}>
                                    <Col sm='5' style={{ display: 'flex', alignItems: 'center' }}>
                                        <input type="file" id="file" onChange={handleUpload} />
                                        <label for='file' id='labelfile'> <FontAwesomeIcon icon={faUpload} />Ajouter votre photo !</label>
                                    </Col>
                                </Col>
                            </Form.Group>
                            :
                            <Form.Group as={Row}>
                                <Form.Label column sm="5">
                                    <label style={{ marginTop: '50px' }}>Photo de profil</label>
                                </Form.Label>
                                <Col sm='7' style={{ display: 'flex' }}>
                                    <img for='file' src={urlPic} width='100' height='100' alt='profil' />
                                    <Col sm='5' style={{ display: 'flex', alignItems: 'center' }}>
                                        <input type="file" id="file" onChange={handleUpload} />
                                        <label for='file' id='labelfile'> <FontAwesomeIcon icon={faUpload} />Changer de photo</label>
                                    </Col>
                                </Col>
                            </Form.Group>
                    }



                    <Button id="button-formupdateuser-submit" type="submit" disabled={isSubmitting}>
                        Enregistrer
                    </Button>
                </Form>
            )
        }}
    </Formik>
}