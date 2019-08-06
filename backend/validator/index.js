exports.signupValidator = (req, res, next) => {
  req.check("firstName", "First name must be between 3 and 32 characters")
    .isLength({
      min: 3,
      max: 32
    });
  req.check("lastName", "Last name must be between 3 and 32 characters")
    .isLength({
      min: 3,
      max: 32
    })
  req.check("email", "Email is required").notEmpty()
    .matches(/.+\@.+\..+/)
    .withMessage("Email must contain @")
  req.check("password", "Password is required").notEmpty()
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .isLength({
      min: 6,
      max: 32
    })
    .withMessage("Password must contain at least 6 characters");

    const errors = req.validationErrors();

    if (errors) {
      const firstError = errors.map(error => error.msg)[0];
      return res.status(400).json({
        error: firstError
      });
    }

  next();
}