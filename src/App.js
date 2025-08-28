import ControlPanel from "./ControlPanel";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import RandomPage from "./Random";

export default function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ControlPanel />} />
                <Route path="/random" element={<RandomPage />} />
            </Routes>
        </BrowserRouter>
    );
}
