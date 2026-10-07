"use client";

import {
  Calendar,
  BedDouble,
  TrendingUp,
  UtensilsCrossed,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart as RechartsPie,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* ========================================================= */
/* MOCK DATA */
/* ========================================================= */

const bookings = [
  {
    id: "BK-1048",
    guest: "Daniel Okafor",
    apartment: "Presidential Suite",
    checkIn: "Oct 08, 2026",
    total: 2550,
    status: "Confirmed",
  },
  {
    id: "BK-1047",
    guest: "Sarah Williams",
    apartment: "Deluxe Apartment",
    checkIn: "Oct 09, 2026",
    total: 1200,
    status: "Pending",
  },
  {
    id: "BK-1046",
    guest: "Michael Brown",
    apartment: "Executive Suite",
    checkIn: "Oct 10, 2026",
    total: 1800,
    status: "Confirmed",
  },
  {
    id: "BK-1045",
    guest: "Chiamaka Eze",
    apartment: "Presidential Suite",
    checkIn: "Oct 11, 2026",
    total: 3400,
    status: "Checked In",
  },
  {
    id: "BK-1044",
    guest: "David Johnson",
    apartment: "Studio Apartment",
    checkIn: "Oct 12, 2026",
    total: 700,
    status: "Completed",
  },
];

const apartments = [
  {
    id: "APT-001",
    title: "Presidential Suite",
    status: "Occupied",
    type: "Presidential",
  },
  {
    id: "APT-002",
    title: "Executive Suite",
    status: "Occupied",
    type: "Executive",
  },
  {
    id: "APT-003",
    title: "Deluxe Apartment",
    status: "Available",
    type: "Deluxe",
  },
  {
    id: "APT-004",
    title: "Studio Apartment",
    status: "Occupied",
    type: "Studio",
  },
  {
    id: "APT-005",
    title: "Deluxe Apartment",
    status: "Available",
    type: "Deluxe",
  },
  {
    id: "APT-006",
    title: "Executive Suite",
    status: "Occupied",
    type: "Executive",
  },
  {
    id: "APT-007",
    title: "Studio Apartment",
    status: "Available",
    type: "Studio",
  },
  {
    id: "APT-008",
    title: "Presidential Suite",
    status: "Occupied",
    type: "Presidential",
  },
  {
    id: "APT-009",
    title: "Deluxe Apartment",
    status: "Available",
    type: "Deluxe",
  },
  {
    id: "APT-010",
    title: "Executive Suite",
    status: "Maintenance",
    type: "Executive",
  },
  {
    id: "APT-011",
    title: "Studio Apartment",
    status: "Available",
    type: "Studio",
  },
  {
    id: "APT-012",
    title: "Deluxe Apartment",
    status: "Occupied",
    type: "Deluxe",
  },
];

const orders = [
  {
    id: "ORD-2048",
    status: "Pending",
  },
  {
    id: "ORD-2047",
    status: "Preparing",
  },
  {
    id: "ORD-2046",
    status: "Completed",
  },
  {
    id: "ORD-2045",
    status: "Pending",
  },
  {
    id: "ORD-2044",
    status: "Preparing",
  },
];

const reviews = [
  {
    id: "REV-001",
    rating: 5,
  },
  {
    id: "REV-002",
    rating: 4,
  },
  {
    id: "REV-003",
    rating: 5,
  },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 420000 },
  { month: "Feb", revenue: 510000 },
  { month: "Mar", revenue: 460000 },
  { month: "Apr", revenue: 680000 },
  { month: "May", revenue: 620000 },
  { month: "Jun", revenue: 790000 },
  { month: "Jul", revenue: 850000 },
  { month: "Aug", revenue: 920000 },
  { month: "Sep", revenue: 1040000 },
  { month: "Oct", revenue: 1180000 },
];

const APT_TYPE_DATA = [
  {
    name: "Deluxe",
    value: 4,
    color: "#c4954a",
  },
  {
    name: "Executive",
    value: 3,
    color: "#8a7d6a",
  },
  {
    name: "Studio",
    value: 3,
    color: "#6f6253",
  },
  {
    name: "Presidential",
    value: 2,
    color: "#ede4d4",
  },
];

