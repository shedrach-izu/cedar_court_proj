// "use client";

// import { useCallback, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import {
//   BedDouble,
//   UtensilsCrossed,
//   CalendarDays,
//   Clock,
//   Users,
//   ChevronRight,
//   X,
//   LoaderCircle,
//   RefreshCw,
// } from "lucide-react";
// import toast from "react-hot-toast";

// import { useAuth } from "@/context/AuthContext";
// import api from "@/lib/api";

// type Tab = "bookings" | "orders";

// type Apartment = {
//   _id?: string;
//   title?: string;
//   gallery?: { url?: string; type?: string }[];
//   price?: number;
// };

// type Booking = {
//   _id: string;
//   apartment?: Apartment | string;
//   checkIn: string;
//   checkOut: string;
//   guests: number;
//   nights?: number;
//   totalAmount?: number;
//   status: string;
//   paymentStatus?: string;
//   createdAt?: string;
// };

// type MenuItem = {
//   _id?: string;
//   title?: string;
//   image?: { url?: string } | string;
// };

// type OrderItem = {
//   menu?: MenuItem | string;
//   quantity: number;
//   price: number;
// };

// type Order = {
//   _id: string;
//   items: OrderItem[];
//   reservationDetails?: {
//     date?: string;
//     time?: string;
//     guests?: number;
//     fullName?: string;
//   };
//   orderStatus: string;
//   paymentInfo?: {
//     paymentStatus?: string;
//   };
//   totalPrice?: number;
//   createdAt?: string;
// };

// const money = (amount = 0) =>
//   new Intl.NumberFormat("en-US", {
//     style: "currency",
//     currency: "USD",
//     maximumFractionDigits: 2,
//   }).format(amount);

// const dateFormat = (date?: string) => {
//   if (!date) return "—";

//   const parsed = new Date(date);

//   if (Number.isNaN(parsed.getTime())) return "—";

//   return parsed.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const shortId = (id: string) => id.slice(-8).toUpperCase();

// function Status({ value }: { value?: string }) {
//   const status = (value || "pending").toLowerCase();

//   const color =
//     ["confirmed", "completed", "paid", "delivered"].includes(status)
//       ? "text-emerald-400 bg-emerald-400/10"
//       : ["cancelled", "canceled", "failed", "rejected"].includes(status)
//         ? "text-red-400 bg-red-400/10"
//         : "text-[#c4954a] bg-[#c4954a]/10";

//   return (
//     <span
//       className={`inline-flex rounded-full px-2.5 py-1 text-[10px] uppercase tracking-wider ${color}`}
//     >
//       {status}
//     </span>
//   );
// }

// function SectionLabel({ children }: { children: React.ReactNode }) {
//   return (
//     <p className="mb-3 font-['DM_Mono'] text-[10px] uppercase tracking-[0.25em] text-[#c4954a]">
//       {children}
//     </p>
//   );
// }

// export default function MyBookingsPage() {
//   const router = useRouter();
//   const { authUser } = useAuth();

//   const [tab, setTab] = useState<Tab>("bookings");
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [cancelingId, setCancelingId] = useState<string | null>(null);
//   const [error, setError] = useState("");

//   const account = authUser as
//     | { firstName?: string; name?: string }
//     | null
//     | undefined;

//   const firstName =
//     account?.firstName || account?.name?.trim().split(/\s+/)[0] || "Guest";

//   const fetchData = useCallback(async (isRefresh = false) => {
//     if (isRefresh) setRefreshing(true);
//     else setLoading(true);

//     setError("");

//     const [bookingResult, orderResult] = await Promise.allSettled([
//       api.get("/booking/my-bookings"),
//       api.get("/order/my-orders"),
//     ]);

//     let failed = false;

//     if (bookingResult.status === "fulfilled") {
//       setBookings(bookingResult.value.data?.bookings || []);
//     } else {
//       failed = true;
//       console.error("Could not fetch bookings:", bookingResult.reason);
//     }

//     if (orderResult.status === "fulfilled") {
//       setOrders(orderResult.value.data?.orders || []);
//     } else {
//       failed = true;
//       console.error("Could not fetch orders:", orderResult.reason);
//     }

//     if (failed) {
//       setError("Some information could not be loaded. Please try again.");
//     }

//     setLoading(false);
//     setRefreshing(false);
//   }, []);

