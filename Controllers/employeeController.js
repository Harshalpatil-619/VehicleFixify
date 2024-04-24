const asyncHandler=require("express-async-handler");
const bcrypt=require("bcrypt");
const Employee = require("../Model/employeemodel");
const jwt=require("jsonwebtoken");

//desc register a user
//route POST/api/employees
//access public

const registerEmployee =asyncHandler(async (req,res) => {
    const{employeename ,employeeid,password} =req.body;
    if(!employeename || !employeeid || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const employeeAvailable=await Employee.findOne({employeeid});
    if(employeeAvailable){
        res.status(400);
        throw new error("employee already exist");
    }
    const hashpassword= await bcrypt.hash(password,10);
    console.log("Hashed password" , hashpassword);
    const employee=await Employee.create({
        employeename,
        employeeid,
        password:hashpassword
    });
    console.log(`employee created ${employee}`);
     if(employee){
        res.status(201).json({_id:employee.id,employeename:employee.employeename})
     } 
     else{
        res.status(400);
        throw new Error("Employee data is not valid")
     }

    res.json({message:"Register the employee"});
});





const loginEmployee =asyncHandler(async (req,res) => {
    const {employeeid,password}=req.body;
    if(!employeeid || !password){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const employee =await Employee.findOne({employeeid});

    if(employee && (await bcrypt.compare(password,employee.password))){
        const accessToken=jwt.sign(
            {
                employee:{
                    employeename:employee.employeename,
                    employeeid:employee.employeeid,
                    id:employee.id
                }
            },process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"15m"}
        );
        res.status(200).json({accessToken});
    }
    else{
        res.status(401);
        throw new Error("email or password is not valid");

    }
    res.json({message:"login employee"});

});






const currentEmployee =asyncHandler(async (req,res) => {
    res.json(req.employees);
});

module.exports={registerEmployee,loginEmployee,currentEmployee};