import React from 'react';
// import auth from '../../../auth';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import * as Yup from "yup";
import { Formik } from "formik";

export const FormUpdateUser = (props) => {
    const email = props.userEmail;
    const pseudo = props.userPseudo;
    const firstName = props.userFirstName;
    const lastName = props.userLastName;

    return <Formik
        initialValues={{
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            console.log(values)
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
                <Form style={{}}>
                    <Form.Group as={Row}>
                        <Form.Label column sm="5">
                            Pseudo
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control defaultValue={pseudo} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="5">
                            Email
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control defaultValue={email} />
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
                            <Form.Control defaultValue={firstName} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column sm="5">
                            Nom de famille
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control defaultValue={lastName} />
                        </Col>
                    </Form.Group>

                    <Button id="button-formupdateuser-submit" type="submit">
                        Submit
                    </Button>

                </Form>
            )
        }}
    </Formik>
}