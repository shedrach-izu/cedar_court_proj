// "use client";

// import { useState } from "react";
// import { Eye, Search, Trash2, X } from "lucide-react";
// import { toast } from "react-hot-toast";

// /* ========================================================= */
// /* TYPES */
// /* ========================================================= */

// type OrderStatus =
//   | "Pending"
//   | "Preparing"
//   | "Served"
//   | "Delivered"
//   | "Cancelled";

// interface Order {
//   id: string;
//   customer: string;
//   email: string;
//   items: string;
//   total: number;
//   date: string;
//   time: string;
//   status: OrderStatus;
// }

// /* ========================================================= */
// /* MOCK DATA */
// /* ========================================================= */

// const initialOrders: Order[] = [
//   {
//     id: "ORD-1001",
//     customer: "Chinedu Okafor",
//     email: "chinedu@example.com",
//     items: "Jollof Rice × 2, Grilled Chicken × 1",
//     total: 18500,
//     date: "Oct 05, 2026",
//     time: "19:30",
//     status: "Pending",
//   },
//   {
//     id: "ORD-1002",
//     customer: "Sarah Williams",
//     email: "sarah@example.com",
//     items: "Pasta Alfredo × 1, Caesar Salad × 1",
//     total: 12500,
//     date: "Oct 05, 2026",
//     time: "20:15",
//     status: "Preparing",
//   },
//   {
//     id: "ORD-1003",
//     customer: "Emeka Nwosu",
//     email: "emeka@example.com",
//     items: "Beef Steak × 2, French Fries × 2",
//     total: 32000,
//     date: "Oct 04, 2026",
//     time: "18:45",
//     status: "Served",
//   },
//   {
//     id: "ORD-1004",
//     customer: "Amaka Eze",
//     email: "amaka@example.com",
//     items: "Seafood Rice × 1, Chapman × 2",
//     total: 15000,
//     date: "Oct 04, 2026",
//     time: "21:00",
//     status: "Delivered",
//   },
//   {
//     id: "ORD-1005",
//     customer: "David Johnson",
//     email: "david@example.com",
//     items: "Chicken Burger × 2, Coke × 2",
//     total: 11000,
//     date: "Oct 03, 2026",
//     time: "17:20",
//     status: "Cancelled",
//   },
//   {
//     id: "ORD-1006",
//     customer: "Ifeoma Obi",
//     email: "ifeoma@example.com",
//     items: "Pepper Soup × 2, Fried Plantain × 1",
//     total: 9500,
//     date: "Oct 03, 2026",
//     time: "20:40",
//     status: "Preparing",
//   },
// ];

// /* ========================================================= */
// /* CONSTANTS */
// /* ========================================================= */

// const statuses = [
//   "All",
//   "Pending",
//   "Preparing",
//   "Served",
//   "Delivered",
//   "Cancelled",
// ];

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
// /* ORDER STATUS BADGE */
// /* ========================================================= */

// function OrderStatusBadge({
//   status,
// }: {
//   status: OrderStatus;
// }) {
//   const styles: Record<OrderStatus, string> = {
//     Pending:
//       "text-amber-400 bg-amber-400/10 border-amber-400/20",

//     Preparing:
//       "text-blue-400 bg-blue-400/10 border-blue-400/20",

//     Served:
//       "text-[#c4954a] bg-[rgba(196,149,74,0.1)] border-[rgba(196,149,74,0.2)]",

//     Delivered:
//       "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",

//     Cancelled:
//       "text-red-400 bg-red-400/10 border-red-400/20",
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
//         ${styles[status]}
//       `}
//     >
//       {status}
//     </span>
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
//   onStatusChange: (status: OrderStatus) => void;
// }) {
//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black/75"
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
//         <div className="flex items-center justify-between px-5 py-4 border-b border-[rgba(196,149,74,0.1)]">
//           <div>
//             <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#8a7d6a] uppercase mb-1">
//               Order Details
//             </p>