//   useEffect(() => {
//     void fetchData();
//   }, [fetchData]);

//   const cancelBooking = async (booking: Booking) => {
//     if (
//       !window.confirm(
//         "Are you sure you want to cancel this booking?"
//       )
//     ) {
//       return;
//     }

//     setCancelingId(booking._id);

//     try {
//       await api.put(`/booking/${booking._id}/cancel`);

//       setBookings((current) =>
//         current.map((item) =>
//           item._id === booking._id
//             ? { ...item, status: "cancelled" }
//             : item
//         )
//       );

//       toast.success("Booking cancelled successfully.");
//     } catch (err) {
//       console.error("Booking cancellation failed:", err);
//       toast.error("Unable to cancel this booking.");
//     } finally {
//       setCancelingId(null);
//     }
//   };

//   const cancelOrder = async (order: Order) => {
//     if (
//       !window.confirm(
//         "Are you sure you want to cancel this restaurant order?"
//       )
//     ) {
//       return;
//     }

//     setCancelingId(order._id);

//     try {
//       await api.patch(`/order/${order._id}/cancel`);

//       setOrders((current) =>
//         current.map((item) =>
//           item._id === order._id
//             ? { ...item, orderStatus: "cancelled" }
//             : item
//         )
//       );

//       toast.success("Order cancelled successfully.");
//     } catch (err) {
//       console.error("Order cancellation failed:", err);
//       toast.error("Unable to cancel this order.");
//     } finally {
//       setCancelingId(null);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[#0c0a08] pt-20 text-[#ede4d4]">
//       {/* Page heading */}
//       <section className="border-b border-[#c4954a]/15 bg-[#161310]">
//         <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
//           <SectionLabel>My Account</SectionLabel>

//           <div className="flex flex-wrap items-end justify-between gap-5">
//             <div>
//               <h1 className="font-['Fraunces'] text-3xl sm:text-5xl">
//                 My{" "}
//                 <span className="italic text-[#c4954a]">
//                   Reservations
//                 </span>
//               </h1>

//               <p className="mt-3 text-sm text-[#8a7d6a]">
//                 Welcome back, {firstName}. Manage your stays and orders.
//               </p>
//             </div>

//             <button
//               onClick={() => void fetchData(true)}
//               disabled={refreshing || loading}
//               className="flex items-center gap-2 border border-[#c4954a]/25 px-4 py-2.5 text-xs uppercase tracking-widest text-[#c4954a] transition hover:bg-[#c4954a]/10 disabled:opacity-50"
//             >
//               <RefreshCw
//                 size={14}
//                 className={refreshing ? "animate-spin" : ""}
//               />
//               Refresh
//             </button>
//           </div>
//         </div>
//       </section>

//       <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 sm:py-12">
//         {/* Simple tabs */}
//         <div className="mb-8 flex border-b border-[#c4954a]/20">
//           <button
//             onClick={() => setTab("bookings")}
//             className={`flex items-center gap-2 border-b-2 px-5 py-4 text-xs uppercase tracking-[0.15em] transition ${
//               tab === "bookings"
//                 ? "border-[#c4954a] text-[#c4954a]"
//                 : "border-transparent text-[#8a7d6a] hover:text-[#ede4d4]"
//             }`}
//           >
//             <BedDouble size={15} />
//             Bookings
//             <span className="ml-1 text-[10px] opacity-70">
//               {bookings.length}
//             </span>
//           </button>

//           <button
//             onClick={() => setTab("orders")}
//             className={`flex items-center gap-2 border-b-2 px-5 py-4 text-xs uppercase tracking-[0.15em] transition ${
//               tab === "orders"
//                 ? "border-[#c4954a] text-[#c4954a]"
//                 : "border-transparent text-[#8a7d6a] hover:text-[#ede4d4]"
//             }`}
//           >
//             <UtensilsCrossed size={15} />
//             Orders
//             <span className="ml-1 text-[10px] opacity-70">
//               {orders.length}
//             </span>
//           </button>
//         </div>

//         {error && (
//           <div className="mb-5 flex items-center justify-between gap-4 border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-300">
//             <span>{error}</span>
//             <button
//               onClick={() => void fetchData(true)}
//               className="shrink-0 underline underline-offset-4"
//             >
//               Try again
//             </button>
//           </div>
//         )}

