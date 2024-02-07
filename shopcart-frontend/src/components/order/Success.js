import React, {useEffect} from 'react'
import { useLocation } from 'react-router-dom'

const Success = (props) => {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cartId = params.get("orderId");
  const host = "http://localhost:5000"

  useEffect(()=>{

    if(cartId){

      fetch(`${host}/api/order/createOrder/${cartId}`,{
        method: 'POST',
        headers:{
          "auth-token": localStorage.getItem('token')
        }
      })
      .then(response => {
        if (response.ok) {
            console.log("Order created successfully");

            // Delete the cart if order is successful 
            fetch(`${host}/api/cart/deleteCart/${cartId}`,{
              method: 'DELETE',
              headers:{
                "auth-token": localStorage.getItem('token')
              }
            });
        } else {
            console.error("Failed to create order");
        }
      })
      .catch(error => {
          console.error("Error creating order:", error);
      });
    }


  },[cartId]);


  return (
    <div>Order Placed Successfully!</div>
  )
}

export default Success