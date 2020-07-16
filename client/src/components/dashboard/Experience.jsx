import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteExperience, getExperienceId} from '../../actions/profileAction';
import {Link} from 'react-router-dom';

class Experience extends Component {
    onDeleteClick(id){
        this.props.deleteExperience(id);
    }

    onEditClick(id){
        this.props.getExperienceId(id);
    }

    render() {
        const experience = this.props.experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td><Moment format="YYYY/MM/DD">{exp.from}</Moment> - &nbsp;
                    {exp.to === null ? ('Now') : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
                </td>
                <td><Link to='/add-experience' onClick={() => this.onEditClick(exp._id)} className="btn btn-primary">Edit</Link></td>
                <td><button onClick={this.onDeleteClick.bind(this, exp._id)} className="btn btn-danger">Delete</button></td>
            </tr>
        ))
        return (
            <div>
                <h4 className="mb-2">Experience Credentials</h4>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th />
                            <th />
                            </tr>
                        </thead>
                    <tbody>
                        {experience}
                    </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired,
    getExperienceId: PropTypes.func.isRequired
}

export default connect(null,{deleteExperience, getExperienceId})(Experience);
