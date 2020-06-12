import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile, deleteAccount} from '../../actions/profileAction';
import Spinner from '../common/spinner';
import { Link } from 'react-router-dom';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class Dashboard extends Component {
    //called after render() which means 'loading' is set to false and then render() is called 
    componentDidMount(){
        this.props.getCurrentProfile();
    }

    onDeleteClick(e){
        this.props.deleteAccount();
    }

    render() {
        const {user} = this.props.auth;
        const {profile,loading} = this.props.profile;

        let dashboardContent;

        if(profile === null || loading){
            dashboardContent = <Spinner/>
        }
        //only after profile is having some value i.e not null then else is executed
        else{
            //check if logged in user has profile data
            if(Object.keys(profile).length > 0){
                dashboardContent = (
                <div>
                    <p className="lead text-muted">
                        Welcome &nbsp;
                        <Link to={`/profile/${profile.handle}`}>
                            {user.name}
                        </Link>
                    </p>
                    {/* this componenet contains only buttons so create functional component */}
                    <ProfileActions/>
                    <Experience experience={profile.experience}/>
                    <Education education={profile.education}/>
                    <div style={{ marginBottom: '60px' }}></div>
                    <button onClick={this.onDeleteClick.bind(this)} className="btn btn-danger">
                        Delete My Account
                    </button>
                </div>);
            }
            else{
                //User is logged in but has no profile
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">
                            Welcome {user.name}
                        </p>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">
                            Create Profile
                        </Link>
                    </div>
                );
            }
        }

        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="display-4">Dashboard</div>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps,{getCurrentProfile, deleteAccount})(Dashboard);