//             <h3 className="font-['Fraunces'] text-xl text-[#ede4d4]">
//               {order.id}
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
//         <div className="p-5 space-y-5">
//           {/* Customer */}
//           <div>
//             <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase mb-3">
//               Customer
//             </p>

//             <div className="space-y-3">
//               <DetailRow label="Name" value={order.customer} />
//               <DetailRow label="Email" value={order.email} />
//             </div>
//           </div>

//           {/* Order */}
//           <div>
//             <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase mb-3">
//               Order
//             </p>

//             <div className="space-y-3">
//               <DetailRow label="Items" value={order.items} />
//               <DetailRow
//                 label="Amount"
//                 value={`₦${order.total.toLocaleString()}`}
//               />
//               <DetailRow
//                 label="Date"
//                 value={`${order.date} at ${order.time}`}
//               />
//               <DetailRow
//                 label="Current Status"
//                 value={order.status}
//               />
//             </div>
//           </div>

//           {/* Status */}
//           <div>
//             <label className={labelClass}>
//               Update Status
//             </label>

//             <select
//               value={order.status}
//               onChange={(e) =>
//                 onStatusChange(e.target.value as OrderStatus)
//               }
//               className={inputClass}
//             >
//               {statuses
//                 .filter((status) => status !== "All")
//                 .map((status) => (
//                   <option key={status} value={status}>
//                     {status}
//                   </option>
//                 ))}
//             </select>
//           </div>

//           {/* Close */}
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
// /* ORDERS PAGE */
// /* ========================================================= */

// export default function AdminOrders() {
//   const [orders, setOrders] = useState<Order[]>(initialOrders);

//   const [search, setSearch] = useState("");

//   const [statusFilter, setStatusFilter] =
//     useState("All");

//   const [viewOrder, setViewOrder] =
//     useState<Order | null>(null);

//   /* ======================================================= */
//   /* FILTER ORDERS */
//   /* ======================================================= */

//   const filteredOrders = orders.filter((order) => {
//     const matchesStatus =
//       statusFilter === "All" ||
//       order.status === statusFilter;

//     const searchTerm = search.toLowerCase();

//     const matchesSearch =
//       order.customer.toLowerCase().includes(searchTerm) ||
//       order.id.toLowerCase().includes(searchTerm) ||
//       order.email.toLowerCase().includes(searchTerm);

//     return matchesStatus && matchesSearch;
//   });

//   /* ======================================================= */
//   /* UPDATE STATUS */
//   /* ======================================================= */

//   const updateStatus = (
//     id: string,
//     status: OrderStatus
//   ) => {
//     setOrders((currentOrders) =>
//       currentOrders.map((order) =>
//         order.id === id
//           ? { ...order, status }
//           : order
//       )
//     );

//     setViewOrder((currentOrder) =>
//       currentOrder
//         ? { ...currentOrder, status }
//         : null
//     );

//     toast.success("Order status updated.");
//   };

//   /* ======================================================= */
//   /* DELETE ORDER */
//   /* ======================================================= */

//   const deleteOrder = (id: string) => {
//     setOrders((currentOrders) =>
//       currentOrders.filter((order) => order.id !== id)
//     );

//     if (viewOrder?.id === id) {
//       setViewOrder(null);
//     }

//     toast.success("Order deleted.");
//   };

//   /* ======================================================= */
//   /* PAGE */
//   /* ======================================================= */

//   return (
//     <div className="space-y-6">

//       {/* ================================================== */}
//       {/* PAGE HEADER */}
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

//           {/* Search */}

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
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search orders..."
//               className={`${inputClass} pl-9`}
//             />
//           </div>

//           {/* Status */}

//           <select
//             value={statusFilter}
//             onChange={(e) =>
//               setStatusFilter(e.target.value)
//             }
//             className={`${inputClass} sm:w-40`}
//           >
//             {statuses.map((status) => (
//               <option key={status} value={status}>
//                 {status}
//               </option>
//             ))}
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

//         {search || statusFilter !== "All" ? (
//           <button
//             type="button"
//             onClick={() => {
//               setSearch("");
//               setStatusFilter("All");
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

//         <div className="overflow-x-auto">

