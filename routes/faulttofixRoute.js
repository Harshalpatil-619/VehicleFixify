const express =require("express");

const router =express.Router();
const{getFaulttofixs , createFaulttofix ,
    getFaulttofix ,
     updateFaulttofix,
     deleteFaulttofix}=require("../Controllers/faulttofixController");
const validateToken = require("../Middleware/validateTokenHandler");




router.use(validateToken);
router.route("/").get(getFaulttofixs).post(createFaulttofix);



router.route("/:id").get(getFaulttofix).put(updateFaulttofix).delete(deleteFaulttofix);;

module.exports=router;