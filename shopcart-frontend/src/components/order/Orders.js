import React, { useContext, useEffect } from 'react';
import { OrderContext } from '../../context/orders/orderContext';
import { UserContext } from '../../context/user/userContext';
import OrderDetail from "./OrderDetail";
import imgSrc from './order_success.jpg'
import { useNavigate } from 'react-router-dom';

const Orders = () =>{

    const navigate = useNavigate();

    const userContext = useContext(UserContext);
    const {user, getUser} = userContext;

    const orderContext = useContext(OrderContext);
    const {orders, fetchOrder} = orderContext;

    useEffect(()=>{

        const fetchUserOrder = async()=>{
            await getUser();
            await fetchOrder(user._id);
        }

        fetchUserOrder();
        
    },[user._id]);

    const handleClick = () =>{
        navigate("/"); 
    }

    console.log("Orders: "+ orders);

    return(
        <div className='row my-3'>
            {!orders &&
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card cart-card my-3">
                                <div className="card-body d-flex justify-content-center align-items-center">
                                    <div className="text-center">
                                        <img src={imgSrc} alt="empty" style={{ width: "250px", height: "150px" }} />
                                        <div className="my-2">
                                            <p style={{ fontSize: "18px", fontWeight: 'bold' }}>You have not ordered anything yet!</p>
                                        </div>
                                        <button type="button" className="btn btn-primary btn-sm" onClick={handleClick}>Shop now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {orders && 
                orders.map((order, index)=>(
                    <div key={index}>
                        {order.items.map((orderedItem, itemIndex) => (
                            <OrderDetail key={itemIndex} orderedItem={orderedItem} />
                        ))}
                    </div>
                ))
            }
        </div>
    )
};

export default Orders
