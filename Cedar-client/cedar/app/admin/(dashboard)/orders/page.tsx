// "use client";

// import { useEffect, useMemo, useState, useRef } from "react";
// import {
//   Eye,
//   Search,
//   Trash2,
//   X,
//   LoaderCircle
// } from "lucide-react";
// import { toast } from "react-hot-toast";

// import api from "@/lib/api";

// /* ========================================================= */
// /* TYPES */
// /* ========================================================= */

// type OrderStatus =
//   | "pending"
//   | "confirmed"
//   | "preparing"
//   | "ready"
//   | "completed"
//   | "cancelled"
//   | "refunded";

// type MenuItem = {
//   _id: string;
//   title: string;
//   price: number;
//   image?: {
//     url: string;
//   };
// };

// type OrderItem = {
//   menu: MenuItem;
//   price: number;
//   quantity: number;
// };

// type ReservationDetails = {
//   fullName: string;
//   email: string;
//   phone: string;
//   date: string;
//   time: string;
//   guests: number;
//   specialRequest?: string;
// };

// type PaymentInfo = {
//   paymentMethod: string;
//   paymentStatus: string;
//   reference?: string;
//   transactionId?: string;
//   channel?: string;
//   paidAt?: string;
// };

// interface Order {
//   _id: string;
//   orderId: string;

//   items: OrderItem[];

//   reservationDetails: ReservationDetails;

//   paymentInfo: PaymentInfo;

//   orderStatus: OrderStatus;

//   subtotal: number;
//   serviceFee: number;
//   totalPrice: number;

//   createdAt: string;
//   updatedAt: string;
// }

// /* ========================================================= */
// /* STATUS */
// /* ========================================================= */

// const statuses: {
//   value: OrderStatus | "all";
//   label: string;
// }[] = [
//   {
//     value: "all",
//     label: "All",
//   },
//   {
//     value: "pending",
//     label: "Pending",
//   },
//   {
//     value: "confirmed",
//     label: "Confirmed",
//   },
//   {
//     value: "preparing",
//     label: "Preparing",
//   },
//   {
//     value: "ready",
//     label: "Ready",
//   },
//   {
//     value: "completed",
//     label: "Completed",
//   },
//   {
//     value: "cancelled",
//     label: "Cancelled",
//   },
//   {
//     value: "refunded",
//     label: "Refunded",
//   },
// ];

// /* ========================================================= */
// /* INPUT */
// /* ========================================================= */

// const inputClass = `
//   w-full
//   bg-[#0c0a08]
//   border border-[rgba(196,149,74,0.15)]
//   px-3
//   py-2.5
//   text-sm
//   font-['Jost']
//   text-[#ede4d4]
//   outline-none
//   transition-all
//   focus:border-[#c4954a]
//   placeholder:text-[#8a7d6a]/60
// `;

// const labelClass = `
//   block
//   mb-2
//   text-[9px]
//   font-['DM_Mono']
//   text-[#8a7d6a]
//   tracking-[0.18em]
//   uppercase
// `;

// /* ========================================================= */
// /* STATUS LABEL */
// /* ========================================================= */

// function getStatusLabel(
//   status: OrderStatus
// ) {
//   const statusItem = statuses.find(
//     (item) => item.value === status
//   );

//   return statusItem?.label || status;
// }

// /* ========================================================= */
// /* STATUS BADGE */
// /* ========================================================= */

// function OrderStatusBadge({
//   status,
// }: {
//   status: OrderStatus;
// }) {
//   const styles: Record<
//     OrderStatus,
//     string
//   > = {
//     pending:
//       "text-amber-400 bg-amber-400/10 border-amber-400/20",

//     confirmed:
//       "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",

//     preparing:
//       "text-blue-400 bg-blue-400/10 border-blue-400/20",

//     ready:
//       "text-[#c4954a] bg-[rgba(196,149,74,0.1)] border-[rgba(196,149,74,0.2)]",

//     completed:
//       "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",

//     cancelled:
//       "text-red-400 bg-red-400/10 border-red-400/20",

//     refunded:
//       "text-purple-400 bg-purple-400/10 border-purple-400/20",
//   };

//   return (
//     <span
//       className={`
//         inline-flex
//         items-center
//         px-2
//         py-1
//         border
//         text-[9px]
//         font-['DM_Mono']
//         tracking-wider
//         uppercase
//         whitespace-nowrap
//         ${styles[status]}
//       `}
//     >
//       {getStatusLabel(status)}
//     </span>
//   );
// }

// /* ========================================================= */
// /* FORMAT DATE */
// /* ========================================================= */

// function formatDate(date: string) {
//   if (!date) return "—";

//   const parsed = new Date(date);

//   if (Number.isNaN(parsed.getTime())) {
//     return date;
//   }

//   return parsed.toLocaleDateString(
//     "en-US",
//     {
//       month: "short",
//       day: "2-digit",
//       year: "numeric",
//     }
//   );
// }

// /* ========================================================= */
// /* ORDER ITEMS */
// /* ========================================================= */

// function formatItems(
//   items: OrderItem[]
// ) {
//   if (!items?.length) {
//     return "No items";
//   }

//   return items
//     .map((item) => {
//       const title =
//         item.menu?.title ||
//         "Unknown item";

//       return `${title} × ${item.quantity}`;
//     })
//     .join(", ");
// }

// /* ========================================================= */
// /* DETAIL ROW */
// /* ========================================================= */

// function DetailRow({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 pb-3 border-b border-[rgba(196,149,74,0.06)]">

//       <span className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
//         {label}
//       </span>

//       <span className="text-sm font-['Jost'] text-[#ede4d4] sm:text-right sm:max-w-[65%]">
//         {value}
//       </span>

