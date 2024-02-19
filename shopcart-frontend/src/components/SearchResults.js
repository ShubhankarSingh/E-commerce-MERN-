import React, { useEffect, useState,useContext } from "react";
import { useLocation } from "react-router-dom";
import ProductDetail from "./product/ProductDetail";
import { CartContext } from "../context/cart/cartcontext";


const SearchResults = (props) => {
    const location = useLocation();
    const [results, setResults] = useState([]);
    const host = "http://localhost:5000"

    const cartContext = useContext(CartContext);
    const { addToCart, fetchCart, cartItems } = cartContext;


    useEffect(() => {
        const queryParam = new URLSearchParams(location.search).get("query");
        if (queryParam) {
            searchProduct(queryParam);
        }
        if (localStorage.getItem('token')){
            fetchCart();
        }
    }, [location.search]);

    const searchProduct = async (query) => {
        const response = await fetch(`${host}/api/products/search?query=${query}`);
        const json = await response.json();
        setResults(json);
    }



    return (
        <div className='row my-3'>
            <div className='container'>
                {results.length === 0 && <div>Loading...</div>}
            </div>
            {results.map((result, index) => (
                <ProductDetail key={index} item={result} addToCart={addToCart} cartItems={cartItems} currUser={props.currUser}/>
            ))}
        </div>
    );
}

export default SearchResults;
