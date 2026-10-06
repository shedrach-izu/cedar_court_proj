"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import api from "@/lib/api";
import DetailsPage from "@/component/user/DetailsPage";

export default function BookingSuccessPage() {
//   const searchParams = useSearchParams();

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

  return (
    <DetailsPage
      type="room"
      reference="BOOK-TEST1234"
      setPage={(page) => {
        console.log("Navigate to:", page);
      }}
      details={{
        room: "Deluxe Suite",
        checkIn: "August 28, 2026",
        checkOut: "August 31, 2026",
        total: 150000,
      }}
    />
  );
}