import {
    createTheme,
    ThemeProvider
} from "@mui/material";
import { HashRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Home } from "./Home";
import HorizontalLinearStepper from "./labs/lab1/Wizard";

function App() {
    return (
        <ThemeProvider theme={createTheme()}>
            <HashRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="lab1" element={<HorizontalLinearStepper />}/>
                    <Route path="lab2" element={<div />} />
                </Routes>
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
