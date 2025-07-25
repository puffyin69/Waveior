import mongoose from 'mongoose';
import Rating from "@models/rating.js"; 
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,  // ✅ Fixed: was "number"
        required: true,
        min: 0,
        validate: {
            validator: Number.isFinite,
            message: "Price must be a finite number"
        }
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))$/.test(v);
            },
            message: "Invalid image URL"
        }
    },
    category: {
        type: String,
        required: true,
        enum: ["Clothing", "Daily Essentials", "Men's Wear", "Women's Wear"], 
        trim: true
    },
    rating: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating",
        required: true
    }
}, {
    timestamps: true
});

// Create the model
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;