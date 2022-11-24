const express = require("express");
const path = require("path");
const router = express.Router();
const getCookie = require("../middleware/verifyUser")




router.get("/blog-list(.html)?",getCookie,(req,res)=>{
  return res.sendFile(path.join(__dirname,'..','views','website','blog-list.html'))
})

router.get("/blogs|/blog-post(.html)?",getCookie,(req,res)=>{
  return res.sendFile(path.join(__dirname,'..','views','website','blog-post.html'))
})

router.get("/about(.html)?",getCookie,(req,res)=>{
  return res.sendFile(path.join(__dirname,'..','views','website','about.html'))
})

router.get("^/$|/index(.html)?|home",getCookie,(req,res)=>{
  return res.sendFile(path.join(__dirname,'..','views','website','index.html'))
})
router.get("/getusers",getCookie,async (req,res)=>{
  const users=await User.find();
  return res.send({users:users})
})
module.exports = router;
