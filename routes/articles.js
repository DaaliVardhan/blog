
const express=require('express')
const router=express.Router()
const {createArticle,editArticle,deleteArticle}=require('../contollers/blogController')



// router.get("/",getArticles)
// router.get("/:slug",(getArticle))


module.exports=router;