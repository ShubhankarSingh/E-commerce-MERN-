import React, { useContext, useEffect, lazy, Suspense } from "react";
import { ProductContext } from "../../context/products/productContext";
import { CartContext } from "../../context/cart/cartcontext";


const ProductDetail = lazy(() => import("../product/ProductDetail"));

const Appliances = () => {

    const context = useContext(ProductContext);
    const {appliance, getAppliances} = context;

    const cartContext = useContext(CartContext);
    const {addToCart} = cartContext;

    useEffect(()=>{
        getAppliances();
    },[]);

    return (
        <div className='row my-3'>
            <h2>Home Appliances</h2>
            <div className='container'>
                {appliance.length === 0 && <div>Loading...</div>}
            </div>
            <Suspense fallback={<div>Loading...</div>}>
            {appliance.map((applianceItem, index) => {
                return <ProductDetail 
                        key={index}
                        item={applianceItem}
                        addToCart={addToCart}
                        />
                }
            )}
            </Suspense>
        </div>
    );

}

export default Appliances;