//         {loading ? (
//           <div className="flex min-h-56 items-center justify-center gap-3 text-sm text-[#8a7d6a]">
//             <LoaderCircle className="animate-spin" size={20} />
//             Loading your {tab}...
//           </div>
//         ) : tab === "bookings" ? (
//           <section>
//             {bookings.length === 0 ? (
//               <div className="py-16 text-center">
//                 <BedDouble
//                   size={32}
//                   strokeWidth={1}
//                   className="mx-auto mb-5 text-[#c4954a]/60"
//                 />
//                 <h2 className="font-['Fraunces'] text-2xl">
//                   No bookings yet
//                 </h2>
//                 <p className="mt-2 text-sm text-[#8a7d6a]">
//                   Your next comfortable stay is waiting for you.
//                 </p>
//                 <Link
//                   href="/apartments"
//                   className="mt-6 inline-flex items-center gap-2 bg-[#c4954a] px-5 py-3 text-xs uppercase tracking-widest text-[#0c0a08] transition hover:bg-[#d7ab65]"
//                 >
//                   Explore Our Rooms <ChevronRight size={15} />
//                 </Link>
//               </div>
//             ) : (
//               <div>
//                 <div className="hidden grid-cols-[1.3fr_1.5fr_0.8fr_0.8fr_auto] gap-4 border-b border-[#c4954a]/20 pb-3 text-[10px] uppercase tracking-[0.18em] text-[#8a7d6a] md:grid">
//                   <span>Reservation</span>
//                   <span>Stay</span>
//                   <span>Status</span>
//                   <span>Total</span>
//                   <span>Action</span>
//                 </div>

//                 <div className="divide-y divide-[#c4954a]/10">
//                   {bookings.map((booking) => {
//                     const apartment =
//                       typeof booking.apartment === "object"
//                         ? booking.apartment
//                         : undefined;

//                     const title = apartment?.title || "Apartment reservation";

//                     const canCancel = ![
//                       "cancelled",
//                       "canceled",
//                       "completed",
//                     ].includes((booking.status || "").toLowerCase());

//                     return (
//                       <article
//                         key={booking._id}
//                         className="grid gap-4 py-5 md:grid-cols-[1.3fr_1.5fr_0.8fr_0.8fr_auto] md:items-center md:gap-4"
//                       >
//                         <div>
//                           <p className="text-[10px] uppercase tracking-widest text-[#8a7d6a]">
//                             Reservation
//                           </p>
//                           <p className="mt-1 text-sm text-[#ede4d4]">
//                             #{shortId(booking._id)}
//                           </p>
//                           <p className="mt-1 text-xs text-[#8a7d6a]">
//                             {dateFormat(booking.createdAt)}
//                           </p>
//                         </div>

//                         <div>
//                           <p className="font-['Fraunces'] text-lg">
//                             {title}
//                           </p>
//                           <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#8a7d6a]">
//                             <span className="flex items-center gap-1.5">
//                               <CalendarDays size={13} />
//                               {dateFormat(booking.checkIn)} –{" "}
//                               {dateFormat(booking.checkOut)}
//                             </span>
//                             <span className="flex items-center gap-1.5">
//                               <Users size={13} />
//                               {booking.guests} guests
//                             </span>
//                           </div>
//                         </div>

//                         <div className="flex flex-wrap items-center gap-2 md:block">
//                           <Status value={booking.status} />
//                           {booking.paymentStatus && (
//                             <p className="mt-1 text-[10px] text-[#8a7d6a]">
//                               Payment: {booking.paymentStatus}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <p className="text-[10px] uppercase tracking-widest text-[#8a7d6a] md:hidden">
//                             Total
//                           </p>
//                           <p className="font-['Fraunces'] text-lg text-[#c4954a]">
//                             {money(booking.totalAmount)}
//                           </p>
//                         </div>

