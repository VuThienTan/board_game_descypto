import ControlPanel from "./ControlPanel";
import {BrowserRouter, Routes, Route, HashRouter} from "react-router-dom";
import RandomPage from "./Random";

export default function App() {

    return (
        <HashRouter>
            <Routes>
                <Route path="/" element={<ControlPanel/>}/>
                <Route path="/random" element={<RandomPage/>}/>
            </Routes>
        </HashRouter>
    );
}
