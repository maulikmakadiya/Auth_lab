const multer=require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+".jpg");
    }
  });
const fileFilter =(req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png'){
        cb(null,true);
    }else{
        cb(null,false);
    }
}
const fileUpload = multer({
    storage:storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 5 
    // },
    fileFilter: fileFilter
    
});

module.exports = fileUpload;
