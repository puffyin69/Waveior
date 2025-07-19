"use client";
import { useState } from "react";
import { Outfit, Poppins } from "next/font/google";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import Image from "next/image";

// Initialize fonts at module scope
const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const Nav = () => {
  const navItems = [
    {
      name: "Products",
      link: "#products",
    },
    {
      name: "About Us",
      link: "#aboutus",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop navbar  */}
        <NavBody className="hidden lg:flex justify-between items-center w-full">
          <NavbarLogo className={`${poppins.className} text-xl font-semibold`}>
            Wearvio
          </NavbarLogo>
          <div className="flex items-center">
            <NavItems items={navItems} className={`text-sm ${outfit.className}`} />
          </div>
          <div className="flex items-center gap-4">
            <Image src="/cart.png" alt="cart" width={22} height={22} />
            <NavbarButton variant="primary">Sign Up</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile navbar */}
        <MobileNav className="rounded-lg shadow-lg" >
          <MobileNavHeader >
            <NavbarLogo className={`${poppins.className} text-xl font-semibold`}>
              Wearvio
            </NavbarLogo>
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`relative text-black hover:text-gray-600 transition-colors duration-200 ${outfit.className}`}
              >
                <span className="block text-lg font-medium">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4 mt-6">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full"
              >
                View Cart
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Sign Up
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default Nav;
