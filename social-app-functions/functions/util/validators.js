
const isEmpty = (string) => {
    return string.trim() === '' ? true : false;
}

const isValidEmail = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return email.match(regex)? true : false;
}

exports.validateSignUpData = (data) => {
    let errors = {};
    if(isEmpty(data.email)) {
        errors.email = 'Must not be empty'
    } else if (!isValidEmail(data.email)) {
        errors.email = 'Must be a valid Email address'
    }
    if(isEmpty(data.password)) errors.password = 'Must not be empty';
    if(data.password !== data.confirmPassword) errors.confirmPassword = 'Passwords must match';
    if(isEmpty(data.handle)) errors.handle = 'Must not be empty'; 

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false,
    }
}

exports.validateLoginData = (data) => {
    let errors = {};
    if(isEmpty(data.email)) errors.email = 'Must not be empty';
    if(isEmpty(data.password)) errors.password = 'Must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false,
    }
}

exports.reduceUserDetails = (data) => {
    let userDetails = {};

    if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
    if (!isEmpty(data.website.trim())) userDetails.website = data.website.trim().substring(0, 4) !== 'http' ? `http://${data.website.trim()}` : data.website.trim();
    if (!isEmpty(data.location.trim())) userDetails.location = data.location;

    return userDetails;
}