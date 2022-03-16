const { validator } = require("../../helpers/validation-checker");

module.exports = {
    async checkValidate(req, res, next) {
        let routeValid = Array();
        let error_message = Array();
        req.route.path == "/signup" ? (routeValid = Validation.signup, error_message = err_message.signup) : null
        req.route.path == "/login" ? (routeValid = Validation.login, error_message = err_message.login) : null
        req.route.path == "/forgot-password" ? (routeValid = Validation.forgotPassword, error_message = err_message.forgotPassword) : null
        req.route.path == "/reset-password" ? (routeValid = Validation.resetPassword, error_message = err_message.resetPassword) : null
        req.route.path == "/profile-update" ? (routeValid = Validation.profileUpdate, error_message = err_message.profileUpdate) : null
        // console.log(req.body)
        await validator(routeValid, req.body, error_message)
            .then((response) => {
                if (Object.keys(response).length > 0) {
                    // console.log(response)
                    res.send(response)
                } else {
                    return next()
                }
            })
    }
}
const Validation = {
    signup: [
        {
            firstName: "require"
        },
        {
            lastName: "require"
        },
        {
            email: {
                require: true,
                isEmail: true
            }
        },
        {
            gender: {
                require: true,
                isAlpha: true
            }
        },
        {
            password: {
                require: true,
                isStrongPassword: true,
                passwordLength: { min: 6, max: 16 }
            }
        },
        {
            birthDate: {
                require: true,
            }
        }
    ],
    login: [
        {
            username: {
                require: true,
                isEmail: true
            }
        },
        {
            password: {
                require: true
            }
        }
    ],
    forgotPassword: [
        {
            email: {
                require: true,
                isEmail: true
            }
        }
    ],
    resetPassword:[
        {
            email: {
                require: true,
                isEmail: true
            }
        },
        {
            password:{
                require: true,
                isStrongPassword: true,
                passwordLength: { min: 6, max: 16 }
            }
        }
    ],
    profileUpdate:[
        {
            firstName: "require"
        },
        {
            lastName: "require"
        },
        {
            email: {
                require: true,
                isEmail: true
            }
        },
        {
            gender: {
                require: true,
                isAlpha: true
            }
        },
        {
            birthDate: {
                require: true,
            }
        }
    ]
}

const err_message = {
    signup: {
        firstName: "First name is required!...",
        lastName: "Last name is required!...",
        email: {
            require: "Email is Required!...",
            isEmail: "Email is not valid!..."
        },
        gender: {
            require: "Gender is required!...",
            isAlpha: "Gender only allow alphabetic value"
        },
        password: {
            require: "Password is required!...",
            isStrongPassword: "Password Must be contain in letter, simbol, uppercase, lowercase and number",
            passwordLength: "Password length must be atleast 6 to 16 characters"
        },
        birthDate: {
            require: "Birthdate is Required!..."
        }
    },
    login: {
        username: {
            require: "Username is required!...",
            isEmail: "Username is not valid!..."
        },
        password: {
            require: "Password is required!..."
        }
    },
    forgotPassword: {
        email: {
            require: "Email is required!...",
            isEmail: "Email is not valid!..."
        }
    },
    resetPassword:{
        email: {
            require: "Email is Required!...",
            isEmail: "Email is not valid!..."
        },
        password: {
            require: "Password is required!...",
            isStrongPassword: "Password Must be contain in letter, simbol, uppercase, lowercase and number",
            passwordLength: "Password length must be atleast 6 to 16 characters"
        }
    },
    profileUpdate:{
        firstName: "First name is required!...",
        lastName: "Last name is required!...",
        email: {
            require: "Email is Required!...",
            isEmail: "Email is not valid!..."
        },
        gender: {
            require: "Gender is required!...",
            isAlpha: "Gender only allow alphabetic value"
        },
        birthDate: {
            require: "Birthdate is Required!..."
        }
    }
}
