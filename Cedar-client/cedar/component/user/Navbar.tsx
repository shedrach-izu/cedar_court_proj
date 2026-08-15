'use client';

import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Bell, User, Menu, X, UserCheck, Calendar, LogOut } from "lucide-react";
import CedarLogo from "@/component/user/CedarLogo";
import { toast } from "react-hot-toast";
import { navLinks } from "@/index";
import { Jost } from "next/font/google";
import Link from "next/link";
import { usePathname } from "next/navigation";

const jost = Jost({
    variable: "--font-jost",
    subsets: ["latin"],
});




function Navbar({ page, setPage, cartCount, setCartOpen, authUser, setAuthModal, onLogout }: {
  page: string; setPage: (p: string) => void; cartCount: number;
  setCartOpen: (v: boolean) => void; authUser: any;
  setAuthModal: (m: "login" | "register") => void; onLogout: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (dropRef.current && !dropRef.current.contains(e.target as Node)) setUserDropdown(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);


  const transparent = page === "home" && !scrolled;
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${transparent ? "bg-transparent" : "bg-[#0c0a08]/95 backdrop-blur-md border-b border-[rgba(196,149,74,0.12)]"}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button onClick={() => setPage("home")}><CedarLogo /></button>
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  isActive
                    ? "text-[#c4954a] border-b border-[#c4954a]"
                    : "text-[#ede4d4] hover:text-[#c4954a]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1">
          <button onClick={() => setCartOpen(true)} className="relative w-10 h-10 flex items-center justify-center text-[#ede4d4]/70 hover:text-[#c4954a] transition-colors" title="Your order">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#c4954a] text-[#0c0a08] text-[9px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
          </button>
          <button className="relative w-10 h-10 flex items-center justify-center text-[#ede4d4]/70 hover:text-[#c4954a] transition-colors" title="Notifications">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#c4954a] rounded-full" />
          </button>
          <div className="relative" ref={dropRef}>
            <button onClick={() => { if (authUser) setUserDropdown(v => !v); else setAuthModal("login"); }} className="w-10 h-10 flex items-center justify-center text-[#ede4d4]/70 hover:text-[#c4954a] transition-colors" title={authUser ? authUser.firstName : "Sign in"}>
              {authUser ? (
                <div className="w-7 h-7 bg-[rgba(196,149,74,0.2)] border border-[rgba(196,149,74,0.4)] flex items-center justify-center">
                  <span className="text-[10px] font-['DM_Mono'] text-[#c4954a]">{authUser.firstName[0]}{authUser.lastName?.[0] ?? ""}</span>
                </div>
              ) : <User size={20} />}
            </button>
            {userDropdown && authUser && (
              <div className="absolute right-0 top-12 w-52 bg-[#161310] border border-[rgba(196,149,74,0.2)] z-50">
                <div className="px-4 py-3 border-b border-[rgba(196,149,74,0.1)]">
                  <p className="text-sm font-['Jost'] text-[#ede4d4]">{authUser.firstName} {authUser.lastName}</p>
                  <p className="text-xs font-['DM_Mono'] text-[#8a7d6a] truncate">{authUser.email}</p>
                </div>
                <div className="py-1">
                  <button onClick={() => { setPage("profile"); setUserDropdown(false); }} className="w-full text-left px-4 py-2 text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#c4954a] hover:bg-[rgba(196,149,74,0.05)] transition-colors flex items-center gap-2">
                    <UserCheck size={13} /> My Profile
                  </button>
                  <button onClick={() => { setPage("my-bookings"); setUserDropdown(false); }} className="w-full text-left px-4 py-2 text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#c4954a] hover:bg-[rgba(196,149,74,0.05)] transition-colors flex items-center gap-2">
                    <Calendar size={13} /> My Bookings
                  </button>
                  <button onClick={() => { onLogout(); setUserDropdown(false); toast.success("Signed out successfully."); }} className="w-full text-left px-4 py-2 text-sm font-['Jost'] text-red-400/80 hover:text-red-400 hover:bg-[rgba(196,149,74,0.05)] transition-colors flex items-center gap-2">
                    <LogOut size={13} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
          <button className="lg:hidden w-10 h-10 flex items-center justify-center text-[#ede4d4]/70 hover:text-[#c4954a] transition-colors ml-1" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden bg-[#0c0a08]/98 border-t border-[rgba(196,149,74,0.12)] px-6 py-3 flex flex-col">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-left py-3.5 text-sm font-['Jost'] border-b border-[rgba(196,149,74,0.08)] last:border-b-0 ${
                  isActive
                    ? "text-[#c4954a]"
                    : "text-[#ede4d4]/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {!authUser && <button onClick={() => { setAuthModal("login"); setMobileOpen(false); }} className="text-left py-3.5 text-sm font-['Jost'] text-[#c4954a]">Sign In</button>}
        </div>
      )}
    </header>
  );
}

export default Navbar;