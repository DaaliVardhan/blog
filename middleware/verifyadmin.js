require('dotenv').config()
const jwt=require('jsonwebtoken')


const verifyAdmin=(req,res,next)=>{

    if(!req.cookies?.jwt)
        return res.redirect("/auth/login")
    token=req.cookies.jwt
    try {
        const decoded=jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
        req.user=decoded.username
        req.isadmin=decoded.isadmin
   
        if (!req.isadmin) return res.status(403).redirect("/")
    } catch (error) {
        console.log(error)        
    }

    next()
    
}


module.exports = verifyAdmin