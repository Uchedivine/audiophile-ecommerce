"use client";

import { Manrope } from "next/font/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { CartProvider } from "./context/CartContext";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-manrope",
});

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} antialiased bg-black font-sans`}>
        <ConvexProvider client={convex}>
          <CartProvider>
            {children}
          </CartProvider>
        </ConvexProvider>
      </body>
    </html>
  );
}