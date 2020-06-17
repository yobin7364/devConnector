import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import Spinner from '../common/Spinner';
import {getProfileByHandle} from '../../actions/profileAction';

class Profile extends Component {

    //dont keep state changing fun inside render() else infinite re-render will occur
    componentDidMount(){
        //get :handle param from react router '/profile/:handle', this comes from 'mapStateToProps'.
        //this will setState and re-renders component. As we need to get the profile data automatically when vising this page
        //so this 'getProfileByHandle' is called and data is received and with new data render() is called
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle);
        }
        
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.profile.profile === null && this.props.profile.loading){
            this.props.history.push('/not-found');
        }
    }

    render() {

        const {profile, loading} = this.props.profile;
        let profileContent;

        if(profile === null || loading){
            profileContent = <Spinner />
        }

        else{
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">
                                Back To Profiles
                            </Link>
                        </div>
                        <div className="col-md-6"></div>
                    </div>
                    <ProfileHeader profile={profile}/>
                    <ProfileAbout profile={profile}/>
                    <ProfileCreds education={profile.education} experience={profile.experience}/>

                </div>
            )
        }
       
        return (
            <div>
                {profileContent}
            </div>
        )
    }
}

Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps,{getProfileByHandle})(Profile);