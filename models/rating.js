import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    owner:{
        type:String,
        required:true,
        trim:true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        required:true,
    },
})
export default mongoose.models.Rating || mongoose.model("Rating",ratingSchema);