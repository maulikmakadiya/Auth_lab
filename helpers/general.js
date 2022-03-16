const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: async function (userPassword) {
        return await bcrypt.hashSync(userPassword, 13)
    },
    validateHashedPassword: async function (password) {
        var result = await bcrypt.compareSync(password[0], password[1])
        return result
    },
    response_format: function (status, message, data) {
        var response = {};
        response.status = status;
        if (status) {
            response.message = message;
            response.data = data;
            response.errors = {};
        }
        else {
            response.message = message;
            response.errors = { code: 404, message: response.message };
            response.data = {};
        }
        response.meta = { api_version: 1 };
        return response;
    },
}