//     </div>
//   );
// }

// /* ========================================================= */
// /* ORDER DETAILS MODAL */
// /* ========================================================= */

// function OrderModal({
//   order,
//   onClose,
//   onStatusChange,
// }: {
//   order: Order;
//   onClose: () => void;
//   onStatusChange: (
//     status: OrderStatus
//   ) => void;
// }) {
//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

//       {/* Overlay */}

//       <div
//         className="absolute inset-0 bg-black/75 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* Modal */}

//       <div
//         className="
//           relative
//           w-full
//           max-w-lg
//           max-h-[90vh]
//           overflow-y-auto
//           bg-[#161310]
//           border
//           border-[rgba(196,149,74,0.15)]
//           shadow-2xl
//         "
//       >

//         {/* Header */}

//         <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-[#161310] border-b border-[rgba(196,149,74,0.1)]">

//           <div>

//             <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#8a7d6a] uppercase mb-1">
//               Order Details
//             </p>

//             <h3 className="font-['Fraunces'] text-xl text-[#ede4d4]">
//               {order.orderId}
//             </h3>

//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="text-[#8a7d6a] hover:text-[#ede4d4] transition-colors"
//           >
//             <X size={18} />
//           </button>

//         </div>

//         {/* Content */}

//         <div className="p-5 space-y-6">

//           {/* CUSTOMER */}

//           <div>

//             <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase mb-3">
//               Customer
//             </p>

//             <div className="space-y-3">

//               <DetailRow
//                 label="Name"
//                 value={
//                   order.reservationDetails
//                     ?.fullName || "—"
//                 }
//               />

//               <DetailRow
//                 label="Email"
//                 value={
//                   order.reservationDetails
//                     ?.email || "—"
//                 }
//               />

//               <DetailRow
//                 label="Phone"
//                 value={
//                   order.reservationDetails
//                     ?.phone || "—"
//                 }
//               />

//               <DetailRow
//                 label="Guests"
//                 value={String(
//                   order.reservationDetails
//                     ?.guests || "—"
//                 )}
//               />

//             </div>

//           </div>

//           {/* ORDER */}

//           <div>

//             <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase mb-3">
//               Order
//             </p>

//             <div className="space-y-3">

//               <DetailRow
//                 label="Items"
//                 value={formatItems(
//                   order.items
//                 )}
//               />

//               <DetailRow
//                 label="Subtotal"
//                 value={`₦${(
//                   order.subtotal || 0
//                 ).toLocaleString()}`}
//               />

//               <DetailRow
//                 label="Service Fee"
//                 value={`₦${(
//                   order.serviceFee || 0
//                 ).toLocaleString()}`}
//               />

//               <DetailRow
//                 label="Total"
//                 value={`₦${(
//                   order.totalPrice || 0
//                 ).toLocaleString()}`}
//               />

//               <DetailRow
//                 label="Reservation"
//                 value={`${formatDate(
//                   order.reservationDetails?.date
//                 )} at ${
//                   order.reservationDetails
//                     ?.time || "—"
//                 }`}
//               />

//               <DetailRow
//                 label="Current Status"
//                 value={getStatusLabel(
//                   order.orderStatus
//                 )}
//               />

//             </div>

//           </div>

//           {/* PAYMENT */}

//           <div>

//             <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase mb-3">
//               Payment
//             </p>

//             <div className="space-y-3">

//               <DetailRow
//                 label="Method"
//                 value={
//                   order.paymentInfo
//                     ?.paymentMethod || "—"
//                 }
//               />

//               <DetailRow
//                 label="Payment Status"
//                 value={
//                   order.paymentInfo
//                     ?.paymentStatus || "—"
//                 }
//               />

//               <DetailRow
//                 label="Reference"
//                 value={
//                   order.paymentInfo
//                     ?.reference || "—"
//                 }
//               />

//             </div>

//           </div>

//           {/* SPECIAL REQUEST */}

//           {order.reservationDetails
//             ?.specialRequest && (
//             <div>

//               <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase mb-3">
//                 Special Request
//               </p>

//               <p className="text-sm font-['Jost'] text-[#8a7d6a] leading-relaxed">
//                 {
//                   order.reservationDetails
//                     .specialRequest
//                 }
//               </p>

//             </div>
//           )}

//           {/* STATUS */}

//           <div>

//             <label className={labelClass}>
//               Update Status
//             </label>

//             <select
//               value={order.orderStatus}
//               onChange={(e) =>
//                 onStatusChange(
//                   e.target
//                     .value as OrderStatus
//                 )
//               }
//               className={inputClass}
//             >

//               {statuses
//                 .filter(
//                   (status) =>
//                     status.value !== "all"
//                 )
//                 .map((status) => (
//                   <option
//                     key={status.value}
//                     value={status.value}
//                   >
//                     {status.label}
//                   </option>
//                 ))}

//             </select>

//           </div>

//           {/* CLOSE */}

//           <button
//             type="button"
//             onClick={onClose}
//             className="
//               w-full
//               py-3
//               border
//               border-[rgba(196,149,74,0.2)]
//               text-[#c4954a]
//               text-xs
//               font-['DM_Mono']
//               tracking-widest
//               uppercase
//               hover:bg-[rgba(196,149,74,0.05)]
//               transition-all
//             "
//           >
//             Close
//           </button>

//         </div>

//       </div>

//     </div>
//   );
// }

// /* ========================================================= */
// /* ADMIN ORDERS PAGE */
// /* ========================================================= */

// export default function AdminOrders() {

//   const [orders, setOrders] =
//     useState<Order[]>([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [search, setSearch] =
//     useState("");

