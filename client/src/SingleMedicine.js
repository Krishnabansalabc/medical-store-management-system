import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';

const SingleMedicine = props => {
    const [medicine, setMedicine] = useState('');

    useEffect(() => {
        axios
            .get(`/api/medicines/${props.match.params.slug}`)
            .then(response => setMedicine(response.data))
            .catch(error => alert('Error loading single medicine'));
    }, []);

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>{medicine.title}</h1>
            <p className="lead">{medicine.content}</p>
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
                                 </p>        </div>
    );
};

export default SingleMedicine;
