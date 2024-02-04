import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



const Login = (props) => {

    const [credentials, setCredentials] = useState({email:"", password:""});

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch("http://localhost:5000/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        console.log(json)
        if(json.success){
            localStorage.setItem('token', json.authtoken)
            navigate("/")
        }else{
            console.log("Invalid Credentials");
        }
        
    }

    const onChange = (event) => {
        const {name, value} = event.target;
        setCredentials({...credentials, [name]:value});
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} name="email" id="email" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login;