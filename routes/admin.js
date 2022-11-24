const express=require('express')
const router=express()
const path=require('path')
const verifyUser=require('../middleware/verifyUser')

router.use(verifyUser)
router.get("/",(req,res)=>{
    res.render('admin',{user:{user:req.user,isadmin:req.isadmin},blog:{title:"title",createdAt:new Date(),slug:"new-post"}})
})
router.get("/blogs",(req,res)=>{
    res.render('blogs',{user:{user:req.user,isadmin:req.isadmin}})
})

module.exports=router