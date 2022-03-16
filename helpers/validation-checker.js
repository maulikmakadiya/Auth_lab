const { map } = require("lodash");

module.exports = {
    async validator(fields, reqBody, err_messages) {
        const post = reqBody;
        try {
            let error = Array();
            await fields?.map((item)=>{
                if(Object.keys(post).includes(Object.keys(item).toString())==false){
                    error={
                        ...error,
                        [Object.keys(item)]:Object.keys(item).toString()+" is missing...!"
                    }
                }
            })
            if(!Object.keys(error).length>0){
                fields?.map((item) => {
                    if ((Object.keys(item[Object.keys(item)]).includes("require") && item[Object.keys(item)].require == true) || item[Object.keys(item)] == "require") {
                        if (typeof post[Object.keys(item)] == "undefined" || post[Object.keys(item)] == "") {
                            error = {
                                ...error,
                                [Object.keys(item)]: typeof err_messages != "undefined" && typeof err_messages[Object.keys(item).toString()] != "undefined" ?
                                    typeof err_messages[Object.keys(item).toString()] == "object" ?
                                        err_messages[Object.keys(item).toString()].require
                                        : err_messages[Object.keys(item).toString()]
                                    : err_message.require
                            }
                        }
                    }
                    if ((Object.keys(item[Object.keys(item)]).includes("isEmail") && item[Object.keys(item)].isEmail == true) || item[Object.keys(item)].isEmail == "isEmail") {
                        if (post[Object.keys(item)] != "" && !/^(([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5}){1,25})+([;.](([a-zA-Z0-9_\-\.]+)@{[a-zA-Z0-9_\-\.]+0\.([a-zA-Z]{2,5}){1,25})+)*$/.test(post[Object.keys(item)])) {
                            error = {
                                ...error,
                                [Object.keys(item)]: typeof err_messages != "undefined" && typeof err_messages[Object.keys(item).toString()] != "undefined" ?
                                    typeof err_messages[Object.keys(item).toString()] == "object" ?
                                        err_messages[Object.keys(item).toString()].isEmail
                                        : err_messages[Object.keys(item).toString()]
                                    : err_message.email
                            }
                        }
                    }
                    if ((Object.keys(item[Object.keys(item)]).includes("isPhone") && item[Object.keys(item)].isPhone == true) || item[Object.keys(item)].isPhone == "isPhone") {
                        if (post[Object.keys(item)] != "" && !/^(\+\d{1,2}[- ]?)?\d{10}$/.test(post[Object.keys(item)])) {
                            error = {
                                ...error,
                                [Object.keys(item)]: typeof err_messages != "undefined" && typeof err_messages[Object.keys(item).toString()] != "undefined"  && typeof err_messages[Object.keys(item).toString()].isPhone != "undefined"?
                                    typeof err_messages[Object.keys(item).toString()] == "object" ?
                                        err_messages[Object.keys(item).toString()].isPhone
                                        : err_messages[Object.keys(item).toString()]
                                    : err_message.phone
                            }
                        }
                    }
                    if ((Object.keys(item[Object.keys(item)]).includes("isStrongPassword") && item[Object.keys(item)].isStrongPassword == true) || item[Object.keys(item)].isStrongPassword == "isStrongPassword") {
                        if (post[Object.keys(item)] != "" && !/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]/.test(post[Object.keys(item)])) {
                            error = {
                                ...error,
                                [Object.keys(item)]: typeof err_messages != "undefined" && typeof err_messages[Object.keys(item).toString()] != "undefined" ?
                                    typeof err_messages[Object.keys(item).toString()] == "object" ?
                                        err_messages[Object.keys(item).toString()].isStrongPassword
                                        : err_messages[Object.keys(item).toString()]
                                    : err_message.passwordFormate
                            }
                        }
                    }
                    if ((Object.keys(item[Object.keys(item)]).includes("passwordLength") && item[Object.keys(item)].passwordLength == true) || item[Object.keys(item)].passwordLength == "passwordLength") {
                        if (post[Object.keys(item)] != "" && post[Object.keys(item)].length < item[Object.keys(item).toString()].passwordLength.min || post[Object.keys(item)].length > item[Object.keys(item).toString()].passwordLength.max) {
                            error = {
                                ...error,
                                [Object.keys(item)]: typeof err_messages != "undefined" && typeof err_messages[Object.keys(item).toString()] != "undefined" ?
                                    typeof err_messages[Object.keys(item).toString()] == "object" ?
                                        err_messages[Object.keys(item).toString()].passwordLength
                                        : err_messages[Object.keys(item).toString()]
                                    : err_message.passwordLength
                            }
                        }
                    }
                    if ((Object.keys(item[Object.keys(item)]).includes("isAlpha") && item[Object.keys(item)].isAlpha == true) || item[Object.keys(item)].isAlpha == "isAlpha") {
                        if (post[Object.keys(item)] != "" && !/^[a-zA-Z]+$/.test(post[Object.keys(item)])) {
                            error = {
                                ...error,
                                [Object.keys(item)]: typeof err_messages != "undefined" && typeof err_messages[Object.keys(item).toString()] != "undefined" ?
                                    typeof err_messages[Object.keys(item).toString()] == "object" ?
                                        err_messages[Object.keys(item).toString()].isAlpha
                                        : err_messages[Object.keys(item).toString()]
                                    : err_message.isAlpha
                            }
                        }
                    }
                    if ((Object.keys(item[Object.keys(item)]).includes("isAlphaNumeric") && item[Object.keys(item)].isAlphaNumeric == true) || item[Object.keys(item)].isAlphaNumeric == "isAlphaNumeric") {
                        if (post[Object.keys(item)] != "" && !/^[a-zA-Z0-9]+$/.test(post[Object.keys(item)])) {
                            error = {
                                ...error,
                                [Object.keys(item)]: typeof err_messages != "undefined" && typeof err_messages[Object.keys(item).toString()] != "undefined" ?
                                    typeof err_messages[Object.keys(item).toString()] == "object" ?
                                        err_messages[Object.keys(item).toString()].isAlphaNumeric
                                        : err_messages[Object.keys(item).toString()]
                                    : err_message.isAlphaNumeric
                            }
                        }
                    }
                    if ((Object.keys(item[Object.keys(item)]).includes("isNumeric") && item[Object.keys(item)].isNumeric == true) || item[Object.keys(item)].isNumeric == "isNumeric") {
                        if (post[Object.keys(item)] != "" && !/^[0-9]+$/.test(post[Object.keys(item)])) {
                            error = {
                                ...error,
                                [Object.keys(item)]: typeof err_messages != "undefined" && typeof err_messages[Object.keys(item).toString()] != "undefined" ?
                                    typeof err_messages[Object.keys(item).toString()] == "object" ?
                                        err_messages[Object.keys(item).toString()].isNumeric
                                        : err_messages[Object.keys(item).toString()]
                                    : err_message.isNumeric
                            }
                        }
                    }
                    if ((Object.keys(item[Object.keys(item)]).includes("isUppercase") && item[Object.keys(item)].isUppercase == true) || item[Object.keys(item)].isUppercase == "isUppercase") {
                        if (post[Object.keys(item)] != "" && !/^[A-Z]+$/.test(post[Object.keys(item)])) {
                            error = {
                                ...error,
                                [Object.keys(item)]: typeof err_messages != "undefined" && typeof err_messages[Object.keys(item).toString()] != "undefined" ?
                                    typeof err_messages[Object.keys(item).toString()] == "object" ?
                                        err_messages[Object.keys(item).toString()].isUppercase
                                        : err_messages[Object.keys(item).toString()]
                                    : err_message.isUppercase
                            }
                        }
                    }
                    if ((Object.keys(item[Object.keys(item)]).includes("isLowercase") && item[Object.keys(item)].isLowercase == true) || item[Object.keys(item)].isLowercase == "isLowercase") {
                        if (post[Object.keys(item)] != "" && !/^[a-z]+$/.test(post[Object.keys(item)])) {
                            error = {
                                ...error,
                                [Object.keys(item)]: typeof err_messages != "undefined" && typeof err_messages[Object.keys(item).toString()] != "undefined" ?
                                    typeof err_messages[Object.keys(item).toString()] == "object" ?
                                        err_messages[Object.keys(item).toString()].isLowercase
                                        : err_messages[Object.keys(item).toString()]
                                    : err_message.isLowercase
                            }
                        }
                    }
                })
            }
            // console.log(error)
            return error;
        } catch (err) {
            console.log(err)
        }
    }
}
const err_message = {
    isAlpha: "Please only use Letters",
    isAlphaNumeric: "Please only use Letters, Numbers",
    isNumeric: "Please enter only numeric value",
    isUppercase: "Please only use uppercase letters",
    isLowercase: "Please only use lowercase letters",
    require: "This field is require",
    email: "Please Enter Valid Email",
    phone: "Please Enter Valid Phone No",
    passwordFormate: "Password Must be contain in letter, simbol, uppercase, lowercase and number",
    passwordLength: "Password length must be atleast 6 to 16 characters",
}