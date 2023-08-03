
exports.signUpValidator = (req, res, next) => {
    req.check('name', 'Name is required !').notEmpty();
    req.check('email', 'Email is required !').isEmail().notEmpty();
    req.check('password').notEmpty()
                         .isLength({min: 6, max: 10})
                         .withMessage('Password must be between 6 and 10 characters')

    const errors = req.validationErrors()

    if(errors){
        return res.status(400).json({message: errors[0].msg})
    }
     next()
}