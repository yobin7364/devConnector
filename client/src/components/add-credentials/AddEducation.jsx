import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { addEducation, updateEducation, getCurrentProfile, removeEducationId} from '../../actions/profileAction';

class AddEducation extends Component {
    constructor(props){
        super(props);
        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false,
            title:'Add'
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
        const {profile, educationId} = this.props.profile;

          profile.education.forEach(item => {
          if (item._id === educationId) {

            this.setState({
              school: item.school ? item.school : '',
              degree: item.degree ? item.degree : '',
              fieldofstudy: item.fieldofstudy ? item.fieldofstudy : '',
              from: item.from ? (item.from).slice(0,10):"",
              to: item.to ? (item.to).slice(0,10):"",
              current: item.current,
              description: item.description ? item.description : '',
              disabled: item.to ? false : true,
              title:"Edit"
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
      this.props.removeEducationId();
    }

    onSubmit(e){
        e.preventDefault();
        let {educationId} = this.props.profile;

        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        };

        if(educationId){
          this.props.updateEducation(educationId , eduData , this.props.history);
        }

        else{
        this.props.addEducation(eduData, this.props.history);
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
        <div className="add-education">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <Link to="/dashboard" className="btn btn-light">
                    Go Back
                  </Link>
                  <h1 className="display-4 text-center">{this.state.title} Your Education</h1>
                  <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
                  <small className="d-block pb-3">* = required field</small>
                  <form onSubmit={this.onSubmit}>

                    <TextFieldGroup
                    placeholder="* School"
                    name="school"
                    value={this.state.school}
                    onChange={this.onChange}
                    error={errors.school}
                    />

                    <TextFieldGroup
                    placeholder="* Degree or Certificate"
                    name="degree"
                    value={this.state.degree}
                    onChange={this.onChange}
                    error={errors.degree}
                    />

                    <TextFieldGroup
                    placeholder="* Field of study"
                    name="fieldofstudy"
                    value={this.state.fieldofstudy}
                    onChange={this.onChange}
                    error={errors.fieldofstudy}
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
                        Current Education
                      </label>
                    </div>
                    
                    <TextAreaFieldGroup
                    placeholder="Program Description"
                    name="description"
                    value={this.state.description}
                    onChange={this.onChange}
                    error={errors.description}
                    info="Tell us about the program that you were in"
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

AddEducation.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addEducation: PropTypes.func.isRequired,
    updateEducation: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    removeEducationId: PropTypes.func.isRequired
}

const mapDispatchToPros = {
  updateEducation, 
  getCurrentProfile, 
  removeEducationId,
  addEducation
}

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, mapDispatchToPros)(withRouter(AddEducation));