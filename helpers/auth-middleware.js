
module.exports = {
    async isLoggedin(req,res, next){
        const cookie = req.headers.cookie
        // console.log(req.getCookies())
        if(cookie){
            next(new Error('User Logged In'))
        }else{
            next()
        }
    },
    async isAdmin(){

    }
}