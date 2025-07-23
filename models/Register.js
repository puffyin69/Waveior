import mongoose from "mongoose";


const registerSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        trim:true
    },
    lname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:6,
    },
    crendentials:{
        type:String,
        required:true,
        default:"crendentials",
        trim:true,
    }
})

const Register = mongoose.models.Register || mongoose.model("Register",registerSchema);
export default Register;