import React, { useContext, useEffect, lazy, Suspense } from "react";
import { ProductContext } from "../../context/products/productContext";
import { CartContext } from "../../context/cart/cartcontext";
import { UserContext } from "../../context/user/userContext";

const ProductDetail = lazy(() => import("../product/ProductDetail"));

const Laptop = (props) => {

    const context = useContext(ProductContext);
    const {laptop, getLaptop} = context;

    const cartContext = useContext(CartContext);
    const {addToCart, fetchCart, cartItems} = cartContext;

    useEffect(() => {
        getLaptop();
        if (localStorage.getItem('token')){
            fetchCart();
        }
    }, []);

    return (
        <div className='row my-3'>
            <h2>Laptops</h2>
            <div className='container'>
                {laptop.length === 0 && <div>Loading...</div>}
            </div>
            <Suspense fallback={<div>Loading...</div>}>
            {laptop.map((laptopItem, index) => {
                return <ProductDetail 
                        key={index}
                        item={laptopItem}
                        addToCart={addToCart}
                        cartItems={cartItems} 
                        currUser={props.currUser}/>
                }
            )}
            </Suspense>
        </div>
    );

}

export default Laptop;