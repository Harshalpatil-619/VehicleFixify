const mongoose =require("mongoose");


const faulttofix = mongoose.Schema({
    batch_name:{
        type:String ,
        required : [true,"please add the batch_name "],
    },
    batch_id:{
        type:String ,
        required : [true,"please add the batch_id "],
    },
    model_no:{
        type:Number ,
        required : [true,"please add the model_no "],
    }
    
},{
    timestamps:true,
});


module.exports=mongoose.model("fault",faulttofix)