//   const [statusFilter, setStatusFilter] =
//     useState<OrderStatus | "all">(
//       "all"
//     );

//   const [viewOrder, setViewOrder] =
//     useState<Order | null>(null);

//   /* ======================================================= */
//   /* FETCH ALL ORDERS */
//   /* ======================================================= */

//   useEffect(() => {

//     const fetchOrders = async () => {

//       try {

//         setLoading(true);

//         const response = await api.get(
//           "/order/all-orders"
//         );

//         console.log(
//           "Orders response:",
//           response.data
//         );

//         if (
//           Array.isArray(
//             response.data?.orders
//           )
//         ) {
//           setOrders(
//             response.data.orders
//           );
//         } else {
//           setOrders([]);
//         }

//       } catch (error: any) {

//         console.error(
//           "Failed to fetch orders:",
//           error
//         );

//         console.error(
//           "Response:",
//           error?.response?.data
//         );

//         toast.error(
//           error?.response?.data?.message ||
//           "Failed to load orders."
//         );

//       } finally {

//         setLoading(false);

//       }

//     };

//     fetchOrders();

//   }, []);

//   /* ======================================================= */
//   /* FILTER ORDERS */
//   /* ======================================================= */

//   const filteredOrders = useMemo(() => {

//     const searchTerm =
//       search.toLowerCase().trim();

//     return orders.filter((order) => {

//       const matchesStatus =
//         statusFilter === "all" ||
//         order.orderStatus ===
//           statusFilter;

//       const customer =
//         order.reservationDetails
//           ?.fullName
//           ?.toLowerCase() || "";

//       const email =
//         order.reservationDetails
//           ?.email
//           ?.toLowerCase() || "";

//       const orderId =
//         order.orderId
//           ?.toLowerCase() || "";

//       return (
//         matchesStatus &&
//         (
//           customer.includes(
//             searchTerm
//           ) ||
//           email.includes(
//             searchTerm
//           ) ||
//           orderId.includes(
//             searchTerm
//           )
//         )
//       );

//     });

//   }, [
//     orders,
//     search,
//     statusFilter,
//   ]);

//   /* ======================================================= */
//   /* UPDATE STATUS */
//   /* ======================================================= */

//   const updateStatus = async (
//     id: string,
//     status: OrderStatus
//   ) => {

//     try {

//       const response =
//         await api.patch(
//           `/order/${id}/status`,
//           {
//             status,
//           }
//         );

//       const updatedOrder =
//         response.data?.order;

//       if (updatedOrder) {

//         setOrders((current) =>
//           current.map((order) =>
//             order._id === id
//               ? updatedOrder
//               : order
//           )
//         );

//         setViewOrder(
//           updatedOrder
//         );

//       }

//       toast.success(
//         "Order status updated."
//       );

//     } catch (error: any) {

//       console.error(
//         "Update status error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//         "Failed to update order status."
//       );

//     }

//   };

//   /* ======================================================= */
//   /* DELETE ORDER */
//   /* ======================================================= */

//   const deleteOrder = async (
//     order: Order
//   ) => {

//     const confirmed =
//       window.confirm(
//         `Delete order "${order.orderId}"?`
//       );

//     if (!confirmed) {
//       return;
//     }

//     try {

//       await api.delete(
//         `/order/${order._id}`
//       );

//       setOrders((current) =>
//         current.filter(
//           (item) =>
//             item._id !== order._id
//         )
//       );

//       if (
//         viewOrder?._id ===
//         order._id
//       ) {
//         setViewOrder(null);
//       }

//       toast.success(
//         "Order deleted."
//       );

//     } catch (error: any) {

//       console.error(
//         "Delete order error:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//         "Failed to delete order."
//       );

//     }

//   };


//   // const [visibleCount, setVisibleCount] = useState(4);

//   // const loadMoreRef = useRef<HTMLDivElement | null>(null);

//   // useEffect(() => {
//   //   const target = loadMoreRef.current;

//   //   if (!target) return;

//   //   const observer = new IntersectionObserver(
//   //     (entries) => {
//   //       if (entries[0].isIntersecting) {
//   //         setVisibleCount((current) =>
//   //           Math.min(current + 4, filteredOrders.length)
//   //         );
//   //       }
//   //     },
//   //     {
//   //       rootMargin: "150px",
//   //     }
//   //   );

//   //   observer.observe(target);

//   //   return () => observer.disconnect();
//   // }, [filteredOrders.length, visibleCount]);



//   const [visibleCount, setVisibleCount] = useState(4);
//   const [isLoadingMore, setIsLoadingMore] = useState(false);

//   const loadMoreRef = useRef<HTMLDivElement | null>(null);
//   const loadingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   const loadingLockRef = useRef(false);

//   useEffect(() => {
//     const target = loadMoreRef.current;

