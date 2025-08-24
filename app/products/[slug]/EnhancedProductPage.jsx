'use client';

import React, { useState } from 'react';
import { Star, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Utility function for class names
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Star Rating Component
const StarRating = ({ maxStars = 5, defaultValue = 0, onChange, size = 16, readonly = false }) => {
  const [rating, setRating] = useState(defaultValue);
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value) => {
    if (readonly) return;
    setRating(value);
    onChange?.(value);
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(maxStars)].map((_, index) => {
        const value = index + 1;
        return (
          <button
            key={index}
            className={cn(
              "transition-transform focus:outline-none",
              !readonly && "hover:scale-110"
            )}
            onMouseEnter={() => !readonly && setHoverRating(value)}
            onMouseLeave={() => !readonly && setHoverRating(0)}
            onClick={() => handleClick(value)}
            disabled={readonly}
          >
            <Star
              size={size}
              className={cn(
                "transition-colors",
                (hoverRating || rating) >= value
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-none text-gray-300",
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

// Main Enhanced Product Page Component
const EnhancedProductPage = ({ product, slug }) => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Transform your product data to match the component structure
  const transformedProduct = {
    id: product._id || 'product-1',
    name: product.name || 'Premium Product',
    brand: 'Your Store',
    description: product.description || 'High-quality product with premium materials and excellent craftsmanship.',
    variants: [{
      id: 'variant-1',
      name: 'Default',
      color: '#1a1a1a',
      price: product.price || 0,
      originalPrice: product.price ? product.price * 1.2 : 0,
      inStock: true,
      images: product.image ? [{ 
        id: 'img-1', 
        url: product.image, 
        alt: product.name || 'Product image' 
      }] : []
    }],
    reviews: [
      {
        id: 'review-1',
        rating: 5,
        comment: 'Amazing quality and fast delivery!',
        author: 'Happy Customer',
        date: '2024-01-15',
        verified: true
      },
      {
        id: 'review-2',
        rating: 4,
        comment: 'Great value for money. Highly recommended.',
        author: 'John D.',
        date: '2024-01-10',
        verified: true
      }
    ],
    features: [
      'Premium Quality Materials',
      '1 Year Warranty',
      'Free Shipping Available',
      'Easy Returns',
      'Secure Payment',
      '24/7 Customer Support'
    ],
    specifications: {
      'Product ID': product._id || 'N/A',
      'Category': product.category || 'General',
      'Brand': 'Your Store',
      'Weight': 'Standard',
      'Material': 'Premium Quality',
      'Availability': 'In Stock'
    },
    shipping: {
      freeShipping: true,
      estimatedDays: '3-5 business days'
    },
    warranty: '1 year',
    returnPolicy: '30-day return policy'
  };

  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);

  const currentVariant = transformedProduct.variants[selectedVariant];
  const currentImages = currentVariant.images;
  
  const averageRating = transformedProduct.reviews.reduce((acc, review) => acc + review.rating, 0) / transformedProduct.reviews.length;
  const totalReviews = transformedProduct.reviews.length;

  const handleReviewSubmit = (review) => {
    console.log('New review:', review);
  };

  const discountPercentage = currentVariant.originalPrice 
    ? Math.round(((currentVariant.originalPrice - currentVariant.price) / currentVariant.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Product Images */}
        <div className="lg:col-span-2 space-y-4">
          <div className="relative w-full h-96 bg-gray-50 rounded-lg overflow-hidden">
            {currentImages.length > 0 ? (
              <motion.img
                key={currentImages[selectedImage]?.id}
                src={currentImages[selectedImage]?.url}
                alt={currentImages[selectedImage]?.alt}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center bg-gray-50">
                <div className="text-center text-gray-400">
                  <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-base font-medium">No Image Available</p>
                </div>
              </div>
            )}
            {discountPercentage > 0 && (
              <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                -{discountPercentage}%
              </Badge>
            )}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
            >
              <Heart 
                className={cn(
                  "w-5 h-5 transition-colors",
                  isWishlisted ? "fill-red-500 text-red-500" : "text-gray-600"
                )}
              />
            </button>
          </div>
        </div>
        {/* Product Details */}
        <div className="lg:col-span-3 space-y-6">
          <div>
            <p className="text-sm text-gray-500">{transformedProduct.brand}</p>
            <h1 className="text-3xl font-bold text-gray-900">{transformedProduct.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mt-2">
              <StarRating defaultValue={averageRating} readonly size={16} />
              <span className="text-sm text-gray-500">
                {averageRating.toFixed(1)} ({totalReviews} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 border border-red-100">
            <div className="flex items-baseline gap-3 mb-2">
              <span className="text-3xl font-bold text-red-600">
                ₹{currentVariant.price?.toLocaleString()}
              </span>
              {currentVariant.originalPrice && (
                <span className="text-xl text-gray-500 line-through">
                  ₹{currentVariant.originalPrice?.toLocaleString()}
                </span>
              )}
              {discountPercentage > 0 && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>
            {discountPercentage > 0 && (
              <p className="text-sm text-green-700 font-medium">
                ✓ You save ₹{((currentVariant.originalPrice - currentVariant.price)).toLocaleString()}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <Badge className="bg-blue-100 text-blue-800">
              {product.category || 'General'}
            </Badge>
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed">{transformedProduct.description}</p>

          {/* Features */}
          <div className="space-y-3">
            <h3 className="font-medium">Key Features</h3>
            <ul className="space-y-2">
              {transformedProduct.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Shipping & Policies */}
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Truck className="w-4 h-4 text-green-600" />
              <span>
                {transformedProduct.shipping.freeShipping ? "Free shipping" : "Shipping available"} • 
                Delivery in {transformedProduct.shipping.estimatedDays}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-blue-600" />
              <span>{transformedProduct.warranty} warranty included</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <RotateCcw className="w-4 h-4 text-orange-600" />
              <span>{transformedProduct.returnPolicy}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Sections (keeping your existing reviews section) */}
      <div className="mt-12 space-y-8">
        {/* Specifications */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(transformedProduct.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                <span className="font-medium">{key}</span>
                <span className="text-gray-600">{value}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Reviews */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
            <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Write Review
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Review 1 */}
            <div className="py-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="font-medium text-gray-900">Sarah M.</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                    Verified
                  </span>
                </div>
                <span className="text-sm text-gray-500">2024-01-15</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Amazing sound quality and comfort. Best purchase I've made this year!
              </p>
            </div>

            {/* Review 2 */}
            <div className="py-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {[1, 2, 3, 4].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                    <Star size={16} className="fill-none text-gray-300" />
                  </div>
                  <span className="font-medium text-gray-900">Mike R.</span>
                  <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">
                    Verified
                  </span>
                </div>
                <span className="text-sm text-gray-500">2024-01-10</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Great headphones, battery life is excellent. Noise cancellation works well.
              </p>
            </div>

            {/* Review 3 */}
            <div className="py-4 border-t border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <span className="font-medium text-gray-900">Emma L.</span>
                </div>
                <span className="text-sm text-gray-500">2024-01-08</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Perfect for work from home. Very comfortable for long calls.
              </p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProductPage;
