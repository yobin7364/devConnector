import React from 'react'
import classnames from 'classnames';
import PropTypes from 'prop-types';

//this component is for a input field that can be used by any component
const SelectListGroup = ({
    name,
    value,
    error,
    info,
    onChange,
    options
}) => {
    const selectOptions = options.map(option => (
        <option key={option.label} value={option.value}>
            {option.label}
        </option>
    ));

    return (
        <div className="form-group">
            <select 
                className={classnames("form-control form-control-lg",{
                    //this errors.name is sent from server error object
                    'is-invalid': error
                })}  
                name={name}
                value={value}
                onChange={onChange}
            >
                {selectOptions}
            </select>

                {/* this is to place information under input fied if any */}
                {info && <small className="form-text text-muted">{info}</small>}
                {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

SelectListGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    //option is sent as array for select list group
    options: PropTypes.array.isRequired
}


export default SelectListGroup;