// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
// import api from "@/lib/api";
// import DetailsPage from "@/component/user/DetailsPage";

// export default function BookingSuccessPage() {
  
// //   const searchParams = useSearchParams();

//   const reference = searchParams.get("reference");

//   const [booking, setBooking] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBooking = async () => {
//       if (!reference) return;

//       try {
//         const response = await api.get(
//           `/booking/${reference}`
//         );

//         setBooking(response.data);

//       } catch (error) {
//         console.error("Error fetching booking:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooking();
//   }, [reference]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center">
//         <p className="text-[#c4954a]">
//           Loading booking details...
//         </p>
//       </div>
//     );
//   }

//   if (!booking) {
//     return (
//       <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center">
//         <p className="text-[#ede4d4]">
//           Booking not found.
//         </p>
//       </div>
//     );
//   }

  // return (
  //   <DetailsPage
  //     type="room"
  //     reference="BOOK-TEST1234"
  //     setPage={(page) => {
  //       console.log("Navigate to:", page);
  //     }}
  //     details={{
  //       room: "Deluxe Suite",
  //       checkIn: "August 28, 2026",
  //       checkOut: "August 31, 2026",
  //       total: 150000,
  //     }}
  //   />
  // );
//}











// "use client";

// import { useEffect, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";

// import api from "@/lib/api";
// import DetailsPage from "@/component/user/DetailsPage";

// export default function BookingSuccessPage() {
//     const searchParams = useSearchParams();
//     const router = useRouter();

//     const reference = searchParams.get("reference");

//     const [booking, setBooking] = useState<any>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const verifyAndFetchBooking = async () => {
//             if (!reference) {
//                 setError("Booking reference is missing.");
//                 setLoading(false);
//                 return;
//             }

//             try {
//                 // =========================
//                 // 1. VERIFY PAYSTACK PAYMENT
//                 // =========================

//                 const paymentResponse = await api.get(
//                     `/payment/verify/${reference}`
//                 );

//                 console.log(
//                     "BOOKING PAYMENT VERIFIED:",
//                     paymentResponse.data
//                 );

//                 // =========================
//                 // 2. FETCH UPDATED BOOKING
//                 // =========================

//                 const bookingResponse = await api.get(
//                     `/booking/reference/${reference}`
//                 );

//                 console.log(
//                     "REAL BOOKING:",
//                     bookingResponse.data.booking
//                 );

//                 setBooking(bookingResponse.data.booking);

//             } catch (error: any) {
//                 console.error(
//                     "Payment/booking error:",
//                     error.response?.data || error.message
//                 );

//                 setError(
//                     error.response?.data?.message ||
//                     "Unable to verify your payment or load your booking."
//                 );
//             } finally {
//                 setLoading(false);
//             }
//         };

//         verifyAndFetchBooking();
//     }, [reference]);

//     // =========================
//     // LOADING
//     // =========================

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center">
//                 <p className="text-sm font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase">
//                     Confirming your booking...
//                 </p>
//             </div>
//         );
//     }

//     // =========================
//     // ERROR
//     // =========================

//     if (error || !booking) {
//         return (
//             <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center px-6">
//                 <div className="text-center">
//                     <h1 className="font-['Fraunces'] text-3xl text-[#ede4d4] mb-3">
//                         Unable to load booking
//                     </h1>

//                     <p className="font-['Jost'] text-[#8a7d6a] mb-6">
//                         {error || "The booking could not be found."}
//                     </p>

//                     <button
//                         onClick={() => router.push("/")}
//                         className="bg-[#c4954a] text-[#0c0a08] px-6 py-3 font-['Jost'] font-semibold text-sm tracking-widest uppercase"
//                     >
//                         Return Home
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     // =========================
//     // REAL BOOKING DETAILS
//     // =========================

//     const details = {
//         name:
//             booking.guestDetails?.fullName ||
//             booking.guestDetails?.name,

//         email: booking.guestDetails?.email,

//         phone: booking.guestDetails?.phone,

//         room:
//             booking.apartment?.title ||
//             booking.apartment?.name ||
//             "Apartment",

//         checkIn: booking.checkIn
//             ? new Date(booking.checkIn).toLocaleDateString(
//                 "en-GB",
//                 {
//                     day: "numeric",
//                     month: "long",
//                     year: "numeric",
//                 }
//             )
//             : undefined,

//         checkOut: booking.checkOut
//             ? new Date(booking.checkOut).toLocaleDateString(
//                 "en-GB",
//                 {
//                     day: "numeric",
//                     month: "long",
//                     year: "numeric",
//                 }
//             )
//             : undefined,

//         guests: booking.guests,

//         subtotal: booking.subtotal,

//         serviceFee: booking.serviceFee,

//         tax: booking.tax,

//         total:
//             booking.totalPrice ??
//             booking.totalAmount ??
//             booking.total,

//         paymentStatus:
//             booking.paymentInfo?.paymentStatus ??
//             booking.paymentStatus,

//         paymentMethod:
//             booking.paymentInfo?.paymentMethod ??
//             booking.paymentMethod,

//         bookingStatus:
//             booking.bookingStatus ??
//             booking.status,
//     };

//     // =========================
//     // YOUR EXISTING DETAILS PAGE
//     // =========================