//           <table className="w-full text-xs font-['DM_Mono']">

//             {/* TABLE HEADER */}

//             <thead>
//               <tr className="border-b border-[rgba(196,149,74,0.1)]">

//                 {[
//                   "Order ID",
//                   "Customer",
//                   "Items",
//                   "Amount",
//                   "Date",
//                   "Status",
//                   "Actions",
//                 ].map((heading) => (
//                   <th
//                     key={heading}
//                     className="
//                       text-left
//                       py-3
//                       px-4
//                       text-[#8a7d6a]
//                       tracking-widest
//                       uppercase
//                       font-normal
//                       whitespace-nowrap
//                     "
//                   >
//                     {heading}
//                   </th>
//                 ))}

//               </tr>
//             </thead>

//             {/* TABLE BODY */}

//             <tbody>

//               {filteredOrders.map((order) => (
//                 <tr
//                   key={order.id}
//                   className="
//                     border-b
//                     border-[rgba(196,149,74,0.06)]
//                     hover:bg-[rgba(196,149,74,0.03)]
//                     transition-colors
//                   "
//                 >

//                   {/* ID */}

//                   <td className="py-3.5 px-4 text-[#c4954a] whitespace-nowrap">
//                     {order.id}
//                   </td>

//                   {/* CUSTOMER */}

//                   <td className="py-3.5 px-4">
//                     <div className="text-[#ede4d4] whitespace-nowrap">
//                       {order.customer}
//                     </div>

//                     <div className="text-[9px] text-[#8a7d6a] mt-1">
//                       {order.email}
//                     </div>
//                   </td>

//                   {/* ITEMS */}

//                   <td className="py-3.5 px-4 text-[#8a7d6a] max-w-[260px]">
//                     <div className="truncate">
//                       {order.items}
//                     </div>
//                   </td>

//                   {/* AMOUNT */}

//                   <td className="py-3.5 px-4 text-[#ede4d4] whitespace-nowrap">
//                     ₦{order.total.toLocaleString()}
//                   </td>

//                   {/* DATE */}

//                   <td className="py-3.5 px-4 text-[#8a7d6a] whitespace-nowrap">
//                     <div>{order.date}</div>
//                     <div className="text-[9px] mt-1">
//                       {order.time}
//                     </div>
//                   </td>

//                   {/* STATUS */}

//                   <td className="py-3.5 px-4">
//                     <OrderStatusBadge
//                       status={order.status}
//                     />
//                   </td>

//                   {/* ACTIONS */}

//                   <td className="py-3.5 px-4">

//                     <div className="flex items-center gap-3">

//                       {/* VIEW */}

//                       <button
//                         type="button"
//                         onClick={() =>
//                           setViewOrder(order)
//                         }
//                         title="View order"
//                         className="
//                           text-[#8a7d6a]
//                           hover:text-[#c4954a]
//                           transition-colors
//                         "
//                       >
//                         <Eye size={14} />
//                       </button>

//                       {/* DELETE */}

//                       <button
//                         type="button"
//                         onClick={() =>
//                           deleteOrder(order.id)
//                         }
//                         title="Delete order"
//                         className="
//                           text-[#8a7d6a]
//                           hover:text-red-400
//                           transition-colors
//                         "
//                       >
//                         <Trash2 size={14} />
//                       </button>

//                     </div>

//                   </td>

//                 </tr>
//               ))}

//             </tbody>

//           </table>

//         </div>

//         {/* ================================================= */}
//         {/* EMPTY STATE */}
//         {/* ================================================= */}

//         {filteredOrders.length === 0 && (
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
//               Try changing your search or status filter.
//             </p>

//           </div>
//         )}

//       </div>

//       {/* ================================================== */}
//       {/* ORDER DETAILS MODAL */}
//       {/* ================================================== */}

//       {viewOrder && (
//         <OrderModal
//           order={viewOrder}
//           onClose={() => setViewOrder(null)}
//           onStatusChange={(status) =>
//             updateStatus(viewOrder.id, status)
//           }
//         />
//       )}

