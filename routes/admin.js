const express = require("express");
const router = express();

const verifyAdmin = require("../middleware/verifyadmin");

const upload = require("../contollers/fileuploadController");
const { createArticle, editArticle, deleteArticle } = require("../contollers/blogController");

const getCookie=require("../middleware/verifyUser")
const {  getAdmin,getBlogs,newBlog, editBlog }=require("../contollers/adminController")


router.get("^/$",getCookie, verifyAdmin, getAdmin);

router.get("/blogs",getCookie, verifyAdmin, getBlogs);

router.get("/newblog",getCookie, verifyAdmin,newBlog);


router.post("/newblog",verifyAdmin, upload.fields([
                    { name: "thumbnail", maxCount: 1 },
                    { name: "poster", maxCount: 1 },
        ]),createArticle,
);

router.get("/edit/:slug",verifyAdmin,editBlog)

router.post("/edit/:slug",verifyAdmin,upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "poster", maxCount: 1 }]),
    editArticle)



router.route("/delete/:slug")
    .get(deleteArticle)
    .post(deleteArticle)




module.exports = router;

