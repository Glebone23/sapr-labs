import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
    createTheme,
    Step,
    StepLabel,
    Stepper,
    ThemeProvider
} from "@mui/material";
import HorizontalLinearStepper from "./Wizard";

function App() {
    return (
        <ThemeProvider theme={createTheme()}>
            <HorizontalLinearStepper/>
        </ThemeProvider>
    );
}

export default App;
