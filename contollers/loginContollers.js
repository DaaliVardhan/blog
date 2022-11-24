const User=require("../models/user")
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const getLogin=(req,res)=>{
    return res.render("login")
}
const handleLogin=async (req,res)=>{

    if(!(req.body.username && req.body.password)) return res.status(400).json({"Error":"All fields are required"})
    
    try {
        
        const user=await User.findOne({username:req.body.username})
        if(!user) return res.status(404).json({"Error":"User not found"})
        const auth=await bcrypt.compare(req.body.password,user.password)
       
        if(!auth) return res.status(403).json({"Error":"Invalid credentials"})
        const refreshToken = jwt.sign(
            {"username":user.username,
            "isadmin":user.isadmin},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn:'1d'}
        )
        user.token=refreshToken
        user.save()
        res.cookie('jwt',refreshToken)
        return res.sendStatus(200)
    } catch (error) {

        return res.status(400).redirect("/auth/login")
    }
}

module.exports={
    getLogin,
    handleLogin
}