//     return (
//         <DetailsPage
//             type="room"
//             reference={
//                 booking.bookingId ||
//                 booking.bookingReference ||
//                 booking.reference ||
//                 booking._id
//             }
//             reviewId={booking._id}
//             details={details}
//             setPage={(page) => {
//                 if (page === "home") {
//                     router.push("/");
//                 }

//                 if (page === "my-bookings") {
//                     router.push("/my-bookings");
//                 }
//             }}
//         />
//     );
// }













"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import api from "@/lib/api";
import DetailsPage from "@/component/user/DetailsPage";

interface Booking {
    _id: string;
    bookingId?: string;
    bookingReference?: string;
    reference?: string;

    apartment?: {
        _id?: string;
        title?: string;
        name?: string;
    };

    guestDetails?: {
        fullName?: string;
        name?: string;
        email?: string;
        phone?: string;
    };

    checkIn?: string;
    checkOut?: string;
    guests?: number;

    subtotal?: number;
    serviceFee?: number;
    tax?: number;
    totalAmount?: number;
    totalPrice?: number;
    total?: number;

    paymentStatus?: string;
    paymentMethod?: string;

    paymentInfo?: {
        paymentStatus?: string;
        paymentMethod?: string;
    };

    bookingStatus?: string;
    status?: string;
}

interface PaymentVerificationResponse {
    success: boolean;
    type: "booking" | "order";
    message: string;
    booking?: Booking;
}

export default function BookingSuccessPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    // Paystack normally returns "reference".
    // trxref is included as a fallback.
    const reference =
        searchParams.get("reference") ||
        searchParams.get("trxref");

    const [booking, setBooking] = useState<Booking | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let cancelled = false;

        const verifyAndFetchBooking = async () => {
            if (!reference) {
                setError("Booking payment reference is missing.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                // =====================================
                // 1. VERIFY PAYMENT AND RETRIEVE BOOKING
                // =====================================

                const response =
                    await api.get<PaymentVerificationResponse>(
                        `/payment/verify/${encodeURIComponent(reference)}`
                    );

                console.log(
                    "BOOKING PAYMENT VERIFICATION:",
                    response.data
                );

                // Ensure this is an apartment booking,
                // not a restaurant order.
                if (response.data.type !== "booking") {
                    throw new Error(
                        "This payment is not associated with an apartment booking."
                    );
                }

                const verifiedBooking = response.data.booking;

                if (!verifiedBooking?._id) {
                    throw new Error(
                        "Payment was verified, but the booking details were not returned."
                    );
                }

                if (!cancelled) {
                    setBooking(verifiedBooking);
                }
            } catch (err: unknown) {
                console.error("Booking verification error:", err);

                let message =
                    "Unable to verify your payment or load your booking.";

                if (typeof err === "object" && err !== null) {
                    const error = err as {
                        message?: string;
                        response?: {
                            data?: {
                                message?: string;
                            };
                        };
                    };

                    message =
                        error.response?.data?.message ||
                        error.message ||
                        message;
                }

                if (!cancelled) {
                    setError(message);
                    setBooking(null);
                }
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        verifyAndFetchBooking();

        return () => {
            cancelled = true;
        };
    }, [reference]);

    // =====================================
    // LOADING
    // =====================================

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center">
                <p className="text-sm font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase">
                    Confirming your booking...
                </p>
            </div>
        );
    }

    // =====================================
    // ERROR
    // =====================================

    if (error || !booking) {
        return (
            <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center px-6">
                <div className="max-w-lg text-center">
                    <h1 className="font-['Fraunces'] text-3xl text-[#ede4d4] mb-3">
                        Unable to load booking
                    </h1>

                    <p className="font-['Jost'] text-[#8a7d6a] mb-6">
                        {error || "The booking could not be found."}
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                        <button
                            onClick={() => router.push("/")}
                            className="bg-[#c4954a] text-[#0c0a08] px-6 py-3 font-['Jost'] font-semibold text-sm tracking-widest uppercase"
                        >
                            Return Home
                        </button>

                        <button
                            onClick={() => router.push("/my-bookings")}
                            className="border border-[#c4954a] text-[#c4954a] px-6 py-3 font-['Jost'] font-semibold text-sm tracking-widest uppercase"
                        >
                            My Bookings
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // =====================================
    // FORMAT DATE
    // =====================================

    const formatDate = (date?: string) => {
        if (!date) return undefined;

        const parsedDate = new Date(date);

        if (Number.isNaN(parsedDate.getTime())) {
            return undefined;
        }

        return parsedDate.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    // =====================================
    // REAL BOOKING DETAILS
    // =====================================

    
const details = {
    room:
        booking.apartment?.title ||
        booking.apartment?.name ||
        "Apartment",

    checkIn: formatDate(booking.checkIn),
    checkOut: formatDate(booking.checkOut),

    guests: booking.guests,

    subtotal: booking.subtotal,
    serviceFee: booking.serviceFee,
    tax: booking.tax,
    total: booking.totalAmount,

    paymentStatus: booking.paymentStatus,
    bookingStatus: booking.status,
};


    // =====================================
    // EXISTING DETAILS PAGE
    // =====================================

    return (
        <DetailsPage
            type="room"
            reference={
                booking.bookingId ||
                booking.bookingReference ||
                booking.reference ||
                reference ||
                booking._id
            }
            reviewId={booking._id}
            details={details}
            setPage={(page) => {
                if (page === "home") {
                    router.push("/");
                }

                if (page === "my-bookings") {
                    router.push("/my-bookings");
                }
            }}
        />
    );
}