//                         <div className="flex items-center gap-3 md:justify-end">
//                           {canCancel && (
//                             <button
//                               onClick={() => void cancelBooking(booking)}
//                               disabled={cancelingId === booking._id}
//                               title="Cancel booking"
//                               className="flex items-center gap-1.5 text-xs text-[#8a7d6a] transition hover:text-red-400 disabled:opacity-50"
//                             >
//                               {cancelingId === booking._id ? (
//                                 <LoaderCircle
//                                   size={14}
//                                   className="animate-spin"
//                                 />
//                               ) : (
//                                 <X size={14} />
//                               )}
//                               Cancel
//                             </button>
//                           )}
//                         </div>
//                       </article>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </section>
//         ) : (
//           <section>
//             {orders.length === 0 ? (
//               <div className="py-16 text-center">
//                 <UtensilsCrossed
//                   size={32}
//                   strokeWidth={1}
//                   className="mx-auto mb-5 text-[#c4954a]/60"
//                 />
//                 <h2 className="font-['Fraunces'] text-2xl">
//                   No restaurant orders yet
//                 </h2>
//                 <p className="mt-2 text-sm text-[#8a7d6a]">
//                   Your favourite dishes will appear here after you order.
//                 </p>
//                 <Link
//                   href="/menu"
//                   className="mt-6 inline-flex items-center gap-2 bg-[#c4954a] px-5 py-3 text-xs uppercase tracking-widest text-[#0c0a08] transition hover:bg-[#d7ab65]"
//                 >
//                   Browse Our Menu <ChevronRight size={15} />
//                 </Link>
//               </div>
//             ) : (
//               <div>
//                 <div className="hidden grid-cols-[1.1fr_1.6fr_0.8fr_0.8fr_auto] gap-4 border-b border-[#c4954a]/20 pb-3 text-[10px] uppercase tracking-[0.18em] text-[#8a7d6a] md:grid">
//                   <span>Order</span>
//                   <span>Items</span>
//                   <span>Status</span>
//                   <span>Total</span>
//                   <span>Action</span>
//                 </div>

//                 <div className="divide-y divide-[#c4954a]/10">
//                   {orders.map((order) => {
//                     const canCancel = ![
//                       "cancelled",
//                       "canceled",
//                       "completed",
//                       "delivered",
//                     ].includes((order.orderStatus || "").toLowerCase());

//                     const itemSummary = (order.items || [])
//                       .map((item) => {
//                         const menu =
//                           typeof item.menu === "object"
//                             ? item.menu
//                             : undefined;

//                         return `${item.quantity} × ${menu?.title || "Menu item"}`;
//                       })
//                       .join(", ");

//                     return (
//                       <article
//                         key={order._id}
//                         className="grid gap-4 py-5 md:grid-cols-[1.1fr_1.6fr_0.8fr_0.8fr_auto] md:items-center md:gap-4"
//                       >
//                         <div>
//                           <p className="text-[10px] uppercase tracking-widest text-[#8a7d6a]">
//                             Order
//                           </p>
//                           <p className="mt-1 text-sm">
//                             #{shortId(order._id)}
//                           </p>
//                           <p className="mt-1 text-xs text-[#8a7d6a]">
//                             {dateFormat(order.createdAt)}
//                           </p>
//                         </div>

//                         <div>
//                           <p className="line-clamp-2 text-sm leading-6 text-[#ede4d4]">
//                             {itemSummary || "Restaurant order"}
//                           </p>
//                           {order.reservationDetails?.date && (
//                             <p className="mt-2 flex items-center gap-1.5 text-xs text-[#8a7d6a]">
//                               <CalendarDays size={13} />
//                               {dateFormat(order.reservationDetails.date)}
//                               {order.reservationDetails.time && (
//                                 <>
//                                   <Clock size={13} className="ml-1" />
//                                   {order.reservationDetails.time}
//                                 </>
//                               )}
//                             </p>
//                           )}
//                         </div>

//                         <div className="flex flex-wrap items-center gap-2 md:block">
//                           <Status value={order.orderStatus} />
//                           {order.paymentInfo?.paymentStatus && (
//                             <p className="mt-1 text-[10px] text-[#8a7d6a]">
//                               Payment: {order.paymentInfo.paymentStatus}
//                             </p>
//                           )}
//                         </div>

//                         <div>
//                           <p className="text-[10px] uppercase tracking-widest text-[#8a7d6a] md:hidden">
//                             Total
//                           </p>
//                           <p className="font-['Fraunces'] text-lg text-[#c4954a]">
//                             {money(order.totalPrice)}
//                           </p>
//                         </div>

//                         <div className="flex items-center md:justify-end">
//                           {canCancel && (
//                             <button
//                               onClick={() => void cancelOrder(order)}
//                               disabled={cancelingId === order._id}
//                               className="flex items-center gap-1.5 text-xs text-[#8a7d6a] transition hover:text-red-400 disabled:opacity-50"
//                             >
//                               {cancelingId === order._id ? (
//                                 <LoaderCircle
//                                   size={14}
//                                   className="animate-spin"
//                                 />
//                               ) : (
//                                 <X size={14} />
//                               )}
//                               Cancel
//                             </button>
//                           )}
//                         </div>
//                       </article>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </section>
//         )}
//       </div>
//     </div>
//   );
// }













