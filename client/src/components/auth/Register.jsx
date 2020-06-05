import React, { Component } from 'react'
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authAction';
import axios from 'axios';
import classnames from 'classnames';
import PropTypes from 'prop-types';


class Register extends Component {
    constructor(){
        super();
        this.state = {
            name:'',
            email:'',
            password:'',
            password2:'',
            errors:{}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        //this [e.target.name] helps to make change to respective state object on change
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        //prevents form to send data to server, which means the page will be redirected to other page
        e.preventDefault();
        
        const newUser = {
            name: this.state.name,
            email:this.state.email,
            password:this.state.password,
            password2:this.state.password2,
        }

        //'registerUser' is action and accesed using props in component
        this.props.registerUser(newUser);


        // //client side http request base on promise and http://localhost:5000 is prefiex as proxy in package.json
        // axios.post('/api/users/register',newUser)
        //     .then(res => console.log(res.data))
        //     //recive error in object using 'err.response.data'
        //     .catch(err => this.setState({errors: err.response.data}));
    }

    render() {
        const {errors} = this.state;

        const { user } = this.props.auth;

        return (
            <div className="register">
                {user ? user.name : null}
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevConnector account</p>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                            <input type="text" 
                                    className={classnames("form-control form-control-lg",{
                                        //this errors.name is sent from server error object
                                        'is-invalid': errors.name
                                    })} 
                                    placeholder="Name" 
                                    name="name" 
                                    value={this.state.name} 
                                    onChange={this.onChange}/>
                                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                            </div>
                            <div className="form-group">
                            <input type="email" 
                                    className={classnames("form-control form-control-lg",{
                                        //this errors.name is sent from server error object
                                        'is-invalid': errors.email
                                    })} 
                                    placeholder="Email Address" 
                                    name="email" 
                                    value={this.state.email} 
                                    onChange={this.onChange}/>
                                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                            <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                            </div>
                            <div className="form-group">
                            <input type="password" 
                                    className={classnames("form-control form-control-lg",{
                                        //this errors.name is sent from server error object
                                        'is-invalid': errors.password
                                    })} 
                                    placeholder="Password" 
                                    name="password" 
                                    value={this.state.password}
                                    onChange={this.onChange}/>
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                            </div>
                            <div className="form-group">
                            <input type="password" 
                                    className={classnames("form-control form-control-lg",{
                                        //this errors.name is sent from server error object
                                        'is-invalid': errors.password2
                                    })} 
                                    placeholder="Confirm Password" 
                                    name="password2" 
                                    value={this.state.password2}
                                    onChange={this.onChange}/>
                                    {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                            </div>
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//propTypes checks props of component
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

//to access state of store using this.props.auth, here "auth:" can be any name , "state" comes from rootReducer state.auth so same name should be used
const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps,{registerUser})(Register);