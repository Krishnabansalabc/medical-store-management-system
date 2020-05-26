import React, { Component } from 'react';
import { registerUser } from '../../actions/user_actions';
import { connect } from 'react-redux';

export class Register extends Component {
    state = {
        lastname:"",
        name:"",
        email:"",
        password:"",
        passwordConfirmation:"",
        errors:[]
    }

    handleChange = event=>{
        this.setState({ [event.target.name]:event.target.value })
    }

    submitForm = event=>{
        event.preventDefault(); 

        let dataToSubmit = {
            email:this.state.email,
            name:this.state.name,
            lastname:this.state.lastname,
            password:this.state.password,
            passwordConfirmation:this.state.passwordConfirmation
        };

        if(this.isFormValid(this.state)){
            this.setState({ errors:[]})
            this.props.dispatch(registerUser(dataToSubmit))
            .then(response =>{
                
                if(response.payload.success){
                    this.props.history.push('/login')
                }else{
                    this.setState({
                        errors:this.state.errors.concat(
                            "Your Attempt to Create Account is Failed"
                        )
                    })
                }
            } )
            .catch(err=>{
                this.setState({
                    errors:this.state.errors.concat(err)
                })
            })
        }else{
            this.setState({
                errors:this.state.errors.concat(
                    "form is not valid"
                )
            })
        }
    }
    

    displayErrors = errors=>
        errors.map((error, i)=><p key = {i}>{error}</p>)


    isFormValid = ()=>{
        let errors = [];
        let error="";
        if(this.isFormEmpty(this.state)){
            this.setState({
                errors:this.state.errors.concat( 'Kindly fill all fields.' )
            })
        }else if(this.state.password.length<5){
            this.setState(
                {
                    errors:this.state.errors.concat("Password Should have alteast 6 characters")
                })
        }else if(this.state.password != this.state.passwordConfirmation){
            this.setState(
                {
                    errors:this.state.errors.concat("Password Mismatched")
                })
        }
        else{ return(true);}
    }
    isFormEmpty = ({lastname,name,email,password,passwordConfirmation})=>{
     return(
         !lastname.length
         || !name.length 
         || !email.length 
         || !password.length
        || !passwordConfirmation.length);
    }
    render() {
        return (
            <div className = "container">
            <h2>Register</h2>
            <div className = "row">
                <div className="col s12" >
                    <div className="row">
                        <div className = "input-field col s12">
                        <input
                            name = "lastname" 
                            value = {this.state.lastname}
                            onChange = {e => this.handleChange(e)}
                            id="lastname"
                            type = "text"
                            className = "validate" 
                        />
                        <label className="active">Lastname</label>
                        <span
                            className="helper-text"
                            data-error = "Type a right type email"
                            data-success = "right"
                        />    
                        </div>  
                    </div>
                    <div className="row">
                        <div className = "input-field col s12">
                        <input
                            name = "name" 
                            value = {this.state.name}
                            onChange = {e => this.handleChange(e)}
                            id="name"
                            type = "text"
                            className = "validate" 
                        />
                        <label className="active">Name</label>
                        <span
                            className="helper-text"
                            data-error = "Wrong"
                            data-success = "right"
                        />    
                        </div>  
                    </div>
                    <div className="row">
                            <div className = "input-field col s12">
                            <input
                                name = "email" 
                                value = {this.state.email}
                                onChange = {e => this.handleChange(e)}
                                id="email"
                                type = "email"
                                className = "validate" 
                            />
                            <label className="active" htmlFor="email">Email</label>
                            <span
                                className="helper-text"
                                data-error = "Type a right type email"
                                data-success = "right"
                            />    
                            </div>  
                        </div>
                        <div className="row">
                            <div className = "input-field col s12">
                            <input
                                name = "password" 
                                value = {this.state.password}
                                onChange = {e => this.handleChange(e)}
                                id="password"
                                type = "password"
                                className = "validate" 
                            />
                            <label className="active" htmlFor="email">Password</label>
                            <span
                                className="helper-text"
                                data-error = "Wrong"
                                data-success = "right"
                            />    
                            </div>  
                        </div>
                        <div className="row">
                            <div className = "input-field col s12">
                            <input
                                name = "passwordConfirmation" 
                                value = {this.state.passwordConfirmation}
                                onChange = {e => this.handleChange(e)}
                                id="passwordConfirmation"
                                type = "password"
                                className = "validate" 
                            />
                            <label className="active" htmlFor="email">Password Confirmation</label>
                            <span
                                className="helper-text"
                                data-error = "Wrong"
                                data-success = "right"
                            />    
                            </div>  
                        </div>

                    {this.state.errors.length>0 && (
                        <div>
                            {this.displayErrors(this.state.errors)}
                        </div>
                    )}
                    <div className="row">
                        <div className = "col s12">
                            <button 
                            className =" btn waves-effect red lighten-2"
                             type = "submit"
                             name = "action"
                             onClick = {this.submitForm}
                             >
                                Register
                            </button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
        );
    }
}

export default connect()(Register);