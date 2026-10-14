// "use client";

// import { ReactNode, useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { useAuth } from "@/context/AuthContext";

// import {
//   LayoutDashboard,
//   Calendar,
//   BedDouble,
//   UtensilsCrossed,
//   ChefHat,
//   MessageSquare,
//   Settings,
//   LogOut,
//   Menu,
//   X,
//   Images,
//   Mail
// } from "lucide-react";

// import CedarLogo from "@/component/user/CedarLogo";

// const navItems = [
//   {
//     href: "/admin/dashboard",
//     icon: LayoutDashboard,
//     label: "Dashboard",
//   },
//   {
//     href: "/admin/bookings",
//     icon: Calendar,
//     label: "Bookings",
//   },
//   {
//     href: "/admin/apartments",
//     icon: BedDouble,
//     label: "Apartments",
//   },
//   {
//     href: "/admin/orders",
//     icon: UtensilsCrossed,
//     label: "Orders",
//   },
//   {
//     href: "/admin/menu",
//     icon: ChefHat,
//     label: "Menu",
//   },
//   {
//     href: "/admin/reviews",
//     icon: MessageSquare,
//     label: "Reviews",
//   },
//   {
//     href: "/admin/gallery",
//     icon: Images,
//     label: "Gallery",
//   },
//   {
//     href: "/admin/messages",
//     icon: Mail,
//     label: "Messages",
//   },
//   {
//     href: "/admin/settings",
//     icon: Settings,
//     label: "Settings",
//   },
// ];

// export default function AdminLayout({
//   children,
// }: {
//   children: ReactNode;
// }) {
//   const pathname = usePathname();
//   const { authUser, loading, isAdmin, logout } = useAuth();
// const router = useRouter();

// const [sidebarOpen, setSidebarOpen] = useState(false);
// const [loggingOut, setLoggingOut] = useState(false);

// useEffect(() => {
//   if (loading) return;

//   if (!authUser) {
//     router.replace("/admin/login");
//     return;
//   }

//   if (authUser.role !== "admin") {
//     router.replace("/");
//   }
// }, [loading, authUser, router]);

// const handleLogout = async () => {
//   if (loggingOut) return;

//   try {
//     setLoggingOut(true);
//     await logout();
//     router.replace("/admin/login");
//   } catch (error) {
//     console.error("Admin logout failed:", error);
//   } finally {
//     setLoggingOut(false);
//   }
// };
// //   const { authUser, loading, isAdmin } = useAuth();
// //   const router = useRouter();

// //   const [sidebarOpen, setSidebarOpen] = useState(false);

// //   useEffect(() => {
// //     if (loading) return;

// //     if (!authUser) {
// //         router.replace("/");
// //         return;
// //     }

// //     if (!isAdmin) {
// //         router.replace("/");
// //     }
// //   }, [loading, authUser, isAdmin, router]);

// //   // Get the current page name from the URL
// const currentPage =
// navItems.find((item) => pathname === item.href)?.label ??
// navItems.find((item) => pathname.startsWith(`${item.href}/`))?.label ??"Dashboard";


// if (loading) {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0c0a08] text-[#ede4d4]">
//       Checking access...
//     </div>
//   );
// }

// if (!authUser || authUser.role !== "admin") {
//   return null;
// }

// //   if (loading) {
// //     return (
// //         <div className="min-h-screen bg-[#0c0a08] text-[#ede4d4] flex items-center justify-center">
// //         Checking access...
// //         </div>
// //     );
// //   }

// //   if (!authUser || !isAdmin) {
// //     return null;
// //   }

//   return (
//     <div className="min-h-screen bg-[#0c0a08] text-[#ede4d4]">

//       {/* ========================================= */}
//       {/* MOBILE SIDEBAR OVERLAY */}
//       {/* ========================================= */}

//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 z-30 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* ========================================= */}
//       {/* SIDEBAR */}
//       {/* ========================================= */}

//     <aside
//             className={`
//                 fixed top-0 left-0 bottom-0 w-60
//                 bg-[#0a0806]
//                 border-r border-[rgba(196,149,74,0.1)]
//                 z-40 flex flex-col
//                 transition-transform duration-300

//                 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

//                 lg:translate-x-0
//             `}
//         >

//         {/* ========================================= */}
//         {/* SIDEBAR HEADER */}
//         {/* ========================================= */}

//         <div className="h-14 px-5 border-b border-[rgba(196,149,74,0.1)] flex items-center justify-between">

//           <CedarLogo size="sm" />

//           <button
//             type="button"
//             onClick={() => setSidebarOpen(false)}
//             className="
//               lg:hidden
//               text-[#8a7d6a]
//               hover:text-[#ede4d4]
//               transition-colors
//             "
//           >
//             <X size={17} />
//           </button>

