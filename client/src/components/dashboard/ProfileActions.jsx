import React from 'react'
import {Link} from 'react-router-dom';

const ProfileActions = () => {
    return (
        <div className="btn-group mb-4" role="group">
          <div className="container">
            <div className="row">
              <div className="col">
            <Link to="/edit-profile" className="btn btn-light">
              <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile</Link>
              </div>
              <div className="col">
            <Link to="/add-experience" className="btn btn-light">
              <i className="fab fa-black-tie text-info mr-1"></i>
              Add Experience</Link>
              </div>
              <div className="col">
            <Link to="/add-education" className="btn btn-light">
              <i className="fas fa-graduation-cap text-info mr-1"></i>
              Add Education</Link>
              </div>
              </div>
              </div>
        </div>
    )
}


export default ProfileActions;