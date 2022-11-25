require("dotenv").config()
const express = require("express")
const mongoose=require('mongoose')
const database="mongodb://localhost/test"
const homeRoute=require("./routes/root")
const authRoute=require("./routes/auth")
const logger=require("./middleware/logger")
const cookieParser=require("cookie-parser")
const adminRoute=require('./routes/admin')
const likesAPI=require("./routes/likes")
const expresslayouts=require("express-ejs-layouts")



mongoose.connect(process.env.DATABASE || database)


const app=express()
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.set("view engine","ejs")



app.use(express.static('public'))




app.use(logger)
app.use(expresslayouts)
app.use("/auth",authRoute)
app.use("/admin",adminRoute)
app.use("/",homeRoute)
app.use("/blogs",likesAPI)

app.get("/*",(req,res)=>{
    res.status(404).send("Not found")
})
app.listen(process.env.PORT ||  8000,()=>{console.log(`Listening on port ${process.env.PORT ||8000} .....`)})