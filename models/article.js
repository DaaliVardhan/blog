const mongoose=require("mongoose")
const slugify=require('slugify')
const fs=require('fs')


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
        type:Buffer,
        default:fs.readFileSync('public/assets/images/blog/blog-post-banner')

    },
    post:{
        type:String,
        require:true
    },
    thumbnail:{
        type:Buffer,
        default:fs.readFileSync('public/assets/images/blog/blog-post-thumb-8')
    },
    slug:{
        type:String,
        
    },
    voters:{
        type:Array,
        default:[]
    },
    votes:{
        type:Number,
        default:0,
    }

})

articleSchema.pre("validate", function (next) {
    if (this.title) {
      this.slug = slugify(this.title, { lower: true, strict: true });
    }
    next();
  });
module.exports=mongoose.model("Article",articleSchema,'articles')