import { NextResponse } from "next/server";
import { auth } from "@/auth";
import User from "@/models/User";
import connectDB from "@/lib/db";

// This API route is for getting current user info (protected route)
export async function GET(request) {
    try {
        // Get current session
        const session = await auth();
        
        if (!session) {
            return NextResponse.json(
                { message: "Not authenticated" },
                { status: 401 }
            );
        }

        await connectDB();
        
        // Find user by session ID
        const user = await User.findById(session.user.id).select('-password');
        
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "Current user retrieved successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                image: user.image,
                emailVerified: user.emailVerified,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        });

    } catch (error) {
        console.error("Error getting current user:", error.message);
        return NextResponse.json(
            { 
                message: "Failed to get user info",
                error: error.message 
            },
            { status: 500 }
        );
    }
}