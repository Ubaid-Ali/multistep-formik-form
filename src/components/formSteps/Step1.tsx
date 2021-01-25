import React from 'react';
import './steps.css';
// import interfaces
import { userValuesType } from '../app/App';
// import material ui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Box } from '@material-ui/core';
// import yup
import { object, string, number } from 'yup';
// import formik
import { Field, Form, ErrorMessage, Formik } from 'formik';

interface step1Interface {
    name: string;
    age: number;
    email: string;
}

interface propsInterface {
    setUserValues: React.Dispatch<React.SetStateAction<userValuesType>>;
    prevValues: userValuesType;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const Step1: React.FunctionComponent<propsInterface> = ({ setUserValues, prevValues, setCurrentStep }) => {

    const initialVal: step1Interface = {
        name: prevValues?.name || "",
        age: prevValues?.age || 0,
        email: prevValues?.email || "",
    }

    const schema = object({
        name: string().required().min(3).max(20),
        age: number().required().min(15).max(60),
        email: string().required().email(),
    })

    return (
        <div className="step1-container">
            <Formik
                initialValues={initialVal}
                validationSchema={schema}
                onSubmit={
                    (values: step1Interface) => {
                        setUserValues({ ...prevValues, ...values })
                        setCurrentStep((s: number) => s + 1);
                    }
                }
            >
                <Form>
                    <Box paddingBottom={2}>
                        <Field type="text" name="name" fullWidth as={TextField} label="Name: " />
                        <span className="error"><ErrorMessage name="name" /></span>
                    </Box>

                    <Box paddingBottom={2}>
                        <Field type="number" name="age" fullWidth as={TextField} label="Age: " />
                        <span className="error"><ErrorMessage name="age" /></span>
                    </Box>

                    <Box paddingBottom={2}>
                        <Field type="email" name="email" fullWidth as={TextField} label="Email: " />
                        <span className="error"><ErrorMessage name="email" /></span>
                    </Box>

                    <div className="button-container">
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            Next
                        </Button>
                    </div>

                </Form>
            </Formik>
        </div >
    )
}


export default Step1;