//     </div>
//   );
// }


















"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Eye,
  Search,
  Trash2,
  X,
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
  image?: {
    url: string;
  };
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
/* STATUS */
/* ========================================================= */

const statuses: {
  value: OrderStatus | "all";
  label: string;
}[] = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "confirmed",
    label: "Confirmed",
  },
  {
    value: "preparing",
    label: "Preparing",
  },
  {
    value: "ready",
    label: "Ready",
  },
  {
    value: "completed",
    label: "Completed",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
  {
    value: "refunded",
    label: "Refunded",
  },
];

/* ========================================================= */
/* INPUT */
/* ========================================================= */

const inputClass = `
  w-full
  bg-[#0c0a08]
  border border-[rgba(196,149,74,0.15)]
  px-3
  py-2.5
  text-sm
  font-['Jost']
  text-[#ede4d4]
  outline-none
  transition-all
  focus:border-[#c4954a]
  placeholder:text-[#8a7d6a]/60
`;

const labelClass = `
  block
  mb-2
  text-[9px]
  font-['DM_Mono']
  text-[#8a7d6a]
  tracking-[0.18em]
  uppercase
`;

/* ========================================================= */
/* STATUS LABEL */
/* ========================================================= */

function getStatusLabel(
  status: OrderStatus
) {
  const statusItem = statuses.find(
    (item) => item.value === status
  );

  return statusItem?.label || status;
}

/* ========================================================= */
/* STATUS BADGE */
/* ========================================================= */

