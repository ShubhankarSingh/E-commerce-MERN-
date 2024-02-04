import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
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
import UserState from './context/user/UserState';

const App = () => {
  return (
    <div className="App">
    <ProductState>
    <UserState>
    <CartState>      
    <Router>
        <Navbar/>
        <div className='container'>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/mobile" element={<Mobile/>} />
            <Route exact path="/laptop" element={<Laptop/>} />
            <Route exact path="/appliances" element={<Appliances/>} />
            <Route exact path="/furniture" element={<Furniture/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} />
            <Route exact path="/cart" element={<Cart/>} />
            <Route exact path="/addProduct" element={<AddProduct/>} />
            <Route exact path="/product-description/:id" element={<ProductDescription/>} />
            <Route exact path="/product-description/:id/addReview" element={<AddReview/>} />
          </Routes>
        </div>
      </Router>
      </CartState>
      </UserState>
    </ProductState>
    </div>
  );
}

export default App;
