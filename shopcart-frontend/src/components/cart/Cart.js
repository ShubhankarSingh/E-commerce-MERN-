import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/cart/cartcontext";
import CartDetail from "./CartDetail";
import empty from './empty.webp'
import { useNavigate } from "react-router-dom";
import {loadStripe} from '@stripe/stripe-js';


const Cart = (props) => {
    const cartContext = useContext(CartContext);
    const { cartItems, fetchCart, fetchedCart, removeFromCart } = cartContext;

    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const handleClick = () =>{
        navigate("/"); 
    }


    // fetchedCart.products.map(product =>{
    //     console.log("Product: "+ product.product);
    // })

    const makePayment = async() =>{
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

        const body = {
            cart: fetchedCart,
        }
        const headers = {
            "Content-Type":"application/json"
        }
        const response = await fetch("http://localhost:5000/api/checkout/create-checkout-session",{
            method:"POST",
            headers:headers,
            body:JSON.stringify(body)
        });

        const session = await response.json();

        const result = stripe.redirectToCheckout({
            sessionId:session.id
        });
        
        if(result.error){
            console.log(result.error);
        }
    }   

    return (
        <div className="row my-3">
            <div className="container">
                {(cartItems.length === 0 ) && 
                    <div>
                    <div className="col-md-12">
                        <div className="card my-3">
                            <div className="card-body">
                            <div className="row">
                                <div className="className col">
                                    <img src={empty} alt="empty" style={{ width: "200px", height: "150px" }} />
                                </div>
                            </div>
                            <div className="row my-2">
                                <div className="className col">
                                    <p style={{ fontSize: "18px", fontWeight: 'bold' }}>You cart is empty!</p>
                                    <p style={{ fontSize: "13px" }}>Add items to it now.</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="className col">
                                    <button type="button" className="btn btn-primary btn-sm" onClick={handleClick}>Shop now</button>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                }
            </div>
            <div className="col-md-8">
                {cartItems.map((cartItem, index) => (
                    <CartDetail
                        key={index}
                        cartItem={cartItem}
                        fetchedCart={fetchedCart}
                        removeFromCart={removeFromCart}
                    />
                ))}
            </div>
            {cartItems.length != 0  &&
            <div className="col-md-4">
                <div className="card my-3">
                    <div className="card-body">
                        <h5 style={{ fontSize: "15px" }}>PRICE DETAILS</h5>
                        <hr />
                        <p style={{ fontSize: "18px" }}>Items in cart: {cartItems.length}</p>
                        <p style={{ fontSize: "18px", fontWeight: "bold" }}>Total Amount: ₹{fetchedCart.cartTotalPrice}</p>
                        <button type="button" className="btn btn-success btn-sm mx-1" onClick={makePayment}>Checkout</button>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default Cart;
