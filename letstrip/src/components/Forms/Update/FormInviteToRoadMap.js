import React from 'react';
import axios from 'axios';
import { Card, Form, Button } from 'react-bootstrap'
import * as Yup from "yup"
import { Formik } from "formik"
import { toast } from 'react-toastify'
//import 'react-toastify/dist/ReactToastify.css'

export const FormInviteToRoadMap = (props) => {
    
    const notify = (type, message) => {
        switch (type) {
            case '':
                toast(message, { autoClose: 3000 })
                break;
            case 'info':
                toast.info(message)
                break;
            case 'success':
                toast.success(message)
                break;
            case 'error':
                toast.error(message)
            default:
                break;
        }
    }

    return (
        <Formik
            initialValues={{
                email: '',
                roadMapId: props.roadMapId
            }}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                //updateUserSetting(values);                
                
                axios.post('http://localhost:4000/InviteToRoadMap', values, { headers: { "Content-Type": "application/json" } })
                .then(response => {                    
                    if(response.data === false){
                        notify('error', "L'utilisateur est introuvable")
                    } else if (response.data === true) {
                        notify('success', "L'utilisateur a été ajouté")
                    }
                })

                resetForm();
                setSubmitting(false);
            }}
            validationSchema={Yup.object().shape({
                email: Yup.string().required("Email requis").email("Email non valide")
            })}
        >
            {props => {
                const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props
                return (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                name="email" 
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors.email && touched.email && "error"}    
                            />
                            {errors.email && touched.email && (
                                <div className="input-feedback">{errors.email}</div>
                            )}
                        </Form.Group>
                        <Button type="submit" disabled={isSubmitting}>
                            Ajouter
                        </Button>
                    </Form>                    
                )
            }}            
        </Formik>
    )
}