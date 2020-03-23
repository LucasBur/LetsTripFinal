import React, { useState } from 'react';
import auth from '../../../auth';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col'
import * as Yup from "yup";
import { Formik } from "formik";

// class FormRoadmap extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             show: false
//         }
//     }
//     render() {
//         return (
//             <Formik
//                 initialValues={{
//                     id: `${this.props.id}`,
//                     name: "",
//                     password: "",
//                     nbr_participants: "",
//                     location: "",
//                     startDate: "",
//                     endDate: "",
//                     budget: "",
//                     leader: Boolean,
//                 }}
//                 onSubmit={(values, { setSubmitting, resetForm }) => {
//                     // createRoadmap(values)
//                     console.log(values)
//                     resetForm();
//                     setSubmitting(false);
//                 }}
//                 validationSchema={Yup.object().shape({
//                     name: Yup.string().required("nom requis.")
//                         .min(2, "2 caractères minimum"),
//                     password: Yup.string()
//                         .required("No password provided.")
//                         .min(3, "Password is too short - should be 3 chars minimum."),
//                     nbr_participants: Yup.string().required("Nombre de participant requis.")
//                         .min(1, "1 personne minimum."),
//                     location: Yup.string().required("Destination requise.")
//                         .min(2, "2 caractères minimum."),
//                     startDate: Yup.string().required("Date de départ requise"),
//                     endDate: Yup.string().required("Date de retour requise"),
//                     budget: Yup.string().required("Budget requis").min(0, "Entrer 0 si vous ne savez pas"),
//                     // leader: Yup.bool()
//                 })}>

//                 {props => {
//                     const { values, touched,
//                         errors, isSubmitting,
//                         handleChange, handleBlur,
//                         handleSubmit } = props;
//                     return (
//                         <>
//                             <Button id='button-newroadmap' onClick={() => this.setState({show: false})}>
//                                 Nouvelle Roadmap
//                             </Button>

//                             <Modal show={() => this.setState({show: true})} onHide={() => this.setState({show: false})}>
//                                 <Modal.Header closeButton>
//                                     <Modal.Title>Créer votre Roadmap</Modal.Title>
//                                 </Modal.Header>
//                                 <Modal.Body>
//                                     <Form onSubmit={handleSubmit}>
//                                         <Form.Group controlId="formGridName1"
//                                             style={{ display: 'flex', justifyContent: 'space-between' }}>
//                                             <Form.Group>
//                                                 <Form.Label>Nom Roadmap</Form.Label>
//                                                 <Form.Control placeholder="Asia Roadtrip"
//                                                     name="name"
//                                                     value={values.name}
//                                                     onChange={handleChange}
//                                                     onBlur={handleBlur}
//                                                     className={errors.name && touched.name && "error"} />
//                                                 {errors.name && touched.name && (
//                                                     <div className="input-feedback">{errors.name}</div>
//                                                 )}
//                                             </Form.Group>
//                                             <Form.Group>
//                                                 <Form.Label>Mot de passe</Form.Label>
//                                                 <Form.Control name="password" type='password' placeholder='password'
//                                                     value={values.password}
//                                                     onChange={handleChange}
//                                                     onBlur={handleBlur}
//                                                     className={errors.password && touched.password && "error"} />
//                                                 {errors.password && touched.password && (
//                                                     <div className="input-feedback">{errors.password}</div>
//                                                 )}
//                                             </Form.Group>
//                                         </Form.Group>

//                                         <Form.Group>
//                                             <Form.Label>Nombres de Participants</Form.Label>
//                                             <Form.Control name="nbr_participants" size="sm" type='number' min='1'
//                                                 value={values.nbr_participants}
//                                                 onChange={handleChange}
//                                                 onBlur={handleBlur}
//                                                 className={errors.nbr_participants && touched.nbr_participants && "error"} />
//                                             {errors.nbr_participants && touched.nbr_participants && (
//                                                 <div className="input-feedback">{errors.nbr_participants}</div>
//                                             )}
//                                         </Form.Group>

