import React, { useState } from 'react';
import "./app.css";
import Step1 from '../formSteps/Step1';
import Step2 from '../formSteps/Step2';
import Step3 from '../formSteps/Step3';
import SuccessStep from '../formSteps/SuccessStep';

import { Stepper, StepLabel, Step } from '@material-ui/core'

export interface userValuesType {
    name?: string,
    age?: number,
    email?: string,
    contact?: string,
    address?: string,
    description?: string,
}



const App = () => {
    const [steps] = useState<string[]>(["Basic", "Additional", "Review"]);
    const [userValues, setUserValues] = useState<userValuesType>({});
    const [currentStep, setCurrentStep] = useState<number>(0);

    const stepper = (stp: number) => {
        switch (stp) {
            case 0:
                return <Step1
                    setCurrentStep={setCurrentStep}
                    prevValues={userValues}
                    setUserValues={setUserValues}
                />

            case 1:
                return <Step2
                    setCurrentStep={setCurrentStep}
                    prevValues={userValues}
                    setUserValues={setUserValues}
                />

            case 2:
                return <Step3
                    userValues={userValues}
                    setCurrentStep={setCurrentStep}
                />
            case 3:
                return <SuccessStep />

            default:
                return <h4>"Step not found please reload the page."</h4>
        }
    }


    // console.log('userValues', userValues);
    return (
        <div className="app" >
            <Stepper alternativeLabel activeStep={currentStep} >
                {steps.map((label) => (
                    <Step key={label} >
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {stepper(currentStep)}
            <hr />
        </div>
    )
}

export default App;