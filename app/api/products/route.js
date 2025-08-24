import mongoose from 'mongoose';
import Product from "@/models/product";
import connectDB from '@/lib/db';
import { NextResponse } from 'next/server';
import {mockProducts} from "@/lib/mockData"; 
export async function GET(request) {
    try {
        await connectDB();
        const products = await Product.find({});
        
        return NextResponse.json({
            success: true,          
            message: "Products fetched successfully",
            products: products,     
            count: products.length
        });
    } catch (error) {
        return NextResponse.json({
            success: false,        
            message: "Error fetching products",
            error: error.message
        }, { status: 500 });
    }
}

export async function POST(request){
    await connectDB();
    const products = await Product.insertMany(mockProducts);
    return NextResponse.json({
        success: true,
        message: "Products added successfully"
    });

}
export async function DELETE(request){
    await connectDB();
    await Product.deleteMany({});
    return NextResponse.json({
        success: true,
        message: "All products deleted successfully"
    });
}