import mongoose from 'mongoose';
const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{                                    
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
    }],
    totalAmount: {
        type: Number,
        default: 0,
        min: 0
    },
    itemCount: {
        type: Number,
        default: 0,
        min: 0
    },
    isActive: {
        type: Boolean,
        default: true  // true means the cart is active and false means that it has been converted to an order
    }
}, {
    timestamps: true
});

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
export default Cart;