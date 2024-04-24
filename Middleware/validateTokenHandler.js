const asyncHandler=require("express-async-handler");
const jwt =require("jsonwebtoken");
const validateToken =asyncHandler(async(req,res,next)=>{
    let token ;
    let authHeader =req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token= authHeader.split(" ")[1];
        jwt.verify(token ,process.env.ACCESS_TOKEN_SECRET ,(err,decoded) =>{
            if (err){
                res.status(401);
                throw new Error("Employee is not authorized") ;
            }
            // console.log(decoded); 
            req.employees=decoded.employees;
            next();
        }) ;
        if(!token){
            res.status(401);
            throw new Error("Employee is not authorized or toke n  is missing ")
        }
    }
});
module.exports=validateToken;