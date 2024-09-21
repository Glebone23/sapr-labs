import {
    createTheme,
    ThemeProvider
} from "@mui/material";
import { HashRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { Home } from "./Home";
import { Lab1 } from "./labs/lab1/Lab1";
import { Lab2 } from "./labs/lab2/Lab2";

function App() {
    return (
        <ThemeProvider theme={createTheme()}>
            <HashRouter>
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="lab1" element={<Lab1 />}/>
                    <Route path="lab2" element={<Lab2 />} />
                </Routes>
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
