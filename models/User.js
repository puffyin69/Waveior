import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: function() {
            return !this.image;
        },
        minLength: 6,
    },
    image: {
        type: String,
        default: null
    },
    emailVerified: {
        type: Date,
        default: null
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true
});

// Create index for faster email lookups
userSchema.index({ email: 1 });

// ✅ Best practice: Delete existing model before creating new one
if (mongoose.models.User) {
    delete mongoose.models.User;
}

const User = mongoose.model("User", userSchema);
export default User;
