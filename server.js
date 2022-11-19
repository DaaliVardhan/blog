const express=require('express')
const expressLayouts=require('express-ejs-layouts')
const userRouter=require('./router/User')



const app=express()

app.use(express.static('public'))
app.use(expressLayouts)
app.set('view engine','ejs')
app.set('views',__dirname+"/views")
app.set('layouts','layout')
app.use("/users",userRouter)

app.get("/",(req,res)=>{
    res.render("index",{name:"Daali"})
})


app.listen(8000,()=>{console.log("Listening at port 8000")})