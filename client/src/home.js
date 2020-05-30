import React, { useState, useEffect } from 'react';
import Nav from './Nav';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "materialize-css/dist/css/materialize.min.css";

const Home = () => {
    const [medicines, setMedicines] = useState([]);

    const fetchMedicines = () => {
        axios
            .get(`/api/medicines`)
            .then(response => {
                // console.log(response);
                setMedicines(response.data);
            })
            .catch(error => alert('Error fetching medicines'));
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    const deleteConfirm = (slug) =>{
        let answer = window.confirm('Are you sure you want to delete this Medicine details?');
        if(answer){
            deleteMedicine(slug)
        }
    }

    const deleteMedicine = slug =>{
        axios.delete(`/api/medicines/${slug}`)
        .then(response=>{
            alert(response.data.message)
            fetchMedicines()
        } )
        .catch(error=>alert(`Error in deleting medicine details.`))
    }

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>Medical Store Management System</h1>
            <hr />
            {medicines.map((medicine, i) => (
                <div className="row" key={medicine._id} style={{ borderBottom: '1px solid silver' }}>
                    <div className="col s8">
                        <div className="row">
                            <div className="left col-md-10">
                                <Link to={`/medicines/${medicine.slug}`}>
                                    <h2>{medicine.title}</h2>
                                </Link>
                                <p className="lead">{medicine.content.substring(0, 100)}</p>
                                <p>
                                    Manufacturer: <span className="badge">{medicine.user}</span>
                                    </p>
                                    <p>
                                    Stocks: <span className="badge">{medicine.stock}</span>
                                    </p>
                                    <p>
                                    Price: <span className="badge">{medicine.price}</span>
                                    </p>
                                <p>
                                 Expiration Date: <span className="badge">{medicine.date}</span>
                                 </p>
                            </div>

                            <div className="right col s4">
                                <Link to={`/medicines/update/${medicine.slug}`} >
                                    <button className="btn btn-sm btn-outline-warning">Update</button>
                                    
                                </Link>&nbsp;&nbsp;
                                <button onClick = {()=>deleteConfirm(medicine.slug)}
                                 className="btn btn-sm btn-outline-danger ml-1">Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
