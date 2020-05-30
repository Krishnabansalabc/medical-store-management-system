import React from 'react';
import { Link } from 'react-router-dom';



const Nav = () => (
    <nav>
        <ul className="left hide-on-med-and-down">
            <li className="nav-item pr-3 pt-3 pb-3">
                <Link to="/home">Home</Link>
            </li>
            <li className="nav-item pr-3 pt-3 pb-3">
                <Link to="/create">Create</Link>
            </li>
        </ul>
    </nav>
);

export default Nav;
