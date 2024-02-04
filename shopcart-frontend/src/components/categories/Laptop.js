import React, { useContext, useEffect, lazy, Suspense } from "react";
import { ProductContext } from "../../context/products/productContext";
import { CartContext } from "../../context/cart/cartcontext";


const ProductDetail = lazy(() => import("../product/ProductDetail"));

const Laptop = () => {

    const context = useContext(ProductContext);
    const {laptop, getLaptop} = context;

    const cartContext = useContext(CartContext);
    const {addToCart} = cartContext;

    useEffect(()=>{
        getLaptop();
    },[]);



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
                        />
                }
            )}
            </Suspense>
        </div>
    );

}

export default Laptop;