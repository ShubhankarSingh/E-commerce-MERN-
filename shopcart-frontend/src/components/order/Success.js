import React, {useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import orderSuccess from './order_success.jpg'
import "../../styles/css/common-btn.css"

const Success = (props) => {

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cartId = params.get("orderId");
  const host = "http://localhost:5000";
  const navigate = useNavigate();

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

  const handleClick = () =>{
    navigate("/orders"); 
  }

  return (
    <>
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <div className="card my-3">
                    <div className="card-body d-flex justify-content-center align-items-center">
                        <div className="text-center">
                          <div className="row">
                            <div className="col"><p style={{ fontSize: "16px", fontWeight: 'bold' }}>Order Placed Successfully 😍</p></div>
                          
                          </div>
                          <div className="row">
                          
                            <div className="col"><img src={orderSuccess} alt="empty" style={{ width: "400px", height: "200px" }}/></div>
                            
                          </div>
                          <div className="row mt-3">
                            
                            <div className="col"> <button type="button" className="btn btn-primary btn-sm common-btn" onClick={handleClick}>My Orders</button></div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Success