/* ========================================================= */
/* STATUS BADGE */
/* ========================================================= */

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Confirmed:
      "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",

    Pending:
      "text-amber-400 bg-amber-400/10 border-amber-400/20",

    "Checked In":
      "text-blue-400 bg-blue-400/10 border-blue-400/20",

    Completed:
      "text-[#8a7d6a] bg-[#8a7d6a]/10 border-[#8a7d6a]/20",

    Preparing:
      "text-orange-400 bg-orange-400/10 border-orange-400/20",

    Cancelled:
      "text-red-400 bg-red-400/10 border-red-400/20",
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
        uppercase
        tracking-wider
        ${styles[status] ?? "text-[#8a7d6a] border-[#8a7d6a]/20"}
      `}
    >
      {status}
    </span>
  );
}

/* ========================================================= */
/* DASHBOARD */
/* ========================================================= */

export default function AdminDashboard() {
  /* ========================= */
  /* DASHBOARD CALCULATIONS */
  /* ========================= */

  const occupied = apartments.filter(
    (apartment) => apartment.status === "Occupied"
  ).length;

  const revenue = bookings.reduce(
    (total, booking) => total + booking.total,
    0
  );

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "Pending" ||
      order.status === "Preparing"
  ).length;

  return (
    <div className="space-y-6">

      {/* ================================================= */}
      {/* PAGE INTRO */}
      {/* ================================================= */}

      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="w-7 h-px bg-[#c4954a]" />

          <span className="text-[9px] font-['DM_Mono'] text-[#c4954a] tracking-[0.25em] uppercase">
            Overview
          </span>
        </div>

        <h2 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
          Welcome back, Admin
        </h2>

        <p className="mt-1 text-sm font-['Jost'] text-[#8a7d6a]">
          Here's what's happening at Cedar Court today.
        </p>
      </div>

      {/* ================================================= */}
      {/* STAT CARDS */}
      {/* ================================================= */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        {/* Total Bookings */}

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-4 sm:p-5">

          <div className="flex items-center justify-between mb-3">

            <span className="text-[9px] sm:text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
              Total Bookings
            </span>

            <Calendar
              size={15}
              strokeWidth={1.7}
              className="text-blue-400"
            />

          </div>

          <div className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
            {bookings.length}
          </div>

          <p className="mt-1 text-[9px] font-['DM_Mono'] text-[#8a7d6a]/60">
            This period
          </p>

        </div>

        {/* Occupied Apartments */}

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-4 sm:p-5">

          <div className="flex items-center justify-between mb-3">

            <span className="text-[9px] sm:text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
              Occupied Apts
            </span>

            <BedDouble
              size={15}
              strokeWidth={1.7}
              className="text-[#c4954a]"
            />

          </div>

          <div className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
            {occupied}/{apartments.length}
          </div>

          <p className="mt-1 text-[9px] font-['DM_Mono'] text-[#8a7d6a]/60">
            Current occupancy
          </p>

        </div>

        {/* Revenue */}

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-4 sm:p-5">

          <div className="flex items-center justify-between mb-3">

            <span className="text-[9px] sm:text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
              Total Revenue
            </span>

            <TrendingUp
              size={15}
              strokeWidth={1.7}
              className="text-emerald-400"
            />

          </div>

          <div className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
            ₦{revenue.toLocaleString()}
          </div>

          <p className="mt-1 text-[9px] font-['DM_Mono'] text-[#8a7d6a]/60">
            Booking revenue
          </p>

        </div>

        {/* Pending Orders */}

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-4 sm:p-5">

          <div className="flex items-center justify-between mb-3">

            <span className="text-[9px] sm:text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
              Pending Orders
            </span>

            <UtensilsCrossed
              size={15}
              strokeWidth={1.7}
              className="text-amber-400"
            />

          </div>

          <div className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
            {pendingOrders}
          </div>

          <p className="mt-1 text-[9px] font-['DM_Mono'] text-[#8a7d6a]/60">
            Awaiting preparation
          </p>

        </div>

      </div>

      {/* ================================================= */}
      {/* ANALYTICS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ========================= */}
        {/* MONTHLY REVENUE */}
        {/* ========================= */}

        <div className="lg:col-span-2 bg-[#161310] border border-[rgba(196,149,74,0.1)] p-5">

          <div className="flex items-start justify-between mb-5">

            <div>
              <h2 className="font-['Fraunces'] text-lg text-[#ede4d4]">
                Monthly Revenue
              </h2>

              <p className="mt-1 text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-wider">
                Revenue performance
              </p>
            </div>

            <TrendingUp
              size={16}
              className="text-[#c4954a]"
              strokeWidth={1.5}
            />

          </div>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={REVENUE_DATA}>

              <defs>

                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#c4954a"
                    stopOpacity={0.2}
                  />

                  <stop
                    offset="95%"
                    stopColor="#c4954a"
                    stopOpacity={0}
                  />
                </linearGradient>

              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(196,149,74,0.08)"
              />

              <XAxis
                dataKey="month"
                tick={{
                  fill: "#8a7d6a",
                  fontSize: 10,
                  fontFamily: "DM Mono",
                }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                tick={{
                    fill: "#8a7d6a",
                    fontSize: 9,
                    fontFamily: "DM Mono",
                }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: number) =>
                    `₦${(value / 1000).toFixed(0)}k`
                }
              />

              <Tooltip
                contentStyle={{
                    background: "#161310",
                    border: "1px solid rgba(196,149,74,0.2)",
                    borderRadius: 0,
                    fontFamily: "DM Mono",
                    fontSize: "10px",
                }}
                labelStyle={{
                    color: "#ede4d4",
                }}
                itemStyle={{
                    color: "#c4954a",
                }}
                formatter={(value: number | string) =>
                    `₦${Number(value).toLocaleString()}`
                }
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#c4954a"
                fill="url(#revenueGradient)"
                strokeWidth={2}
              />

            </AreaChart>
          </ResponsiveContainer>

        </div>

        {/* ========================= */}
        {/* APARTMENT TYPES */}
        {/* ========================= */}

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-5">

          <h2 className="font-['Fraunces'] text-lg text-[#ede4d4]">
            Apartment Types
          </h2>

          <p className="mt-1 text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-wider">
            Current inventory
          </p>

          <ResponsiveContainer width="100%" height={200}>
            <RechartsPie>

              <Pie
                data={APT_TYPE_DATA}
                cx="50%"
                cy="50%"
                outerRadius={70}
                dataKey="value"
                strokeWidth={0}
              >
                {APT_TYPE_DATA.map((item) => (
                  <Cell
                    key={item.name}
                    fill={item.color}
                  />
                ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "#161310",
                  border:
                    "1px solid rgba(196,149,74,0.2)",
                  borderRadius: 0,
                  fontFamily: "DM Mono",
                  fontSize: "10px",
                }}
              />

            </RechartsPie>
          </ResponsiveContainer>

          <div className="flex flex-wrap gap-x-4 gap-y-2">

            {APT_TYPE_DATA.map((item) => (
              <span
                key={item.name}
                className="
                  flex
                  items-center
                  gap-1.5
                  text-[9px]
                  font-['DM_Mono']
                  text-[#8a7d6a]
                "
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: item.color,
                  }}
                />

                {item.name}
              </span>
            ))}

          </div>

        </div>

      </div>

      {/* ================================================= */}
      {/* RECENT BOOKINGS */}
      {/* ================================================= */}

      <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-5">

        <div className="flex items-center justify-between mb-4">

          <div>
            <h2 className="font-['Fraunces'] text-lg text-[#ede4d4]">
              Recent Bookings
            </h2>

            <p className="mt-1 text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-wider">
              Latest reservations
            </p>
          </div>

          <span className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-wider">
            {bookings.length} total
          </span>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-xs font-['DM_Mono']">

            <thead>

              <tr className="border-b border-[rgba(196,149,74,0.1)]">

                {[
                  "ID",
                  "Guest",
                  "Apartment",
                  "Check-in",
                  "Status",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="
                      text-left
                      py-3
                      px-2
                      text-[#8a7d6a]
                      tracking-widest
                      uppercase
                      text-[9px]
                      font-normal
                    "
                  >
                    {heading}
                  </th>
                ))}

              </tr>

            </thead>

            <tbody>

              {bookings.slice(0, 5).map((booking) => (
                <tr
                  key={booking.id}
                  className="
                    border-b
                    border-[rgba(196,149,74,0.06)]
                    hover:bg-[rgba(196,149,74,0.03)]
                    transition-colors
                  "
                >

                  <td className="py-3 px-2 text-[#c4954a]">
                    {booking.id}
                  </td>

                  <td className="py-3 px-2 text-[#ede4d4]">
                    {booking.guest}
                  </td>

                  <td className="py-3 px-2 text-[#8a7d6a] hidden sm:table-cell">
                    {booking.apartment}
                  </td>

                  <td className="py-3 px-2 text-[#8a7d6a] hidden md:table-cell">
                    {booking.checkIn}
                  </td>

                  <td className="py-3 px-2">
                    <StatusBadge status={booking.status} />
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================================================= */}
      {/* SMALL FOOTER NOTE */}
      {/* ================================================= */}

      <div className="flex items-center justify-between px-1">

        <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a]/50 uppercase tracking-wider">
          Cedar Court Administration
        </p>

        <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a]/50">
          Dashboard Preview
        </p>

      </div>

    </div>
  );
}