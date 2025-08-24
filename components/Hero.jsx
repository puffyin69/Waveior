"use client";
import Nav from "@/components/nav";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Outfit } from "next/font/google";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const Hero = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Discover", "Browse", "Select", "Checkout", "Enjoy"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Background Grid Pattern */}
      <div
        className={cn(
          "absolute inset-0 pointer-events-none z-0",
          "[background-size:120px_120px]",
          "[background-image:linear-gradient(to_right,rgba(0,0,0,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.08)_1px,transparent_1px)]"
        )}
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 20%, transparent 70%)",
          maskImage:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 20%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-20">
         
          <div className="flex-1 space-y-8">
           
            <div className="flex flex-col gap-6">
              <h1
                className={`text-5xl md:text-6xl lg:text-7xl max-w-2xl tracking-tight font-bold text-gray-900 ${outfit.className}`}
              >
                <span
                  className="relative flex w-full overflow-hidden md:pb-4 md:pt-1"
                  style={{ minHeight: "90px" }}
                >
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className={`absolute left-0 right-0 font-bold ${outfit.className}`}
                      initial={{ opacity: 0, y: "-100%" }}
                      transition={{ type: "spring", stiffness: 50 }}
                      animate={
                        titleNumber === index
                          ? { y: 0, opacity: 1 }
                          : { y: titleNumber > index ? -150 : 150, opacity: 0 }
                      }
                      style={{ width: "100%" }}
                    >
                      {title}
                    </motion.span>
                  ))}
                </span>
                <span className="block mt-2">Premium Products</span>
              </h1>

              <p
                className={`text-lg md:text-xl leading-relaxed max-w-md text-gray-600 ${outfit.className}`}
              >
                Everything you need — nothing you don't. Curated with
                simplicity, designed for ease, built for modern shopping.
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <a
                  href="#products"
                  className={`inline-block px-8 py-4 bg-black text-white rounded-full font-medium text-lg transition-all hover:bg-gray-800 hover:shadow-lg ${outfit.className} hover:scale-105 transition-transform duration-150`}
                >
                  Shop the Collection
                </a>
              </div>

              {/* Scroll Indicator */}
              <div className="hidden md:flex items-center gap-2 text-gray-500 mt-12 animate-bounce">
                <ChevronDown size={20} />
                <span className="text-sm font-medium">Scroll to explore</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-br from-gray-200 to-white rounded-3xl blur opacity-30"></div>
              <Image
                src="/heroimg.png"
                alt="Hero image"
                width={600}
                height={700}
                priority
                className="rounded-3xl object-cover w-auto max-h-[600px] relative shadow-lg hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
