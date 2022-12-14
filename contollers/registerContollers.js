const User = require("../models/user")
const jwt=require("jsonwebtoken")
const bcrypt=require('bcrypt')

const getRegister=(req,res)=>{
    return res.render("register",{layout:false})
}

const handleRegister=async (req,res)=>{
    if (!(req.body.username && req.body.password))
        return res.json({"Error":"All fields required"})
    
    const olduser=await User.findOne({username:req.body.username})
    if(olduser)
        return res.json({"Error":"User Already Exists"})
    
    if(req.body.username=="admin"){
        try {
            const hashedpwd=await bcrypt.hash(req.body.password,10)
            const refreshToken = jwt.sign(
                {"username":req.body.username,
                "isadmin":true },
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:'365d'}
            )
    
            User.create({"username":req.body.username,"password":hashedpwd,"token":refreshToken,"isadmin":true})
            return res.sendStatus(200)
        } catch (error) {
            console.log(error)
            return res.status(500).json({"Error":"Error while creating user"})
        }
    }
    else{
        try {
            const hashedpwd=await bcrypt.hash(req.body.password,10)
            const refreshToken = jwt.sign(
                {"username":req.body.username,
                "isadmin":false },
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn:'1d'}
            )

            const user=await User.create({"username":req.body.username,"password":hashedpwd,"token":refreshToken})
            return res.status(200)
        } catch (error) {
            console.log(error)
            return res.status(406).json({"Error":"Error while creating user"})
        }
    }

}

module.exports ={
    getRegister,
    handleRegister
}