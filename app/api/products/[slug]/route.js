// aa particular product ne fetch karva mate ni api che
//logic shu che ke apde mockdata je insert kariyu che ne database ma eema apde slug naam ni field rakhij che so apde ek api banavi and then apde slug ne params ma pass kariye and then e slug ne use kari ne product ne fetch kariye
//slug ne use kari ne product ne fetch kariye
import Product from "@/models/product";
import connectDB from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request,{params}){
    try{
        await connectDB();
    const {slug} = params;
    const product = await Product.findOne({slug:slug});
    if(!product){
        return NextResponse.json({
            message:"Error no product found",
        },{status:404})
    }
    return NextResponse.json({
        message:"found the Product",
        prod:product
    })
    }catch(error){
        return NextResponse.json({
            message:"Error while fetching the product",
        },{status:505})
    }
}