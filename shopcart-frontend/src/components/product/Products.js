import React, { useContext, useEffect, lazy, Suspense } from 'react';
import { ProductContext } from '../../context/products/productContext';
import { CartContext } from '../../context/cart/cartcontext';

// Lazy load the ProductDetail component
const ProductDetail = lazy(() => import('./ProductDetail'));

const Products = () => {
    const context = useContext(ProductContext);
    const { allProducts, getAllProducts } = context;

    const cartContext = useContext(CartContext);
    const { addToCart } = cartContext;


    useEffect(() => {
        getAllProducts();
    }, []);

    
    return (
        <div className='row my-3'>
            <div className='container'>
                {allProducts.length === 0 && <div>Loading...</div>}
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                {allProducts.map((product, index) => (
                    <ProductDetail key={index} item={product} addToCart={addToCart}/>
                ))}
            </Suspense>
        </div>
    );
};

export default Products;
