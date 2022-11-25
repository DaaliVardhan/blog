const express=require('express')
const router=express.Router()
const { getLikes,postLike }=require("../contollers/likesController")
const getCookie =require("../middleware/verifyUser")

router.route("/:slug")
    .get(getCookie,getLikes)
    .post(getCookie,postLike)

module.exports=router;