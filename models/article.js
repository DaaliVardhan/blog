const mongoose=require("mongoose")
const slugify=require('slugify')

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