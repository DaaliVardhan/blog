
const Article=require("../models/article")

const getAdmin=  async (req, res) => {
    const blogs=await Article.find()
    res.render("adminblog", {
        layout:'layouts/adminbase',
        user: { user: req.user, isadmin: req.isadmin },
        blogs: blogs,
    });
}
const getBlogs=async (req, res) => {
    const blogs=await Article.find()
    res.render("adminblog", {
        layout: "layouts/adminbase",
        user: { user: req.user, isadmin: req.isadmin },
        blogs:blogs,
    });

}
const newBlog= (req, res) => {
    return res.render("newblog", {
      layout: "layouts/adminbase",
      user: { user: req.user, isadmin: req.isadmin },
      message:{},
    });
  }
const editBlog=async (req,res)=>{
    const blog=await Article.findOne({slug:req.params.slug})
    if (!blog)
        return res.redirect("/")
    res.render("editblog",{layout: "layouts/adminbase",
    user: { user: req.user, isadmin: req.isadmin },
    message:{},
    blog:blog})
}
module.exports={
    getAdmin,
    getBlogs,
    newBlog,
    editBlog,
}