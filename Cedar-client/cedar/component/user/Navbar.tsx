"use client";

import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  Bell,
  User,
  Menu,
  X,
  UserCheck,
  Calendar,
  LogOut,
} from "lucide-react";

import CedarLogo from "@/component/user/CedarLogo";
import { toast } from "react-hot-toast";
import { navLinks } from "@/index";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/context/AuthContext";

import { useCart } from "@/context/CartContext";

import AuthModal from "@/component/user/AuthModal";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const dropRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  const isNavLinkActive = (href: string) => {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

  const { cartItems, setCartOpen } = useCart();

  const { authUser, logout } = useAuth();

  // =========================
  // CART COUNT
  // =========================

  const cartCount = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  // =========================
  // SCROLL
  // =========================

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // =========================
  // CLOSE DROPDOWN
  // =========================

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropRef.current &&
        !dropRef.current.contains(e.target as Node)
      ) {
        setUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const transparent = pathname === "/" && !scrolled;

  // =========================
  // CART
  // =========================

  const handleCartClick = () => {
    setCartOpen(true);
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = async () => {
    try {
      await logout();

      setUserDropdown(false);

      toast.success("Signed out successfully.");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to sign out.");
    }
  };

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        transparent
          ? "bg-transparent"
          : "bg-[#0c0a08]/95 backdrop-blur-md border-b border-[rgba(196,149,74,0.12)]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* =========================
            LOGO
        ========================= */}

        <Link href="/">
          <CedarLogo />
        </Link>

        {/* =========================
            DESKTOP NAVIGATION
        ========================= */}

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = isNavLinkActive(link.href);

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

        {/* =========================
            RIGHT SIDE
        ========================= */}

        <div className="flex items-center gap-1">

          {/* =========================
              CART
          ========================= */}

          <button
            onClick={handleCartClick}
            className="relative w-10 h-10 flex items-center justify-center text-[#ede4d4]/70 hover:text-[#c4954a] transition-colors"
            title="Your order"
          >
            <ShoppingCart size={20} />

            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#c4954a] text-[#0c0a08] text-[9px] font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* =========================
              NOTIFICATIONS
          ========================= */}

          <button
            className="relative w-10 h-10 flex items-center justify-center text-[#ede4d4]/70 hover:text-[#c4954a] transition-colors"
            title="Notifications"
          >
            <Bell size={20} />

            <span className="absolute top-2 right-2 w-2 h-2 bg-[#c4954a] rounded-full" />
          </button>

          {/* =========================
              USER
          ========================= */}

          <div
            className="relative"
            ref={dropRef}
          >
            <button 
              onClick={() => {
                if (!authUser) {
                  setAuthMode("login");
                  setAuthModalOpen(true);
                  return;
                }

                setUserDropdown((value) => !value);
              }}
              className="w-10 h-10 flex items-center justify-center text-[#ede4d4]/70 hover:text-[#c4954a] transition-colors"
              title={authUser ? authUser.name : "Sign in"}
            >
              {authUser ? ( 
                <div className="w-7 h-7 bg-[rgba(196,149,74,0.2)] border border-[rgba(196,149,74,0.4)] flex items-center justify-center"> 
                  <span className="text-[10px] font-['DM_Mono'] text-[#c4954a]"> 
                    {authUser.name?.[0]?.toUpperCase()} 
                  </span> 
                </div> 
              ) : ( 
                <User size={20} /> 
              )}
            </button>

            {/* =========================
                USER DROPDOWN
            ========================= */}

            {userDropdown && authUser && (
              <div className="absolute right-0 top-12 w-52 bg-[#161310] border border-[rgba(196,149,74,0.2)] z-50">

                <div className="px-4 py-3 border-b border-[rgba(196,149,74,0.1)]">

                  <p className="text-sm font-['Jost'] text-[#ede4d4]">
                    {authUser.name}
                  </p>

                  <p className="text-xs font-['DM_Mono'] text-[#8a7d6a] truncate">
                    {authUser.email}
                  </p>

                </div>

                <div className="py-1">

                  {/* Profile */}

                  <button
                    onClick={() => {
                      router.push("/profile");
                      setUserDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-[#8a7d6a] hover:text-[#c4954a] flex items-center gap-2"
                  >
                    <UserCheck size={13} />
                    My Profile
                  </button>

                  {/* Bookings */}

                  <button
                    onClick={() => {
                      router.push("/my-bookings");
                      setUserDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-[#8a7d6a] hover:text-[#c4954a] flex items-center gap-2"
                  >
                    <Calendar size={13} />
                    My Bookings
                  </button>

                  {/* Logout */}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400/80 hover:text-red-400 flex items-center gap-2"
                  >
                    <LogOut size={13} />
                    Sign Out
                  </button>

                </div>
              </div>
            )}
          </div>

          {/* =========================
              MOBILE MENU BUTTON
          ========================= */}

          <button
            className="lg:hidden w-10 h-10 flex items-center justify-center text-[#ede4d4]/70 hover:text-[#c4954a] ml-1"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X size={20} />
            ) : (
              <Menu size={20} />
            )}
          </button>

        </div>
      </div>

      {/* =========================
          MOBILE NAVIGATION
      ========================= */}

      {mobileOpen && (
        <div className="lg:hidden bg-[#0c0a08]/98 border-t border-[rgba(196,149,74,0.12)] px-6 py-3 flex flex-col">

          {navLinks.map((link) => {
            const isActive = isNavLinkActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-left py-3.5 text-sm font-['Jost'] border-b border-[rgba(196,149,74,0.08)] ${
                  isActive
                    ? "text-[#c4954a]"
                    : "text-[#ede4d4]/80"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {!authUser && (
            <button
              onClick={() => {
                router.push("/auth");
                setMobileOpen(false);
              }}
              className="text-left py-3.5 text-sm font-['Jost'] text-[#c4954a]"
            >
              Sign In
            </button>
          )}

        </div>
      )}
    </header>

    {authModalOpen && (
              <AuthModal
                mode={authMode}
                setMode={setAuthMode}
                onClose={() => {
                  setAuthModalOpen(false);
                }}
                onSuccess={() => setAuthModalOpen(false)}
              />
            )}
    </>
  );
}

export default Navbar;