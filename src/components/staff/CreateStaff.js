import {useParams} from "react-router-dom";
import {useState} from "react";

function CreateStaff () {
    const [role, setRole] = useState( '');
    const [code, setCode] = useState('');

    const party_id = useParams();

    return (
        <p>staff</p>
    )
}

export default CreateStaff;