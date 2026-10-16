"use client";

import { useEffect, useMemo, useState } from "react";
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
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/lib/api";

/* =========================================================
   BACKEND TYPES
========================================================= */

type BackendBookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

type BackendPaymentStatus =
  | "unpaid"
  | "paid"
  | "refunded";

type Booking = {
  _id: string;
  bookingId?: string;
  bookingReference?: string;
  reference?: string;

  user: {
    _id: string;
    name: string;
    email: string;
  } | null;

  apartment: {
    _id: string;
    title: string;
    price: number;
    gallery?: {
      _id?: string;
      url: string;
      type?: string;
      alt?: string;
    }[];
    category?: string;
  } | null;

  checkIn: string;
  checkOut: string;

  guests: number;
  nights: number;

  pricePerNight: number;
  subtotal: number;
  serviceFee: number;
  tax: number;
  totalAmount: number;

  status: BackendBookingStatus;
  paymentStatus: BackendPaymentStatus;

  paymentReference?: string | null;

  createdAt: string;
  updatedAt: string;
};


/* =========================================================
   STATUS LABEL
========================================================= */

function getStatusLabel(
  status: BackendBookingStatus
) {
  const labels: Record<BackendBookingStatus, string> = {
    pending: "Pending",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    completed: "Completed",
  };

  return labels[status];
}


/* =========================================================
   PAYMENT LABEL
========================================================= */

function getPaymentLabel(
  status: BackendPaymentStatus
) {
  const labels: Record<BackendPaymentStatus, string> = {
    unpaid: "Unpaid",
    paid: "Paid",
    refunded: "Refunded",
  };

  return labels[status];
}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(date: string) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
}


/* =========================================================
   DISPLAY BOOKING ID
========================================================= */

function getBookingDisplayId(booking: Booking) {
  return (
    booking.bookingId ||
    booking.bookingReference ||
    booking.reference ||
    booking._id
  );
}


/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  status,
}: {
  status: BackendBookingStatus;
}) {
  const styles: Record<
    BackendBookingStatus,
    string
  > = {
    confirmed:
      "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",

    pending:
      "text-amber-400 bg-amber-400/10 border-amber-400/20",

    completed:
      "text-[#c4954a] bg-[#c4954a]/10 border-[#c4954a]/20",

    cancelled:
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
      {getStatusLabel(status)}
    </span>
  );
}


/* =========================================================
   PAYMENT BADGE
========================================================= */

function PaymentBadge({
  status,
}: {
  status: BackendPaymentStatus;
}) {
  const styles: Record<
    BackendPaymentStatus,
    string
  > = {
    paid: "text-emerald-400",
    unpaid: "text-amber-400",
    refunded: "text-red-400",
  };

  return (
    <span
      className={`
        text-[9px]
        font-['DM_Mono']
        uppercase
        tracking-wider
        ${styles[status]}
      `}
    >
      {getPaymentLabel(status)}
    </span>
  );
}


/* =========================================================
   BOOKING MODAL
========================================================= */

