import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

//this component is for a input field that can be used by any component
const TextFieldGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
    return (
        <div className="form-group">
            <input type={type} 
                className={classnames("form-control form-control-lg",{
                    //this errors.name is sent from server error object
                    'is-invalid': error
                })}  
                placeholder={placeholder} 
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                />
                {/* this is to place information under input fied if any */}
                {info && <small className="form-text text-muted"></small>}
                {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
}

//provides default value to mentioned prop before PropTypes checks it
TextFieldGroup.defaultProps = {
    text: 'text'
}

export default TextFieldGroup;