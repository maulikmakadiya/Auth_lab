const JWT = require('jsonwebtoken');
const general = require('./general');
// const jwtDecode = require('jwt-decode');
let response = {}

module.exports = {
    async genrateAccessToken(user) {
        return await JWT.sign({
            iss: 'customeModule',
            sub: user,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1)
        }, process.env.SECRETKEY);
    },

    async verifyToken(req, res, next) {
        const token = req.headers['x-access-token'];
        if (!token) {
            response = general.response_format(false,'No token provided',{})
            return res.send(response);
        } else {
            await JWT.verify(token, process.env.SECRETKEY, (err, decoded) => {
                if (err) {
                    response = general.response_format(false,'Failed to authenticate token.',{})
                    return res.send(response)
                } else {
                    req.id = decoded.sub;
                    next();
                }
            })
        }
    }
}