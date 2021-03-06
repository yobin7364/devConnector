import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addExperience, updateExperience, getCurrentProfile, removeExperienceId} from '../../actions/profileAction';

class AddExperience extends Component {
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
            disabled: false,
            staticTitle:'Add'
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

          profile.experience.forEach(item => {
          if (item._id === experienceId) {

            this.setState({
              company: item.company ? item.company : '',
              title: item.title ? item.title : '',
              location: item.location ? item.location : '',
              from: item.from ? (item.from).slice(0,10):"",
              to: item.to ? (item.to).slice(0,10):"",
              current: item.current,
              description: item.description ? item.description : '',
              disabled: item.to ? false : true,
              staticTitle:"Edit"
            });

        }
      });
      }
      
    }

    componentDidUpdate(prevProps){
      if(prevProps.errors !== this.props.errors)
      {
          this.setState({errors: this.props.errors});
        
      }
    }

    componentWillUnmount(){
      this.props.removeExperienceId();
    }

    onSubmit(e){
        e.preventDefault();
        let {experienceId} = this.props.profile;

        const expData = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        if (experienceId){
          this.props.updateExperience( experienceId ,expData, this.props.history);
        }

        else{
        this.props.addExperience(expData, this.props.history);
        }
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

        return (
        <div className="add-experience">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <Link to="/dashboard" className="btn btn-light">
                    Go Back
                  </Link>
                  <h1 className="display-4 text-center">{this.state.staticTitle} Your Experience</h1>
                  <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
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
              </div>
            </div>
          </div>
        )
    }
}

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired,
    updateExperience: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    removeExperienceId: PropTypes.func.isRequired
}

const mapDispatchToPros = {
  updateExperience, 
  getCurrentProfile, 
  removeExperienceId,
  addExperience
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, mapDispatchToPros)(withRouter(AddExperience));