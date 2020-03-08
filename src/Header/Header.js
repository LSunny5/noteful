import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <Link to="/"> 
                <h1>Noteful</h1>
            </Link>
        </header>
    );
}

export default Header;