//         </div>

//         {/* ========================================= */}
//         {/* NAVIGATION */}
//         {/* ========================================= */}

//         <div className="flex-1 overflow-y-auto py-5">

//           {/* Section label */}

//           <div className="px-3 mb-3">
//             <span
//               className="
//                 px-2
//                 text-[9px]
//                 font-['DM_Mono']
//                 text-[#8a7d6a]/50
//                 tracking-[0.2em]
//                 uppercase
//               "
//             >
//               Management
//             </span>
//           </div>

//           {/* Navigation items */}

//           <nav>
//             {navItems.map((item) => {
//               const Icon = item.icon;

//               const isActive =
//                 pathname === item.href ||
//                 (item.href !== "/admin/dashboard" &&
//                   pathname.startsWith(`${item.href}/`));

//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   onClick={() => setSidebarOpen(false)}
//                   className={`
//                     w-full
//                     flex
//                     items-center
//                     gap-3
//                     px-5
//                     py-3
//                     text-sm
//                     font-['Jost']
//                     transition-all

//                     ${
//                       isActive
//                         ? `
//                           text-[#c4954a]
//                           bg-[rgba(196,149,74,0.06)]
//                           border-l-2
//                           border-[#c4954a]
//                         `
//                         : `
//                           text-[#8a7d6a]
//                           border-l-2
//                           border-transparent
//                           hover:text-[#ede4d4]
//                           hover:bg-[rgba(196,149,74,0.04)]
//                         `
//                     }
//                   `}
//                 >
//                   <Icon size={15} strokeWidth={1.7} />

//                   <span>{item.label}</span>
//                 </Link>
//               );
//             })}
//           </nav>
//         </div>

//         {/* ========================================= */}
//         {/* SIDEBAR FOOTER */}
//         {/* ========================================= */}

//         <div className="p-4 border-t border-[rgba(196,149,74,0.1)]">

//           <button
//             type="button"
//             onClick={handleLogout}
//             className="
//               w-full
//               flex
//               items-center
//               gap-3
//               px-3
//               py-2.5
//               text-sm
//               font-['Jost']
//               text-red-400/70
//               hover:text-red-400
//               transition-colors
//             "
//           >
//             <LogOut size={15} strokeWidth={1.7} />

//             <span>Sign Out</span>
//           </button>

//         </div>
//       </aside>

//       {/* ========================================= */}
//       {/* MAIN AREA */}
//       {/* ========================================= */}

//       <div className="min-h-screen lg:pl-60 flex flex-col min-w-0">

//         {/* ========================================= */}
//         {/* TOP HEADER */}
//         {/* ========================================= */}

//         <header
//           className="
//             h-14
//             bg-[#0a0806]
//             border-b
//             border-[rgba(196,149,74,0.1)]
//             flex
//             items-center
//             px-4
//             sm:px-6
//             gap-3
//           "
//         >

//           {/* Mobile menu button */}

//           <button
//             type="button"
//             onClick={() => setSidebarOpen(true)}
//             className="
//               lg:hidden
//               w-8
//               h-8
//               flex
//               items-center
//               justify-center
//               text-[#8a7d6a]
//               hover:text-[#c4954a]
//               transition-colors
//             "
//           >
//             <Menu size={18} />
//           </button>

//           {/* Page title */}

//           <div className="flex-1">

//             <h1
//               className="
//                 text-sm
//                 font-['Fraunces']
//                 text-[#ede4d4]
//               "
//             >
//               {currentPage}
//             </h1>

//           </div>

//           {/* Admin profile */}

//           <div className="flex items-center gap-2">

//             <div
//               className="
//                 w-7
//                 h-7
//                 bg-[rgba(196,149,74,0.15)]
//                 border
//                 border-[rgba(196,149,74,0.3)]
//                 flex
//                 items-center
//                 justify-center
//               "
//             >
//               <span
//                 className="
//                   text-[10px]
//                   font-['DM_Mono']
//                   text-[#c4954a]
//                 "
//               >
//                 AD
//               </span>
//             </div>

//             <span
//               className="
//                 text-xs
//                 font-['DM_Mono']
//                 text-[#8a7d6a]
//                 hidden
//                 sm:block
//               "
//             >
//               Admin
//             </span>

//           </div>
//         </header>

//         {/* ========================================= */}
//         {/* PAGE CONTENT */}
//         {/* ========================================= */}

//         <main className="flex-1 p-4 sm:p-6 overflow-auto">
//           {children}
//         </main>

//       </div>
//     </div>
//   );
// }









