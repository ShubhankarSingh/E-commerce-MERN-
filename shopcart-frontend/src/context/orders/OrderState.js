import React, {useState} from 'react'
import {OrderContext} from './orderContext';


const OrderState = (props) =>{

    const host = "http://localhost:5000"
    const [orders, setOrder] = useState([]);

    const fetchOrder = async(userId) =>{

        const response = await fetch(`${host}/api/order/fetchOrder/${userId}`,{
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });

        const json = await response.json();
        console.log("Fetch order: " + json);
        setOrder(json.orders);
    }


    return(
        <OrderContext.Provider value={{orders, fetchOrder}}>
            {props.children}
        </OrderContext.Provider>
    )

};

export default OrderState;