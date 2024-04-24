const express =require("express");
const {registerEmployee,loginEmployee,currentEmployee}=require("../Controllers/employeeController");
const validateToken = require("../Middleware/validateTokenHandler");
const router =express.Router();

router.post("/register" , registerEmployee);
router.post("/login" , loginEmployee);
router.get("/current" , validateToken ,currentEmployee);
module.exports=router;