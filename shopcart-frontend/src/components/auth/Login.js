import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "./login-image.jpg";
import "../../styles/css/auth.css";


const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        // Apply custom body class when component mounts
        document.body.classList.add("login-body");

        // Cleanup function to remove custom body class when component unmounts
        return () => {
            document.body.classList.remove("login-body");
        };
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form inputs
        const validationErrors = {};
        if (!credentials.email || !isValidEmail(credentials.email)) {
            validationErrors.email = "Enter a valid email";
        }
        if (!credentials.password) {
            validationErrors.password = "Password is required";
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // If validation passes, continue with form submission
        try {
            const response = await fetch("http://localhost:5000/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            });
            const json = await response.json();
            if (json.success) {
                localStorage.setItem("token", json.authtoken);
                navigate("/");
                window.location.reload();
            } else {
                setLoginError(true);
                setTimeout(() => {
                    setLoginError(false);
                }, 2000); // Hide the error message after 2 seconds
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
        // Clear the error message when user starts typing again
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const isValidEmail = (email) => {
        // Simple email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="container my-2 auth">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <img src={loginImage} className="card-img" alt="..." style={{ height: "170px" }} />
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                        value={credentials.email}
                                        onChange={onChange}
                                        name="email"
                                        id="email"
                                        aria-describedby="emailHelp"
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                        value={credentials.password}
                                        onChange={onChange}
                                        name="password"
                                        id="password"
                                    />
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                    {loginError && <p className="login-error">Invalid username or password.</p>}
                                </div>
                                <button type="submit" className="btn btn-primary auth-button w-100 my-3">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
