import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from './Nav';

const UpdateMedicine = props => {
    const [state, setState] = useState({
        title: '',
        content: '',
        slug: '',
        user: '',
        date:"",
        stock:'',
        price:''
    });
    const { title, content, slug, user,date,stock,price } = state;

    useEffect(() => {
        axios
            .get(`/api/medicines/${props.match.params.slug}`)
            .then(response => {
                const { title, content, slug, user,date,stock,price } = response.data;
                setState({ ...state, title, content, slug, user,date,stock,price });
            })
            .catch(error => alert(`Error loading medicine`));
    }, []);

    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ title, content, user });
        axios
            .put(`/api/medicines/${slug}`, { title, content, user,date,stock,price })
            .then(response => {
                console.log(response);
                const { title, content, slug, user,date,stock,price } = response.data;
                // empty state
                setState({ ...state, title, content, slug, user,date,stock,price });
                // show sucess alert
                alert(`Medicine titled ${title} is updated`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    const showUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input
                    onChange={handleChange('title')}
                    value={title}
                    type="text"
                    className="form-control"
                    placeholder="Medicine Name"
                    required
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Usage</label>
                <textarea
                    onChange={handleChange('content')}
                    value={content}
                    type="text"
                    className="form-control"
                    placeholder="Write usage"
                    required
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Manufactured by</label>
                <input
                    onChange={handleChange('user')}
                    value={user}
                    type="text"
                    className="form-control"
                    placeholder="Write Company name"
                    required
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Expiry Date</label>
                <input
                    onChange={handleChange('date')}
                    value={date}
                    type="date"
                    className="form-control"
                    placeholder="DD-MM-YYYY"
                    required
                />
            </div>
            <div className="form-group">
                    <label className="text-muted">Stock</label>
                    <input
                        onChange={handleChange('stock')}
                        value={stock}
                        type="number"
                        className="form-control"
                        placeholder="0"
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="text-muted">Price</label>
                    <input
                        onChange={handleChange('price')}
                        value={price}
                        type="number"
                        className="form-control"
                        placeholder="0"
                        required
                    />
                </div>
                
            <div>
                <button className="btn btn-primary">Update</button>
            </div>
        </form>
    );

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>UPDATE MEDICINE DETAILS</h1>
            {showUpdateForm()}
        </div>
    );
};

export default UpdateMedicine;
