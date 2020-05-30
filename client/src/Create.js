import React, { useState } from 'react';
import axios from 'axios';
import Nav from './Nav';

const Create = () => {
    // state
    const [state, setState] = useState({
        title: '',
        content: '',
        user: '',
        date:'',
        sttock:"",
        price:""
    });
    // destructure values from state
    const { title, content, user, date,stock,price } = state;

    // onchange event handler
    const handleChange = name => event => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        // console.table({ title, content, user });
        axios
            .post(`/api/medicines`, { title, content, user,date,stock,price })
            .then(response => {
                console.log(response);
                // empty state
                setState({ ...state, title: '', content: '', user: '',date:'',stock:'',price:'' });
                // show sucess alert
                alert(`Medicine titled ${response.data.title} is added`);
            })
            .catch(error => {
                console.log(error.response);
                alert(error.response.data.error);
            });
    };

    return (
        <div className="container pb-5">
            <Nav />
            <br />
            <h1>Add Medicine</h1>
            <br />

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
                    <label className="text-muted">Maufactured By</label>
                    <input
                        onChange={handleChange('user')}
                        value={user}
                        type="text"
                        className="form-control"
                        placeholder="write company name"
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
                    <button className="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    );
};

export default Create;
