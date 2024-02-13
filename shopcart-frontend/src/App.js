import React, {useEffect, useState, useContext} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Mobile from './components/categories/Mobile';
import ProductState from './context/products/ProductState';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Cart from './components/cart/Cart';
import CartState from './context/cart/CartState';
import AddProduct from './components/product/AddProduct';
import Laptop from './components/categories/Laptop';
import Appliances from './components/categories/Appliances';
import Furniture from './components/categories/Furniture';
import ProductDescription from './components/product/ProductDescription';
import AddReview from './components/product/AddReview';
import Success from './components/order/Success';
import Cancel from './components/order/Cancel';
import UserState from './context/user/UserState';
import Orders from './components/order/Orders';
import OrderState from './context/orders/OrderState';
import Footer from './footer';
import Alert from './Alert';
import Products from './components/product/Products';

import { UserContext } from './context/user/userContext';
import UpdateProfile from './components/auth/UpdateProfile';
import Profile from './components/auth/Profile';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  const [alert, setAlert] = useState(null);

  const userContext = useContext(UserContext);
  const {user, getUser} = userContext;

  //const [currUser, setCurrUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem('token')) {
        await getUser(); // Fetch user details
        //setCurrUser(user); // Update currUser after fetching user details
      }
    };
    fetchUser();
  }, []);

  function showAlert(message, type){
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  // Function to determine if the current route is a login/signup page
  const isLoginOrSignupPage = () => {
    return location.pathname === '/login' || location.pathname === '/signup';
  };

  console.log("Curr user is: "+ user);

  return (
    <div className="App">
      <ProductState>
        <UserState>
          <CartState>
            <OrderState>
              <Navbar currUser={user}/>
              <Alert alert={alert}/>
              <div className="container">
                <Routes>
                  {/* <Route exact path="/" element={<Home />} /> */}
                  <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
                  <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
                  <Route exact path="/profile" element={<Profile currUser={user}/>} />
                  <Route exact path="/update" element={<UpdateProfile/>} />
                  <Route exact path="/" element={<Products currUser={user}/>} />
                  <Route exact path="/mobile" element={<Mobile currUser={user}/>} />
                  <Route exact path="/laptop" element={<Laptop currUser={user}/>} />
                  <Route exact path="/appliances" element={<Appliances currUser={user}/>} />
                  <Route exact path="/furniture" element={<Furniture currUser={user}/>} />
                  <Route exact path="/cart" element={<Cart />} />
                  <Route exact path="/addProduct" element={<AddProduct />} />
                  <Route exact path="/orders" element={<Orders />} />
                  <Route exact path="/product-description/:id" element={<ProductDescription />} />
                  <Route exact path="/product-description/:id/addReview" element={<AddReview />} />
                  <Route exact path="/payment/success" element={<Success />} />
                  <Route exact path="/payment/cancel" element={<Cancel />} />
                </Routes>
              </div>
              {!isLoginOrSignupPage() && <Footer />}
            </OrderState>
          </CartState>
        </UserState>
      </ProductState>
    </div>
  );
};

export default App;
