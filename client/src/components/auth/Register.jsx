import React, { Component } from 'react'
import {connect} from 'react-redux';
import {registerUser} from '../../actions/authAction';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';

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

    componentDidMount() {
        if(this.props.auth.isAuthenticated){
          this.props.history.push('/dashboard');
        }
      }

    //this props is from redux i.e 'mapStateToProps'
    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
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

        //'registerUser' is action and accesed using props in component, pass history also which is made avail by 'withRouter'
        this.props.registerUser(newUser, this.props.history);

    }

    render() {
        const {errors} = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                        <h1 className="display-4 text-center">Sign Up</h1>
                        <p className="lead text-center">Create your DevConnector account</p>
                        <form onSubmit={this.onSubmit}>
                        <TextFieldGroup 
                            placeholder="Name"
                            name="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.onChange}
                            error={errors.name}
                        />

                        <TextFieldGroup 
                            placeholder="Email Address"
                            name="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.onChange}
                            error={errors.email}
                            info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                        />
                        
                        <TextFieldGroup 
                            placeholder="Password"
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={this.onChange}
                            error={errors.password}
                        />

                        <TextFieldGroup 
                            placeholder="Confirm Password"
                            name="password2"
                            type="password"
                            value={this.state.password2}
                            onChange={this.onChange}
                            error={errors.password2}
                        />
                    
                            <input type="submit" className="btn btn-info btn-block mt-4" />
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//propTypes checks props received from redux 
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

//to access state of store using this.props.auth, here "auth:" can be any name , "state" comes from rootReducer state.auth so same name should be used
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

//wrap 'Register' component with 'withRouter'
export default connect(mapStateToProps,{registerUser})(withRouter(Register));