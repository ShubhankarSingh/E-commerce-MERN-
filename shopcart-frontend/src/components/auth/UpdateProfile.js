import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


const UpdateProfile = () =>{

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
                console.log("Json Profile Response: "+ JSON.stringify(json));
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
                navigate("/profile"); // Redirect to profile page after successful submission
            }else {
                console.error("Error occurred during profile update:");
            }

        }catch(error){
            console.error("Error occurred:", error);
        }
        
    }
    
    return(
        <>
            <div>Update Form</div>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label htmlFor="inputPhone">Phone</label>
                    <input type="text" className="form-control" id="inputPhone" name="phone" onChange={handleChange}  placeholder="Phone"/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Address</label>
                    <input type="text" className="form-control" id="inputAddress" name="address" onChange={handleChange} placeholder="1234 Main St"/>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                    <label htmlFor="inputCity">City</label>
                    <input type="text" className="form-control" id="inputCity" name="city" onChange={handleChange}/>
                    </div>
                    <div className="form-group col-md-4">
                    <label htmlFor="inputState">State</label>
                    <select id="inputState" className="form-control" name="state" value={selectedOption} onChange={handleChange}>
                        <option value="option1" selected>Choose...</option>
                        <option value="option2">Karnataka</option>
                        <option value="option3">Kerela</option>
                        <option value="option4">Rajasthan</option>
                        <option value="option5">Delhi</option>
                        <option value="option6">Uttar Pradesh</option>
                    </select>
                    </div>
                    <div className="form-group col-md-6">
                    <label htmlFor="inputCountry">Country</label>
                    <input type="text" className="form-control" id="inputCountry" name="country" onChange={handleChange}/>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="pinCode">PINCODE</label>
                        <input type="text" className="form-control" id="pinCode" name="pinCode" onChange={handleChange}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
            </form>
        </>
    )

}

export default UpdateProfile;