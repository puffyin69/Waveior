import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/lib/db";

export async function GET() {
    try {
        await connectDB();
        const users = await User.find({}).select('-password'); // Don't return passwords
        console.log("All users found:", users);
        return NextResponse.json({
            message: "Successfully retrieved all users",
            users: users,
        });
    } catch (error) {
        console.error("Error while finding users:", error.message);
        return NextResponse.json(
            { 
                message: "Failed to retrieve users",
                error: error.message 
            },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        await connectDB();
        
        // Get data from request body
        const body = await request.json();
        const { name, email, password } = body;

        // Validate required fields
        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "Name, email, and password are required" },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: "Please enter a valid email address" },
                { status: 400 }
            );
        }

        // Validate password length
        if (password.length < 6) {
            return NextResponse.json(
                { message: "Password must be at least 6 characters long" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return NextResponse.json(
                { message: "User with this email already exists" },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create new user
        const newUser = new User({
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPassword,
        });

        const result = await newUser.save();
        console.log("New user created successfully:", result.email);
        
        return NextResponse.json({
            message: "User registered successfully",
            user: {
                id: result._id,
                name: result.name,
                email: result.email,
                role: result.role,
                createdAt: result.createdAt
            }
        }, { status: 201 });

    } catch (error) {
        console.error("Error creating user:", error.message);
        
        // Handle duplicate email error from MongoDB
        if (error.code === 11000) {
            return NextResponse.json(
                { message: "User with this email already exists" },
                { status: 409 }
            );
        }
        
        return NextResponse.json(
            { 
                message: "Failed to create user",
                error: error.message 
            },
            { status: 500 }
        );
    }
}