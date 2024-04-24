const asyncHandler=require("express-async-handler");
const fault=require("../Model/faultmodel");


//desc get all faulttofix
//route GET/api/faulttofixs
//access public->private

const getFaulttofixs =asyncHandler(async(req,res)=>{
   

    const Allfaults =await fault.find({emp_objid:req.employees.id});
    res.status(200).json(Allfaults);
});


//desc create a faulttofix
//route POST/api/faulttofixs
//access public->private

const createFaulttofix =asyncHandler(async (req,res)=>{
    console.log("new created fault is :",req.body);
    const {batch_id,batch_name,model_no}=req.body;
    if(!batch_id|| !batch_name || !model_no){
        res.status(404);
        throw new Error("all fields are mandatory");
    }
    const newFault= await fault.create({
        batch_name,
        batch_id,
        model_no,
    })
    res.status(201).json(newFault);
});


//desc create a faulttofix
//route POST/api/faulttofixs
//access public->private

const getFaulttofix = asyncHandler(async(req,res)=>{
    const getonefault =await fault.findById(req.params.id);
    if(!getonefault){
        res.status(404);
        throw new Error("fault not found ");
    }
    res.status(201).json(getonefault);
});


//desc upadte faulttofix
//route PUT/api/faulttofixs/:id
//access public->private

const updateFaulttofix =asyncHandler(async (req,res)=>{
    const getonefault =await fault.findById(req.params.id);
    if(!getonefault){
        res.status(404);
        throw new Error("fault not found ");
    }
    const updatedfault= await fault.findByIdAndUpdate(
        req.params.id,
        req.body,
        {  new:true }
    );    
    

    res.status(201).json(updatedfault);
});


//desc delete faulttofix
//route DELETE/api/faulttofixs/:id
//access public->private

const deleteFaulttofix =asyncHandler(async (req,res)=>{
    const getonefault =await fault.findById(req.params.id);
    if(!getonefault){
        res.status(404);
        throw new Error("fault not found ");
    }
    await fault.findByIdAndDelete(req.params.id);
    res.status(200).json(getonefault);
});
module.exports={getFaulttofixs ,
    createFaulttofix ,
    getFaulttofix ,
     updateFaulttofix,
     deleteFaulttofix};