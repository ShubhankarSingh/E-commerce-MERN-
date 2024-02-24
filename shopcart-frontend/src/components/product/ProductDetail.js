import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user/userContext";
import "../../styles/css/products/product.css"

const ProductDetail = (props) => {
    const navigate = useNavigate();
    const { item, addToCart } = props;
    const { name, brand, price, _id } = item;
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {

        
        
        const fetchImage = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/products/getimage/${item._id}`);
                if (response.ok) {
                    const arrayBuffer = await response.arrayBuffer();
                    const base64String = btoa(
                        new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    setImageSrc(`data:image/png;base64, ${base64String}`);
                } else {
                    console.error('Error fetching image:', response.status);
                }
            } catch (error) {
                console.log('Error fetching image:', error);
            }
        };
    
        fetchImage();
    }, [item._id]);
    
    const checkLoginStatus = () => {
        return localStorage.getItem('token') ? true : false;
    };

    const isInCart = props.cartItems.some((cartItem) => cartItem.product === _id);

    const handleAddToCart = async (event) => {
        if (!checkLoginStatus()) {
            navigate("/login");
        } else {
            if (isInCart) {
                navigate("/cart");
            }else{
                await addToCart(_id);
                navigate("/cart");
            }
        }
    };

    const handleView = () =>{
        navigate(`/product-description/${_id}`, { state: { productDetails: item, imageSrc: imageSrc, currUser:props.currUser }});
        window.location.reload();
    }

    return (
        <div className="col-md-3">
            <a className="card product-card my-3" onClick={handleView}>
                <img src={imageSrc} alt={name} />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{brand}</p>
                    <p className="card-text">₹{price}</p>
                    { ( props.currUser.toString() === "null" || props.currUser.role === "user") &&
                        <button type="button" className="btn btn-outline-secondary btn-sm w-100" onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}>
                            {isInCart ? "GO TO CART" : "ADD TO CART"}
                        </button>
                    }
                    
                    {/* if user is not logged in, currUser will be null (string), !!props.currUser will become true*/}
                </div>
            </a>
        </div>
    );
};

export default ProductDetail;