import React from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import * as Yup from "yup";
import { Formik } from "formik";
import auth from '../../../auth';

export const FormUpdateRoadmap = (props) => {
    const rmName = props.rmName;
    const rmId = props.rmId;

    const updateRoadmap = async (values) => {
        try {
            await auth.updateRoadmap(values, rmId);
        } catch (error) {
            console.log(error)
        }
    };

    return <Formik
        initialValues={{
            name: `${rmName}`,
            password: `${props.rmPassword}`,
            nbr_participants: `${props.rmNbrParticipants}`,
            location: `${props.rmLocation}`,
            startDate: `${props.rmStartDate}`,
            endDate: `${props.rmEndDate}`,
            budget: `${props.rmBudget}`,
            leader: `${props.rmLeader}`,
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            updateRoadmap(values);
            resetForm();
            setSubmitting(false);
            props.switchContent();
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
                <>
                    <Form onSubmit={handleSubmit} style={{ width: '550px' }}>
                        <Form.Group controlId="formGridName1"
                            style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Form.Group>
                                <Form.Label>Nom Roadmap</Form.Label>
                                <Form.Control
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.name && touched.name && "error"} />
                                {errors.name && touched.name && (
                                    <div className="input-feedback">{errors.name}</div>
                                )}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control
                                    name="password"
                                    type='password'
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
                            <Form.Label>Nombres de Participants</Form.Label>
                            <Form.Control name="nbr_participants" size="sm" type='number' min='1'
                                value={values.nbr_participants}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.nbr_participants && touched.nbr_participants && "error"} />
                            {errors.nbr_participants && touched.nbr_participants && (
                                <div className="input-feedback">{errors.nbr_participants}</div>
                            )}
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Date de départ</Form.Label>
                            <Form.Control name="startDate" type='date'
                                value={values.startDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.startDate && touched.startDate && "error"} />
                            {errors.startDate && touched.startDate && (
                                <div className="input-feedback">{errors.startDate}</div>
                            )}
                            <Form.Label>Date de fin</Form.Label>
                            <Form.Control name="endDate" type='date'
                                value={values.endDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.endDate && touched.endDate && "error"}></Form.Control>
                            {errors.endDate && touched.endDate && (
                                <div className="input-feedback">{errors.endDate}</div>
                            )}
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Pays de destination</Form.Label>
                                <Form.Control name="location" size="sm"
                                    value={values.location}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.location && touched.location && "error"} />
                                {errors.location && touched.location && (
                                    <div className="input-feedback">{errors.location}</div>
                                )}
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridBudget">
                                <Form.Label>Budget</Form.Label>
                                <Form.Control name="budget" size="sm" type='number' min='1' placeholder='1500€'
                                    value={values.budget}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={errors.budget && touched.budget && "error"} />
                                {errors.budget && touched.budget && (
                                    <div className="input-feedback">{errors.budget}</div>
                                )}
                            </Form.Group>
                        </Form.Row>
                        
                        <Form.Group>
                            <Form.Check
                                value={values.leader}
                                onChange={handleChange}
                                label="Prendre le rôle de Leader"
                                name='leader'
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            Valider
                        </Button>
                    </Form>
                </>
            )
        }}
    </Formik >
}