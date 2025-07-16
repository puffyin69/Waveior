"use client";
import Nav from "@/components/nav";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const Hero = () => {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["Connect", "Collaborate", "Communicate", "Convene", "Create"],
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
    <>
      <div className="sticky top-0 z-50">
        <Nav />
      </div>

      <div className="relative flex h-[40rem] w-full items-center justify-center bg-transparent my-4">
        <div
          className={cn(
            "absolute inset-0 pointer-events-none z-0",
            "[background-size:120px_120px]",
            "[background-image:linear-gradient(to_right,rgba(0,0,0,0.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.18)_1px,transparent_1px)]",
            "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.22)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.22)_1px,transparent_1px)]"
          )}
          style={{
            WebkitMaskImage:
              "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 20%, transparent 60%)",
            maskImage:
              "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 20%, transparent 60%)",
          }}
        />
        <div className="relative min-h-[500px] flex items-center justify-center w-full">
          <div className="container mx-auto flex gap-8 py-20 lg:py-40 items-center justify-center flex-col relative z-10">
            <div className="flex gap-4 flex-col">
              <h1
                className={`text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-extralight text-black ${outfit.className}`}
              >
                <span
                  className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1"
                  style={{ minHeight: "80px" }}
                >
                  &nbsp;
                  {titles.map((title, index) => (
                    <motion.span
                      key={index}
                      className={`absolute left-0 right-0 font-semibold ${outfit.className}`}
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
              </h1>
              <p
                className={`text-lg md:text-xl leading-relaxed tracking-tight max-w-2xl text-center text-black ${outfit.className}`}
              >
                Everything you need — nothing you don’t. Curated with
                simplicity, designed for ease, built for modern shopping.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
