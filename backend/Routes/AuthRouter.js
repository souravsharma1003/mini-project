const { sign } = require('jsonwebtoken');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');
const { signup, login } = require('../Controllers/AuthController');

const router=require('express').Router();

router.post('/signup',signupValidation, signup);
router.post('/login',loginValidation, login);

module.exports=router;