const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.empty': 'Email is required.',
            'string.email': 'Please enter a valid email address.'
        }),
        username: Joi.string().min(1).max(100).required().messages({
            'string.empty': 'Username is required.',
            'string.min': 'Username should have at least 1 character.',
            'string.max': 'Username should not exceed 100 characters.'
        }),
        password: Joi.string().min(4).max(100).required().messages({
            'string.empty': 'Password is required.',
            'string.min': 'Password should have at least 4 characters.',
            'string.max': 'Password should not exceed 100 characters.'
        })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        // Prepare the error details for each field
        const errorDetails = error.details.reduce((acc, curr) => {
            if (!acc[curr.context.key]) {
                acc[curr.context.key] = [];
            }
            acc[curr.context.key].push(curr.message);
            return acc;
        }, {});

        // Return errors for each field with specific messages
        return res.status(400).json({
            message: 'Validation failed',
            errors: errorDetails
        });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(1).max(100).required().messages({
            'string.empty': 'Username is required.',
            'string.min': 'Username should have at least 1 character.',
            'string.max': 'Username should not exceed 100 characters.'
        }),
        password: Joi.string().min(4).max(100).required().messages({
            'string.empty': 'Password is required.',
            'string.min': 'Password should have at least 4 characters.',
            'string.max': 'Password should not exceed 100 characters.'
        })
    });

    const { error } = schema.validate(req.body);
    if (error) {
        // Prepare the error details for each field
        const errorDetails = error.details.reduce((acc, curr) => {
            if (!acc[curr.context.key]) {
                acc[curr.context.key] = [];
            }
            acc[curr.context.key].push(curr.message);
            return acc;
        }, {});

        // Return errors for each field with specific messages
        return res.status(400).json({
            message: 'Validation failed',
            errors: errorDetails
        });
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
};
