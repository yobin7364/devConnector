const Validator = require('validator');
const isEmpty = require('./is-empty');

var validateLoginInput = (data) =>{
    var errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    //check the sequence of errors objects being field, always last errors.email filed will be taken
    if(!Validator.isEmail(data.email)){
        errors.email = "Email is invalid";
    }

    if(Validator.isEmpty(data.email)){
        errors.email = "Email field is required";
    }

    if(Validator.isEmpty(data.password)){
        errors.password = "Password field is required";
    }


    errors.isValid = isEmpty(errors);

    return errors;

};

module.exports = validateLoginInput;