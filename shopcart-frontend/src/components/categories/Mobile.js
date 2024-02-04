import React, { useContext, useEffect, lazy, Suspense} from "react";
import {ProductContext} from '../../context/products/productContext'
import { CartContext } from "../../context/cart/cartcontext";


// Lazy load the ProductDetail component
const ProductDetail = lazy(() => import('../product/ProductDetail'));

const Mobile = () => {
    const context = useContext(ProductContext);
    const { mobile, getMobile } = context;

    const cartContext = useContext(CartContext);
    const {addToCart} = cartContext;


    useEffect(() => {
        getMobile();
    }, []);

    //console.log('Mobile Array:', mobile); // Check the structure and content in console
    return (
        <div className='row my-3'>
            <h2>Mobile Phones</h2>
            <div className='container'>
                {mobile.length === 0 && <div>Loading...</div>}
            </div>
            <Suspense fallback={<div>Loading...</div>}>
            {mobile.map((mobileItem, index) => {
                return <ProductDetail 
                        key={index}
                        item={mobileItem}
                        addToCart={addToCart}
                        />
                }
            )}
            </Suspense>
        </div>
    );
};

export default Mobile;