"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

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
  Images,
  Mail,
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
  },
  {
    href: "/admin/gallery",
    icon: Images,
    label: "Gallery",
  },
  {
    href: "/admin/messages",
    icon: Mail,
    label: "Messages",
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
  const router = useRouter();

  const { authUser, loading, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);


  // =========================================
  // CURRENT PAGE TITLE
  // =========================================

  const currentPage =
    navItems.find((item) => pathname === item.href)?.label ??
    navItems.find((item) =>
      pathname.startsWith(`${item.href}/`)
    )?.label ??
    "Dashboard";

  // =========================================
  // LOGOUT
  // =========================================

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      await logout();
    } catch (error) {
      console.error("Admin logout failed:", error);
    } finally {
      // Always leave the admin area after a logout attempt.
      router.replace("/admin/login");
    }
  };

  // =========================================
  // LOADING STATE
  // =========================================

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-[#0c0a08] text-[#ede4d4]">
//         <div className="text-center">
//           <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[rgba(196,149,74,0.2)] border-t-[#c4954a]" />

//           <p className="font-['DM_Mono'] text-[10px] uppercase tracking-[0.2em] text-[#8a7d6a]">
//             Checking access...
//           </p>
//         </div>
//       </div>
//     );
//   }


useEffect(() => {
  if (loading) return;

  if (!authUser) {
    router.replace("/admin/login");
    return;
  }

  if (authUser.role !== "admin") {
    router.replace("/");
  }
}, [loading, authUser, router]);

if (loading) {
  return (
    <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#c4954a]/20 border-t-[#c4954a]" />
        <p className="mt-4 font-['DM_Mono'] text-xs uppercase tracking-widest text-[#8a7d6a]">
          Checking access...
        </p>
      </div>
    </div>
  );
}

// if (!authUser || authUser.role !== "admin") {
//   return null;
// }

//   // Don't render protected content for non-admin users.
//   if (!authUser || authUser.role !== "admin") {
//     return null;
//   }

  // =========================================
  // ADMIN LAYOUT
  // =========================================

  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#ede4d4]">
      {/* MOBILE SIDEBAR OVERLAY */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-40
          flex w-60 flex-col
          border-r border-[rgba(196,149,74,0.1)]
          bg-[#0a0806]
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex h-14 items-center justify-between border-b border-[rgba(196,149,74,0.1)] px-5">
          <CedarLogo size="sm" />

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
            className="text-[#8a7d6a] transition-colors hover:text-[#ede4d4] lg:hidden"
          >
            <X size={17} />
          </button>
        </div>

        {/* NAVIGATION */}
        <div className="flex-1 overflow-y-auto py-5">
          <div className="mb-3 px-3">
            <span className="px-2 font-['DM_Mono'] text-[9px] uppercase tracking-[0.2em] text-[#8a7d6a]/50">
              Management
            </span>
          </div>

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
                  aria-current={isActive ? "page" : undefined}
                  className={`
                    flex w-full items-center gap-3
                    border-l-2 px-5 py-3
                    font-['Jost'] text-sm
                    transition-all
                    ${
                      isActive
                        ? "border-[#c4954a] bg-[rgba(196,149,74,0.06)] text-[#c4954a]"
                        : "border-transparent text-[#8a7d6a] hover:bg-[rgba(196,149,74,0.04)] hover:text-[#ede4d4]"
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

        {/* SIDEBAR FOOTER */}
        <div className="border-t border-[rgba(196,149,74,0.1)] p-4">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="
              flex w-full items-center gap-3
              px-3 py-2.5
              font-['Jost'] text-sm
              text-red-400/70
              transition-colors
              hover:text-red-400
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <LogOut size={15} strokeWidth={1.7} />

            <span>
              {loggingOut ? "Signing out..." : "Sign Out"}
            </span>
          </button>
        </div>
      </aside>

      {/* MAIN AREA */}
      <div className="flex min-h-screen min-w-0 flex-col lg:pl-60">
        {/* TOP HEADER */}
        <header
          className="
            flex h-14 items-center gap-3
            border-b border-[rgba(196,149,74,0.1)]
            bg-[#0a0806] px-4 sm:px-6
          "
        >
          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
            className="flex h-8 w-8 items-center justify-center text-[#8a7d6a] transition-colors hover:text-[#c4954a] lg:hidden"
          >
            <Menu size={18} />
          </button>

          {/* PAGE TITLE */}
          <div className="flex-1">
            <h1 className="font-['Fraunces'] text-sm text-[#ede4d4]">
              {currentPage}
            </h1>
          </div>

          {/* ADMIN PROFILE */}
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center border border-[rgba(196,149,74,0.3)] bg-[rgba(196,149,74,0.15)]">
              <span className="font-['DM_Mono'] text-[10px] text-[#c4954a]">
                AD
              </span>
            </div>

            <span className="hidden font-['DM_Mono'] text-xs text-[#8a7d6a] sm:block">
              {authUser.name || "Admin"}
            </span>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="min-w-0 flex-1 overflow-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}