function BookingModal({
  booking,
  onClose,
}: {
  booking: Booking;
  onClose: () => void;
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
              {booking._id}
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

          {/* =================================================
              GUEST
          ================================================= */}

          <div>

            <div className="flex items-center gap-2 mb-3">

              <User
                size={14}
                className="text-[#c4954a]"
              />

              <h3 className="font-['Fraunces'] text-base text-[#ede4d4]">
                Guest Information
              </h3>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <InfoBox
                label="Guest"
                value={booking.user?.name || "Unknown guest"}
                icon={<User size={13} />}
              />

              <InfoBox
                label="Email"
                value={booking.user?.email || "—"}
                icon={<Mail size={13} />}
              />

              <InfoBox
                label="Guests"
                value={`${booking.guests} ${
                  booking.guests === 1
                    ? "Guest"
                    : "Guests"
                }`}
                icon={<Users size={13} />}
              />

              <InfoBox
                label="Booking ID"
                value={booking._id}
                icon={<CreditCard size={13} />}
              />

            </div>

          </div>


          {/* =================================================
              STAY
          ================================================= */}

          <div>

            <div className="flex items-center gap-2 mb-3">

              <CalendarDays
                size={14}
                className="text-[#c4954a]"
              />

              <h3 className="font-['Fraunces'] text-base text-[#ede4d4]">
                Stay Details
              </h3>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <InfoBox
                label="Apartment"
                value={
                  booking.apartment?.title ||
                  "Apartment unavailable"
                }
                icon={<BedDouble size={13} />}
              />

              <InfoBox
                label="Duration"
                value={`${booking.nights} ${
                  booking.nights === 1
                    ? "Night"
                    : "Nights"
                }`}
                icon={<Clock size={13} />}
              />

              <InfoBox
                label="Check-in"
                value={formatDate(booking.checkIn)}
                icon={<CalendarDays size={13} />}
              />

              <InfoBox
                label="Check-out"
                value={formatDate(booking.checkOut)}
                icon={<CalendarDays size={13} />}
              />

            </div>

          </div>


          {/* =================================================
              PAYMENT
          ================================================= */}

          <div>

            <div className="flex items-center gap-2 mb-3">

              <CreditCard
                size={14}
                className="text-[#c4954a]"
              />

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
                    ₦{booking.totalAmount.toLocaleString()}
                  </p>

                </div>

                <PaymentBadge
                  status={booking.paymentStatus}
                />

              </div>


              <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-[rgba(196,149,74,0.08)]">

                <div>
                  <p className="text-[8px] text-[#8a7d6a] uppercase tracking-widest">
                    Subtotal
                  </p>

                  <p className="text-xs text-[#ede4d4] mt-1">
                    ₦{booking.subtotal.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-[8px] text-[#8a7d6a] uppercase tracking-widest">
                    Service
                  </p>

                  <p className="text-xs text-[#ede4d4] mt-1">
                    ₦{booking.serviceFee.toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-[8px] text-[#8a7d6a] uppercase tracking-widest">
                    Tax
                  </p>

                  <p className="text-xs text-[#ede4d4] mt-1">
                    ₦{booking.tax.toLocaleString()}
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              PAYMENT REFERENCE
          ================================================= */}

          {booking.paymentReference && (
            <div>

              <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mb-2">
                Payment Reference
              </p>

              <div className="bg-[#0c0a08] border border-[rgba(196,149,74,0.08)] p-3">

                <p className="text-xs font-['DM_Mono'] text-[#ede4d4] break-all">
                  {booking.paymentReference}
                </p>

              </div>

            </div>
          )}


          {/* =================================================
              STATUS
          ================================================= */}

          <div>

            <div className="flex items-center justify-between mb-2">

              <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest">
                Booking Status
              </p>

              <StatusBadge
                status={booking.status}
              />

            </div>

            <p className="text-xs font-['Jost'] text-[#8a7d6a]">
              Booking status is currently managed by the
              booking/payment flow.
            </p>

          </div>


          {/* =================================================
              CREATED
          ================================================= */}

          <div className="pt-2 border-t border-[rgba(196,149,74,0.08)]">

            <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest">
              Booking Created
            </p>

            <p className="text-xs font-['Jost'] text-[#ede4d4] mt-1">
              {formatDate(booking.createdAt)}
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

        <span className="text-[#8a7d6a]">
          {icon}
        </span>

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

  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [viewBooking, setViewBooking] =
    useState<Booking | null>(null);


  /* =======================================================
     FETCH BOOKINGS
  ======================================================= */

  useEffect(() => {

    const fetchBookings = async () => {

      try {

        setLoading(true);

        const response = await api.get(
          "/admin/bookings"
        );

        console.log(
          "REAL BOOKINGS:",
          response.data
        );

        setBookings(
          response.data.bookings || []
        );

      } catch (error: any) {

        console.error(
          "BOOKINGS ERROR:",
          error.response?.data ||
            error.message
        );

        const message =
          error.response?.data?.message ||
          "Unable to load bookings.";

        toast.error(message);

      } finally {

        setLoading(false);

      }
    };

    fetchBookings();

  }, []);


  /* =======================================================
     FILTER BOOKINGS
  ======================================================= */

  const filteredBookings = useMemo(() => {

    const query =
      search.toLowerCase().trim();

    if (!query) {
      return bookings;
    }

    return bookings.filter(
      (booking) =>
        booking.user?.name
          ?.toLowerCase()
          .includes(query) ||

        booking.user?.email
          ?.toLowerCase()
          .includes(query) ||

        booking._id
          .toLowerCase()
          .includes(query) ||

        booking.apartment?.title
          ?.toLowerCase()
          .includes(query)
    );

  }, [bookings, search]);


  /* =======================================================
     SUMMARY COUNTS
  ======================================================= */

  const confirmedCount =
    bookings.filter(
      (booking) =>
        booking.status === "confirmed"
    ).length;

  const pendingCount =
    bookings.filter(
      (booking) =>
        booking.status === "pending"
    ).length;

  /*
   * Your current Booking schema does not have
   * "checkedIn".
   *
   * So for now this represents completed stays.
   *
   * We can change this later when you add
   * checked-in / checked-out states.
   */

  const completedCount =
    bookings.filter(
      (booking) =>
        booking.status === "completed"
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
            onChange={(e) =>
              setSearch(e.target.value)
            }
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

        {/* CONFIRMED */}

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


        {/* PENDING */}

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


        {/* COMPLETED */}

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-4">

          <div className="flex items-center justify-between">

            <span className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
              Completed
            </span>

            <BedDouble
              size={15}
              className="text-[#c4954a]"
            />

          </div>

          <p className="font-['Fraunces'] text-2xl text-[#ede4d4] mt-2">
            {completedCount}
          </p>

        </div>

      </div>


      {/* =====================================================
          BOOKINGS TABLE
      ===================================================== */}

      <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-hidden">


        {/* TABLE HEADER */}

        <div className="px-4 sm:px-5 py-3 border-b border-[rgba(196,149,74,0.08)] flex items-center justify-between">

          <div>

            <h3 className="font-['Fraunces'] text-base text-[#ede4d4]">
              All Bookings
            </h3>

            <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mt-0.5">
              {filteredBookings.length} reservation
              {filteredBookings.length !== 1
                ? "s"
                : ""}
            </p>

          </div>

        </div>


        




        
{/* =====================================================
    MOBILE BOOKING CARDS
    Visible only on mobile — desktop table stays intact
===================================================== */}

<div className="md:hidden divide-y divide-[rgba(196,149,74,0.08)]">

  {/* MOBILE LOADING */}

  {loading && (
    <div className="py-12 text-center">
      <div className="w-6 h-6 mx-auto border-2 border-[#c4954a]/20 border-t-[#c4954a] rounded-full animate-spin mb-3" />

      <p className="text-xs font-['Jost'] text-[#8a7d6a]">
        Loading bookings...
      </p>
    </div>
  )}

  {/* MOBILE BOOKING CARDS */}

  {!loading &&
    filteredBookings.map((booking) => (
      <div
        key={booking._id}
        className="p-4 space-y-4"
      >
        {/* Guest and booking ID */}

        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-['Jost'] text-[#ede4d4] break-words">
              {booking.user?.name || "Unknown guest"}
            </p>

            <p className="text-[10px] font-['Jost'] text-[#8a7d6a] mt-1 break-all">
              {booking.user?.email || "No email"}
            </p>

            <p className="text-[9px] font-['DM_Mono'] text-[#c4954a] mt-2">
              {getBookingDisplayId(booking)}
            </p>
          </div>

          <div className="shrink-0">
            <StatusBadge status={booking.status} />
          </div>
        </div>

        {/* Apartment */}

        <div className="bg-[#0c0a08] border border-[rgba(196,149,74,0.08)] p-3">
          <div className="flex items-start gap-2">
            <BedDouble
              size={15}
              className="text-[#c4954a] mt-0.5 shrink-0"
            />

            <div className="min-w-0">
              <p className="text-[8px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mb-1">
                Apartment
              </p>

              <p className="text-xs font-['Jost'] text-[#ede4d4] break-words">
                {booking.apartment?.title || "Apartment unavailable"}
              </p>
            </div>
          </div>
        </div>

        {/* Dates and guests */}

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-[8px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mb-1.5">
              Check-in
            </p>

            <p className="text-xs font-['Jost'] text-[#ede4d4]">
              {formatDate(booking.checkIn)}
            </p>
          </div>

          <div>
            <p className="text-[8px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mb-1.5">
              Check-out
            </p>

            <p className="text-xs font-['Jost'] text-[#ede4d4]">
              {formatDate(booking.checkOut)}
            </p>
          </div>

          <div>
            <p className="text-[8px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mb-1.5">
              Guests
            </p>

            <p className="text-xs font-['Jost'] text-[#ede4d4]">
              {booking.guests} {booking.guests === 1 ? "Guest" : "Guests"}
            </p>
          </div>

          <div>
            <p className="text-[8px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mb-1.5">
              Total
            </p>

            <p className="text-sm font-['Fraunces'] text-[#ede4d4]">
              ₦{booking.totalAmount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Mobile actions */}

        <div className="flex items-center gap-3 pt-3 border-t border-[rgba(196,149,74,0.08)]">
          <button
            type="button"
            onClick={() => setViewBooking(booking)}
            className="flex-1 min-h-10 flex items-center justify-center gap-2 border border-[rgba(196,149,74,0.3)] bg-[rgba(196,149,74,0.06)] text-[#c4954a] text-xs font-['Jost'] hover:bg-[rgba(196,149,74,0.12)] transition-colors"
            aria-label={`View booking ${booking._id}`}
          >
            <Eye size={15} />
            View Booking
          </button>

          <button
            type="button"
            title="Delete booking is currently unavailable"
            disabled
            className="min-h-10 px-4 flex items-center justify-center gap-2 border border-white/5 text-[#8a7d6a]/40 cursor-not-allowed text-xs font-['Jost']"
            aria-label="Delete booking unavailable"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>
    ))}

  {/* MOBILE EMPTY STATE */}

  {!loading && filteredBookings.length === 0 && (
    <div className="py-12 px-4 text-center">
      <Search
        size={24}
        className="mx-auto text-[#8a7d6a]/50 mb-3"
      />

      <h3 className="font-['Fraunces'] text-lg text-[#ede4d4]">
        No bookings found
      </h3>

      <p className="text-xs font-['Jost'] text-[#8a7d6a] mt-1">
        Try a different guest, booking ID, or apartment.
      </p>
    </div>
  )}
</div>



        <div className="hidden md:block overflow-x-auto">

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

              {/* LOADING */}

              {loading && (

                <tr>

                  <td
                    colSpan={7}
                    className="py-16 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <div className="w-6 h-6 border-2 border-[#c4954a]/20 border-t-[#c4954a] rounded-full animate-spin mb-3" />

                      <p className="text-xs font-['Jost'] text-[#8a7d6a]">
                        Loading bookings...
                      </p>

                    </div>

                  </td>

                </tr>

              )}


              {/* BOOKINGS */}

              {!loading &&
                filteredBookings.map(
                  (booking) => (

                    <tr
                      key={booking._id}
                      className="
                        border-b
                        border-[rgba(196,149,74,0.06)]
                        hover:bg-[rgba(196,149,74,0.03)]
                        transition-colors
                      "
                    >

                      {/* ID */}

                      <td className="py-3.5 px-4 text-[#c4954a] whitespace-nowrap">

                        {getBookingDisplayId(booking)}

                      </td>


                      {/* GUEST */}

                      <td className="py-3.5 px-4">

                        <div>

                          <p className="text-[#ede4d4]">

                            {booking.user?.name ||
                              "Unknown guest"}

                          </p>

                          <p className="text-[9px] text-[#8a7d6a] mt-0.5">

                            {booking.user?.email ||
                              "No email"}

                          </p>

                        </div>

                      </td>


                      {/* APARTMENT */}

                      <td className="py-3.5 px-4 text-[#8a7d6a]">

                        {booking.apartment?.title ||
                          "Apartment unavailable"}

                      </td>


                      {/* DATES */}

                      <td className="py-3.5 px-4 text-[#8a7d6a] whitespace-nowrap">

                        {formatDate(
                          booking.checkIn
                        )}

                        <span className="text-[#c4954a] mx-1.5">
                          →
                        </span>

                        {formatDate(
                          booking.checkOut
                        )}

                      </td>


                      {/* TOTAL */}

                      <td className="py-3.5 px-4 text-[#ede4d4] whitespace-nowrap">

                        ₦
                        {booking.totalAmount.toLocaleString()}

                      </td>


                      {/* STATUS */}

                      <td className="py-3.5 px-4">

                        <StatusBadge
                          status={booking.status}
                        />

                      </td>


                      {/* ACTIONS */}

                      <td className="py-3.5 px-4">

                        <div className="flex items-center gap-3">

                          <button
                            type="button"
                            onClick={() =>
                              setViewBooking(
                                booking
                              )
                            }
                            title="View booking"
                            className="text-[#8a7d6a] hover:text-[#c4954a] transition-colors"
                          >
                            <Eye size={15} />
                          </button>


                          {/* Delete button intentionally
                              disabled for now because
                              your backend has no admin
                              delete-booking endpoint. */}

                          <button
                            type="button"
                            title="Delete booking"
                            disabled
                            className="text-[#8a7d6a]/30 cursor-not-allowed"
                          >
                            <Trash2 size={15} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

            </tbody>

          </table>


          {/* EMPTY */}

          {!loading &&
            filteredBookings.length === 0 && (

              <div className="py-16 text-center">

                <Search
                  size={24}
                  className="mx-auto text-[#8a7d6a]/50 mb-3"
                />

                <h3 className="font-['Fraunces'] text-lg text-[#ede4d4]">
                  No bookings found
                </h3>

                <p className="text-xs font-['Jost'] text-[#8a7d6a] mt-1">
                  Try searching for a different guest,
                  booking ID, or apartment.
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
          onClose={() =>
            setViewBooking(null)
          }
        />

      )}

    </div>
  );
}