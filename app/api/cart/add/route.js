import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
export async function POST(request){
    await connectDB();
    console.log("This is the POST request for adding an item into the cart")
    return NextResponse.json({
        "message":"Item has been added to the cart"
    })

}