import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

//this component is for a input field that can be used by any component
const TextAreaFieldGroup = ({
    name,
    placeholder,
    value,
    error,
    info,
    onChange
}) => {
    return (
        <div className="form-group">
            <textarea 
                className={classnames("form-control form-control-lg",{
                    //this errors.name is sent from server error object
                    'is-invalid': error
                })}  
                placeholder={placeholder} 
                name={name}
                value={value}
                onChange={onChange}
                />
                {/* this is to place information under input fied if any */}
                {info && <small className="form-text text-muted">{info}</small>}
                {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

TextAreaFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default TextAreaFieldGroup;