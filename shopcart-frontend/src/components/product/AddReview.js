import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/products/productContext";
import "../../styles/css/formCard.css"

const AddReview = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { pid } = location.state || {};
    const context = useContext(ProductContext);
    const {addReview} = context;
    const [review, setReview] = useState({
        title: "",
        description: "",
        stars: "0",
    });

    const [formData, setFormData] = useState(new FormData());

    const handleSubmit = async (event) => {
        event.preventDefault();
        addReview(pid, formData);
        setReview({
            title: "",
            description: "",
            stars: 0,
        });
        setFormData(new FormData());
        navigate("/");
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setReview({ ...review, [name]: value });
        formData.set(name, value);
    };

    const handleStarClick = (selectedStars) => {
        setReview({ ...review, stars: selectedStars });
        const newFormData = new FormData();
        newFormData.append("title", review.title);
        newFormData.append("description", review.description);
        newFormData.append("stars", selectedStars);
        setFormData(newFormData);
    };

    return (
        <div className="container row justify-content-center profile">
            <div className="col-md-8">
                <div className="card form-card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input type="text" className="form-control" value={review.title} onChange={onChange} name="title" id="title" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input type="text" className="form-control" value={review.description} onChange={onChange} name="description" id="description" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="stars" className="form-label">
                                    Stars
                                </label>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <label key={star} className="star-label">
                                        <input
                                            type="radio"
                                            name="stars"
                                            value={star}
                                            checked={review.stars === star}
                                            onChange={() => handleStarClick(star)}
                                        />
                                        ⭐
                                    </label>
                                ))}
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddReview;
