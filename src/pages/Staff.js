import {Routes, Route} from "react-router-dom";
import CreateStaff from "../components/staff/CreateStaff";

function Staff () {
    return (
        <Routes>
            <Route path={"/create/:party_id"} element={<CreateStaff />} />
        </Routes>
    )
}

export default Staff;