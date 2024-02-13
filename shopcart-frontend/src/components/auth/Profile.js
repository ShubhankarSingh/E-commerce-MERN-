import React from "react";
import {Link, useNavigate} from "react-router-dom";

const Profile = (props) =>{
    
    const {currUser} = props;

    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate("/update")
    }

    return(
        <>
            <div>Hello, {currUser.name}</div>
            <button onClick={handleSubmit} className="btn btn-primary btn-sm mx-1 text-dark">Update Profile</button>
        </>
    )

}

export default Profile;