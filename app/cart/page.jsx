"use client";
import React from 'react';
import Nav from '@/components/nav';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

const CartPage = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Nav />
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto text-center">
                    <div className="bg-white rounded-lg shadow-md p-8">
                        <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Cart Feature Temporarily Disabled</h1>
                        <p className="text-gray-600 mb-6">
                            The shopping cart functionality is currently disabled for maintenance. 
                            You can still browse our products and view product details.
                        </p>
                        <Link 
                            href="/products"
                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;


