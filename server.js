const express = require("express")
const homeRoute=require("./api/root")
const path=require("path")
const User=require("./models/user")
const mongoose=require('mongoose')

mongoose.connect("mongodb+srv://daalivardhan:daali.228005@cluster0.v12h2.mongodb.net/?retryWrites=true&w=majority")
const app=express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.set("view engine","ejs")
app.use(express.static('public'))


const logger=(req,res,next)=>{
    console.log(req.method,req.url)
    next()
}
app.use(logger)

app.get("/blog-list(.html)?",(req,res)=>{
    return res.sendFile(path.join(__dirname,'views','website','blog-list.html'))
})

app.get("/blogs|/blog-post(.html)?",(req,res)=>{
    return res.sendFile(path.join(__dirname,'views','website','blog-post.html'))
})

app.get("/about(.html)?",(req,res)=>{
    return res.sendFile(path.join(__dirname,'views','website','about.html'))
})

app.get("^/$|/index(.html)?|home",(req,res)=>{
    return res.sendFile(path.join(__dirname,'views','website','index.html'))
})
app.get("/getusers",async (req,res)=>{
    const users=await User.find();
    return res.send({users:users})
})
app.get("/*",(req,res)=>{
    res.status(404).send("Not found")
})
app.listen(8000,()=>{console.log("Listening on port 8000 .....")})