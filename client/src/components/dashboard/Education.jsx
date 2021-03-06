import React, { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {deleteEducation, getEducationId} from '../../actions/profileAction';
import {Link} from 'react-router-dom';

class Education extends Component {
    onDeleteClick(id){
        this.props.deleteEducation(id);
    }

    onEditClick(id){
        this.props.getEducationId(id);
    }

    render() {
        const education = this.props.education.map(edu => (
            <tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td><Moment format="YYYY/MM/DD">{edu.from}</Moment> - &nbsp;
                    {edu.to === null ? ('Now') : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
                </td>
                <td><Link to='/add-education' onClick={() => this.onEditClick(edu._id)} className="btn btn-primary">Edit</Link></td>
                <td><button onClick={this.onDeleteClick.bind(this, edu._id)} className="btn btn-danger">Delete</button></td>
            </tr>
        ))
        return (
            <div>
                <h4 className="mb-2">Education Credentials</h4>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Years</th>
                            <th />
                            <th />
                            </tr>
                        </thead>
                    <tbody>
                        {education}
                    </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

Education.propTypes = {
    deleteEducation: PropTypes.func.isRequired,
    getEducationId: PropTypes.func.isRequired
}

export default connect(null,{deleteEducation,getEducationId})(Education);
