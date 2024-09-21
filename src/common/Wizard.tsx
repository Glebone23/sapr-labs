import { Box, Button, Step, StepButton, Stepper, Typography } from "@mui/material";
import React from "react";
import { FormProvider } from "./form";

interface IStep {
    title: string;
    content: React.ReactNode;
}

interface WizardProps {
    steps: IStep[];
    initialValues: any;
}

export function Wizard(props: WizardProps) {
    const { steps, initialValues } = props;

    const [activeStep, setActiveStep] = React.useState<number>(0);

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
        <FormProvider initialValues={initialValues}>
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
        </FormProvider>
    )
}