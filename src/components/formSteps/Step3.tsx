import React, { useState } from 'react';
// import types
import { userValuesType } from '../app/App';
// import material ui
import { Button } from '@material-ui/core';


interface propsInterface {
    userValues: userValuesType;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>
}

const sleep = (time: number) => new Promise(
    (acc) => (
        setTimeout(acc, time)
    )
);

const Step3: React.FC<propsInterface> = ({ userValues, setCurrentStep }) => {

    const [submitting, setSubmitting] = useState(false);



    if (submitting) {
        return (
            <div>
                <div className="loader" ></div>
                <h4>PLEASE WAIT</h4>
            </div>
        )
    }
    return (
        <div className="step3-container">
            <div>
                <p className="values-p"><span>Name: </span> <span>{userValues.name}</span></p>
                <p className="values-p"><span>Email: </span> <span>{userValues.email}</span></p>
                <p className="values-p"><span>Age: </span> <span>{userValues.age}</span></p>
                <p className="values-p"><span>Contact: </span> <span>{userValues.contact}</span> </p>
                <p className="values-p"><span>Address: </span> <span>{userValues.address}</span></p>
                <p className="values-p"><span>Description: </span> <span>{userValues.description}</span></p>
            </div>

            <div className="button-container">
                < Button color="primary" variant="contained"
                    disabled={submitting}
                    onClick={() => setCurrentStep((stp: number) => stp - 1)}
                >
                    Back
                </Button>

                <Button color="primary" variant="contained" disabled={submitting}
                    onClick={async () => {
                        setSubmitting(true)
                        await sleep(3000);
                        setSubmitting(false)
                        setCurrentStep((stp: number) => stp + 1);
                    }}
                >
                    Submit
                </Button>
            </div>
        </div >
    );
};


export default Step3;