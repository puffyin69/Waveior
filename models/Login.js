import mongoose from "mongoose";

const loginScehma = new mongoose.Schema({
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
    }
})
const Login = mongoose.models.Login || mongoose.model("Login",loginScehma);
export default Login;