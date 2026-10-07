"use client";

import { useMemo, useState } from "react";
import {
  Search,
  Eye,
  Trash2,
  X,
  CalendarDays,
  User,
  BedDouble,
  Users,
  CreditCard,
  Clock,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

/* =========================================================
   TYPES
========================================================= */

type BookingStatus =
  | "Confirmed"
  | "Checked In"
  | "Checked Out"
  | "Pending"
  | "Cancelled";

type Booking = {
  id: string;
  guest: string;
  email: string;
  phone: string;
  apartment: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  total: number;
  status: BookingStatus;
  paymentStatus: "Paid" | "Pending" | "Failed";
  bookingDate: string;
  requests: string;
};

/* =========================================================
   MOCK BOOKINGS
========================================================= */

const INITIAL_BOOKINGS: Booking[] = [
  {
    id: "BK-00124",
    guest: "Chinedu Okafor",
    email: "chinedu.okafor@email.com",
    phone: "+234 803 456 7890",
    apartment: "Presidential Suite",
    checkIn: "12 Oct 2026",
    checkOut: "16 Oct 2026",
    guests: 2,
    nights: 4,
    total: 3400000,
    status: "Confirmed",
    paymentStatus: "Paid",
    bookingDate: "05 Oct 2026",
    requests: "Airport pickup requested.",
  },
  {
    id: "BK-00123",
    guest: "Amara Williams",
    email: "amara.williams@email.com",
    phone: "+234 806 123 4567",
    apartment: "Executive Suite",
    checkIn: "10 Oct 2026",
    checkOut: "13 Oct 2026",
    guests: 2,
    nights: 3,
    total: 1650000,
    status: "Checked In",
    paymentStatus: "Paid",
    bookingDate: "28 Sep 2026",
    requests: "Late breakfast requested.",
  },
  {
    id: "BK-00122",
    guest: "Daniel Eze",
    email: "daniel.eze@email.com",
    phone: "+234 812 345 6789",
    apartment: "Deluxe Apartment",
    checkIn: "18 Oct 2026",
    checkOut: "21 Oct 2026",
    guests: 3,
    nights: 3,
    total: 1200000,
    status: "Pending",
    paymentStatus: "Pending",
    bookingDate: "06 Oct 2026",
    requests: "Extra towels.",
  },
  {
    id: "BK-00121",
    guest: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+234 809 876 5432",
    apartment: "Studio Apartment",
    checkIn: "04 Oct 2026",
    checkOut: "07 Oct 2026",
    guests: 1,
    nights: 3,
    total: 750000,
    status: "Checked Out",
    paymentStatus: "Paid",
    bookingDate: "22 Sep 2026",
    requests: "No special requests.",
  },
  {
    id: "BK-00120",
    guest: "Ibrahim Musa",
    email: "ibrahim.musa@email.com",
    phone: "+234 815 555 1234",
    apartment: "Presidential Suite",
    checkIn: "20 Oct 2026",
    checkOut: "25 Oct 2026",
    guests: 4,
    nights: 5,
    total: 4250000,
    status: "Confirmed",
    paymentStatus: "Paid",
    bookingDate: "01 Oct 2026",
    requests: "Celebrating an anniversary.",
  },
  {
    id: "BK-00119",
    guest: "Grace Adeyemi",
    email: "grace.adeyemi@email.com",
    phone: "+234 817 222 3344",
    apartment: "Executive Suite",
    checkIn: "08 Oct 2026",
    checkOut: "10 Oct 2026",
    guests: 2,
    nights: 2,
    total: 1100000,
    status: "Cancelled",
    paymentStatus: "Failed",
    bookingDate: "30 Sep 2026",
    requests: "None.",
  },
];

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    Confirmed:
      "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    "Checked In":
      "text-blue-400 bg-blue-400/10 border-blue-400/20",
    "Checked Out":
      "text-[#c4954a] bg-[#c4954a]/10 border-[#c4954a]/20",
    Pending:
      "text-amber-400 bg-amber-400/10 border-amber-400/20",
    Cancelled:
      "text-red-400 bg-red-400/10 border-red-400/20",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        px-2.5
        py-1
        border
        text-[9px]
        font-['DM_Mono']
        tracking-widest
        uppercase
        whitespace-nowrap
        ${styles[status]}
      `}
    >
      {status}
    </span>
  );
}

/* =========================================================
   PAYMENT BADGE
========================================================= */

function PaymentBadge({
  status,
}: {
  status: Booking["paymentStatus"];
}) {
  const styles = {
    Paid: "text-emerald-400",
    Pending: "text-amber-400",
    Failed: "text-red-400",
  };

  return (
    <span
      className={`text-[9px] font-['DM_Mono'] uppercase tracking-wider ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* =========================================================
   BOOKING MODAL
========================================================= */

function BookingModal({
  booking,
  onClose,
  onStatusChange,
}: {
  booking: Booking;
  onClose: () => void;
  onStatusChange: (status: BookingStatus) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#161310] border border-[rgba(196,149,74,0.18)] shadow-2xl">
        
        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#161310] border-b border-[rgba(196,149,74,0.1)] px-5 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-['DM_Mono'] text-[#c4954a] tracking-[0.2em] uppercase mb-1">
              Reservation
            </p>

            <h2 className="font-['Fraunces'] text-xl text-[#ede4d4]">
              {booking.id}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4] hover:bg-white/5 transition-colors"
          >
            <X size={17} />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">

          {/* Guest */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <User size={14} className="text-[#c4954a]" />
              <h3 className="font-['Fraunces'] text-base text-[#ede4d4]">
                Guest Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoBox
                label="Guest"
                value={booking.guest}
                icon={<User size={13} />}
              />

              <InfoBox
                label="Email"
                value={booking.email}
                icon={<Mail size={13} />}
              />

              <InfoBox
                label="Phone"
                value={booking.phone}
                icon={<Phone size={13} />}
              />

              <InfoBox
                label="Guests"
                value={`${booking.guests} ${booking.guests === 1 ? "Guest" : "Guests"}`}
                icon={<Users size={13} />}
              />
            </div>
          </div>

          {/* Stay */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CalendarDays size={14} className="text-[#c4954a]" />
              <h3 className="font-['Fraunces'] text-base text-[#ede4d4]">
                Stay Details
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoBox
                label="Apartment"
                value={booking.apartment}
                icon={<BedDouble size={13} />}
              />

              <InfoBox
                label="Duration"
                value={`${booking.nights} ${booking.nights === 1 ? "Night" : "Nights"}`}
                icon={<Clock size={13} />}
              />

              <InfoBox
                label="Check-in"
                value={booking.checkIn}
                icon={<CalendarDays size={13} />}
              />

              <InfoBox
                label="Check-out"
                value={booking.checkOut}
                icon={<CalendarDays size={13} />}
              />
            </div>
          </div>

          {/* Payment */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <CreditCard size={14} className="text-[#c4954a]" />
              <h3 className="font-['Fraunces'] text-base text-[#ede4d4]">
                Payment
              </h3>
            </div>

            <div className="bg-[#0c0a08] border border-[rgba(196,149,74,0.08)] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mb-1">
                    Total Amount
                  </p>

                  <p className="font-['Fraunces'] text-xl text-[#ede4d4]">
                    ₦{booking.total.toLocaleString()}
                  </p>
                </div>

                <PaymentBadge status={booking.paymentStatus} />
              </div>
            </div>
          </div>

          {/* Request */}
          <div>
            <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mb-2">
              Special Requests
            </p>

            <div className="bg-[#0c0a08] border border-[rgba(196,149,74,0.08)] p-3">
              <p className="text-sm font-['Jost'] text-[#ede4d4]">
                {booking.requests}
              </p>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mb-2">
              Update Booking Status
            </label>

            <select
              value={booking.status}
              onChange={(e) =>
                onStatusChange(e.target.value as BookingStatus)
              }
              className="
                w-full
                bg-[#0c0a08]
                border
                border-[rgba(196,149,74,0.15)]
                text-[#ede4d4]
                px-3
                py-2.5
                text-sm
                font-['Jost']
                outline-none
                focus:border-[#c4954a]
                transition-colors
              "
            >
              {[
                "Confirmed",
                "Checked In",
                "Checked Out",
                "Pending",
                "Cancelled",
              ].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          {/* Booking date */}
          <div className="pt-2 border-t border-[rgba(196,149,74,0.08)]">
            <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest">
              Booking Created
            </p>

            <p className="text-xs font-['Jost'] text-[#ede4d4] mt-1">
              {booking.bookingDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   INFO BOX
========================================================= */

function InfoBox({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-[#0c0a08] border border-[rgba(196,149,74,0.08)] p-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[#8a7d6a]">{icon}</span>

        <span className="text-[8px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
          {label}
        </span>
      </div>

      <p className="text-xs font-['Jost'] text-[#ede4d4] break-words">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);

  const [search, setSearch] = useState("");

  const [viewBooking, setViewBooking] =
    useState<Booking | null>(null);

  /* =======================================================
     FILTER BOOKINGS
  ======================================================= */

  const filteredBookings = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return bookings;

    return bookings.filter(
      (booking) =>
        booking.guest.toLowerCase().includes(query) ||
        booking.id.toLowerCase().includes(query) ||
        booking.apartment.toLowerCase().includes(query)
    );
  }, [bookings, search]);

  /* =======================================================
     UPDATE STATUS
  ======================================================= */

  const updateStatus = (
    id: string,
    status: BookingStatus
  ) => {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === id
          ? {
              ...booking,
              status,
            }
          : booking
      )
    );

    setViewBooking((current) =>
      current
        ? {
            ...current,
            status,
          }
        : null
    );

    toast.success("Booking status updated.");
  };

  /* =======================================================
     DELETE BOOKING
  ======================================================= */

  const deleteBooking = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this booking?"
    );

    if (!confirmed) return;

    setBookings((currentBookings) =>
      currentBookings.filter((booking) => booking.id !== id)
    );

    if (viewBooking?.id === id) {
      setViewBooking(null);
    }

    toast.success("Booking removed.");
  };

  /* =======================================================
     SUMMARY COUNTS
  ======================================================= */

  const confirmedCount = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const pendingCount = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const checkedInCount = bookings.filter(
    (booking) => booking.status === "Checked In"
  ).length;

  return (
    <div className="space-y-6">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">

        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-px bg-[#c4954a]" />

            <span className="text-[9px] font-['DM_Mono'] text-[#c4954a] tracking-[0.2em] uppercase">
              Reservations
            </span>
          </div>

          <h2 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
            Bookings
          </h2>

          <p className="text-xs font-['Jost'] text-[#8a7d6a] mt-1">
            Manage apartment reservations and guest stays.
          </p>
        </div>

        {/* SEARCH */}

        <div className="relative w-full sm:w-64">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bookings..."
            className="
              w-full
              h-10
              pl-9
              pr-3
              bg-[#161310]
              border
              border-[rgba(196,149,74,0.12)]
              text-[#ede4d4]
              placeholder:text-[#8a7d6a]/60
              text-xs
              font-['Jost']
              outline-none
              focus:border-[rgba(196,149,74,0.4)]
              transition-colors
            "
          />
        </div>
      </div>

      {/* =====================================================
          QUICK STATS
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
              Confirmed
            </span>

            <CheckCircle2
              size={15}
              className="text-emerald-400"
            />
          </div>

          <p className="font-['Fraunces'] text-2xl text-[#ede4d4] mt-2">
            {confirmedCount}
          </p>
        </div>

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
              Pending
            </span>

            <AlertCircle
              size={15}
              className="text-amber-400"
            />
          </div>

          <p className="font-['Fraunces'] text-2xl text-[#ede4d4] mt-2">
            {pendingCount}
          </p>
        </div>

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-4">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
              Checked In
            </span>

            <BedDouble
              size={15}
              className="text-[#c4954a]"
            />
          </div>

          <p className="font-['Fraunces'] text-2xl text-[#ede4d4] mt-2">
            {checkedInCount}
          </p>
        </div>

      </div>

      {/* =====================================================
          BOOKINGS TABLE
      ===================================================== */}

      <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-hidden">

        {/* Table top */}
        <div className="px-4 sm:px-5 py-3 border-b border-[rgba(196,149,74,0.08)] flex items-center justify-between">

          <div>
            <h3 className="font-['Fraunces'] text-base text-[#ede4d4]">
              All Bookings
            </h3>

            <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mt-0.5">
              {filteredBookings.length} reservation
              {filteredBookings.length !== 1 ? "s" : ""}
            </p>
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[850px] text-xs font-['DM_Mono']">

            <thead>
              <tr className="border-b border-[rgba(196,149,74,0.1)]">

                {[
                  "ID",
                  "Guest",
                  "Apartment",
                  "Check-in / Out",
                  "Total",
                  "Status",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="
                      text-left
                      py-3
                      px-4
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

              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="
                    border-b
                    border-[rgba(196,149,74,0.06)]
                    hover:bg-[rgba(196,149,74,0.03)]
                    transition-colors
                  "
                >

                  {/* ID */}

                  <td className="py-3.5 px-4 text-[#c4954a] whitespace-nowrap">
                    {booking.id}
                  </td>

                  {/* Guest */}

                  <td className="py-3.5 px-4">
                    <div>
                      <p className="text-[#ede4d4]">
                        {booking.guest}
                      </p>

                      <p className="text-[9px] text-[#8a7d6a] mt-0.5">
                        {booking.email}
                      </p>
                    </div>
                  </td>

                  {/* Apartment */}

                  <td className="py-3.5 px-4 text-[#8a7d6a]">
                    {booking.apartment}
                  </td>

                  {/* Dates */}

                  <td className="py-3.5 px-4 text-[#8a7d6a] whitespace-nowrap">
                    {booking.checkIn}
                    <span className="text-[#c4954a] mx-1.5">
                      →
                    </span>
                    {booking.checkOut}
                  </td>

                  {/* Total */}

                  <td className="py-3.5 px-4 text-[#ede4d4] whitespace-nowrap">
                    ₦{booking.total.toLocaleString()}
                  </td>

                  {/* Status */}

                  <td className="py-3.5 px-4">
                    <StatusBadge status={booking.status} />
                  </td>

                  {/* Actions */}

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">

                      <button
                        type="button"
                        onClick={() => setViewBooking(booking)}
                        title="View booking"
                        className="text-[#8a7d6a] hover:text-[#c4954a] transition-colors"
                      >
                        <Eye size={15} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteBooking(booking.id)
                        }
                        title="Delete booking"
                        className="text-[#8a7d6a] hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={15} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

          {/* Empty state */}

          {filteredBookings.length === 0 && (
            <div className="py-16 text-center">

              <Search
                size={24}
                className="mx-auto text-[#8a7d6a]/50 mb-3"
              />

              <h3 className="font-['Fraunces'] text-lg text-[#ede4d4]">
                No bookings found
              </h3>

              <p className="text-xs font-['Jost'] text-[#8a7d6a] mt-1">
                Try searching for a different guest, booking ID,
                or apartment.
              </p>

            </div>
          )}

        </div>
      </div>

      {/* =====================================================
          BOOKING MODAL
      ===================================================== */}

      {viewBooking && (
        <BookingModal
          booking={viewBooking}
          onClose={() => setViewBooking(null)}
          onStatusChange={(status) =>
            updateStatus(viewBooking.id, status)
          }
        />
      )}

    </div>
  );
}