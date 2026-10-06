"use client";

import Navbar from "@/component/user/Navbar";
import Footer from "@/component/user/Footer";
import CartSlide from "@/component/user/CartSlide";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <CartProvider>

        <Navbar />

        <CartSlide />

        <main>
          {children}
        </main>

        <Footer />

      </CartProvider>
    </AuthProvider>
  );
}