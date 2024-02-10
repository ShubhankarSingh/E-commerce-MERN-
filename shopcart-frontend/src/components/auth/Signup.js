import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "./login-image.jpg";
import "../../styles/css/auth.css";

const Signup = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    // Clear the error message when user starts typing again
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form inputs
    const validationErrors = {};
    if (!formData.name || formData.name.length < 3) {
      validationErrors.name = "Name must be at least 3 characters long";
    }
    if (!formData.email || !isValidEmail(formData.email)) {
      validationErrors.email = "Enter a valid email";
    }
    if (!formData.password || formData.password.length < 5) {
      validationErrors.password = "Password must be at least 5 characters long";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // If validation passes, continue with form submission
    try {
      // Perform form submission logic here (e.g., make API request)
      const response = await fetch("http://localhost:5000/api/user/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/login"); // Redirect to login page after successful submission
      } else {
          console.error("Error occurred during user creation:");
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const isValidEmail = (email) => {
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="container my-5 auth">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <img src={loginImage} className="card-img" alt="..." style={{ height: "170px" }} />
            <div className="card-body">
              <form onSubmit={handleSubmit} className="auth-form">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    id="name"
                    aria-describedby="nameHelp"
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    value={formData.email}
                    onChange={handleChange}
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
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                    id="password"
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
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

export default Signup;
