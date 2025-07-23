"use client";
import { useState, useEffect } from "react";
import { Outfit, Poppins } from "next/font/google";
import { useSession, signIn, signOut } from "next-auth/react";
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

// Initialize fonts
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
    { name: "Products", link: "#products" },
    { name: "About Us", link: "#aboutus" },
    { name: "Contact", link: "#contact" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // ✅ Fix hydration
  
  // Get session data
  const { data: session, status } = useSession();

  // ✅ Fix hydration mismatch
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleSignIn = async () => {
    await signIn("google", { 
      callbackUrl: "http://localhost:3000" 
    });
  };

  const handleSignOut = async () => {
    await signOut({ 
      callbackUrl: "http://localhost:3000" 
    });
  };

  // ✅ Prevent hydration issues
  if (!hasMounted) {
    return (
      <div className="relative w-full">
        <Navbar>
          <NavBody className="hidden lg:flex justify-between items-center w-full">
            <NavbarLogo className={`${poppins.className} text-xl font-semibold`}>
              Wearvio
            </NavbarLogo>
            <div className="flex items-center">
              <NavItems items={navItems} className={`text-sm ${outfit.className}`} />
            </div>
            <div className="flex items-center gap-4">
              <Image src="/cart.png" alt="cart" width={22} height={22} />
              {/* Show consistent loading state */}
              <div className="w-20 h-9 bg-gray-200 animate-pulse rounded"></div>
            </div>
          </NavBody>
        </Navbar>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop navbar */}
        <NavBody className="hidden lg:flex justify-between items-center w-full">
          <NavbarLogo className={`${poppins.className} text-xl font-semibold`}>
            Wearvio
          </NavbarLogo>
          <div className="flex items-center">
            <NavItems items={navItems} className={`text-sm ${outfit.className}`} />
          </div>
          
          {/* Auth section */}
          <div className="flex items-center gap-4">
            <Image src="/cart.png" alt="cart" width={22} height={22} />
            
            {/* Show different content based on login status */}
            {status === "loading" ? (
              <div className="w-20 h-9 bg-gray-200 animate-pulse rounded"></div>
            ) : session ? (
              <div className="flex items-center gap-3">
                {session.user.image && (
                  <Image 
                    src={session.user.image} 
                    alt="Profile" 
                    width={32} 
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span className="text-sm">Hi, {session.user.name?.split(' ')[0]}</span>
                <NavbarButton 
                  onClick={handleSignOut}
                  variant="secondary"
                >
                  Sign Out
                </NavbarButton>
              </div>
            ) : (
              <NavbarButton 
                onClick={handleSignIn}
                variant="primary"
              >
                Sign In
              </NavbarButton>
            )}
          </div>
        </NavBody>

        {/* Mobile navbar */}
        <MobileNav className="rounded-lg shadow-lg">
          <MobileNavHeader>
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
            
            {/* Mobile auth section */}
            <div className="flex w-full flex-col gap-4 mt-6">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full"
              >
                View Cart
              </NavbarButton>
              
              {session ? (
                <NavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Sign Out
                </NavbarButton>
              ) : (
                <NavbarButton
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    handleSignIn();
                  }}
                  variant="primary"
                  className="w-full"
                >
                  Sign In
                </NavbarButton>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
};

export default Nav;
