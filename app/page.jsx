"use client";
import Nav from "@/components/nav";
import { useEffect } from "react";
import Hero from "@/components/Hero";
import Product from "@/components/Product";

import gsap from "gsap";
import { ScrollTrigger, ScrollSmoother } from "gsap/all";
import Aboutus from "@/components/Aboutus";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";



export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    
    // Create smooth scrolling with minimal configuration
    let smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 0.5,
      normalizeScroll: true,
    });

    // Clean up on unmount
    return () => {
      if (smoother) smoother.kill();
    };
  }, []);




  return (
    <>
    <div id="smooth-wrapper">
      <div className="sticky top-0 z-50">
        <Nav />
      </div>
      <div id="smooth-content">
        <Hero />
        <Product />
        <Aboutus />
        <Contact />
        <Footer />
        <div className=" h-4">
          <h1></h1>
        </div>
      </div>
      

      {/* <Checkout /> */}
    </div>
    </>
    
  );
}
