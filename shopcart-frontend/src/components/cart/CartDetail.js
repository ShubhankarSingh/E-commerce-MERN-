import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ProductContext } from "../../context/products/productContext";
import { CartContext } from "../../context/cart/cartcontext";

const ProductDetail = (props) => {

    const { cartItem, removeFromCart, fetchedCart } = props;
    const {quantity} = cartItem;

    const productContext = useContext(ProductContext);
    const { getProduct } = productContext;

    const [productDetails, setProductDetails] = useState({});
    const [imageSrc, setImageSrc] = useState("");

    const cartContext = useContext(CartContext);
    const {updatedCartItem, updateItemQuantity} = cartContext;
    

    useEffect(() => {
        const fetchImageAndProductDetails = async () => {
            try {
                // Fetch product details for the current cartItem
                const productData = await getProduct(cartItem.product);
                
                setProductDetails(productData);

                // Fetch image for the current cartItem
                const response = await fetch(`http://localhost:5000/api/products/getimage/${cartItem.product}`);
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
                console.log('Error fetching image or product details:', error);
            }
        };

        fetchImageAndProductDetails();
    }, [cartItem.product, getProduct]);

    const handleRemoveFromCart = async () => {
        if(removeFromCart){
            await removeFromCart(fetchedCart._id, cartItem.product);
            window.location.reload();
        }
    };

    const handleIncrementQuantity = async()=>{
        updateItemQuantity(fetchedCart._id, cartItem.product, quantity+1);
        window.location.reload();
    }

    const handleDecrementQuantity = async()=>{
        updateItemQuantity(fetchedCart._id, cartItem.product, quantity-1);
        window.location.reload();
    }
 
    return (     
        <div className="col">
            <div className="card my-3">
                <div className="row">
                    <div className="col-md-4 my-3">
                        <img src={imageSrc} alt={productDetails.name} style={{ width: "200px", height: "150px" }} />
                    </div>
                    <div className="col-md-4">
                        <div className="card-body">
                        <h5 className="card-title" style={{ fontSize: "16px" }}>{productDetails.name}</h5>
                        <p className="card-text">{productDetails.brand}</p>
                        <p className="card-text">₹ {cartItem.itemPrice}</p>
                        <button type="button" className="btn btn-outline-danger btn-sm mx-2"
                            name={productDetails.name} onClick={handleRemoveFromCart}>Remove
                        </button>
                        <button type="button" className="btn btn-outline-secondary btn-sm mx-1" onClick={handleDecrementQuantity}>-</button>
                            {quantity}
                        <button type="button" className="btn btn-outline-secondary btn-sm mx-1" onClick={handleIncrementQuantity}>+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
