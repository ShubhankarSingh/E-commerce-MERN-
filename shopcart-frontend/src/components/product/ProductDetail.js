import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user/userContext";
import { CartContext } from "../../context/cart/cartcontext";

const ProductDetail = (props) => {
    const navigate = useNavigate();
    const { item, addToCart } = props;
    const { name, description, brand, price, _id } = item;

    let currUser = null;

    const context = useContext(UserContext);
    const {user, getUser} = context;

    const [imageSrc, setImageSrc] = useState("");

    const cartContext = useContext(CartContext);
    const { cartItems } = cartContext;

    if(localStorage.getItem('token')){
        currUser = user;
    }

    useEffect(() => {

        {localStorage.getItem('token') && getUser()}
        
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

    const isInCart = cartItems.some((cartItem) => cartItem.product === _id);

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
        navigate(`/product-description/${_id}`, { state: { productDetails: item, imageSrc: imageSrc, currUser:currUser }});
    }

    return (
        <div className="col-md-3">
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <img src={imageSrc} alt={name} style={{ width: "100%", height: "auto" }} />
                    <p className="card-text">{brand} </p>
                    <p className="card-text">{description}</p>
                    <p className="card-text">{price}</p>
                    {/*<button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleClick}>{buttonText}</button> */}
                    <button type="button" className="btn btn-outline-secondary btn-sm mx-2" onClick={handleView}>View</button>
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={handleAddToCart}>
                        {isInCart ? "Go to Cart" : "Add to Cart"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;