function OrderStatusBadge({
  status,
}: {
  status: OrderStatus;
}) {
  const styles: Record<
    OrderStatus,
    string
  > = {
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
        inline-flex
        items-center
        px-2
        py-1
        border
        text-[9px]
        font-['DM_Mono']
        tracking-wider
        uppercase
        whitespace-nowrap
        ${styles[status]}
      `}
    >
      {getStatusLabel(status)}
    </span>
  );
}

/* ========================================================= */
/* FORMAT DATE */
/* ========================================================= */

function formatDate(date: string) {
  if (!date) return "—";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString(
    "en-US",
    {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }
  );
}

/* ========================================================= */
/* ORDER ITEMS */
/* ========================================================= */

function formatItems(
  items: OrderItem[]
) {
  if (!items?.length) {
    return "No items";
  }

  return items
    .map((item) => {
      const title =
        item.menu?.title ||
        "Unknown item";

      return `${title} × ${item.quantity}`;
    })
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

      <span className="text-sm font-['Jost'] text-[#ede4d4] sm:text-right sm:max-w-[65%]">
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
  onStatusChange: (
    status: OrderStatus
  ) => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* Overlay */}

      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}

      <div
        className="
          relative
          w-full
          max-w-lg
          max-h-[90vh]
          overflow-y-auto
          bg-[#161310]
          border
          border-[rgba(196,149,74,0.15)]
          shadow-2xl
        "
      >

        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-[#161310] border-b border-[rgba(196,149,74,0.1)]">

          <div>

            <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#8a7d6a] uppercase mb-1">
              Order Details
            </p>

            <h3 className="font-['Fraunces'] text-xl text-[#ede4d4]">
              {order.orderId}
            </h3>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-[#8a7d6a] hover:text-[#ede4d4] transition-colors"
          >
            <X size={18} />
          </button>

        </div>

        {/* Content */}

        <div className="p-5 space-y-6">

          {/* CUSTOMER */}

          <div>

            <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase mb-3">
              Customer
            </p>

            <div className="space-y-3">

              <DetailRow
                label="Name"
                value={
                  order.reservationDetails
                    ?.fullName || "—"
                }
              />

              <DetailRow
                label="Email"
                value={
                  order.reservationDetails
                    ?.email || "—"
                }
              />

              <DetailRow
                label="Phone"
                value={
                  order.reservationDetails
                    ?.phone || "—"
                }
              />

              <DetailRow
                label="Guests"
                value={String(
                  order.reservationDetails
                    ?.guests || "—"
                )}
              />

            </div>

          </div>

          {/* ORDER */}

          <div>

            <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase mb-3">
              Order
            </p>

            <div className="space-y-3">

              <DetailRow
                label="Items"
                value={formatItems(
                  order.items
                )}
              />

              <DetailRow
                label="Subtotal"
                value={`₦${(
                  order.subtotal || 0
                ).toLocaleString()}`}
              />

              <DetailRow
                label="Service Fee"
                value={`₦${(
                  order.serviceFee || 0
                ).toLocaleString()}`}
              />

              <DetailRow
                label="Total"
                value={`₦${(
                  order.totalPrice || 0
                ).toLocaleString()}`}
              />

              <DetailRow
                label="Reservation"
                value={`${formatDate(
                  order.reservationDetails?.date
                )} at ${
                  order.reservationDetails
                    ?.time || "—"
                }`}
              />

              <DetailRow
                label="Current Status"
                value={getStatusLabel(
                  order.orderStatus
                )}
              />

            </div>

          </div>

          {/* PAYMENT */}

          <div>

            <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase mb-3">
              Payment
            </p>

            <div className="space-y-3">

              <DetailRow
                label="Method"
                value={
                  order.paymentInfo
                    ?.paymentMethod || "—"
                }
              />

              <DetailRow
                label="Payment Status"
                value={
                  order.paymentInfo
                    ?.paymentStatus || "—"
                }
              />

              <DetailRow
                label="Reference"
                value={
                  order.paymentInfo
                    ?.reference || "—"
                }
              />

            </div>

          </div>

          {/* SPECIAL REQUEST */}

          {order.reservationDetails
            ?.specialRequest && (
            <div>

              <p className="text-[9px] font-['DM_Mono'] tracking-[0.2em] text-[#c4954a] uppercase mb-3">
                Special Request
              </p>

              <p className="text-sm font-['Jost'] text-[#8a7d6a] leading-relaxed">
                {
                  order.reservationDetails
                    .specialRequest
                }
              </p>

            </div>
          )}

          {/* STATUS */}

          <div>

            <label className={labelClass}>
              Update Status
            </label>

            <select
              value={order.orderStatus}
              onChange={(e) =>
                onStatusChange(
                  e.target
                    .value as OrderStatus
                )
              }
              className={inputClass}
            >

              {statuses
                .filter(
                  (status) =>
                    status.value !== "all"
                )
                .map((status) => (
                  <option
                    key={status.value}
                    value={status.value}
                  >
                    {status.label}
                  </option>
                ))}

            </select>

          </div>

          {/* CLOSE */}

          <button
            type="button"
            onClick={onClose}
            className="
              w-full
              py-3
              border
              border-[rgba(196,149,74,0.2)]
              text-[#c4954a]
              text-xs
              font-['DM_Mono']
              tracking-widest
              uppercase
              hover:bg-[rgba(196,149,74,0.05)]
              transition-all
            "
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

  const [orders, setOrders] =
    useState<Order[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState<OrderStatus | "all">(
      "all"
    );

  const [viewOrder, setViewOrder] =
    useState<Order | null>(null);

  /* ======================================================= */
  /* FETCH ALL ORDERS */
  /* ======================================================= */

  useEffect(() => {

    const fetchOrders = async () => {

      try {

        setLoading(true);

        const response = await api.get(
          "/order/all-orders"
        );

        console.log(
          "Orders response:",
          response.data
        );

        if (
          Array.isArray(
            response.data?.orders
          )
        ) {
          setOrders(
            response.data.orders
          );
        } else {
          setOrders([]);
        }

      } catch (error: any) {

        console.error(
          "Failed to fetch orders:",
          error
        );

        console.error(
          "Response:",
          error?.response?.data
        );

        toast.error(
          error?.response?.data?.message ||
          "Failed to load orders."
        );

      } finally {

        setLoading(false);

      }

    };

    fetchOrders();

  }, []);

  /* ======================================================= */
  /* FILTER ORDERS */
  /* ======================================================= */

  const filteredOrders = useMemo(() => {

    const searchTerm =
      search.toLowerCase().trim();

    return orders.filter((order) => {

      const matchesStatus =
        statusFilter === "all" ||
        order.orderStatus ===
          statusFilter;

      const customer =
        order.reservationDetails
          ?.fullName
          ?.toLowerCase() || "";

      const email =
        order.reservationDetails
          ?.email
          ?.toLowerCase() || "";

      const orderId =
        order.orderId
          ?.toLowerCase() || "";

      return (
        matchesStatus &&
        (
          customer.includes(
            searchTerm
          ) ||
          email.includes(
            searchTerm
          ) ||
          orderId.includes(
            searchTerm
          )
        )
      );

    });

  }, [
    orders,
    search,
    statusFilter,
  ]);

  /* ======================================================= */
  /* UPDATE STATUS */
  /* ======================================================= */

  const updateStatus = async (
    id: string,
    status: OrderStatus
  ) => {

    try {

      const response =
        await api.patch(
          `/order/${id}/status`,
          {
            status,
          }
        );

      const updatedOrder =
        response.data?.order;

      if (updatedOrder) {

        setOrders((current) =>
          current.map((order) =>
            order._id === id
              ? updatedOrder
              : order
          )
        );

        setViewOrder(
          updatedOrder
        );

      }

      toast.success(
        "Order status updated."
      );

    } catch (error: any) {

      console.error(
        "Update status error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to update order status."
      );

    }

  };

  /* ======================================================= */
  /* DELETE ORDER */
  /* ======================================================= */

  const deleteOrder = async (
    order: Order
  ) => {

    const confirmed =
      window.confirm(
        `Delete order "${order.orderId}"?`
      );

    if (!confirmed) {
      return;
    }

    try {

      await api.delete(
        `/order/${order._id}`
      );

      setOrders((current) =>
        current.filter(
          (item) =>
            item._id !== order._id
        )
      );

      if (
        viewOrder?._id ===
        order._id
      ) {
        setViewOrder(null);
      }

      toast.success(
        "Order deleted."
      );

    } catch (error: any) {

      console.error(
        "Delete order error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to delete order."
      );

    }

  };

  /* ======================================================= */
  /* LOADING */
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

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-hidden animate-pulse">

          <div className="h-12 bg-[#211d18]" />

          {[1, 2, 3, 4, 5].map(
            (item) => (
              <div
                key={item}
                className="h-16 border-t border-[rgba(196,149,74,0.06)] bg-[#161310]"
              />
            )
          )}

        </div>

      </div>
    );

  }

  /* ======================================================= */
  /* PAGE */
  /* ======================================================= */

  return (
    <div className="space-y-6">

      {/* ================================================== */}
      {/* HEADER */}
      {/* ================================================== */}

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

        {/* Search + Filter */}

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

          <div className="relative w-full sm:w-64">

            <Search
              size={14}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-[#8a7d6a]
              "
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              placeholder="Search orders..."
              className={`${inputClass} pl-9`}
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(
                e.target.value as
                  | OrderStatus
                  | "all"
              )
            }
            className={`${inputClass} sm:w-40`}
          >

            {statuses.map(
              (status) => (
                <option
                  key={status.value}
                  value={status.value}
                >
                  {status.label}
                </option>
              )
            )}

          </select>

        </div>

      </div>

      {/* ================================================== */}
      {/* ORDER COUNT */}
      {/* ================================================== */}

      <div className="flex items-center justify-between">

        <p className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
          {filteredOrders.length}{" "}
          {filteredOrders.length === 1
            ? "Order"
            : "Orders"}
        </p>

        {search ||
        statusFilter !== "all" ? (
          <button
            type="button"
            onClick={() => {
              setSearch("");
              setStatusFilter(
                "all"
              );
            }}
            className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase hover:text-[#ede4d4] transition-colors"
          >
            Clear Filters
          </button>
        ) : null}

      </div>

      {/* ================================================== */}
      {/* TABLE */}
      {/* ================================================== */}

      <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-xs font-['DM_Mono']">

            <thead>

              <tr className="border-b border-[rgba(196,149,74,0.1)]">

                {[
                  "Order ID",
                  "Customer",
                  "Items",
                  "Amount",
                  "Date",
                  "Status",
                  "Actions",
                ].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="
                        text-left
                        py-3
                        px-4
                        text-[#8a7d6a]
                        tracking-widest
                        uppercase
                        font-normal
                        whitespace-nowrap
                      "
                    >
                      {heading}
                    </th>
                  )
                )}

              </tr>

            </thead>

            <tbody>

              {filteredOrders.map(
                (order) => (

                  <tr
                    key={order._id}
                    className="
                      border-b
                      border-[rgba(196,149,74,0.06)]
                      hover:bg-[rgba(196,149,74,0.03)]
                      transition-colors
                    "
                  >

                    {/* ORDER ID */}

                    <td className="py-3.5 px-4 text-[#c4954a] whitespace-nowrap">
                      {order.orderId}
                    </td>

                    {/* CUSTOMER */}

                    <td className="py-3.5 px-4">

                      <div className="text-[#ede4d4] whitespace-nowrap">
                        {
                          order
                            .reservationDetails
                            ?.fullName
                        }
                      </div>

                      <div className="text-[9px] text-[#8a7d6a] mt-1">
                        {
                          order
                            .reservationDetails
                            ?.email
                        }
                      </div>

                    </td>

                    {/* ITEMS */}

                    <td className="py-3.5 px-4 text-[#8a7d6a] max-w-[260px]">

                      <div className="truncate">
                        {formatItems(
                          order.items
                        )}
                      </div>

                    </td>

                    {/* AMOUNT */}

                    <td className="py-3.5 px-4 text-[#ede4d4] whitespace-nowrap">

                      ₦
                      {(
                        order.totalPrice ||
                        0
                      ).toLocaleString()}

                    </td>

                    {/* DATE */}

                    <td className="py-3.5 px-4 text-[#8a7d6a] whitespace-nowrap">

                      <div>
                        {formatDate(
                          order
                            .reservationDetails
                            ?.date
                        )}
                      </div>

                      <div className="text-[9px] mt-1">
                        {
                          order
                            .reservationDetails
                            ?.time
                        }
                      </div>

                    </td>

                    {/* STATUS */}

                    <td className="py-3.5 px-4">

                      <OrderStatusBadge
                        status={
                          order.orderStatus
                        }
                      />

                    </td>

                    {/* ACTIONS */}

                    <td className="py-3.5 px-4">

                      <div className="flex items-center gap-3">

                        <button
                          type="button"
                          onClick={() =>
                            setViewOrder(
                              order
                            )
                          }
                          title="View order"
                          className="
                            text-[#8a7d6a]
                            hover:text-[#c4954a]
                            transition-colors
                          "
                        >
                          <Eye
                            size={14}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            deleteOrder(
                              order
                            )
                          }
                          title="Delete order"
                          className="
                            text-[#8a7d6a]
                            hover:text-red-400
                            transition-colors
                          "
                        >
                          <Trash2
                            size={14}
                          />
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

        {/* EMPTY */}

        {filteredOrders.length ===
          0 && (
          <div className="py-16 text-center">

            <div className="w-10 h-10 mx-auto mb-4 border border-[rgba(196,149,74,0.15)] flex items-center justify-center">

              <Search
                size={15}
                className="text-[#8a7d6a]"
              />

            </div>

            <p className="font-['Fraunces'] text-lg text-[#ede4d4]">
              No orders found
            </p>

            <p className="mt-1 text-sm font-['Jost'] text-[#8a7d6a]">
              Try changing your search
              or status filter.
            </p>

          </div>
        )}

      </div>

      {/* ================================================== */}
      {/* MODAL */}
      {/* ================================================== */}

      {viewOrder && (
        <OrderModal
          order={viewOrder}
          onClose={() =>
            setViewOrder(null)
          }
          onStatusChange={(
            status
          ) =>
            updateStatus(
              viewOrder._id,
              status
            )
          }
        />
      )}

    </div>
  );
}