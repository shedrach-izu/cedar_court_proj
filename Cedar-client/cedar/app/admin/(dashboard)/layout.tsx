"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

import {
  LayoutDashboard,
  Calendar,
  BedDouble,
  UtensilsCrossed,
  ChefHat,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Images
} from "lucide-react";

import CedarLogo from "@/component/user/CedarLogo";

const navItems = [
  {
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/admin/bookings",
    icon: Calendar,
    label: "Bookings",
  },
  {
    href: "/admin/apartments",
    icon: BedDouble,
    label: "Apartments",
  },
  {
    href: "/admin/orders",
    icon: UtensilsCrossed,
    label: "Orders",
  },
  {
    href: "/admin/menu",
    icon: ChefHat,
    label: "Menu",
  },
  {
    href: "/admin/reviews",
    icon: MessageSquare,
    label: "Reviews",
  },{
    href: "/admin/gallery",
    icon: Images,
    label: "Gallery",
  },
  {
    href: "/admin/settings",
    icon: Settings,
    label: "Settings",
  },
];

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const { authUser, loading, isAdmin } = useAuth();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (!authUser) {
        router.replace("/");
        return;
    }

    if (!isAdmin) {
        router.replace("/");
    }
  }, [loading, authUser, isAdmin, router]);

  // Get the current page name from the URL
  const currentPage =
    navItems.find((item) => pathname.startsWith(item.href))?.label ??
    "Dashboard";

  const handleLogout = () => {
    // We'll connect this to the real admin authentication later.
    console.log("Admin logout");

    router.push("/admin/login");
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-[#0c0a08] text-[#ede4d4] flex items-center justify-center">
        Checking access...
        </div>
    );
  }

  if (!authUser || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#ede4d4]">

      {/* ========================================= */}
      {/* MOBILE SIDEBAR OVERLAY */}
      {/* ========================================= */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ========================================= */}
      {/* SIDEBAR */}
      {/* ========================================= */}

    <aside
            className={`
                fixed top-0 left-0 bottom-0 w-60
                bg-[#0a0806]
                border-r border-[rgba(196,149,74,0.1)]
                z-40 flex flex-col
                transition-transform duration-300

                ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

                lg:translate-x-0
            `}
        >

        {/* ========================================= */}
        {/* SIDEBAR HEADER */}
        {/* ========================================= */}

        <div className="h-14 px-5 border-b border-[rgba(196,149,74,0.1)] flex items-center justify-between">

          <CedarLogo size="sm" />

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="
              lg:hidden
              text-[#8a7d6a]
              hover:text-[#ede4d4]
              transition-colors
            "
          >
            <X size={17} />
          </button>

        </div>

        {/* ========================================= */}
        {/* NAVIGATION */}
        {/* ========================================= */}

        <div className="flex-1 overflow-y-auto py-5">

          {/* Section label */}

          <div className="px-3 mb-3">
            <span
              className="
                px-2
                text-[9px]
                font-['DM_Mono']
                text-[#8a7d6a]/50
                tracking-[0.2em]
                uppercase
              "
            >
              Management
            </span>
          </div>

          {/* Navigation items */}

          <nav>
            {navItems.map((item) => {
              const Icon = item.icon;

              const isActive =
                pathname === item.href ||
                (item.href !== "/admin/dashboard" &&
                  pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    w-full
                    flex
                    items-center
                    gap-3
                    px-5
                    py-3
                    text-sm
                    font-['Jost']
                    transition-all

                    ${
                      isActive
                        ? `
                          text-[#c4954a]
                          bg-[rgba(196,149,74,0.06)]
                          border-l-2
                          border-[#c4954a]
                        `
                        : `
                          text-[#8a7d6a]
                          border-l-2
                          border-transparent
                          hover:text-[#ede4d4]
                          hover:bg-[rgba(196,149,74,0.04)]
                        `
                    }
                  `}
                >
                  <Icon size={15} strokeWidth={1.7} />

                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ========================================= */}
        {/* SIDEBAR FOOTER */}
        {/* ========================================= */}

        <div className="p-4 border-t border-[rgba(196,149,74,0.1)]">

          <button
            type="button"
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-3
              py-2.5
              text-sm
              font-['Jost']
              text-red-400/70
              hover:text-red-400
              transition-colors
            "
          >
            <LogOut size={15} strokeWidth={1.7} />

            <span>Sign Out</span>
          </button>

        </div>
      </aside>

      {/* ========================================= */}
      {/* MAIN AREA */}
      {/* ========================================= */}

      <div className="min-h-screen lg:pl-60 flex flex-col min-w-0">

        {/* ========================================= */}
        {/* TOP HEADER */}
        {/* ========================================= */}

        <header
          className="
            h-14
            bg-[#0a0806]
            border-b
            border-[rgba(196,149,74,0.1)]
            flex
            items-center
            px-4
            sm:px-6
            gap-3
          "
        >

          {/* Mobile menu button */}

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="
              lg:hidden
              w-8
              h-8
              flex
              items-center
              justify-center
              text-[#8a7d6a]
              hover:text-[#c4954a]
              transition-colors
            "
          >
            <Menu size={18} />
          </button>

          {/* Page title */}

          <div className="flex-1">

            <h1
              className="
                text-sm
                font-['Fraunces']
                text-[#ede4d4]
              "
            >
              {currentPage}
            </h1>

          </div>

          {/* Admin profile */}

          <div className="flex items-center gap-2">

            <div
              className="
                w-7
                h-7
                bg-[rgba(196,149,74,0.15)]
                border
                border-[rgba(196,149,74,0.3)]
                flex
                items-center
                justify-center
              "
            >
              <span
                className="
                  text-[10px]
                  font-['DM_Mono']
                  text-[#c4954a]
                "
              >
                AD
              </span>
            </div>

            <span
              className="
                text-xs
                font-['DM_Mono']
                text-[#8a7d6a]
                hidden
                sm:block
              "
            >
              Admin
            </span>

          </div>
        </header>

        {/* ========================================= */}
        {/* PAGE CONTENT */}
        {/* ========================================= */}

        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>

      </div>
    </div>
  );
}