//     if (!target || visibleCount >= filteredOrders.length) {
//       return;
//     }

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (
//           !entries[0]?.isIntersecting ||
//           loadingLockRef.current
//         ) {
//           return;
//         }

//         // Prevent duplicate loading triggers.
//         loadingLockRef.current = true;
//         observer.unobserve(target);

//         setIsLoadingMore(true);

//         loadingTimerRef.current = setTimeout(() => {
//           setVisibleCount((current) =>
//             Math.min(current + 4, filteredOrders.length)
//           );

//           setIsLoadingMore(false);
//           loadingLockRef.current = false;
//           loadingTimerRef.current = null;
//         }, 500);
//       },
//       {
//         root: null,
//         rootMargin: "50px",
//         threshold: 0,
//       }
//     );

//     observer.observe(target);

//     // Disconnect the observer, but do not cancel the timer here.
//     return () => {
//       observer.disconnect();
//     };
//   }, [visibleCount, filteredOrders.length]);


//   // Reset lazy loading when search or status filter changes
//   useEffect(() => {
//     if (loadingTimerRef.current) {
//       clearTimeout(loadingTimerRef.current);
//       loadingTimerRef.current = null;
//     }

//     loadingLockRef.current = false;

//     setVisibleCount(4);
//     setIsLoadingMore(false);
//   }, [search, statusFilter]);

//   /* ======================================================= */
//   /* LOADING */
//   /* ======================================================= */

//   if (loading) {

//     return (
//       <div className="space-y-6">

//         <div>

//           <div className="flex items-center gap-3 mb-2">

//             <span className="w-7 h-px bg-[#c4954a]" />

//             <span className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase">
//               Restaurant
//             </span>

//           </div>

//           <h2 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
//             Orders
//           </h2>

//           <p className="mt-1 text-sm font-['Jost'] text-[#8a7d6a]">
//             Manage restaurant orders and their preparation status.
//           </p>

//         </div>

//         <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-hidden animate-pulse">

//           <div className="h-12 bg-[#211d18]" />

//           {[1, 2, 3, 4, 5].map(
//             (item) => (
//               <div
//                 key={item}
//                 className="h-16 border-t border-[rgba(196,149,74,0.06)] bg-[#161310]"
//               />
//             )
//           )}

//         </div>

//       </div>
//     );

//   }

//   /* ======================================================= */
//   /* PAGE */
//   /* ======================================================= */

//   return (
//     <div className="space-y-6">

//       {/* ================================================== */}
//       {/* HEADER */}
//       {/* ================================================== */}

//       <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">

//         <div>

//           <div className="flex items-center gap-3 mb-2">

//             <span className="w-7 h-px bg-[#c4954a]" />

//             <span className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase">
//               Restaurant
//             </span>

//           </div>

//           <h2 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
//             Orders
//           </h2>

//           <p className="mt-1 text-sm font-['Jost'] text-[#8a7d6a]">
//             Manage restaurant orders and their preparation status.
//           </p>

//         </div>

//         {/* Search + Filter */}

//         <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

//           <div className="relative w-full sm:w-64">

//             <Search
//               size={14}
//               className="
//                 absolute
//                 left-3
//                 top-1/2
//                 -translate-y-1/2
//                 text-[#8a7d6a]
//               "
//             />

//             <input
//               value={search}
//               onChange={(e) =>
//                 setSearch(
//                   e.target.value
//                 )
//               }
//               placeholder="Search orders..."
//               className={`${inputClass} pl-9`}
//             />

//           </div>

//           <select
//             value={statusFilter}
//             onChange={(e) =>
//               setStatusFilter(
//                 e.target.value as
//                   | OrderStatus
//                   | "all"
//               )
//             }
//             className={`${inputClass} sm:w-40`}
//           >

//             {statuses.map(
//               (status) => (
//                 <option
//                   key={status.value}
//                   value={status.value}
//                 >
//                   {status.label}
//                 </option>
//               )
//             )}

//           </select>

//         </div>

//       </div>

//       {/* ================================================== */}
//       {/* ORDER COUNT */}
//       {/* ================================================== */}

//       <div className="flex items-center justify-between">

//         <p className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
//           {filteredOrders.length}{" "}
//           {filteredOrders.length === 1
//             ? "Order"
//             : "Orders"}
//         </p>

//         {search ||
//         statusFilter !== "all" ? (
//           <button
//             type="button"
//             onClick={() => {
//               setSearch("");
//               setStatusFilter(
//                 "all"
//               );
//             }}
//             className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase hover:text-[#ede4d4] transition-colors"
//           >
//             Clear Filters
//           </button>
//         ) : null}

//       </div>

//       {/* ================================================== */}
//       {/* TABLE */}
//       {/* ================================================== */}

//       <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-hidden">





        
// {/* MOBILE ORDERS CARDS */}
// <div className="md:hidden space-y-4">
//   {filteredOrders.slice(0, visibleCount).map((order) => (
//     <div
//       key={order._id}
//       className="p-4 space-y-4 bg-black border border-[rgba(196,149,74,0.15)]"
//     >
//       {/* Order ID and status */}
//       <div className="flex items-start justify-between gap-3">
//         <div>
//           <p className="text-[10px] uppercase tracking-widest text-[#8a7d6a]">
//             Order ID
//           </p>
//           <p className="mt-1 text-sm font-medium text-[#ede4d4]">
//             {order.orderId}
//           </p>
//         </div>

//         <span className="text-xs text-[#c4954a] capitalize">
//           {order.orderStatus}
//         </span>
//       </div>

//       {/* Customer and order details */}
//       <div className="grid grid-cols-2 gap-4">
//         <div>
//           <p className="text-[10px] uppercase tracking-widest text-[#8a7d6a]">
//             Customer
//           </p>
//           <p className="mt-1 text-sm text-[#ede4d4]">
//             {order.reservationDetails?.fullName || "Guest"}
//           </p>
//         </div>

//         <div>
//           <p className="text-[10px] uppercase tracking-widest text-[#8a7d6a]">
//             Items
//           </p>
//           <p className="mt-1 text-sm text-[#ede4d4]">
//             {order.items?.reduce((total, item) => total + item.quantity, 0) || 0} items
//           </p>
//         </div>

//         <div>
//           <p className="text-[10px] uppercase tracking-widest text-[#8a7d6a]">
//             Total
//           </p>
//           <p className="mt-1 text-sm text-[#c4954a]">
//             ₦{Number(order.totalPrice || 0).toLocaleString()}
//           </p>
//         </div>

//         <div>
//           <p className="text-[10px] uppercase tracking-widest text-[#8a7d6a]">
//             Date
//           </p>
//           <p className="mt-1 text-sm text-[#ede4d4]">
//             {new Date(order.createdAt).toLocaleDateString()}
//           </p>
//         </div>
//       </div>

//       {/* MOBILE ACTIONS — VIEW AND DELETE */}
//       <div className="flex items-center gap-3 pt-3 border-t border-[rgba(196,149,74,0.08)]">
//         <button
//           type="button"
//           onClick={() => setViewOrder(order)}
//           title="View order"
//           className="flex-1 min-h-10 flex items-center justify-center gap-2 border border-[rgba(196,149,74,0.3)] bg-[rgba(196,149,74,0.06)] text-[#c4954a] text-xs font-['Jost'] hover:bg-[rgba(196,149,74,0.12)] transition-colors"
//         >
//           <Eye size={15} />
//           View Order
//         </button>

//         <button
//           type="button"
//           onClick={() => deleteOrder(order)}
//           title="Delete order"
//           className="min-h-10 px-4 flex items-center justify-center gap-2 border border-white/10 text-[#8a7d6a] hover:text-red-400 hover:border-red-400/30 transition-colors text-xs font-['Jost']"
//         >
//           <Trash2 size={15} />
//           Delete
//         </button>
//       </div>

//     </div>
//   ))}

//   {/* LAZY LOADING SPINNER */}
//   {visibleCount < filteredOrders.length && (
//     <div
//       ref={loadMoreRef}
//       className="flex justify-center items-center py-8"
//     >
//       <LoaderCircle
//         size={28}
//         className={`text-[#c4954a] ${
//           isLoadingMore ? "animate-spin" : ""
//         }`}
//       />
//     </div>
//   )}
// </div>


        

//         {/* EMPTY */}

//         {filteredOrders.length ===
//           0 && (
//           <div className="py-16 text-center">

//             <div className="w-10 h-10 mx-auto mb-4 border border-[rgba(196,149,74,0.15)] flex items-center justify-center">

//               <Search
//                 size={15}
//                 className="text-[#8a7d6a]"
//               />

//             </div>

//             <p className="font-['Fraunces'] text-lg text-[#ede4d4]">
//               No orders found
//             </p>

//             <p className="mt-1 text-sm font-['Jost'] text-[#8a7d6a]">
//               Try changing your search
//               or status filter.
//             </p>

//           </div>
//         )}

//       </div>

//       {/* ================================================== */}
//       {/* MODAL */}
//       {/* ================================================== */}

//       {viewOrder && (
//         <OrderModal
//           order={viewOrder}
//           onClose={() =>
//             setViewOrder(null)
//           }
//           onStatusChange={(
//             status
//           ) =>
//             updateStatus(
//               viewOrder._id,
//               status
//             )
//           }
//         />
//       )}

//     </div>
//   );
// }











"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Eye,
  Search,
  Trash2,
  X,
  LoaderCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/lib/api";

/* ========================================================= */
/* TYPES */
/* ========================================================= */

type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "completed"
  | "cancelled"
  | "refunded";

type MenuItem = {
  _id: string;
  title: string;
  price: number;
  image?: { url: string };
};

type OrderItem = {
  menu: MenuItem;
  price: number;
  quantity: number;
};

type ReservationDetails = {
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequest?: string;
};

type PaymentInfo = {
  paymentMethod: string;
  paymentStatus: string;
  reference?: string;
  transactionId?: string;
  channel?: string;
  paidAt?: string;
};

interface Order {
  _id: string;
  orderId: string;
  items: OrderItem[];
  reservationDetails: ReservationDetails;
  paymentInfo: PaymentInfo;
  orderStatus: OrderStatus;
  subtotal: number;
  serviceFee: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

/* ========================================================= */
/* STATUS OPTIONS */
/* ========================================================= */

const statuses: {
  value: OrderStatus | "all";
  label: string;
}[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "preparing", label: "Preparing" },
  { value: "ready", label: "Ready" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "refunded", label: "Refunded" },
];

/* ========================================================= */
/* INPUT STYLES */
/* ========================================================= */

const inputClass = `
  w-full
  bg-[#0c0a08]
  border border-[rgba(196,149,74,0.15)]
  px-3 py-2.5
  text-sm
  font-['Jost']
  text-[#ede4d4]
  outline-none
  transition-all
  focus:border-[#c4954a]
  placeholder:text-[#8a7d6a]/60
`;

const labelClass = `
  block mb-2
  text-[9px]
  font-['DM_Mono']
  text-[#8a7d6a]
  tracking-[0.18em]
  uppercase
`;

/* ========================================================= */
/* STATUS LABEL */
/* ========================================================= */

function getStatusLabel(status: OrderStatus) {
  return (
    statuses.find((item) => item.value === status)?.label ||
    status
  );
}

/* ========================================================= */
/* COLORED STATUS BADGE */
/* ========================================================= */

function OrderStatusBadge({
  status,
}: {
  status: OrderStatus;
}) {
  const styles: Record<OrderStatus, string> = {
    pending:
      "text-amber-400 bg-amber-400/10 border-amber-400/20",
    confirmed:
      "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
    preparing:
      "text-blue-400 bg-blue-400/10 border-blue-400/20",
    ready:
      "text-[#c4954a] bg-[rgba(196,149,74,0.1)] border-[rgba(196,149,74,0.2)]",
    completed:
      "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    cancelled:
      "text-red-400 bg-red-400/10 border-red-400/20",
    refunded:
      "text-purple-400 bg-purple-400/10 border-purple-400/20",
  };

  return (
    <span
      className={`
        inline-flex items-center
        px-2 py-1 border
        text-[9px]
        font-['DM_Mono']
        tracking-wider uppercase whitespace-nowrap
        ${styles[status] || styles.pending}
      `}
    >
      {getStatusLabel(status)}
    </span>
  );
}

/* ========================================================= */
/* FORMAT DATE */
/* ========================================================= */

function formatDate(date?: string) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

/* ========================================================= */
/* FORMAT ORDER ITEMS */
/* ========================================================= */

function formatItems(items?: OrderItem[]) {
  if (!items?.length) return "No items";

  return items
    .map(
      (item) =>
        `${item.menu?.title || "Unknown item"} × ${item.quantity}`
    )
    .join(", ");
}

/* ========================================================= */
/* DETAIL ROW */
/* ========================================================= */

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 pb-3 border-b border-[rgba(196,149,74,0.06)]">
      <span className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
        {label}
      </span>

      <span className="text-sm font-['Jost'] text-[#ede4d4] sm:text-right sm:max-w-[65%] break-words">
        {value}
      </span>
    </div>
  );
}

