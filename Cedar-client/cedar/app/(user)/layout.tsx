// "use client";

// import Navbar from "@/component/user/Navbar";
// import Footer from "@/component/user/Footer";
// import CartSlide from "@/component/user/CartSlide";

// import { AuthProvider } from "@/context/AuthContext";
// import { CartProvider } from "@/context/CartContext";

// export default function UserLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <AuthProvider>
//       <CartProvider>

//         <Navbar />

//         <CartSlide />

//         <main>
//           {children}
//         </main>

//         <Footer />

//       </CartProvider>
//     </AuthProvider>
//   );
// }





"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

import Navbar from "@/component/user/Navbar";
import Footer from "@/component/user/Footer";
import CartSlide from "@/component/user/CartSlide";

import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";

export default function UserLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const isAuthRecoveryPage =
    pathname === "/forgot-password" ||
    pathname.startsWith("/reset-password/");

  return (
    <AuthProvider>
      <CartProvider>
        {!isAuthRecoveryPage && <Navbar />}

        {!isAuthRecoveryPage && <CartSlide />}

        <main>{children}</main>

        {!isAuthRecoveryPage && <Footer />}
      </CartProvider>
    </AuthProvider>
  );
}