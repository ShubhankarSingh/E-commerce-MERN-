import React from "react";
import {Link, useNavigate} from "react-router-dom"

const Navbar = () => {

    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem('token');
        navigate('login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">shopCart</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item"><Link className="nav-link" aria-current="page" to="/">Home</Link></li>
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Categories
                            </Link>
                            <ul className="dropdown-menu">
                                <Link className="dropdown-item" to="/mobile">Mobile</Link>
                                <Link className="dropdown-item" to="/laptop">Laptop</Link>
                                <Link className="dropdown-item" to="/appliances">Appliances</Link>
                                <Link className="dropdown-item" to="/furniture">Furniture</Link>
                            </ul>
                        </li>
                        {/* <li className="nav-item"><Link className="nav-link" aria-current="page" to="/mobile">Mobile</Link></li> */}
                    </ul>
                    
                    {localStorage.getItem('token') && <Link className="btn btn-light btn-sm mx-1" to="/addProduct" role="button">Add Product</Link>}
                    {localStorage.getItem('token') && <Link className="btn btn-light btn-sm" to="/cart" role="button">Cart</Link>}

                    {!localStorage.getItem('token') ?  <form action="" className="d-flex mx-2">
                    <Link className="btn btn-light btn-sm mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-light btn-sm mx-1" to="/signup" role="button">Signup</Link>
                    </form>: <button onClick={handleLogout} className="btn btn-light btn-sm mx-1">Logout</button>}

                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar