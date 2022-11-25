const Article=require("../models/article")


const getLikes=async (req,res)=>{
    try {
        
        const blog=await Article.findOne({slug:req.params.slug})
        if(!blog)
            return res.status(400).json({"Error":"Article not found"})
        return res.status(200).json({"likes":blog.votes})
    } catch (error) {
        return res.status(500).json({"Error":"Unexpected Error"})
    }
}

const postLike =async (req,res) =>{

    try {        
        const blog=await Article.findOne({slug:req.params.slug})
        if(!blog)
            return res.status(400).json({"Error":"Article not found"})
        
        if(blog.voters.length===0 || !blog.voters.includes(req.user) ){
            blog.votes++
            blog.voters=[...blog.voters,req.user];
            blog.save()
        }
        return res.status(200).json({"likes":blog.votes})
    } catch (error) {
        console.log(error)
        return res.status(500).json({"Error":"Unexpected Error"})
    }
}

module.exports={
    getLikes,
    postLike
}