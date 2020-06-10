import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

//this component is for a input field that can be used by any component
const InputGroup = ({
    name,
    placeholder,
    value,
    error,
    icon,
    type,
    onChange
}) => {
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text">
                    <i className={icon} />
                </span>
            </div>
            <input 
                className={classnames("form-control form-control-lg",{
                    //this errors.name is sent from server error object
                    'is-invalid': error
                })}  
                placeholder={placeholder} 
                name={name}
                value={value}
                onChange={onChange}
                />
                {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

InputGroup.defaultProps = {
    type: 'text'
}

export default InputGroup;