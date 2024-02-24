import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/products/productContext";
import "../../styles/css/formCard.css"

const AddProduct = (props) => {
    const navigate = useNavigate();
    const context = useContext(ProductContext);

    const [product, setProduct] = useState({
        name: "",
        brand: "",
        description: "",
        about: "",
        category: "",
        price: "",
        image: null,
    });

    const [formData, setFormData] = useState(new FormData());

    const handleSubmit = async (event) => {
        console.log("Inside handlesubmit");
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/products/addproduct", {
                method: "POST",
                body: formData,
            });

            // Reset form data
            setProduct({
                name: "",
                brand: "",
                description: "",
                about: "",
                category: "",
                price: "",
                image: null,
            });

            setFormData(new FormData());

            navigate("/");
        } catch (error) {
            console.error("Error submitting form:", error);
        }        
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setProduct({ ...product, [name]: value });
        formData.set(name, value);
    };

    const handlePhoto = (event) => {
        setProduct({ ...product, image: event.target.files[0] });
        setFormData((prevFormData) => {
            const newFormData = new FormData();
            newFormData.append("name", product.name);
            newFormData.append("brand", product.brand);
            newFormData.append("description", product.description);
            newFormData.append("about", product.about);
            newFormData.append("category", product.category);
            newFormData.append("price", product.price);
            newFormData.append("image", event.target.files[0]);
            return newFormData;
        });
    };

    return(
        <div className="container row justify-content-center profile">
            <div className="col-md-8">
                <div className="card form-card">
                    <div className="card-body">
                    
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" value={product.name} onChange={onChange} name="name" id="name" required/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="brand" className="form-label">Brand</label>
                                <input type="text" className="form-control" value={product.brand} onChange={onChange} name="brand" id="brand" required/>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="about" className="form-label">About</label> 
                            <textarea className="form-control" value={product.about} onChange={onChange} name="about" id="about" required/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label> 
                            <input type="text" className="form-control" value={product.description} onChange={onChange} name="description" id="description" required/>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="category" className="form-label">Category</label>
                                <input type="text" className="form-control" value={product.category} onChange={onChange} name="category" id="category" required/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="text" className="form-control" value={product.price} onChange={onChange} name="price" id="price" required/>
                            </div>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="image" className="form-label">Upload Image</label>
                        <input type="file" className="form-control" id="image" name="image" onChange={handlePhoto} required />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AddProduct;