/* ========================================================= */
/* ORDER DETAILS MODAL */
/* ========================================================= */

function OrderModal({
  order,
  onClose,
  onStatusChange,
}: {
  order: Order;
  onClose: () => void;
  onStatusChange: (status: OrderStatus) => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#161310] border border-[rgba(196,149,74,0.15)] shadow-2xl">
        {/* HEADER */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-[#161310] border-b border-[rgba(196,149,74,0.1)]">
          <div>
            <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#8a7d6a] uppercase mb-1">
              Order Details
            </p>

            <h3 className="font-['Fraunces'] text-xl text-[#ede4d4]">
              {order.orderId || order._id}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close order details"
            className="text-[#8a7d6a] hover:text-[#ede4d4] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-5 space-y-6">
          <div>
            <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase mb-3">
              Customer
            </p>

            <div className="space-y-3">
              <DetailRow
                label="Name"
                value={order.reservationDetails?.fullName || "—"}
              />
              <DetailRow
                label="Email"
                value={order.reservationDetails?.email || "—"}
              />
              <DetailRow
                label="Phone"
                value={order.reservationDetails?.phone || "—"}
              />
              <DetailRow
                label="Guests"
                value={String(
                  order.reservationDetails?.guests ?? "—"
                )}
              />
            </div>
          </div>

          <div>
            <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase mb-3">
              Order
            </p>

            <div className="space-y-3">
              <DetailRow
                label="Items"
                value={formatItems(order.items)}
              />
              <DetailRow
                label="Subtotal"
                value={`₦${(order.subtotal || 0).toLocaleString()}`}
              />
              <DetailRow
                label="Service Fee"
                value={`₦${(order.serviceFee || 0).toLocaleString()}`}
              />
              <DetailRow
                label="Total"
                value={`₦${(order.totalPrice || 0).toLocaleString()}`}
              />
              <DetailRow
                label="Reservation"
                value={`${formatDate(order.reservationDetails?.date)} at ${
                  order.reservationDetails?.time || "—"
                }`}
              />
              <DetailRow
                label="Current Status"
                value={getStatusLabel(order.orderStatus)}
              />
            </div>
          </div>

          <div>
            <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase mb-3">
              Payment
            </p>

            <div className="space-y-3">
              <DetailRow
                label="Method"
                value={order.paymentInfo?.paymentMethod || "—"}
              />
              <DetailRow
                label="Payment Status"
                value={order.paymentInfo?.paymentStatus || "—"}
              />
              <DetailRow
                label="Reference"
                value={order.paymentInfo?.reference || "—"}
              />
            </div>
          </div>

          {order.reservationDetails?.specialRequest && (
            <div>
              <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase mb-3">
                Special Request
              </p>

              <p className="text-sm font-['Jost'] text-[#8a7d6a] leading-relaxed break-words">
                {order.reservationDetails.specialRequest}
              </p>
            </div>
          )}

          {/* UPDATE STATUS */}
          <div>
            <label className={labelClass}>Update Status</label>

            <select
              value={order.orderStatus}
              onChange={(e) =>
                onStatusChange(e.target.value as OrderStatus)
              }
              className={inputClass}
            >
              {statuses
                .filter((status) => status.value !== "all")
                .map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
            </select>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 border border-[rgba(196,149,74,0.2)] text-[#c4954a] text-xs font-['DM_Mono'] tracking-widest uppercase hover:bg-[rgba(196,149,74,0.05)] transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ========================================================= */
/* ADMIN ORDERS PAGE */
/* ========================================================= */

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState<OrderStatus | "all">("all");

  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  /* LAZY LOADING */
  const [visibleCount, setVisibleCount] = useState(4);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const loadingTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadingLockRef = useRef(false);

  /* ======================================================= */
  /* FETCH ORDERS */
  /* ======================================================= */

  useEffect(() => {
    let isMounted = true;

    const fetchOrders = async () => {
      try {
        setLoading(true);

        const response = await api.get("/order/all-orders");

        console.log("Orders response:", response.data);

        if (!isMounted) return;

        setOrders(
          Array.isArray(response.data?.orders)
            ? response.data.orders
            : []
        );
      } catch (error: any) {
        console.error("Failed to fetch orders:", error);

        if (isMounted) {
          toast.error(
            error?.response?.data?.message ||
              "Failed to load orders."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  /* ======================================================= */
  /* FILTER ORDERS */
  /* ======================================================= */

  const filteredOrders = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return orders.filter((order) => {
      const matchesStatus =
        statusFilter === "all" ||
        order.orderStatus === statusFilter;

      const customer =
        order.reservationDetails?.fullName?.toLowerCase() || "";

      const email =
        order.reservationDetails?.email?.toLowerCase() || "";

      const orderId = order.orderId?.toLowerCase() || "";

      return (
        matchesStatus &&
        (
          customer.includes(searchTerm) ||
          email.includes(searchTerm) ||
          orderId.includes(searchTerm)
        )
      );
    });
  }, [orders, search, statusFilter]);

  /* ======================================================= */
  /* UPDATE STATUS */
  /* ======================================================= */

  const updateStatus = async (
    id: string,
    status: OrderStatus
  ) => {
    try {
      const response = await api.patch(`/order/${id}/status`, {
        status,
      });

      const updatedOrder = response.data?.order;

      if (updatedOrder) {
        setOrders((current) =>
          current.map((order) =>
            order._id === id ? updatedOrder : order
          )
        );

        setViewOrder(updatedOrder);
      } else {
        setOrders((current) =>
          current.map((order) =>
            order._id === id
              ? { ...order, orderStatus: status }
              : order
          )
        );

        setViewOrder((current) =>
          current?._id === id
            ? { ...current, orderStatus: status }
            : current
        );
      }

      toast.success("Order status updated.");
    } catch (error: any) {
      console.error("Update status error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to update order status."
      );
    }
  };

  /* ======================================================= */
  /* DELETE ORDER */
  /* ======================================================= */

  const deleteOrder = async (order: Order) => {
    const confirmed = window.confirm(
      `Delete order "${order.orderId || order._id}"?`
    );

    if (!confirmed) return;

    try {
      await api.delete(`/order/${order._id}`);

      setOrders((current) =>
        current.filter((item) => item._id !== order._id)
      );

      if (viewOrder?._id === order._id) {
        setViewOrder(null);
      }

      toast.success("Order deleted.");
    } catch (error: any) {
      console.error("Delete order error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete order."
      );
    }
  };

  /* ======================================================= */
  /* LAZY LOAD: FOUR ORDERS PER BATCH */
  /* ======================================================= */

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target || visibleCount >= filteredOrders.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          !entries[0]?.isIntersecting ||
          loadingLockRef.current
        ) {
          return;
        }

        loadingLockRef.current = true;
        observer.unobserve(target);
        setIsLoadingMore(true);

        loadingTimerRef.current = setTimeout(() => {
          setVisibleCount((current) =>
            Math.min(current + 4, filteredOrders.length)
          );

          setIsLoadingMore(false);
          loadingLockRef.current = false;
          loadingTimerRef.current = null;
        }, 500);
      },
      {
        root: null,
        rootMargin: "50px",
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => observer.disconnect();
  }, [visibleCount, filteredOrders.length]);

  /* RESET WHEN FILTERS CHANGE */
  useEffect(() => {
    if (loadingTimerRef.current) {
      clearTimeout(loadingTimerRef.current);
      loadingTimerRef.current = null;
    }

    loadingLockRef.current = false;
    setVisibleCount(4);
    setIsLoadingMore(false);
  }, [search, statusFilter]);

  /* CLEAN UP TIMER */
  useEffect(() => {
    return () => {
      if (loadingTimerRef.current) {
        clearTimeout(loadingTimerRef.current);
      }
    };
  }, []);

  /* ======================================================= */
  /* LOADING SCREEN */
  /* ======================================================= */

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-7 h-px bg-[#c4954a]" />

            <span className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase">
              Restaurant
            </span>
          </div>

          <h2 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
            Orders
          </h2>

          <p className="mt-1 text-sm font-['Jost'] text-[#8a7d6a]">
            Manage restaurant orders and their preparation status.
          </p>
        </div>

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-hidden">
          <div className="flex justify-center py-8">
            <LoaderCircle
              size={28}
              className="animate-spin text-[#c4954a]"
            />
          </div>

          <div className="animate-pulse">
            <div className="h-12 bg-[#211d18]" />

            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-16 border-t border-[rgba(196,149,74,0.06)] bg-[#161310]"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ======================================================= */
  /* PAGE */
  /* ======================================================= */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="w-7 h-px bg-[#c4954a]" />

            <span className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase">
              Restaurant
            </span>
          </div>

          <h2 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
            Orders
          </h2>

          <p className="mt-1 text-sm font-['Jost'] text-[#8a7d6a]">
            Manage restaurant orders and their preparation status.
          </p>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative w-full sm:w-64">
            <Search
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className={`${inputClass} pl-9`}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as OrderStatus | "all"
              )
            }
            className={`${inputClass} sm:w-40`}
          >
            {statuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ORDER COUNT */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
          {filteredOrders.length}{" "}
          {filteredOrders.length === 1 ? "Order" : "Orders"}
        </p>

        {(search || statusFilter !== "all") && (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter("all");
            }}
            className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase hover:text-[#ede4d4] transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* ================================================== */}
      {/* ORDERS TABLE AND MOBILE CARDS */}
      {/* ================================================== */}

      <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-hidden">
        {/* DESKTOP TABLE — RETAINS ORIGINAL DARK GREY BACKGROUND */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#211d18] border-b border-[rgba(196,149,74,0.12)]">
                <th className="px-5 py-4 text-[9px] font-['DM_Mono'] tracking-widest uppercase text-[#8a7d6a]">
                  Order ID
                </th>
                <th className="px-5 py-4 text-[9px] font-['DM_Mono'] tracking-widest uppercase text-[#8a7d6a]">
                  Customer
                </th>
                <th className="px-5 py-4 text-[9px] font-['DM_Mono'] tracking-widest uppercase text-[#8a7d6a]">
                  Items
                </th>
                <th className="px-5 py-4 text-[9px] font-['DM_Mono'] tracking-widest uppercase text-[#8a7d6a]">
                  Total
                </th>
                <th className="px-5 py-4 text-[9px] font-['DM_Mono'] tracking-widest uppercase text-[#8a7d6a]">
                  Status
                </th>
                <th className="px-5 py-4 text-[9px] font-['DM_Mono'] tracking-widest uppercase text-[#8a7d6a]">
                  Date
                </th>
                <th className="px-5 py-4 text-[9px] font-['DM_Mono'] tracking-widest uppercase text-[#8a7d6a] text-right">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.slice(0, visibleCount).map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-[rgba(196,149,74,0.08)] hover:bg-[rgba(196,149,74,0.03)] transition-colors"
                >
                  <td className="px-5 py-4">
                    <span className="text-sm font-['DM_Mono'] text-[#ede4d4]">
                      {order.orderId || order._id}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm text-[#ede4d4]">
                      {order.reservationDetails?.fullName || "Guest"}
                    </p>
                    <p className="mt-1 text-xs text-[#8a7d6a]">
                      {order.reservationDetails?.email || "—"}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="max-w-[220px] truncate text-sm text-[#8a7d6a]">
                      {formatItems(order.items)}
                    </p>
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-sm text-[#c4954a]">
                      ₦{Number(order.totalPrice || 0).toLocaleString()}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <OrderStatusBadge status={order.orderStatus} />
                  </td>

                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-xs text-[#8a7d6a]">
                      {formatDate(order.createdAt)}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setViewOrder(order)}
                        title="View order"
                        aria-label={`View order ${order.orderId}`}
                        className="flex h-9 w-9 items-center justify-center border border-[rgba(196,149,74,0.2)] text-[#c4954a] hover:bg-[rgba(196,149,74,0.1)] transition-colors"
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteOrder(order)}
                        title="Delete order"
                        aria-label={`Delete order ${order.orderId}`}
                        className="flex h-9 w-9 items-center justify-center border border-white/10 text-[#8a7d6a] hover:text-red-400 hover:border-red-400/30 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MOBILE ORDER CARDS — BLACK BACKGROUND + GAP */}
        <div className="md:hidden space-y-4 p-3 sm:p-4">
          {filteredOrders.slice(0, visibleCount).map((order) => (
            <div
              key={order._id}
              className="space-y-4 bg-black border border-[rgba(196,149,74,0.15)] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-[#8a7d6a]">
                    Order ID
                  </p>
                  <p className="mt-1 break-all text-sm font-medium text-[#ede4d4]">
                    {order.orderId || order._id}
                  </p>
                </div>

                <OrderStatusBadge status={order.orderStatus} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-[#8a7d6a]">
                    Customer
                  </p>
                  <p className="mt-1 break-words text-sm text-[#ede4d4]">
                    {order.reservationDetails?.fullName || "Guest"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8a7d6a]">
                    Items
                  </p>
                  <p className="mt-1 text-sm text-[#ede4d4]">
                    {order.items?.reduce(
                      (total, item) => total + (item.quantity || 0),
                      0
                    ) || 0}{" "}
                    items
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8a7d6a]">
                    Total
                  </p>
                  <p className="mt-1 text-sm text-[#c4954a]">
                    ₦{Number(order.totalPrice || 0).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-widest text-[#8a7d6a]">
                    Date
                  </p>
                  <p className="mt-1 text-sm text-[#ede4d4]">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 border-t border-[rgba(196,149,74,0.08)] pt-3">
                <button
                  type="button"
                  onClick={() => setViewOrder(order)}
                  title="View order"
                  className="flex-1 min-h-10 flex items-center justify-center gap-2 border border-[rgba(196,149,74,0.3)] bg-[rgba(196,149,74,0.06)] text-[#c4954a] text-xs font-['Jost'] hover:bg-[rgba(196,149,74,0.12)] transition-colors"
                >
                  <Eye size={15} />
                  View Order
                </button>

                <button
                  type="button"
                  onClick={() => deleteOrder(order)}
                  title="Delete order"
                  className="min-h-10 px-4 flex items-center justify-center gap-2 border border-white/10 text-[#8a7d6a] hover:text-red-400 hover:border-red-400/30 transition-colors text-xs font-['Jost']"
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredOrders.length === 0 && (
          <div className="py-16 text-center">
            <div className="w-10 h-10 mx-auto mb-4 border border-[rgba(196,149,74,0.15)] flex items-center justify-center">
              <Search size={15} className="text-[#8a7d6a]" />
            </div>

            <p className="font-['Fraunces'] text-lg text-[#ede4d4]">
              No orders found
            </p>

            <p className="mt-1 text-sm font-['Jost'] text-[#8a7d6a]">
              Try changing your search or status filter.
            </p>
          </div>
        )}

        {/* LAZY-LOADING SPINNER — DESKTOP + MOBILE */}
        {visibleCount < filteredOrders.length && (
          <div
            ref={loadMoreRef}
            className="flex justify-center items-center py-8"
          >
            <LoaderCircle
              size={28}
              className={`text-[#c4954a] ${
                isLoadingMore ? "animate-spin" : ""
              }`}
            />
          </div>
        )}
      </div>

      {/* ORDER DETAILS MODAL */}
      {viewOrder && (
        <OrderModal
          order={viewOrder}
          onClose={() => setViewOrder(null)}
          onStatusChange={(status) =>
            updateStatus(viewOrder._id, status)
          }
        />
      )}
    </div>
  );
}
