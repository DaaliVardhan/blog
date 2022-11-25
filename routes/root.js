const express = require("express");
const path = require("path");
const router = express.Router();
const getCookie = require("../middleware/verifyUser")
const Article=require("../models/article")




router.get("/blogs|/blog-list(.html)?",getCookie,async (req,res)=>{
  const blogs=await Article.find().sort({publishedOn:-1})
  return res.render('blogs',{layout:'layouts/base',user:{user:req.user,isadmin:req.isadmin},blogs:blogs})
  
})



router.get("/about(.html)?",getCookie,(req,res)=>{
  return res.sendFile(path.join(__dirname,'..','views','website','about.html'))
})

router.get("/:slug",getCookie,async (req,res)=>{
    const blog=await Article.findOne({slug:req.params.slug})
    if(!blog) return res.redirect('/')  
    return res.render('post',{layout:'layouts/base',user:{user:req.user,isadmin:req.isadmin},blog:blog})
})

router.get("/blog",getCookie,async (req,res)=>{
  const blog=await Article.find()
  return res.render("post",{layout:'layouts/base',user:{user:req.user,isadmin:req.isadmin},blog:blog[0]})
})

router.get("^/$|/index(.html)?|/home",getCookie,async (req,res)=>{
  const blogs=await Article.find()
  return res.render('blogs',{layout:"layouts/base",user:{user:req.user,isadmin:req.isadmin},blogs:blogs})
  
})
module.exports = router;
