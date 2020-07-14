import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  //this is initialization of states
    constructor(){
        super();
        this.state = {
            email:'',
            password:'',
            errors:{}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //when this login component is mounted in DOM it is redirected to '/dashboard' if user is already logged in as this component is for guest
    componentDidMount() {
      if(this.props.auth.isAuthenticated){
        this.props.history.push('/dashboard');
      }
    }

    //caled when this component receives new props from parent
    componentDidUpdate(prevProps){
      //compare with previous props to avoid infinite loop in setState
      if(prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated)
      //redirected to dashboard when 'isAuthenticated' is true
      {
          this.props.history.push('/dashboard');
        
      }

      if(prevProps.errors !== this.props.errors)
      {
          this.setState({errors: this.props.errors});
        
      }
    }

    onChange(e) {
        //this [e.target.name] helps to make change to respective state object on change
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e){
        //prevents browser to reload when form is submitted
        e.preventDefault();
        
        const userData = {
            email:this.state.email,
            password:this.state.password
        }

        this.props.loginUser(userData);
    }

    render() {
      const {errors} = this.state;

        return (
        <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Sign in to your DevConnector account</p>
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup 
                    placeholder="Email Address"
                    name="email"
                    type="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    error={errors.email}
                    />

                    <TextFieldGroup 
                    placeholder="Password"
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    error={errors.password}
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

Login.protoTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps,{loginUser})(Login);