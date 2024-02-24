import React, {useEffect, useState, useContext} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import NotFound from './components/NotFound';
import SearchResults from './components/SearchResults';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();

  const userContext = useContext(UserContext);
  const {user, getUser} = userContext;

  const isLoggedIn = !!localStorage.getItem('token');

  console.log("Islogged in: " + isLoggedIn);

  useEffect(() => {
    const fetchUser = async () => {
      if (localStorage.getItem('token')) {
        await getUser(); // Fetch user details
      }
    };
    fetchUser();
  }, []);


  // Function to determine if the current route is a login/signup page
  const isLoginOrSignupPage = () => {
    return location.pathname === '/login' || location.pathname === '/signup';
  };

  console.log("Curr user is " + user +   " and has " + user.role + " access");

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
                  <Route exact path="/login"  element={<Login/>}/>
                  <Route exact path="/signup" element={<Signup/>}/>               
                  <Route exact path="/" element={<Products currUser={user}/>} />
                  <Route exact path="/mobile" element={<Mobile currUser={user}/>} />
                  <Route exact path="/laptop" element={<Laptop currUser={user}/>} />
                  <Route exact path="/appliances" element={<Appliances currUser={user}/>} />
                  <Route exact path="/furniture" element={<Furniture currUser={user}/>} />
                  <Route exact path="/search-results" element={<SearchResults currUser={user}/>} />
                  <Route path="/product-description/:id" element={<ProductDescription currUser={user}/>} />
                  <Route path="*" element={<NotFound />} />
                  {isLoggedIn && (
                    <>
                      <Route path="/profile" element={<UpdateProfile currUser={user} />} />
                      <Route path="/cart" element={<Cart currUser={user} />} />
                      {(user.role === "admin") && <Route path="/addProduct" element={<AddProduct />} />}
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/product-description/:id/addReview" element={<AddReview />} />
                      <Route path="/payment/success" element={<Success />} />
                      <Route path="/payment/cancel" element={<Cancel />} />
                    </>
                  )}
                  {!isLoggedIn && (
                    <>
                      <Route path="/profile" element={<Navigate to="/login" />} />
                      <Route path="/cart" element={<Navigate to="/login" />} />
                      <Route path="/addProduct" element={<Navigate to="/login" />} />
                      <Route path="/orders" element={<Navigate to="/login" />} />
                      <Route path="/product-description/:id/addReview" element={<Navigate to="/login" />} />
                      <Route path="/payment/success" element={<Navigate to="/login" />} />
                      <Route path="/payment/cancel" element={<Navigate to="/login" />} />
                    </>
                  )}
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
