import {Route, Routes} from "react-router-dom";
import Hello from "../components/Hello";
import Recruit from "../pages/recruit";

function Routers () {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Hello />} />
                <Route path={'/recruit/*'} element={<Recruit />} />
            </Routes>
        </div>
    )
}

export default Routers;