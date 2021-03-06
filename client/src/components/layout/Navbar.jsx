import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authAction';
import {clearCurrentProfile} from '../../actions/profileAction';
import {postRevert} from '../../actions/postAction';

class Navbar extends Component {
    onLogoutClick(e){
        e.preventDefault();
        this.props.postRevert();
        this.props.logoutUser();
        this.props.clearCurrentProfile();
    }

    revertFromPost(){
        this.props.postRevert();
    }


    render() {
        const {isAuthenticated, user} = this.props.auth;

        const authLink = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                    <Link className="nav-link" to="/feed" onClick={this.revertFromPost.bind(this)}>Post Feed</Link>
            </li>
            <li className="nav-item">
                    <Link className="nav-link" to="/dashboard" onClick={this.revertFromPost.bind(this)}>Dashboard</Link>
            </li>
            <li className="nav-item">
                {/* link tag is used for react router and only a component is reloaded else whole page is reloaded*/}
                <a href="/#" 
                    onClick ={this.onLogoutClick.bind(this)}  
                    className="nav-link">
                        <img 
                        className="rounded-circle"
                        src={user.avatar} 
                        alt={user.name}
                        style={{ width: '25px', marginRight: '5px' }} 
                        title="You must have a Gravatar connected to your email to dispaly an image"
                        />
                        Logout
                    </a>
            </li>
        </ul>
        );

        const guestLink = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
            );



        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                    <div className="container">
                        <Link className="navbar-brand" to="/">DevConnector</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="mobile-nav">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profiles" onClick={this.revertFromPost.bind(this)}> Developers
                                    </Link>
                                </li>
                            </ul>

                            {isAuthenticated ? authLink : guestLink}
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

Navbar.protoTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postRevert: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
});

export default connect(mapStateToProps,{logoutUser,clearCurrentProfile, postRevert})(Navbar);