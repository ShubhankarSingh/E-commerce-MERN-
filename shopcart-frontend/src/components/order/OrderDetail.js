import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { ProductContext } from "../../context/products/productContext";

const OrderDetail = (props) =>{

    const {orderedItem} = props;

    const productContext = useContext(ProductContext);
    const { getProduct } = productContext;

    const [productDetails, setProductDetails] = useState({});
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        const fetchImageAndProductDetails = async () => {
            try {
                // Fetch product details for the current cartItem
                const productData = await getProduct(orderedItem.product);
                
                setProductDetails(productData);

                // Fetch image for the current orderedItem
                const response = await fetch(`http://localhost:5000/api/products/getimage/${orderedItem.product}`);
                if (response.ok) {
                    const arrayBuffer = await response.arrayBuffer();
                    const base64String = btoa(
                        new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                    setImageSrc(`data:image/png;base64, ${base64String}`);
                } else {
                    console.error('Error fetching image:', response.status);
                }
            } catch (error) {
                console.log('Error fetching image or product details:', error);
            }
        };

        fetchImageAndProductDetails();
    }, [orderedItem.product, getProduct]);

    return(
        <div className="col">
            <div className="card my-3">
                <div className="row">
                    <div className="col-md-4 my-3">
                        <img src={imageSrc} alt={orderedItem.name} style={{ width: "200px", height: "150px" }} />
                    </div>
                    <div className="col-md-4">
                        <div className="card-body">
                        <h5 className="card-title" style={{ fontSize: "16px" }}>{orderedItem.name}</h5>
                        <p className="card-text">{orderedItem.quantity}</p>
                        <p className="card-text">₹ {orderedItem.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default OrderDetail;