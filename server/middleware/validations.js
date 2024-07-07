const {body,validationResult,matchedData} = require('express-validator');

const validateCreateUser = [
    body('firstName', 'First name is required').notEmpty(),
    body('lastName', 'Last name is required').notEmpty(),
    body('email', 'Email is required or not in the right format').notEmpty().isEmail(),
    body('password', 'Password is required').notEmpty(),
    body('phone', 'Phone is required').notEmpty()
]

const validateLoginUser = [
    body('email', 'Email is required or not in the right format').notEmpty().isEmail(),
    body('password', 'Password is required').notEmpty()
]

const validate = validationResult.withDefaults({
    formatter: error => {
        return {
            'field': error.path,
            'message': error.msg
        }
    }
});

module.exports = { 
    validateCreateUser,
    validateLoginUser,
    validate
};