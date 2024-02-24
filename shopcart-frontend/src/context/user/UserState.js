import React, { useState } from "react";
import {UserContext} from "./userContext";


const UserState = (props) => {

    const host = "http://localhost:5000";

    const [user, setUser] = useState(['null']);

    const getUser = async () =>{
        const response = await fetch(`${host}/api/user/getuser/`,{
            method: 'GET',
            headers: {
                'auth-token': localStorage.getItem('token'),
            },
        });

        const json = await response.json();
        console.log("Json user: "+ json)
        setUser(json);
    };


    return (
        <UserContext.Provider value={{user, getUser}}>
            {props.children}
        </UserContext.Provider>
    )

};

export default UserState;