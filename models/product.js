import mongoose from 'mongoose';

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
        type: Number,
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
                // ✅ Much more flexible validation - accepts any HTTPS URL
                return /^https?:\/\/.+/.test(v);
            },
            message: "Image must be a valid URL starting with http:// or https://"
        }
    },
    category: {
        type: String,
        required: true,
        enum: ["Clothing", "Daily Essentials", "Men's Wear", "Women's Wear", "Night Dress"], 
        trim: true
    },
    rating: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating",
        required: false // ✅ Changed from true to false
    },
}, {
    timestamps: true
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;