"use client";
import { Card } from "./ui/card";
import { Outfit } from "next/font/google";
// Import issue - commenting out for now
// import CardDemo from "@/components/cards";
import { Car } from "lucide-react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const Product = () => {
  // Event handlers for the cards
  const handleAddToCart = (product) => {
    console.log("Added to cart:", product);
  };

  const handleFavorite = (product) => {
    console.log("Favorited:", product);
  };

  const handleViewDetails = (product) => {
    console.log("View details:", product);
  };

  return (
    <div className={`${outfit.className} bg-gray-50 py-16`} id="products">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 underline">
          Featured Products
        </h1> 

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 xl:gap-12 place-items-center mx-auto max-w-7xl">
          <Card
            title="Aesthetic Top"
            description="This black top features a clean, simple silhouette. Think a perfectly draped, matte black fabric that subtly flatters, perhaps with a high neck or a single, interesting detail."
            Actualimg={
              "https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            overlayimg={
              "https://images.unsplash.com/photo-1541519481457-763224276691?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
          />
          <Card
            title="Earth-Toned Utility Jacket "
            description="Crafted for the modern explorer. This earth-toned utility jacket combines rugged design with everyday wearability."
            Actualimg={
              "https://images.unsplash.com/photo-1601929313684-da2b6db5f277?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            overlayimg={
              "https://images.unsplash.com/photo-1606913852449-8ebf553565cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmFzaGlvbiUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D"
            }
          />
          <Card
            title="Monochrome Edge – The Statement Look"
            description="Bold. Effortless. Unapologetic.
              This look fuses clean lines with strong attitude.
              with everyday wearability "
            Actualimg={
              "https://images.unsplash.com/photo-1555069519-127aadedf1ee?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGZhc2hpb24lMjBtYW58ZW58MHx8MHx8fDA%3D"
            }
            overlayimg={
              "https://plus.unsplash.com/premium_photo-1673734625279-2738ecf66fa1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZhc2hpb24lMjBtYW58ZW58MHx8MHx8fDA%3D"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Product;

//
