import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/css/profile.css"

const UpdateProfile = (props) =>{

    const {currUser} = props;
    const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = useState("option1");
    const [formData, setFormData] = useState({phone:"", address:"", city:"", state:"", country:"", pinCode:""});

    useEffect(()=>{

        const fetchUser = async ()=>{
            try{
                const response = await fetch("http://localhost:5000/api/profile/", {
                    method: 'GET',
                    headers:{
                        "auth-token": localStorage.getItem('token'),
                    },  
                });
                const json = await response.json();
                setFormData(json);
            }catch (err) {
                console.error(err);
            }
        };
        fetchUser();
    },[]);

    const handleChange = (event)=>{
        const {name, value} = event.target;
        setFormData({...formData, [name]:value});
        setSelectedOption(value);
    }

    const handleSubmit = async(event) =>{

        event.preventDefault();

        try{
            const response = await fetch("http://localhost:5000/api/profile/update", {
                method: 'PUT',
                headers:{
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token'),
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                window.location.reload();
            }else {
                console.error("Error occurred during profile update:");
            }

        }catch(error){
            console.error("Error occurred:", error);
        }
        
    }
    
    return (
        <>
        <div className="container row justify-content-center profile">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h5>Personal Information</h5>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="name">Name</label>
                                <input type="text" className="form-control disabled" value={currUser.name} disabled/>
                                
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="name">Email</label> 
                                <input type="text" className="form-control disabled" value={currUser.email} disabled/>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="inputPhone">Phone</label>
                                <input type="text" className="form-control" id="inputPhone" name="phone" onChange={handleChange} value={formData.phone} placeholder="Phone"/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputAddress">Address</label>
                                <input type="text" className="form-control" id="inputAddress" name="address" onChange={handleChange} value={formData.address} placeholder="1234 Main St"/>
                            </div>
                            </div>
                            <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="inputCity">City</label>
                                <input type="text" className="form-control" id="inputCity" name="city" value={formData.city} onChange={handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputState">State</label>
                                <select id="inputState" className="form-control" name="state" value={formData.state} onChange={handleChange}>
                                <option value="option1" selected>Choose...</option>
                                <option value="Karnataka">Karnataka</option>
                                <option value="Kerela">Kerela</option>
                                <option value="Rajasthan">Rajasthan</option>
                                <option value="Delhi">Delhi</option>
                                <option value="Uttar Pradesh">Uttar Pradesh</option>
                                </select>
                            </div>
                            </div>
                            <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="inputCountry">Country</label>
                                <input type="text" className="form-control" id="inputCountry" name="country" value={formData.country} onChange={handleChange}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="pinCode">Pincode </label>
                                <input type="text" className="form-control" id="pinCode" name="pinCode" value={formData.pinCode} onChange={handleChange}/>
                            </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Edit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
      );
      
}

export default UpdateProfile;