import React, { useContext, useEffect } from "react";
import { CartContext } from "../../context/cart/cartcontext";
import CartDetail from "./CartDetail";
import empty from './empty.webp'
import { useNavigate } from "react-router-dom";

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
                        <p style={{ fontSize: "18px", fontWeight: "bold" }}>Total Amount: ₹{fetchedCart.cartTotalPrice}</p>
                    </div>
                </div>
            </div>
            }
        </div>
    );
};

export default Cart;
