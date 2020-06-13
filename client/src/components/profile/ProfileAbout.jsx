 import React, { Component } from 'react';
 import PropTypes from 'prop-types';
 import isEmpty from '../../validation/is-empty';
 
class ProfileAbout extends Component {
     render() {
        const {profile} = this.props;

        //get first name
        const firstName = profile.user.name.trim().split(' ')[0];

        //skill list
        const skills = profile.skills.map((skill, index) => (
            //index is used instead of skills because skills is an array and donot have an id
            <div key={index} className="p-3">
                <i class="fa fa-check"></i>
                {skill}
            </div>
        )
        )

         return (
        <div class="row">
            <div class="col-md-12">
              <div class="card card-body bg-light mb-3">
                <h3 class="text-center text-info">{firstName}'s Bio</h3>
                <p class="lead">{isEmpty(profile.bio) ? (<span>{firstName} doesnot have a bio</span>) : (<span>{profile.bio}</span>)}
                </p>
                <hr />
                <h3 class="text-center text-info">Skill Set</h3>
                <div class="row">
                  <div class="d-flex flex-wrap justify-content-center align-items-center">
                    {skills}
                  </div>
                </div>
              </div>
            </div>
          </div>
         )
     }
 }

 ProfileAbout.propTypes = {
    profile: PropTypes.object.isRequired
 }

 export default ProfileAbout;
 