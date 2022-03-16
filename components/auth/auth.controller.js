const express = require('express')
const upload = require('../../helpers/file-upload')
const general = require('../../helpers/general')
const { genrateAccessToken } = require('../../helpers/jwt')
const authModel = require('../../model/auth.model')

let response = {}

module.exports = {
    async login(req, res) {
        try {
            await authModel.login(req.body, async function (data) {
                if (typeof data.verifyError == "undefined" && typeof data.id != "undefined" && typeof data.email != "undefined") {
                    const token = await genrateAccessToken(data)
                    // console.log(token)
                    response = general.response_format(true, 'Login successfull', { ...data, token: token })
                    res.send(response)
                } else {
                    response = general.response_format(false, data)
                    res.send(response)
                }
            })
        } catch (e) {
            console.log(e)
        }
    },
    async getProfile(req, res) {
        try {
            let email = req.params.email
            if (typeof email != "undefined" && email != "") {
                await authModel.getProfile(email, async function (data) {
                    const token = req.headers['x-access-token']
                    response = general.response_format(true, 'User Verifed Successfull', { ...data, token: token })
                    res.send(response)
                })
            }
        } catch (err) {
            console.log(err)
        }
    },
    async profileUpdate(req, res) {
        try {
            let post = req.body
            await authModel.findByEmail(post.email, async function (result) {
                if (result.length > 0) {
                    await authModel.profileUpdate(post, async function (data) {
                        response = general.response_format(true, 'User Update Successfull', data)
                        res.send(response)
                    })
                } else {
                    response = general.response_format(false, "User Not Found!...")
                    res.send(response)
                }
            })
        } catch (e) {
            console.log(e)
        }
    },
    async logout() {

    },
    async signup(req, res) {
        try {
            let post = req.body
            await upload(req.files.photo)
            post = {
                ...post,
                photo: req.files.photo.name
            }
            await authModel.findByEmail(post.email, async function (result) {
                if (result.length > 0 != true) {
                    const encrypt = await general.hashPassword(post.password)
                    post.password = encrypt
                    await authModel.signUp(post, async function (data) {
                        response = await general.response_format(true, "User registered successfull...", data)
                        res.send(response)
                    })
                } else {
                    response = general.response_format(false, "User Allready Exiest!...")
                    res.send(response)
                }
            })
        } catch (err) {
            res.send(404, err)
        }
    },
    async forgotPassword(req, res) {
        try {
            let post = req.body
            await authModel.findByEmail(post.email, async function (result) {
                console.log(result[0].email)
                if (result.length > 0) {
                    response = await general.response_format(true, "User Verified", { email: result[0].email })
                    res.send(response)
                } else {
                    response = await general.response_format(false, "User not found")
                    res.send(response)
                }
            })
        } catch (e) {
            console.log(e)
            res.send(404, e)
        }
    },
    async resetPassword(req, res) {
        try {
            let post = req.body
            const encrypt = await general.hashPassword(post.password)
            post.password = encrypt
            await authModel.resetPassword(post, async function (data) {
                response = await general.response_format(true, "Password update successfully...")
                res.send(response)
            })
        } catch (e) {
            console.log(e)
            res.send(404, e)
        }
    }
}