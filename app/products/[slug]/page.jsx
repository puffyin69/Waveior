import Link from "next/link";
import Nav from "@/components/nav";
import EnhancedProductPage from "./EnhancedProductPage";


const ProductPage = async ({ params }) => {
    const { slug } = await params;  
    
    let product = null;
    let error = null;

    // 🎯 SERVER-SIDE DATA FETCHING
    try {
        console.log('🔍 Server: Fetching product with slug:', slug);
        
        // 🔥 FIX: Use the correct port and detect development environment
        const isDevelopment = process.env.NODE_ENV === 'development';
        const port = process.env.PORT || '3001'; // Default to 3001 for development
        const baseUrl = isDevelopment 
            ? `http://localhost:${port}` 
            : (process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001');
            
        console.log('🌐 Using base URL:', baseUrl);
        
        const response = await fetch(`${baseUrl}/api/products/${slug}`, {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: Product not found`);
        }
        
        const data = await response.json();
        console.log('📦 Server: API Response:', data);  
        
        if (data.success && data.product) {
            product = data.product;
        } else if (data.prod) {
            product = data.prod;
        } else {
            throw new Error(data.message || 'Product not found');
        }
        
    } catch (err) {
        console.error('❌ Server Error:', err);
        error = err.message;
    }

    // 🎯 ERROR STATE
    if (error) {
        return (
            <>
                <Nav />
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center max-w-lg mx-auto px-6 space-y-8">
                        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.467-.188-6.354-.466B4.346 15.482 3 16.793 3 18.293V19a1 1 0 001 1h.01M21 20l.01.01M3 21l.01.01" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h1>
                            <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                                <p className="text-red-700 text-sm">{error}</p>
                                <p className="text-red-600 text-xs mt-2">Slug: <span className="font-mono">{slug}</span></p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                href="/products"
                                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                            >
                                Browse Products
                            </Link>
                            <Link 
                                href="/"
                                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                            >
                                Go Home
                            </Link>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // 🎯 NO PRODUCT DATA
    if (!product) {
        return (
            <>
                <Nav />
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-800">No Product Data</h1>
                        <p className="text-gray-600">API returned success but no product data</p>
                        <Link 
                            href="/products"
                            className="inline-block mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            ← Back to Products
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    // 🎯 MAIN PRODUCT DISPLAY - ENHANCED COMPONENT
    return (
        <>
            <Nav />
            <EnhancedProductPage product={product} slug={slug} />
        </>
    );
};

export default ProductPage;