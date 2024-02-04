import React, {createContext, useState} from "react";
import {CartContext} from './cartcontext';

const CartState = (props) => {

    const host = "http://localhost:5000";
    
    const [fetchedCart, setFetchedCart] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [updatedCartItem, setUpdatedCartItem] = useState([]);


    const fetchCart = async () =>{

        const response = await fetch(`${host}/api/cart`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
        })
        const json = await response.json();
        console.log("Json cart response is :" + json);

        setFetchedCart(json.cart);
        setCartItems(json.products);
        
    }


    const addToCart = async (item) =>{
        const response = await fetch(`${host}/api/cart/addtoCart/${item}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = response.json();
        setCart(json);
    };

    const updateItemQuantity = async(cartId, itemId, quantity) =>{
        const response = await fetch(`${host}/api/cart/${cartId}/${itemId}/updateQuantity/${quantity}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'auth-token': localStorage.getItem('token')
            },
        });

        const json = response.json();
        setUpdatedCartItem(json);
    }

    const removeFromCart = async (cartId, productId) =>{
        try{
            const response = await fetch(`${host}/api/cart/${cartId}/removeFromCart/${productId}`,{
                method: 'DELETE',
                headers: {
                    'auth-token': localStorage.getItem('token')
                },
            });
        }catch (error) {
            console.error('Error deleting review:', error);
        }
    }

    return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, cartItems, fetchCart, fetchedCart, updatedCartItem, updateItemQuantity}}>
            {props.children}
    </CartContext.Provider>
    )
}

export default CartState;