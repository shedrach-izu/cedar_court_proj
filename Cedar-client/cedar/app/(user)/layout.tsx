'use client';

import Navbar from "@/component/user/Navbar";
import Footer from "@/component/user/Footer";
import { useState } from "react";


export default function UserLayout({ children }: { children: React.ReactNode }) {
  const [page, setPage] = useState("home");
  
  return (
    <>
      <Navbar page={page} setPage={setPage} />

      <main>{children}</main>

      <Footer />
    </>
  );
}