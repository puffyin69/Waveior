import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import Cart from "@/models/Cart";
import CartItem from "@/models/cartItem";
import { populate } from "dotenv";
export async function GET(){
    await connectDB();
    const userId = "demo-user-123";
    const cart = await Cart.findOne({userId}).populate({ // double populate since one cart session can have many cart items and each cart can have many products 
        path:"items",
        populate:{
            path:"productId",
            model:"Product"
        }
    })

    return NextResponse.json({
        "message":"kcuh bi"
    })
}