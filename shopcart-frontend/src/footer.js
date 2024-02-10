import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'; // Import the Font Awesome icons
import '../src/styles/css/footer.css';

const Footer = () => {
  return (
    <div className="footer-dark">
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-4 item text">
              <h3>Location</h3>
              <p>22, Lorem ipsum dolor, consectetur adipiscing</p>
              <p className="mb-0"><FaPhone className="mr-3" /> (531) 554-3410</p> {/* Use FaPhone component */}
              <p><FaEnvelope className="mr-3" /> info@shopcart.com</p> {/* Use FaEnvelope component */}
            </div>
            <div className="col-lg-4 item text">
              <h3>About</h3>
              <ul>
                <li><Link to="#">Company</Link></li> {/* Update Link usage */}
                <li><Link to="#">Team</Link></li>
                <li><Link to="#">Careers</Link></li>
              </ul>
            </div>
            <div className="col-lg-4 item text">
              <h3>shopCart</h3>
              <p>shopCart is an E-commrece platform selling diverse products including electronics, fashion, home goods, and groceries online.</p>
            </div>
            <div className="col social">
              <Link to="#"><FaFacebook /></Link> {/* Use FaFacebook component */}
              <Link to="#"><FaInstagram /></Link> {/* Use FaInstagram component */}
              <Link to="#"><FaTwitter /></Link> {/* Use FaTwitter component */}
            </div>
          </div>
          <p className="copyright my-2">A-plus © 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
