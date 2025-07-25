import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    }
}, {
    timestamps: true
});
cartItemSchema.pre('save', function(next) {
    this.totalPrice = this.price * this.quantity;
    next();
});

const CartItem = mongoose.models.CartItem || mongoose.model('CartItem', cartItemSchema);
export default CartItem;