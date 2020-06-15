const router = require('express').Router()
const verify = require('./verifyToken');
const Category = require('./../Models/Category');


const validationCategoty = (data)=>{
    const {name} = data
    if(!name){
        return false
    }
    return true
}
router.get('/category',verify,async(req,res)=>{
    const category  = await Category.find()
    res.json({category});
})

router.post("/category",verify ,async (req,res)=>{
    const validate = validationCategoty(req.body)
    if(!validate){
        return res.json({
            status:400,
            error:"Empty Value",
            message:"Failed to create Category"
        })
    }
    const categoryExits = await Category.findOne({name:req.body.name})
    if(categoryExits) return res.json({
        status:400,
        error:"Name Already Exits",
        message:"Failed to create Category"
    })

        const category = new Category({
        name:req.body.name
    
    })
    
        
    try {
        const addedCategory = await category.save()
        res.send(addedCategory)
        
    } catch (err) {
        res.json({
            status:400,
            error:err,
            message:"Failed to create category"
        })
    }

    

})

module.exports = router;