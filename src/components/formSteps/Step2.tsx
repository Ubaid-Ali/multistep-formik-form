import React from 'react';
import './steps.css';
// import types
import { userValuesType } from '../app/App';
// import formik
import { Field, Form, ErrorMessage, Formik } from 'formik';
// import yup
import { string, object } from 'yup';
//import material ui
import TextField from '@material-ui/core/TextField';
import { Box, Button } from '@material-ui/core';


interface step1_types {
    contact: string;
    address: string;
    description: string;
}

interface propsInterface {
    prevValues: userValuesType;
    setUserValues: React.Dispatch<React.SetStateAction<userValuesType>>;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}


const Step1: React.FC<propsInterface> = ({ prevValues, setUserValues, setCurrentStep }) => {
    
    const phoneRegExp = /^\(?([0-9]{4})\)?[-. ]?([0-9]{7})$/
    const initialVal = {
        contact: prevValues?.contact || "",
        address: prevValues?.address || "",
        description: prevValues?.description || "",
    };

    const schema = object({
        contact: string()
            .matches(phoneRegExp, "format example = 0000-0000000")
            .required().min(11),
        address: string().required().min(5).max(40),
        description: string().required().min(2).max(30),
    });

    return (
        <div className="step1-container">

            <Formik
                initialValues={initialVal}
                validationSchema={schema}
                onSubmit={
                    (values: step1_types) => {
                        setUserValues({ ...prevValues, ...values })
                        setCurrentStep((s: number) => s + 1);
                    }
                }
            >
                <Form>
                    <Box paddingBottom={2}>
                        <Field type="text" name="contact" fullWidth as={TextField} label="Contact / Cell:" />
                        <span className="error"><ErrorMessage name="contact" /></span>
                    </Box>

                    <Box paddingBottom={2}>
                        <Field type="text" name="address" fullWidth as={TextField} label="Address:" />
                        <span className="error"><ErrorMessage name="address" /></span>
                    </Box>

                    <Box paddingBottom={2}>
                        <Field type="text" name="description" fullWidth as={TextField} label="Description:" />
                        <span className="error" ><ErrorMessage name="description" /></span>
                    </Box>

                    <div className="button-container">
                        <Button
                            variant="contained" color="primary"
                            onClick={() => setCurrentStep((stp: number) => stp - 1)}
                        >
                            Back
                        </Button>

                        <Button type="submit" color="primary" variant="contained" >
                            Next
                        </Button>
                    </div>

                </Form>
            </Formik>
        </div >
    )
}


export default Step1;