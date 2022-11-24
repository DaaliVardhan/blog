
const Article=require("../models/article")

const getArticles=async (req,res)=>{
    const blogs=await Article.find()
    return res.render("index")
}

