const mongoose=require("mongoose")

const articleSchema=mongoose.Schema({
    title:{
        type:String,
        require:true,
        unique:true
    },
    description:{
        type:String,
        require:true
    },
    publishedOn:{
        type:Date,
        default:new Date()
    },
    poster:{
        type:String,
        default:"/assets/images/blog/blog-post-banner.jpg"

    },
    post:{
        type:String,
        require:true
    },
    thumbnail:{
        type:String,
        default:"/assets/images/blog/blog-post-thumb-2.jpg"

    },
    comments:{
        type:Array,
        default:[]
    },
    votes:{
        type:Number,
        default:0,
    }

})

module.exports=mongoose.model("Article",articleSchema,'articles')