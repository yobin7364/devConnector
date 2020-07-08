import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { updateExperience, getCurrentProfile, removeExperienceId} from '../../actions/profileAction';
import Spinner from '../common/Spinner';

class EditExperience extends Component {
    constructor(props){
        super(props);
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCheck = this.onCheck.bind(this);
    }

    componentDidMount(){
      //call this action whenever you want to fetch store state
      this.props.getCurrentProfile();

      //wait until data is fetched
      if (this.props.profile.profile){
        const {profile, experienceId} = this.props.profile;

          profile.experience.map(item => {
          if (item._id === experienceId) {
            let dateFill;
            dateFill = (item.from).slice(0,10);

            this.setState({
              company: item.company ? item.company : '',
              title: item.title ? item.title : '',
              location: item.location ? item.location : '',
              from: item.from ? (item.from).slice(0,10):"",
              to: item.to ? (item.to).slice(0,10):"",
              current: item.current,
              description: item.description ? item.description : ''
            });

        }
      });
      }
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }

    onSubmit(e){
        e.preventDefault();

        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        this.props.updateExperience(this.props.profile.profile.experienceId ,expData, this.props.history);
    }

    onChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onCheck(e){
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current,
            to : ''
        });
    }

    render() {
        const {errors} = this.state;
        const {profile,loading} = this.props.profile;

        let dashboardContent;

        if(profile === null || loading){
            dashboardContent = <Spinner/>
        }
        else{
          dashboardContent = (
          <div>
          <Link to="/dashboard" className="btn btn-light">
          Go Back
        </Link>
        <h1 className="display-4 text-center">Edit Your Experience</h1>
        <p className="lead text-center">Edit any developer/programming positions that you have had in the past</p>
        <small className="d-block pb-3">* = required field</small>
        <form onSubmit={this.onSubmit}>

          <TextFieldGroup
          placeholder="* Company"
          name="company"
          value={this.state.company}
          onChange={this.onChange}
          error={errors.company}
          />

          <TextFieldGroup
          placeholder="* Job Title"
          name="title"
          value={this.state.title}
          onChange={this.onChange}
          error={errors.title}
          />

          <TextFieldGroup
          placeholder="Location"
          name="location"
          value={this.state.location}
          onChange={this.onChange}
          error={errors.location}
          />

          <h6>From Date</h6>
          <TextFieldGroup
          name="from"
          type="date"
          value={this.state.from}
          onChange={this.onChange}
          error={errors.from}
          />

          <h6>To Date</h6>

          <TextFieldGroup
          name="to"
          type="date"
          value={this.state.to}
          onChange={this.onChange}
          error={errors.to}
          //send string for true or false based on empty string
          disabled={this.state.disabled ? 'disabled' : ''}
          />

          <div className="form-check mb-4">
            <input 
            className="form-check-input" 
            type="checkbox" 
            name="current" 
            value={this.state.current}
            checked={this.state.current}
            onChange={this.onCheck}
            id="current" />
            <label className="form-check-label" htmlFor="current">
              Current Job
            </label>
          </div>
          
          <TextAreaFieldGroup
          placeholder="Job Description"
          name="description"
          value={this.state.description}
          onChange={this.onChange}
          error={errors.description}
          info="Tell us about the position"
          />

          <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
        </form>
        </div>
        );
        }
        return (
        <div className="add-experience">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  {dashboardContent}
                </div>
              </div>
            </div>
          </div>
        )
    }
}

EditExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    updateExperience: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    removeExperienceId: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {updateExperience, getCurrentProfile, removeExperienceId})(withRouter(EditExperience));