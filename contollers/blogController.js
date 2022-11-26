
const Article=require("../models/article")
const fs=require("fs")


const createArticle=async (req,res)=>{
    
    if(!(req.body.title && req.body.description && req.body.post))
        return res.render("newblog", {layout: "layouts/adminbase",
            user: { user: req.user, isadmin: req.isadmin },
            message:{Error:"All fields required",}
        }       
        )
    
    const oldblog= await Article.findOne({"title":req.body.title})
    if(oldblog)
    return res.render("newblog", {layout: "layouts/adminbase",
            user: { user: req.user, isadmin: req.isadmin },
            message:{Error:"Article Already Exists"},
        }
    )
    
    try {
        if(req.files.thumbnail && req.files.poster){
            const thumbnail=fs.readFileSync(req.files.thumbnail[0].destination+"/"+req.files.thumbnail[0].filename)
            const poster=fs.readFileSync(req.files.poster[0].destination+"/"+req.files.poster[0].filename)
            const newblog=await Article.create({ title:req.body.title,description:req.body.description,post:req.body.post,thumbnail:thumbnail,poster:poster})
            fs.unlink(req.files.thumbnail[0].destination+"/"+req.files.thumbnail[0].filename)
            fs.unlink(req.files.poster[0].destination+"/"+req.files.poster[0].filename)
        }
        else{
            const newblog=await Article.create({ title:req.body.title,description:req.body.description,post:req.body.post})

        }
        return res.status(200).redirect("/"+newblog.slug)
    } catch (error) {
        return res.status(500).redirect("/")
        
    }
    
}


const editArticle=async (req,res) =>{
    console.log(req.params.slug)
    const blog=await Article.findOne({slug:req.params.slug})

    if (!blog)
        return res.redirect("/")
    if(!(req.body.title && req.body.description && req.body.post ))
        return res.render("editblog",{layout: "layouts/adminbase",
            user: { user: req.user, isadmin: req.isadmin },
            message:{Error:"Text fields are Required"},
            blog:blog
        })

    
    if(req.files.thumbnail)
        blog.thumbnail=fs.readFileSync(req.files.thumbnail[0].destination+"/"+req.files.thumbnail[0].filename)
    
    if (req.files.poster)
        blog.poster=fs.readFileSync(req.files.poster[0].destination+"/"+req.files.poster[0].filename)
    
    blog.title=req.body.title
    blog.description=req.body.description
    blog.post=req.body.post 
    await blog.save()    
    if(req.files.thumbnail)
        fs.unlink(req.files.thumbnail[0].destination+"/"+req.files.thumbnail[0].filename)
    if(req.files.post)
        fs.unlink(req.files.poster[0].destination+"/"+req.files.poster[0].filename)
    return res.redirect("/"+blog.slug)
        
}
const deleteArticle=async (req,res)=>{

    await Article.findOneAndRemove({slug:req.params.slug})
    return res.redirect("/")
    
}

module.exports={

    createArticle,
    deleteArticle,
    editArticle,


}