"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  BedDouble,
  UtensilsCrossed,
  CalendarDays,
  Clock,
  Users,
  ChevronRight,
  X,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";
import { toast } from "react-hot-toast";

import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";

type Tab = "bookings" | "orders";

type GalleryImage = {
  url?: string;
  type?: string;
  alt?: string;
};

type Apartment = {
  _id?: string;
  title?: string;
  gallery?: GalleryImage[];
  price?: number;
};

type Booking = {
  _id: string;
  bookingId?: string;
  apartment?: Apartment | string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights?: number;
  totalAmount?: number;
  status: string;
  paymentStatus?: string;
  createdAt?: string;
};

type MenuItem = {
  _id?: string;
  title?: string;
  image?: { url?: string } | string;
};

type OrderItem = {
  menu?: MenuItem | string;
  quantity: number;
  price: number;
};

type Order = {
  _id: string;
  orderId?: string;
  items: OrderItem[];
  reservationDetails?: {
    date?: string;
    time?: string;
    guests?: number;
    fullName?: string;
  };
  orderStatus: string;
  paymentInfo?: {
    paymentStatus?: string;
  };
  totalPrice: number;
  createdAt?: string;
};

const money = (amount = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(amount);

const dateFormat = (date?: string) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const shortId = (id: string) => id.slice(-8).toUpperCase();

function getApartmentImage(apartment?: Apartment | string) {
  if (!apartment || typeof apartment === "string") return "";

  return (
    apartment.gallery?.find((image) => image.type === "living-room")?.url ||
    apartment.gallery?.[0]?.url ||
    ""
  );
}

function getMenuImage(menu?: MenuItem | string) {
  if (!menu || typeof menu === "string") return "";

  if (typeof menu.image === "string") return menu.image;

  return menu.image?.url || "";
}

function Status({ value }: { value?: string }) {
  const status = value || "pending";

  const colors: Record<string, string> = {
    confirmed:
      "border-emerald-800/60 bg-emerald-950/40 text-emerald-400",
    completed:
      "border-emerald-800/60 bg-emerald-950/40 text-emerald-400",
    paid: "border-emerald-800/60 bg-emerald-950/40 text-emerald-400",
    pending:
      "border-amber-800/60 bg-amber-950/30 text-amber-400",
    unpaid:
      "border-amber-800/60 bg-amber-950/30 text-amber-400",
    cancelled:
      "border-red-900/60 bg-red-950/30 text-red-400",
    refunded:
      "border-sky-900/60 bg-sky-950/30 text-sky-400",
    processing:
      "border-sky-900/60 bg-sky-950/30 text-sky-400",
  };

  const statusClass =
    colors[status.toLowerCase()] ||
    "border-[#393128] bg-[#161310] text-[#b7aa96]";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full border px-3 py-1.5 text-[9px] font-medium uppercase tracking-[0.14em] ${statusClass}`}
    >
      {status.replace(/_/g, " ")}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8a7d6a]">
      {children}
    </p>
  );
}

export default function MyBookingsPage() {
  const { authUser } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>("bookings");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const fetchData = useCallback(async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    try {
      const [bookingsResult, ordersResult] = await Promise.allSettled([
        api.get("/booking/my-bookings"),
        api.get("/order/my-orders"),
      ]);

      if (bookingsResult.status === "fulfilled") {
        setBookings(bookingsResult.value.data?.bookings || []);
      } else {
        console.error(
          "Failed to fetch bookings:",
          bookingsResult.reason
        );
      }

      if (ordersResult.status === "fulfilled") {
        setOrders(ordersResult.value.data?.orders || []);
      } else {
        console.error("Failed to fetch orders:", ordersResult.reason);
      }

      if (
        bookingsResult.status === "rejected" &&
        ordersResult.status === "rejected"
      ) {
        toast.error("Unable to load your bookings and orders.");
      }
    } catch (error) {
      console.error("Failed to load account activity:", error);
      toast.error("Something went wrong while loading your activity.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (authUser) {
      void fetchData();
    } else {
      setLoading(false);
    }
  }, [authUser, fetchData]);

  const cancelBooking = async (booking: Booking) => {
    if (
      !window.confirm(
        "Are you sure you want to cancel this booking?"
      )
    ) {
      return;
    }

    try {
      setCancellingId(booking._id);

      await api.put(`/booking/${booking._id}/cancel`);

      setBookings((current) =>
        current.map((item) =>
          item._id === booking._id
            ? { ...item, status: "cancelled" }
            : item
        )
      );

      toast.success("Booking cancelled successfully.");
    } catch (error: any) {
      console.error("Failed to cancel booking:", error);
      toast.error(
        error?.response?.data?.message ||
          "Unable to cancel this booking."
      );
    } finally {
      setCancellingId(null);
    }
  };

  const cancelOrder = async (order: Order) => {
    if (
      !window.confirm("Are you sure you want to cancel this order?")
    ) {
      return;
    }

    try {
      setCancellingId(order._id);

      await api.patch(`/order/${order._id}/cancel`);

      setOrders((current) =>
        current.map((item) =>
          item._id === order._id
            ? { ...item, orderStatus: "cancelled" }
            : item
        )
      );

      toast.success("Order cancelled successfully.");
    } catch (error: any) {
      console.error("Failed to cancel order:", error);
      toast.error(
        error?.response?.data?.message ||
          "Unable to cancel this order."
      );
    } finally {
      setCancellingId(null);
    }
  };

  const canCancelBooking = (status: string) =>
    ["pending", "confirmed"].includes(status?.toLowerCase());

  const canCancelOrder = (status: string) =>
    ["pending", "processing"].includes(status?.toLowerCase());

  if (!authUser) {
    return (
      <main className="min-h-[60vh] bg-[#0c0a08] px-5 py-20 text-[#ede4d4]">
        <div className="mx-auto max-w-3xl text-center">
          <BedDouble className="mx-auto mb-5 h-8 w-8 text-[#c4954a]" />

          <h1 className="font-serif text-3xl">
            Your Reservations
          </h1>

          <p className="mt-3 text-sm text-[#8a7d6a]">
            Sign in to view your bookings and restaurant orders.
          </p>

          <Link
            href="/"
            className="mt-7 inline-flex items-center gap-2 border border-[#c4954a]/50 px-5 py-3 text-xs uppercase tracking-[0.16em] text-[#c4954a] transition hover:bg-[#c4954a] hover:text-[#0c0a08]"
          >
            Return Home <ChevronRight size={15} />
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0c0a08] px-4 py-12 text-[#ede4d4] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Page heading */}
        <div className="mb-9 flex flex-wrap items-end justify-between gap-4 border-b border-[#30281f] pb-6">
          <div>
            <SectionLabel>Cedar Court</SectionLabel>

            <h1 className="mt-2 font-serif text-3xl sm:text-4xl">
              My Bookings &amp; Orders
            </h1>

            <p className="mt-2 text-sm text-[#8a7d6a]">
              Keep track of your stays and dining reservations.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void fetchData(true)}
            disabled={refreshing || loading}
            className="inline-flex items-center gap-2 border border-[#393128] px-3 py-2 text-xs text-[#b7aa96] transition hover:border-[#c4954a]/60 hover:text-[#c4954a] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={14}
              className={refreshing ? "animate-spin" : ""}
            />
            Refresh
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-6 flex border-b border-[#30281f]">
          <button
            type="button"
            onClick={() => setActiveTab("bookings")}
            className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs uppercase tracking-[0.14em] transition ${
              activeTab === "bookings"
                ? "border-[#c4954a] text-[#c4954a]"
                : "border-transparent text-[#8a7d6a] hover:text-[#ede4d4]"
            }`}
          >
            <BedDouble size={15} />
            Bookings
            <span className="text-[10px] opacity-70">
              ({bookings.length})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs uppercase tracking-[0.14em] transition ${
              activeTab === "orders"
                ? "border-[#c4954a] text-[#c4954a]"
                : "border-transparent text-[#8a7d6a] hover:text-[#ede4d4]"
            }`}
          >
            <UtensilsCrossed size={15} />
            Orders
            <span className="text-[10px] opacity-70">
              ({orders.length})
            </span>
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-56 items-center justify-center gap-3 text-sm text-[#8a7d6a]">
            <LoaderCircle
              size={18}
              className="animate-spin text-[#c4954a]"
            />
            Loading your activity...
          </div>
        ) : (
          <>
            {/* BOOKINGS */}
            {activeTab === "bookings" && (
              <div className="divide-y divide-[#30281f]">
                {bookings.length === 0 ? (
                  <div className="py-16 text-center">
                    <BedDouble className="mx-auto mb-4 h-8 w-8 text-[#5c4b35]" />

                    <h2 className="font-serif text-xl">
                      No bookings yet
                    </h2>

                    <p className="mt-2 text-sm text-[#8a7d6a]">
                      Your apartment reservations will appear here.
                    </p>

                    <Link
                      href="/apartments"
                      className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#c4954a] hover:text-[#e1b96f]"
                    >
                      Explore Apartments <ChevronRight size={14} />
                    </Link>
                  </div>
                ) : (
                  bookings.map((booking) => {
                    const apartment =
                      typeof booking.apartment === "object" &&
                      booking.apartment !== null
                        ? booking.apartment
                        : undefined;

                    const apartmentImage = getApartmentImage(
                      booking.apartment
                    );

                    const bookingReference =
                      booking.bookingId ||
                      `BK-${shortId(booking._id)}`;

                    return (
                      <div
                        key={booking._id}
                        className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center"
                      >
                        {/* Apartment thumbnail */}
                        <div className="h-24 w-full shrink-0 overflow-hidden border border-[#30281f] bg-[#161310] sm:w-32">
                          {apartmentImage ? (
                            <img
                              src={apartmentImage}
                              alt={
                                apartment?.title || "Booked apartment"
                              }
                              className="h-full w-full object-cover transition duration-500 hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-[#5c4b35]">
                              <BedDouble size={26} />
                            </div>
                          )}
                        </div>

                        {/* Booking information */}
                        <div className="min-w-0 flex-1">
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <span className="font-mono text-[10px] tracking-[0.12em] text-[#c4954a]">
                              {bookingReference}
                            </span>

                            <div className="shrink-0">
                              <Status value={booking.status} />
                            </div>
                          </div>

                          <h2 className="truncate font-serif text-lg">
                            {apartment?.title || "Apartment Reservation"}
                          </h2>

                          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[#8a7d6a]">
                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays size={13} />
                              {dateFormat(booking.checkIn)} –{" "}
                              {dateFormat(booking.checkOut)}
                            </span>

                            <span className="inline-flex items-center gap-1.5">
                              <Users size={13} />
                              {booking.guests}{" "}
                              {booking.guests === 1 ? "guest" : "guests"}
                            </span>

                            {booking.nights ? (
                              <span className="inline-flex items-center gap-1.5">
                                <Clock size={13} />
                                {booking.nights}{" "}
                                {booking.nights === 1 ? "night" : "nights"}
                              </span>
                            ) : null}
                          </div>

                          <div className="mt-3 flex flex-wrap items-center gap-3">
                            <span className="text-sm font-medium text-[#ede4d4]">
                              {money(booking.totalAmount)}
                            </span>

                            {booking.paymentStatus && (
                              <span className="text-[10px] text-[#8a7d6a]">
                                Payment:
                              </span>
                            )}

                            {booking.paymentStatus && (
                              <Status value={booking.paymentStatus} />
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
                          {canCancelBooking(booking.status) && (
                            <button
                              type="button"
                              onClick={() => void cancelBooking(booking)}
                              disabled={cancellingId === booking._id}
                              className="inline-flex items-center gap-1.5 text-xs text-red-400 transition hover:text-red-300 disabled:opacity-50"
                            >
                              {cancellingId === booking._id ? (
                                <LoaderCircle
                                  size={13}
                                  className="animate-spin"
                                />
                              ) : (
                                <X size={13} />
                              )}
                              Cancel
                            </button>
                          )}

                          <Link
                            href="/apartments"
                            className="inline-flex items-center gap-1 text-xs text-[#c4954a] transition hover:text-[#e1b96f]"
                          >
                            View apartments <ChevronRight size={13} />
                          </Link>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}

            {/* ORDERS */}
            {activeTab === "orders" && (
              <div className="divide-y divide-[#30281f]">
                {orders.length === 0 ? (
                  <div className="py-16 text-center">
                    <UtensilsCrossed className="mx-auto mb-4 h-8 w-8 text-[#5c4b35]" />

                    <h2 className="font-serif text-xl">
                      No orders yet
                    </h2>

                    <p className="mt-2 text-sm text-[#8a7d6a]">
                      Your restaurant orders will appear here.
                    </p>

                    <Link
                      href="/menu"
                      className="mt-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#c4954a] hover:text-[#e1b96f]"
                    >
                      Explore the Menu <ChevronRight size={14} />
                    </Link>
                  </div>
                ) : (
                  orders.map((order) => {
                    const orderReference =
                      order.orderId || `ORD-${shortId(order._id)}`;

                    return (
                      <div key={order._id} className="py-5">
                        {/* Order reference and status */}
                        <div className="mb-4 flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="font-mono text-[10px] tracking-[0.12em] text-[#c4954a]">
                              {orderReference}
                            </p>

                            <p className="mt-2 text-xs text-[#8a7d6a]">
                              Placed {dateFormat(order.createdAt)}
                            </p>
                          </div>

                          <div className="shrink-0">
                            <Status value={order.orderStatus} />
                          </div>
                        </div>

                        {/* Menu items */}
                        <div className="space-y-3">
                          {order.items?.map((item, index) => {
                            const menu =
                              typeof item.menu === "object" &&
                              item.menu !== null
                                ? item.menu
                                : undefined;

                            const menuImage = getMenuImage(item.menu);

                            return (
                              <div
                                key={`${menu?._id || index}-${index}`}
                                className="flex items-center gap-3"
                              >
                                <div className="h-14 w-14 shrink-0 overflow-hidden border border-[#30281f] bg-[#161310]">
                                  {menuImage ? (
                                    <img
                                      src={menuImage}
                                      alt={menu?.title || "Menu item"}
                                      className="h-full w-full object-cover transition duration-500 hover:scale-105"
                                    />
                                  ) : (
                                    <div className="flex h-full items-center justify-center text-[#5c4b35]">
                                      <UtensilsCrossed size={19} />
                                    </div>
                                  )}
                                </div>

                                <div className="min-w-0 flex-1">
                                  <p className="truncate text-sm text-[#ede4d4]">
                                    {menu?.title || "Menu item"}
                                  </p>

                                  <p className="mt-1 text-xs text-[#8a7d6a]">
                                    Quantity: {item.quantity}
                                  </p>
                                </div>

                                <p className="shrink-0 text-xs text-[#b7aa96]">
                                  {money(item.price * item.quantity)}
                                </p>
                              </div>
                            );
                          })}
                        </div>

                        {/* Restaurant reservation details */}
                        {order.reservationDetails && (
                          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 border-t border-[#30281f] pt-3 text-xs text-[#8a7d6a]">
                            {order.reservationDetails.date && (
                              <span className="inline-flex items-center gap-1.5">
                                <CalendarDays size={13} />
                                {dateFormat(
                                  order.reservationDetails.date
                                )}
                              </span>
                            )}

                            {order.reservationDetails.time && (
                              <span className="inline-flex items-center gap-1.5">
                                <Clock size={13} />
                                {order.reservationDetails.time}
                              </span>
                            )}

                            {order.reservationDetails.guests && (
                              <span className="inline-flex items-center gap-1.5">
                                <Users size={13} />
                                {order.reservationDetails.guests}{" "}
                                {order.reservationDetails.guests === 1
                                  ? "guest"
                                  : "guests"}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Total, payment, and actions */}
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#30281f] pt-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] uppercase tracking-[0.12em] text-[#8a7d6a]">
                              Payment
                            </span>

                            <Status
                              value={
                                order.paymentInfo?.paymentStatus ||
                                "unpaid"
                              }
                            />
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-[9px] uppercase tracking-[0.14em] text-[#8a7d6a]">
                                Order total
                              </p>
                              <p className="mt-1 text-sm font-medium text-[#ede4d4]">
                                {money(order.totalPrice)}
                              </p>
                            </div>

                            {canCancelOrder(order.orderStatus) && (
                              <button
                                type="button"
                                onClick={() => void cancelOrder(order)}
                                disabled={cancellingId === order._id}
                                className="inline-flex items-center gap-1.5 text-xs text-red-400 transition hover:text-red-300 disabled:opacity-50"
                              >
                                {cancellingId === order._id ? (
                                  <LoaderCircle
                                    size={13}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <X size={13} />
                                )}
                                Cancel
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