//                                         <Form.Group>
//                                             <Form.Label>Date de départ</Form.Label>
//                                             <Form.Control name="startDate" type='datetime-local'
//                                                 value={values.startDate}
//                                                 onChange={handleChange}
//                                                 onBlur={handleBlur}
//                                                 className={errors.startDate && touched.startDate && "error"} />
//                                             {errors.startDate && touched.startDate && (
//                                                 <div className="input-feedback">{errors.startDate}</div>
//                                             )}
//                                             <Form.Label>Date de fin</Form.Label>
//                                             <Form.Control name="endDate" type='datetime-local'
//                                                 value={values.endDate}
//                                                 onChange={handleChange}
//                                                 onBlur={handleBlur}
//                                                 className={errors.endDate && touched.endDate && "error"}></Form.Control>
//                                             {errors.endDate && touched.endDate && (
//                                                 <div className="input-feedback">{errors.endDate}</div>
//                                             )}
//                                         </Form.Group>

//                                         <Form.Row>
//                                             <Form.Group as={Col}>
//                                                 <Form.Label>Pays de destination</Form.Label>
//                                                 <Form.Control name="location" size="sm"
//                                                     value={values.location}
//                                                     onChange={handleChange}
//                                                     onBlur={handleBlur}
//                                                     className={errors.location && touched.location && "error"} />
//                                                 {errors.location && touched.location && (
//                                                     <div className="input-feedback">{errors.location}</div>
//                                                 )}
//                                             </Form.Group>

//                                             <Form.Group as={Col} controlId="formGridBudget">
//                                                 <Form.Label>Budget</Form.Label>
//                                                 <Form.Control name="budget" size="sm" type='number' min='1' placeholder='1500€'
//                                                     value={values.budget}
//                                                     onChange={handleChange}
//                                                     onBlur={handleBlur}
//                                                     className={errors.budget && touched.budget && "error"} />
//                                                 {errors.budget && touched.budget && (
//                                                     <div className="input-feedback">{errors.budget}</div>
//                                                 )}
//                                             </Form.Group>
//                                         </Form.Row>

//                                         <Form.Group>
//                                             <Form.Check
//                                                 label="Prendre le rôle de Leader"
//                                                 name="leader"
//                                             />
//                                         </Form.Group>

//                                         <Button variant="primary" type="submit" disabled={isSubmitting}>
//                                             Submit
//                                 </Button>
//                                     </Form>
//                                 </Modal.Body>
//                             </Modal>
//                         </>
//                     )
//                 }}
//             </Formik>
//         )
//     }
// }

// export default FormRoadmap;

export const FormRoadmap = (props) => {
    console.log(props)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const createRoadmap = async (values) => {
        try {
            await auth.createRoadmap(values)
        } catch (error) {
            console.log(error)
        }
    }

    return <Formik
        initialValues={{
            id: `${props.id}`,
            name: "",
            password: "",
            nbr_participants: "",
            location: "",
            startDate: "",
            endDate: "",
            budget: "",
            leader: Boolean,
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            // createRoadmap(values)
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
            // leader: Yup.bool()
        })}>

        {props => {
            const { values, touched,
                errors, isSubmitting,
                handleChange, handleBlur,
                handleSubmit } = props;
            return (
                <>
                    <Button id='button-newroadmap' onClick={handleShow}>
                        Nouvelle Roadmap
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Créer votre Roadmap</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formGridName1"
                                    style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Form.Group>
                                        <Form.Label>Nom Roadmap</Form.Label>
                                        <Form.Control placeholder="Asia Roadtrip"
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
                                        <Form.Control name="password" type='password' placeholder='password'
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
                                    {/* <input type='number' min='1'/> */}
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
                                    <Form.Control name="startDate" type='datetime-local'
                                        value={values.startDate}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.startDate && touched.startDate && "error"} />
                                    {errors.startDate && touched.startDate && (
                                        <div className="input-feedback">{errors.startDate}</div>
                                    )}
                                    <Form.Label>Date de fin</Form.Label>
                                    <Form.Control name="endDate" type='datetime-local'
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
                                        label="Prendre le rôle de Leader"
                                        name="leader"
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" disabled={isSubmitting}>
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