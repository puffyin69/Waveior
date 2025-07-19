"use client";
import Nav from "@/components/nav";
import { useEffect } from "react";
import Hero from "@/components/Hero";
import Product from "@/components/Product";
import Checkout from "@/components/Checkout";
import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    let smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
    });

    // Clean up on unmount
    return () => {
      smoother.kill();
    };
  }, []);

  return (
    <main className="smooth-wrapper" id="smooth-wrapper">
       <div className="sticky top-0 z-50">
        <Nav />
      </div>
      <div className="main-section" id="smooth-content">
        <Hero />
        <Product />
      </div>

      {/* <Checkout /> */}
    </main>
  );
}
