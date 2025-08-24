import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    orderNumber : {
        type:String,
        required:true,
        unique:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    totalAmount:{
        type:Number,
        required:true,
        min:0
    },
    status:{
        type:String,
        required:true,
        enum:['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
        default:"pending",
    },
    shippingAddress:{
        street : String,
        city : String,
        state:String,
        zip:String,
        country:String,
    },
    paymentStatus:{
        type:String,
        required:true,
        enum:['pending', 'paid', 'failed'],
        default:"pending",
    }
}, {
    timestamps: true
})
// generating the order number before saving the order 
orderSchema.pre("save", async function(next){
    if(!this.orderNumber){
        this.orderNumber = "ORD" + Date.now();
    }
    next();
})
const Order = mongoose.models.Order || mongoose.model("Order",orderSchema);
export default Order;