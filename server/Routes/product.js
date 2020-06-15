const router = require('express').Router()
const verify = require('./verifyToken');
const Product = require('./../Models/Product')
const cloudinary = require('./../uploads/cloudinary');
const upload = require('./../uploads/multer');
const fs = require('fs');
//const Users = require('../Models/Users');

const validationCategoty = (data)=>{
    const {productName,categoryId} = data
    //console.log(data,productName,categoryId);
    if(!categoryId || !productName ){
        return false
    }
    return true
}
router.get('/status',verify ,(req,res)=>{
    res.status(200).json({
        message:"verified"
    })
})
router.post('/singleProduct',verify, async(req,res)=>{
    const product = await Product.findById(req.body.id)
    return res.json(product);
})
router.post('/getproduct',verify, async(req,res)=>{
    console.log(req.user.id,req.body.categoryId);
    const product = await Product.find({userId:req.user.id,categoryId:req.body.categoryId})
    console.log(product)
    return res.json(product);
})

router.post("/product",verify ,upload.array('image'),async (req,res)=>{

    const uploader = async (path) => await cloudinary.uploads(path, 'Images');

    if (req.method === 'POST') {
      var urls = []
      const files = req.files;
      for (const file of files) {
        const { path } = file;
        const newPath = await uploader(path)
        urls.push(newPath)
        fs.unlinkSync(path)
      }
  
    //   return res.status(200).json({
    //     message: 'images uploaded successfully',
    //     data: urls
    //   })
  
    } else {
      return res.status(405).json({
        err: `${req.method} method not allowed`
      })
    }
  


//////////////////////////////    
console.log("qs",req.body.data);
    var object=JSON.parse(req.body.data)
    const validate = validationCategoty(object)
    if(!validate){
        return res.json({
            status:400,
            error:"Empty Value",
            message:"Failed to create Product"
        })
    }
    
    let data = object.pwm.split("|")
    let global = []
    //console.log(data)
    for(i=0;i<data.length;i++){
        var newArray = data[i].split(",")
        //console.log(newArray);
        let obj = {
            price:newArray[0],
            weight:newArray[1],
            mrp:newArray[2]
        }
        global.push(obj);
    }
    console.log(global,req.user.id);
    
        console.log("object here",object)
        const product = new Product({
            categoryId:object.categoryId,
            userId:req.user.id,
            productName:object.productName,
            image:urls,
            priceWeightMrp:global,
    
    })
    
        
    try {
        const addedProduct = await product.save()
        res.send({
            data:urls,
            product:addedProduct
        })
        
    } catch (err) {
        console.log(err);
        res.json({
            status:400,
            error:err,
            message:"Failed to create Product"
        })
    }

    

})
module.exports = router;