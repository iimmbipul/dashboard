const jwt = require('jsonwebtoken')

module.exports = (req,res,next)=>{
    console.log(req.header);
 const token = req.header('authtoken');
 console.log(token);
 if(!token) return res.status(400).json({
     status:400,
     error:"Token Required",
     message:"Failed"
 })

 try {
     const verified = jwt.verify(token,"shhhggrgrghh")
     
     req.user = verified;
     next();
     
 } catch (error) {
    res.status(400).json({
        status:400,
        error:"Invalid Token",
        message:"Failed"
    })
 }
}
 