"use client";
import { motion, useReducedMotion } from "framer-motion"
import { buttonVariants } from "@/components/ui/button"
import { ShoppingCart, Star, Heart } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function ProductRevealCard({
  // Product basic info
  name = "Premium Wireless Headphones",
  price = "$199",
  originalPrice = null, // Set to null by default so discount badge only shows when provided
  image = "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&h=600&fit=crop",
  description = "Experience studio-quality sound with advanced noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.",
  
  // Rating and reviews
  rating = 4.8,
  reviewCount = 124,
  
  // Features (array of objects with title and subtitle)
  features = [
    { title: "30h Battery", subtitle: "Long-lasting" },
    { title: "Noise Cancel", subtitle: "Studio quality" }
  ],
  
  // Button configurations
  addToCartText = "Add to Cart",
  viewDetailsText = "View Details",
  
  // Event handlers
  onAdd,
  onFavorite,
  onViewDetails,
  
  // Customization
  enableAnimations = true,
  showDiscount = true,
  showFeatures = true,
  className,
  
  // Color/theme customization
  primaryColor = "primary",
  cardVariant = "default" // "default", "compact", "minimal"
}) {
  const [isFavorite, setIsFavorite] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const shouldAnimate = enableAnimations && !shouldReduceMotion

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
    onFavorite?.({ name, price, isFavorite: !isFavorite })
  }

  const handleAddToCart = () => {
    onAdd?.({ name, price, originalPrice, image, description, rating, reviewCount })
  }

  const handleViewDetails = () => {
    onViewDetails?.({ name, price, originalPrice, image, description, rating, reviewCount })
  }

  // Calculate discount percentage
  const discountPercentage = originalPrice && showDiscount
    ? Math.round(
        ((parseFloat(originalPrice.replace('$', '')) - parseFloat(price.replace('$', ''))) / 
         parseFloat(originalPrice.replace('$', ''))) * 100
      )
    : null;

  const containerVariants = {
    rest: { 
      scale: 1,
      y: 0,
      filter: "blur(0px)",
    },
    hover: shouldAnimate ? { 
      scale: 1.03, 
      y: -8,
      filter: "blur(0px)",
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        mass: 0.8,
      }
    } : {},
  }

  const imageVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.1 },
  }

  const overlayVariants = {
    rest: { 
      y: "100%", 
      opacity: 0,
      filter: "blur(4px)",
    },
    hover: { 
      y: "0%", 
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 28,
        mass: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const contentVariants = {
    rest: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
    },
    hover: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        mass: 0.5,
      },
    },
  }

  const buttonVariants_motion = {
    rest: { scale: 1, y: 0 },
    hover: shouldAnimate ? { 
      scale: 1.05, 
      y: -2,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25 
      }
    } : {},
    tap: shouldAnimate ? { scale: 0.95 } : {},
  }

  const favoriteVariants = {
    rest: { scale: 1, rotate: 0 },
    favorite: { 
      scale: [1, 1.3, 1], 
      rotate: [0, 10, -10, 0],
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    },
  }

  return (
    <motion.div
      data-slot="product-reveal-card"
      initial="rest"
      whileHover="hover"
      variants={containerVariants}
      className={cn(
        "relative w-80 rounded-2xl border border-border/50 bg-card text-card-foreground overflow-hidden",
        "shadow-lg shadow-black/5 cursor-pointer group",
        cardVariant === "compact" && "w-72",
        cardVariant === "minimal" && "border-0 shadow-none",
        className
      )}>
      
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <motion.img
          src={image}
          alt={name}
          className="h-56 w-full object-cover"
          variants={imageVariants}
          transition={{ type: "spring", stiffness: 300, damping: 30 }} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        
        {/* Favorite Button */}
        <motion.button
          onClick={handleFavorite}
          variants={favoriteVariants}
          animate={isFavorite ? "favorite" : "rest"}
          className={cn(
            "absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm border border-white/20",
            isFavorite 
              ? "bg-red-500 text-white" 
              : "bg-white/20 text-white hover:bg-white/30"
          )}>
          <Heart className={cn("w-4 h-4", isFavorite && "fill-current")} />
        </motion.button>

        {/* Discount Badge */}
        {discountPercentage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            {discountPercentage}% OFF
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn("w-4 h-4", i < Math.floor(rating) 
                  ? "text-yellow-400 fill-current" 
                  : "text-muted-foreground")} 
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {rating} ({reviewCount} reviews)
          </span>
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <motion.h3
            className="text-xl font-bold leading-tight tracking-tight"
            initial={{ opacity: 0.9 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}>
            {name}
          </motion.h3>
          
          <div className="flex items-center gap-2">
            <span className={`text-2xl font-bold text-${primaryColor}`}>{price}</span>
            {originalPrice && (
              <span className="text-lg text-muted-foreground line-through">
                {originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Reveal Overlay */}
      <motion.div
        variants={overlayVariants}
        className="absolute inset-0 bg-background/96 backdrop-blur-xl flex flex-col justify-end">
        <div className="p-6 space-y-4">
          {/* Product Description */}
          <motion.div variants={contentVariants}>
            <h4 className="font-semibold mb-2">Product Details</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* Features */}
          {showFeatures && features && features.length > 0 && (
            <motion.div variants={contentVariants}>
              <div className="grid grid-cols-2 gap-3 text-xs">
                {features.map((feature, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-2 text-center">
                    <div className="font-semibold">{feature.title}</div>
                    <div className="text-muted-foreground">{feature.subtitle}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div variants={contentVariants} className="space-y-3">
            <motion.button
              onClick={handleAddToCart}
              variants={buttonVariants_motion}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full h-12 font-medium",
                `bg-gradient-to-r from-${primaryColor} to-${primaryColor}/90`,
                `hover:from-${primaryColor}/90 hover:to-${primaryColor}`,
                `shadow-lg shadow-${primaryColor}/25`
              )}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              {addToCartText}
            </motion.button>
            
            <motion.button
              onClick={handleViewDetails}
              variants={buttonVariants_motion}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              className={cn(buttonVariants({ variant: "outline" }), "w-full h-10 font-medium")}>
              {viewDetailsText}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
