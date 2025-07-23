import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Wearvio",
  description: "Your ecommerce store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
