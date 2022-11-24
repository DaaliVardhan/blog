require("dotenv").config()
const express = require("express")
const mongoose=require('mongoose')
const database="mongodb://localhost/test"
const homeRoute=require("./routes/root")
const authRoute=require("./routes/auth")
const logger=require("./middleware/logger")
const cookieParser=require("cookie-parser")
const verifyUser=require("./middleware/verifyUser")
const path=require('path')
const adminRoute=require('./routes/admin')
const multer=require("multer")
const upload=require("./contollers/fileuploadController")

mongoose.connect(database || process.env.DATABASE)


const app=express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.set("view engine","ejs")
app.use(express.static('public'))




app.use(logger)
app.get("/login",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","website","demo.html"))
})
app.post("/login",upload.fields([{name: 'thumbnail', maxCount: 1}, { name: 'poster', maxCount: 1}]), (req,res)=>{
    console.log(req.file,req.body)
    res.json({file:req.file,body:req.body})
})
app.use("/",homeRoute)
app.use("/auth",authRoute)
app.use("/admin",adminRoute)

app.get("/*",(req,res)=>{
    res.status(404).send("Not found")
})
app.listen(process.env.PORT ||  8000,()=>{console.log(`Listening on port ${process.env.PORT ||8000} .....`)})