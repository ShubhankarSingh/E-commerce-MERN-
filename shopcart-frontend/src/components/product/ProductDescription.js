import React, { useEffect, useContext } from "react";
import { useLocation, useNavigate,  } from "react-router-dom";
import Reviews from "./Reviews";


const ProductDescription = (props) =>{

    const navigate = useNavigate();
    const location = useLocation();
    const {productDetails, imageSrc, currUser} = location.state || {};
    const productId = productDetails._id;

    const renderAboutParagraphs = () => {
        if (productDetails && productDetails.about) {
          // Split the about text into an array of bullet points
          const bulletPoints = productDetails.about.split("\n");
    
          // Map over the array to create separate paragraphs
          return bulletPoints.map((point, index) => (
            <p key={index} style={{ fontSize: "15px", textAlign: "left", fontFamily: 'sans-serif',  marginBottom: "8px",}}>
              {point}
            </p>
          ));
        }
    
        return null;
      };

      const handleClick = () => {
        navigate(`addReview/`, {state: {pid: productDetails._id}});
      }

    return (
        <div>
            {productDetails && (
            <div className="my-5">
            <div className="row">
                <div className="col-6">
                    <img src={imageSrc} alt={productDetails.name} style={{ width: "100%", height: "500px"}} />
                </div>
                <div className="col-5"> 
                    <p style={{ fontSize: '28px', fontWeight: 'normal', textAlign: 'left' }}>{productDetails.description}</p>
                    <hr></hr>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <p style={{ marginRight: '10px', fontSize: '15px' }}>M.R.P.:</p>
                        <p style={{ fontSize: '22px', textAlign: 'left', fontWeight: 'bold' }}>₹{productDetails.price}</p>
                    </div>
                    {(localStorage.getItem('token') && props.currUser.role === "user")
                    && <button type="submit" className="btn btn-primary common-btn" onClick={handleClick}>Add a review</button>
                    }
                    <hr></hr>
                    {/* Render separate paragraphs for each bullet point */}
                    <p style={{ fontSize: '16px', textAlign: 'left', fontWeight: 'bold' }}>About this item</p>
                    {productDetails.about && renderAboutParagraphs()}
                    <hr></hr>
                    
                    {productDetails.reviews.map((review, index) => (

                      <Reviews key={index} review={review} productId={productId} currUser={currUser}/>
                    ))}
                </div>
            </div>
            </div>
            )}
        </div>
    )

};

export default ProductDescription;

