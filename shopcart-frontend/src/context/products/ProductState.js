import React, { useState } from "react";
import {ProductContext} from './productContext';

const ProductState = (props) =>{

    const host = "http://localhost:5000"
    const[products, setProducts] = useState([]);
    const[allProducts, setAllProducts] = useState([]);
    const[mobile, setMobile] = useState([]);
    const[laptop, setLaptop] = useState([]);
    const[appliance, setAppliances] = useState([]);
    const[furniture, setFurniture] = useState([]);
    const[selectedProduct, setSelectedProduct] = useState(null);
    const[reviews, setReviews] = useState([]);


    //Get a product using PID 
    const getProduct = async (pid) =>{

        //API Call
        const response = await fetch(`${host}/api/products/getproduct/${pid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        return json;
    }

    const getAllProducts = async () =>{

        const response = await fetch(`${host}/api/products`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json",
            }
        });
        const json = await response.json();
        setAllProducts(json);
    }

    const getMobile = async () =>{

        //API Call
        const response = await fetch(`${host}/api/products/getproduct/category/Mobile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }  
        });

        const json = await response.json()
        setMobile(json)
    }

    const getLaptop = async () =>{

        //API Call
        const response = await fetch(`${host}/api/products/getproduct/category/Laptop`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }  
        });

        const json = await response.json()
        setLaptop(json)
    }

    const getAppliances = async () =>{

        //API Call
        const response = await fetch(`${host}/api/products/getproduct/category/Appliances`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }  
        });

        const json = await response.json()
        setAppliances(json)
    }

    const getFurniture = async () =>{

        //API Call
        const response = await fetch(`${host}/api/products/getproduct/category/Furniture`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }  
        });

        const json = await response.json()
        setFurniture(json)
    }
    
    const addReview = async (pid, formData) =>{
      
        try {
            const response = await fetch(`http://localhost:5000/api/products/${pid}/addreview`, {
                method: 'POST',
                headers:{
                    'auth-token': localStorage.getItem('token')
                },
                body: formData,
            });
            
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    }

    const getReviews = async (pid) =>{
        try{
            const response = await fetch(`http://localhost:5000/api/products/${pid}/reviews`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const json = await response.json();
            setReviews(json);
        }catch (error) {
            console.error("Error fetching reviews:", error);
        }
    };

    return (
        <ProductContext.Provider value={{products, getProduct, mobile, getMobile, laptop, getLaptop , 
        appliance, getAppliances, furniture, getFurniture ,allProducts, getAllProducts, addReview, reviews, getReviews, selectedProduct, setSelectedProduct}}>
            {props.children}
        </ProductContext.Provider>
    )

}

export default ProductState;