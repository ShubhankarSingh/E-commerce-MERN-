import React, { useContext, useEffect, lazy, Suspense } from "react";
import { ProductContext } from "../../context/products/productContext";
import { CartContext } from "../../context/cart/cartcontext";


const ProductDetail = lazy(() => import("../product/ProductDetail"));

const Furniture = () => {

    const context = useContext(ProductContext);
    const {furniture, getFurniture} = context;

    const cartContext = useContext(CartContext);
    const {addToCart} = cartContext;

    useEffect(()=>{
        getFurniture();
    },[]);



    return (
        <div className='row my-3'>
            <h2>Furnitures</h2>
            <div className='container'>
                {furniture.length === 0 && <div>Loading...</div>}
            </div>
            <Suspense fallback={<div>Loading...</div>}>
            {furniture.map((furnitureItem, index) => {
                return <ProductDetail 
                        key={index}
                        item={furnitureItem}
                        addToCart={addToCart}
                        />
                }
            )}
            </Suspense>
        </div>
    );

}

export default Furniture;