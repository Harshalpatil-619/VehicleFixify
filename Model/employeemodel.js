const mongoose=require("mongoose");

const employeeSchema=mongoose.Schema({
    emp_objid:{
        type: mongoose.Schema.Types.ObjectId ,
        required:true,
        ref:"employee"
    },
    employeename:{
        type:String,
        required:[true,"please add the employee name"]
    },
    employeeid:{
        type:String,
        required:[true,"please add emplyee id"],
        unique:[true,"employee id is already taken"]
    },
    password:{
        type:String,
        required:[true,"please add password "],
    }

},
{
    timestamps:true,
});

module.exports=mongoose.model("Employee",employeeSchema);