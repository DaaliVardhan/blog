const express = require("express");
const router=express()
const { getLogin,handleLogin }=require("../contollers/loginContollers")
const { getRegister,handleRegister }=require("../contollers/registerContollers")


const handleLogout=async (req,res)=>{
    req.user=''
    req.isadmin=''
    res.clearCookie("jwt")
    return res.redirect("/")

}

router.route("/login")
    .get(getLogin)
    .post(handleLogin)

router.route("/register")
    .get(getRegister)
    .post(handleRegister)

router.route("/logout")
    .get(handleLogout)
    .post(handleLogout)

module.exports=router