import { Route, Routes } from "react-router-dom";
import Hello from "../components/Hello";

function Routers () {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Hello />} />
            </Routes>
        </div>
    )
}

export default Routers;