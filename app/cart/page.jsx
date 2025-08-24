"use client";
import React, { useState } from 'react';
import Nav from '@/components/nav';
import Link from 'next/link';
import { ArrowLeft, ShoppingBag, Minus, Plus, Heart, Trash2, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const summary = { total: 0, totalItems: 0, subtotal: 0, shipping: 0, tax: 0, savings: 0 };
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

    // Handle checkout
    const handleCheckout = async () => {
        setIsCheckingOut(true);
        
        try {
            const orderData = {
                customerName: 'John Doe', // This would come from user input
                customerEmail: 'john@example.com',
                customerPhone: '+91 9999999999',
                shippingAddress: {
                    address: '123 Main Street',
                    city: 'Mumbai',
                    state: 'Maharashtra',
                    zipCode: '400001',
                    country: 'India'
                }
            };

            const order = await createOrder(orderData);
            console.log('✅ Order created:', order);
            
            setOrderSuccess(true);
            setSuccessMessage(`Order placed successfully! Order #${order.order.orderNumber}`);
            
            // Redirect to order confirmation after 3 seconds
            setTimeout(() => {
                window.location.href = `/order-confirmation/${order.order.id}`;
            }, 3000);

        } catch (error) {
            console.error('❌ Checkout failed:', error);
            alert('Checkout failed. Please try again.');
        } finally {
            setIsCheckingOut(false);
        }
    };

    // Empty cart state
    if (cart.length === 0) {
        return (
            <>
                <Nav />
                <div className="min-h-screen bg-gray-50 pt-16">
                    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                                <ShoppingBag className="w-16 h-16 text-gray-400" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
                                <p className="text-gray-600 mb-8 text-lg">
                                    Looks like you haven't added anything to your cart yet. 
                                    Start shopping to fill it up!
                                </p>
                            </div>
                            <div className="space-y-4">
                                <Link 
                                    href="/products"
                                    className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                                >
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Continue Shopping
                                </Link>
                                <div className="flex justify-center space-x-4 text-sm text-gray-500">
                                    <span>• Free shipping over ₹499</span>
                                    <span>• Easy returns</span>
                                    <span>• Secure checkout</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </>
        );
    }

    // Order success state
    if (orderSuccess) {
        return (
            <>
                <Nav />
                <div className="min-h-screen bg-green-50 pt-16">
                    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-8"
                        >
                            <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                                <Package className="w-16 h-16 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-green-900 mb-4">Order Placed Successfully!</h1>
                                <p className="text-green-700 mb-8 text-lg">
                                    {successMessage}
                                </p>
                                <p className="text-green-600">
                                    Thank you for your purchase. You'll receive a confirmation email shortly.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg border border-green-200 max-w-md mx-auto">
                                <h3 className="font-semibold text-green-900 mb-2">Order Summary</h3>
                                <p className="text-green-700">Total: ₹{summary.total?.toLocaleString()}</p>
                                <p className="text-green-700">Items: {summary.totalItems}</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Nav />
            <div className="min-h-screen bg-gray-50 pt-16">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">
                                Shopping Cart ({summary.totalItems} items)
                            </h1>
                            <p className="text-gray-600 mt-1">
                                Review your items and checkout when ready
                            </p>
                        </div>
                        
                        {/* Bulk Actions */}
                        <div className="flex items-center space-x-4">
                            {selectedItems.length > 0 && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    onClick={removeSelectedItems}
                                    className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Remove Selected ({selectedItems.length})
                                </motion.button>
                            )}
                            
                            <button
                                onClick={clearCart}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                                Clear All
                            </button>
                        </div>
                    </div>

                    {/* Selection Controls */}
                    <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={selectedItems.length === cart.length ? deselectAllItems : selectAllItems}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    {selectedItems.length === cart.length ? 'Deselect All' : 'Select All'}
                                </button>
                                <span className="text-gray-500 text-sm">
                                    {selectedItems.length} of {cart.length} items selected
                                </span>
                            </div>
                            
                            {selectedItems.length > 0 && (
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => {
                                            selectedItems.forEach(itemId => moveToWishlist(itemId));
                                            setSelectedItems([]);
                                        }}
                                        className="flex items-center text-gray-600 hover:text-gray-800 text-sm"
                                    >
                                        <Heart className="w-4 h-4 mr-1" />
                                        Move to Wishlist
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            <AnimatePresence>
                                {cart.map((item) => (
                                    <motion.div
                                        key={item.itemId}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                                    >
                                        <div className="flex items-start space-x-4">
                                            
                                            {/* Selection Checkbox */}
                                            <input
                                                type="checkbox"
                                                checked={selectedItems.includes(item.itemId)}
                                                onChange={() => toggleItemSelection(item.itemId)}
                                                className="mt-4 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                            />
                                            
                                            {/* Product Image */}
                                            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                {item.image ? (
                                                    <img 
                                                        src={item.image} 
                                                        alt={item.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <Link 
                                                    href={`/products/${item.slug}`}
                                                    className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                                                >
                                                    {item.name}
                                                </Link>
                                                <p className="text-gray-600 text-sm mt-1">
                                                    {item.brand} • {item.category}
                                                </p>
                                                
                                                {/* Price */}
                                                <div className="flex items-center space-x-2 mt-2">
                                                    <span className="text-lg font-bold text-green-600">
                                                        ₹{item.price.toLocaleString()}
                                                    </span>
                                                    {item.originalPrice && item.originalPrice > item.price && (
                                                        <span className="text-sm text-gray-500 line-through">
                                                            ₹{item.originalPrice.toLocaleString()}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Quantity Controls */}
                                                <div className="flex items-center justify-between mt-4">
                                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                                        <button
                                                            onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                                                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-l-lg transition-colors"
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-16 h-10 flex items-center justify-center border-x border-gray-300 font-semibold">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                                                            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-r-lg transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => moveToWishlist(item.itemId)}
                                                            className="text-gray-500 hover:text-red-500 p-2 transition-colors"
                                                            title="Move to wishlist"
                                                        >
                                                            <Heart className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => removeCart([item.itemId])}
                                                            className="text-gray-500 hover:text-red-500 p-2 transition-colors"
                                                            title="Remove from cart"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Item Total */}
                                        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                                            <span className="text-sm text-gray-600">Item Total:</span>
                                            <span className="text-lg font-bold text-gray-900">
                                                ₹{(item.price * item.quantity).toLocaleString()}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
                                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal ({summary.totalItems} items):</span>
                                        <span>₹{summary.subtotal?.toLocaleString()}</span>
                                    </div>
                                    
                                    {summary.savings > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>You Save:</span>
                                            <span>-₹{summary.savings?.toLocaleString()}</span>
                                        </div>
                                    )}
                                    
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping:</span>
                                        <span className={summary.shipping === 0 ? "text-green-600" : ""}>
                                            {summary.shipping === 0 ? "Free" : `₹${summary.shipping}`}
                                        </span>
                                    </div>
                                    
                                    <div className="flex justify-between text-gray-600">
                                        <span>Tax (GST 18%):</span>
                                        <span>₹{summary.tax?.toLocaleString()}</span>
                                    </div>
                                    
                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between text-xl font-bold text-gray-900">
                                            <span>Total:</span>
                                            <span>₹{summary.total?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Promo Code */}
                                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                    <input
                                        type="text"
                                        placeholder="Enter promo code"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button className="w-full mt-2 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
                                        Apply Code
                                    </button>
                                </div>

                                {/* Checkout Button */}
                                <button 
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut || isLoading}
                                    className={`w-full font-bold py-4 px-6 rounded-lg transition-colors mt-6 shadow-lg hover:shadow-xl ${
                                        isCheckingOut || isLoading
                                            ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                                            : 'bg-orange-500 hover:bg-orange-600 text-white'
                                    }`}
                                >
                                    {isCheckingOut ? 'Processing...' : `Checkout • ₹${summary.total?.toLocaleString()}`}
                                </button>

                                <Link
                                    href="/products"
                                    className="block w-full text-center border border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors mt-4"
                                >
                                    Continue Shopping
                                </Link>

                                {/* Trust Badges */}
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                            </svg>
                                            Secure Checkout
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Money Back Guarantee
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                                            </svg>
                                            Easy Returns
                                        </div>
                                        <div className="flex items-center">
                                            <svg className="w-4 h-4 mr-1 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                                                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                                            </svg>
                                            Fast Shipping
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );


