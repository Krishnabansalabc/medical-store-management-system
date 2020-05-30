import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import medicine from './medicine.jpg';

class About extends Component {

    render() {
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                    <Link to="/" className="brand-logo">Logo</Link>
                        <div className="right hide-on-med-and-down">
                        <Link to="/login" >
                            <button 
                                className =" btn waves-effect red lighten-2"
                                 type = "submit"
                                 name = "action"
                                >
                                    Login
                                </button>
                                </Link>
                                &nbsp;&nbsp;
                            <Link to="/register" ><button 
                                className =" btn waves-effect red lighten-2"
                                 type = "submit"
                                 name = "action"
                                 
                                 >
                                    Register
                                </button></Link>
                        </div>
                    </div>
                </nav>
                <div className="row" style = {{marginTop:'100px'}}>
                    
                    <center><font size = '35' color = 'amber'>MEDICAL STORE MANAGEMENT SYSTEM</font></center>
                    <center><img src = {medicine} alt = "medicine"></img></center>
                </div>
            </div>
        );
    }
}

export default About;