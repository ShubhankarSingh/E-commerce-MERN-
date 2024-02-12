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
                <div className="d-flex flex-row">
                    <div className="col-md-2">
                        <img src={imageSrc} alt={orderedItem.name} style={{ width: "200px", height: "160px" }} />
                    </div>
                    <div className="p-2 col-md-3">
                        <div className="card-body">
                            <h5 className="card-title" style={{ fontSize: "15px", marginBottom: "0" }}>{orderedItem.name}</h5>
                            <p className="card-text" style={{ fontSize: "12px", color: "grey", marginBottom: "0" }}>Quantity: {orderedItem.quantity}</p>
                        </div>
                    </div>
                    <div className="p-2 col-md-6">
                        <div className="card-body">
                            <p className="card-text" style={{ fontSize: "15px", marginBottom: "0"}}> ₹{orderedItem.price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default OrderDetail;