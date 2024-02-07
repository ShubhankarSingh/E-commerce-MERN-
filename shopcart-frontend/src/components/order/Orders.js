import React, { useContext, useEffect } from 'react';
import { OrderContext } from '../../context/orders/orderContext';
import { UserContext } from '../../context/user/userContext';
import OrderDetail from "./OrderDetail";


const Orders = () =>{

    const userContext = useContext(UserContext);
    const {user, getUser} = userContext;

    const orderContext = useContext(OrderContext);
    const {orders, fetchOrder} = orderContext;

    useEffect(()=>{

        const fetchUserOrder = async()=>{
            await getUser();
            console.log("User id is: "+ user._id);
            await fetchOrder(user._id);
        }

        fetchUserOrder();
        
    },[user._id]);

    return(
        <div className='row my-3'>
            <h2>My Orders</h2>
            <div className='container'>
                {orders ? (<div></div>) : (<div>You have not ordered anything yet!</div>)}
            </div>

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
