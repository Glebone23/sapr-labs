import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Places } from "./Places";
import { Summary } from "./Summary";
import {
    Connection,
    Connections
} from "./Connections";
import { StepButton } from '@mui/material';

export interface Place {
    element: number;
    distance: number;
}

// export const FORM_STATE = {
//     places: [{}] as Place[],
//     connections: [{}] as Connection[],
// };
interface FormState {
    places: Array<Place>;
    connections: Array<Connection>;
}

export const FORM_STATE: FormState = {
    places: [
        {
            element: 2,
            distance: 1,
        },
        {
            element: 4,
            distance: 1,
        },
        {
            element: 1,
            distance: 2,
        },
        {
            element: 3,
            distance: 3,
        },
        {
            element: 5,
            distance: 0,
        }
    ],
    connections: [
        {
            element: 1,
            vectors: [
                {
                    element: 3,
                    amount: 1,
                },
                {
                    element: 5,
                    amount: 1,
                },
                {
                    element: 4,
                    amount: 2,
                }
            ]
        },
        {
            element: 4,
            vectors: [
                {
                    element: 1,
                    amount: 2,
                },
                {
                    element: 2,
                    amount: 1,
                },
            ]
        },
        {
            element: 2,
            vectors: [
                {
                    element: 4,
                    amount: 1,
                },
            ]
        },
        {
            element: 3,
            vectors: [
                {
                    element: 1,
                    amount: 1,
                },
            ]
        },
        {
            element: 5,
            vectors: [
                {
                    element: 1,
                    amount: 1,
                },
            ]
        }
    ],
};

const steps = [
    {
        title: 'Схема місць',
        content: <Places/>,
    },
    {
        title: 'Схема з\'єднань',
        content: <Connections/>,
    },
    {
        title: 'Підсумок',
        content: <Summary/>,
    },
];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = React.useState<number>(0);

    const handleStep = (index: number) => () => {
        setActiveStep(index);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: '100%', padding: 3 }}>
            <Stepper nonLinear activeStep={activeStep}>
                {steps.map((step, index) => {
                    const stepProps: { completed?: boolean } = {};

                    return (
                        <Step key={step.title} {...stepProps}>
                            <StepButton color="inherit" onClick={() => setActiveStep(index)}>
                                {step.title}
                            </StepButton>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>{steps[activeStep].content}</Typography>

                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Назад
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {activeStep !== steps.length - 1 && (
                            <Button onClick={handleNext}>
                                Далі
                            </Button>
                        )}
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}