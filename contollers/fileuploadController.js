const multer=require('multer')

const storage = multer.diskStorage(
    {
        destination: "public/assets/images/blog",
        filename: function ( req, file, cb ) {
            cb( null, file.originalname);
        }
    }
);    
let upload = multer( { storage: storage } );    

module.exports=upload;