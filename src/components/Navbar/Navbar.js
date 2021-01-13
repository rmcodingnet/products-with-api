import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navItem">
                <Link to="/">Product List</Link>
            </div>
            <div className="navItem">
                <Link to="/addProduct/">Add New Product</Link>
            </div>
            <div className="navItem">
                <Link to="/checkout">Basket</Link>
            </div>
        </div>
    );
};

export default Navbar;