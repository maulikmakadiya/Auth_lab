const { conn } = require("../config/db_connection");
const general = require("../helpers/general");

module.exports = {
    async signUp(inputData, callback) {
        const sql = `INSERT INTO users SET ?`
        conn.query(sql, inputData, (err, data) => {
            if (err) throw err;
            return callback(data)
        })
    },
    async login(inputData, callback) {
        const sql = `SELECT * FROM users WHERE email='${inputData.username}'`
        conn.query(sql, async (err, data) => {
            if (err) throw err;
            if (data.length == 0 || typeof data[0].password == 'undefined') {
                return callback({ verifyError: "Invalide username and password" })
            } else if (typeof data[0].password != 'undefined') {
                const pass = [inputData.password, data[0].password];
                const password_comp = await general.validateHashedPassword(pass)
                if (password_comp == false) {
                    return callback({ verifyError: "Invalide username and password" })
                } else {
                    delete data[0].password
                    delete data[0].status
                    delete data[0].verify
                    return callback(data[0])
                }
            }
        })
    },
    async getProfile(email, callback) {
        const sql = `SELECT * FROM users WHERE email='${email}'`;
        await conn.query(sql, (err, data) => {
            if (err) throw err;
            delete data[0].password
            return callback(data)
        })
    },
    async profileUpdate(inputData,callback){
        const sql = `UPDATE users SET ? WHERE email='${inputData.email}'`
        await conn.query(sql,inputData,(err,data)=>{
            if(err) throw err;
            return callback(data)
        })
    },
    async resetPassword(inputData, callback) {
        const sql = `UPDATE users SET password='${inputData.password}' WHERE email='${inputData.email}'`
        await conn.query(sql, (err, data) => {
            if (err) throw err;
            return callback(data)
        })
    },
    async findByEmail(email, callback) {
        const sql = `SELECT * FROM users WHERE email='${email}'`
        conn.query(sql, (err, data) => {
            if (err) throw err;
            return callback(data)
        })
    }
}