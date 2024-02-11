import React, { useEffect, useContext } from "react";
import { useNavigate,  } from "react-router-dom";


const Reviews = (props) =>{

    const {review, productId, currUser} = props;
    const navigate = useNavigate();
    let currUserId = null;

    if(localStorage.getItem('token') && currUser){
       currUserId = currUser._id.toString()
    }
    
    const changeTimeFormat = (timestamp) =>{
        const date = new Date(timestamp);
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-IN', options);
        return formattedDate;
    }

    const handleDelete = async (reviewId) => {
        try {
          const response = await fetch(`http://localhost:5000/api/products/${productId}/deletereview/${reviewId}`, {
            method: 'DELETE',
            headers: {
              'auth-token': localStorage.getItem('token')
            }
          });
      
        navigate("/");
        } catch (error) {
          console.error('Error deleting review:', error);
        }
    };

    return(
        <>
            <div className="review">
                <div className="row">
                <div className="col-12">
                    <h4 style={{ fontSize: '16px', textAlign: 'left' }}>{review.username}</h4>
                </div>
                <div className="col-12">
                    <p style={{ fontSize: '18px', textAlign: 'left' }}>
                    {review.stars} ⭐ {review.title}
                    </p>
                </div>
                <p style={{ fontSize: '14px', textAlign: 'left' }}>Reviewed on {changeTimeFormat(review.timestamp)}</p>
                <p style={{ fontSize: '14px', textAlign: 'left', fontWeight: 'bold'}}>{review.description}</p>
            
                { (currUserId === review.userId) &&
                <button type="button" className="btn btn-outline-danger btn-sm mx-2" onClick={() => handleDelete(review._id)}>Delete</button>
                }
                <hr></hr>
                </div>
            </div>
        </>
    )

};

export default Reviews;