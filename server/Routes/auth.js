const router = require('express').Router()
const User = require('./../Models/Users');
const jwt = require('jsonwebtoken')
const validationSignup = (data)=>{
    const {firstName,lastName,email,password} = data
    if(!firstName || !lastName || !email || !password){
        return false
    }
    return true
}
const validationLogin = (data)=>{
    console.log(data);
    const {email,password} = data
    console.log(email,password);
    if(!email || !password){
        return false
    }
    return true
}



router.post('/register', async (req,res)=>{
    const validate = validationSignup(req.body)
    if(!validate){
        return res.json({
            status:400,
            error:"Empty Value",
            message:"Failed to create account"
        })
    }
    const emailExits = await User.findOne({email:req.body.email})
    if(emailExits) return res.json({
        status:400,
        error:"Email Already Exits",
        message:"Failed to create account"
    })

        const user = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password,
    
    
        
    })
    try {
        const addedUser = await user.save()
        res.send(addedUser)
        
    } catch (err) {
        res.json({
            status:400,
            error:err,
            message:"Failed to create account"
        })
    }

    

})
router.post('/login',async (req,res)=>{
    const validate = validationLogin(req.body)
    console.log(validate);
    if(!validate) return res.status(400).json({
        status:400,
        error:"Empty Value",
        message:"Login Failed"
    })
    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).json({
        status:400,
        error:"Email not Found",
        message:"Login Failed"
    })
    console.log(user);
    if(user.password===req.body.password){
        const token = jwt.sign({ id: user._id }, 'shhhggrgrghh');
        res.header('authtoken',token)
        return res.json({
            status:200,
            message:"Login Successful"
            
        })
    }
    else{
        return res.status(400).json({
        status:400,
        
        message:"Login Failed"
        });
    }

    //res.send("Login")
})


module.exports = router;