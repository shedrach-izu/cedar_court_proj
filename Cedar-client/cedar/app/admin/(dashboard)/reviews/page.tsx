// "use client";

// import { useMemo, useState } from "react";
// import {
//   Search,
//   Star,
//   Trash2,
//   MessageSquare,
//   X,
// } from "lucide-react";
// import { toast } from "react-hot-toast";

// type Review = {
//   id: string;
//   user: string;
//   apartment: string;
//   rating: number;
//   comment: string;
//   date: string;
// };

// const INPUT = `
//   w-full
//   bg-[#0c0a08]
//   border
//   border-[rgba(196,149,74,0.15)]
//   px-3 py-2.5
//   text-sm
//   font-['Jost']
//   text-[#ede4d4]
//   outline-none
//   transition-colors
//   focus:border-[rgba(196,149,74,0.5)]
//   placeholder:text-[#8a7d6a]/50
// `;

// const gold = "#c4954a";

// const mockReviews: Review[] = [
//   {
//     id: "REV-001",
//     user: "Daniel Okafor",
//     apartment: "Presidential Suite",
//     rating: 5,
//     comment:
//       "Absolutely beautiful apartment. The service was exceptional and the room was spotless. Will definitely stay here again.",
//     date: "Oct 04, 2026",
//   },
//   {
//     id: "REV-002",
//     user: "Amelia Williams",
//     apartment: "Executive Suite",
//     rating: 5,
//     comment:
//       "The apartment exceeded my expectations. Very peaceful environment and the staff were extremely professional.",
//     date: "Sep 28, 2026",
//   },
//   {
//     id: "REV-003",
//     user: "Chinedu Eze",
//     apartment: "Deluxe Apartment",
//     rating: 4,
//     comment:
//       "Great experience overall. The apartment was spacious and comfortable. Check-in was also very smooth.",
//     date: "Sep 19, 2026",
//   },
//   {
//     id: "REV-004",
//     user: "Sophia Anderson",
//     apartment: "Premium Suite",
//     rating: 5,
//     comment:
//       "Beautiful property with excellent amenities. I particularly enjoyed the living room and balcony.",
//     date: "Aug 30, 2026",
//   },
//   {
//     id: "REV-005",
//     user: "Ibrahim Musa",
//     apartment: "Presidential Suite",
//     rating: 4,
//     comment:
//       "Very luxurious and comfortable. Everything was clean and well maintained. The restaurant was also excellent.",
//     date: "Aug 22, 2026",
//   },
//   {
//     id: "REV-006",
//     user: "Grace Thompson",
//     apartment: "Classic Apartment",
//     rating: 3,
//     comment:
//       "Nice apartment and friendly staff. The stay was good, although I think the room could use some additional lighting.",
//     date: "Aug 11, 2026",
//   },
// ];

// function RatingStars({ rating }: { rating: number }) {
//   return (
//     <div className="flex gap-0.5">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <Star
//           key={star}
//           size={12}
//           fill={star <= rating ? gold : "transparent"}
//           color={star <= rating ? gold : "#6b6052"}
//           strokeWidth={1.5}
//         />
//       ))}
//     </div>
//   );
// }

// function StatCard({
//   label,
//   value,
//   description,
// }: {
//   label: string;
//   value: string;
//   description: string;
// }) {
//   return (
//     <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-5">
//       <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.16em] text-[#8a7d6a]">
//         {label}
//       </p>

//       <h3 className="mt-2 font-['Fraunces'] text-2xl text-[#ede4d4]">
//         {value}
//       </h3>

//       <p className="mt-1 font-['Jost'] text-xs text-[#8a7d6a]">
//         {description}
//       </p>
//     </div>
//   );
// }

// export default function ReviewsPage() {
//   const [reviews, setReviews] = useState<Review[]>(mockReviews);
//   const [search, setSearch] = useState("");
//   const [viewReview, setViewReview] = useState<Review | null>(null);

//   const filteredReviews = useMemo(() => {
//     const query = search.trim().toLowerCase();

//     if (!query) return reviews;

//     return reviews.filter(
//       (review) =>
//         review.user.toLowerCase().includes(query) ||
//         review.apartment.toLowerCase().includes(query) ||
//         review.comment.toLowerCase().includes(query)
//     );
//   }, [reviews, search]);

//   const averageRating =
//     reviews.length > 0
//       ? (
//           reviews.reduce((sum, review) => sum + review.rating, 0) /
//           reviews.length
//         ).toFixed(1)
//       : "0.0";

//   const fiveStarReviews = reviews.filter(
//     (review) => review.rating === 5
//   ).length;

//   const deleteReview = (id: string) => {
//     const review = reviews.find((item) => item.id === id);

//     setReviews((current) =>
//       current.filter((item) => item.id !== id)
//     );

//     toast.success(
//       review
//         ? `Review by ${review.user} deleted.`
//         : "Review deleted."
//     );

//     if (viewReview?.id === id) {
//       setViewReview(null);
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* ========================= */}
//       {/* PAGE HEADER */}
//       {/* ========================= */}

//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.2em] text-[#c4954a]">
//             Guest Feedback
//           </p>

//           <h1 className="mt-1 font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
//             Guest Reviews
//           </h1>

//           <p className="mt-1 font-['Jost'] text-sm text-[#8a7d6a]">
//             Manage guest feedback and apartment ratings.
//           </p>
//         </div>

//         {/* SEARCH */}
//         <div className="relative w-full sm:w-72">
//           <Search
//             size={14}
//             className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
//           />

//           <input
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             placeholder="Search reviews..."
//             className={`${INPUT} pl-9 text-xs`}
//           />
//         </div>
//       </div>

//       {/* ========================= */}
//       {/* REVIEW STATS */}
//       {/* ========================= */}

//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <StatCard
//           label="Total Reviews"
//           value={reviews.length.toString()}
//           description="Guest reviews"
//         />

//         <StatCard
//           label="Average Rating"
//           value={`${averageRating} / 5`}
//           description="Across all reviews"
//         />

//         <StatCard
//           label="5-Star Reviews"
//           value={fiveStarReviews.toString()}
//           description="Excellent experiences"
//         />
//       </div>

//       {/* ========================= */}
//       {/* DESKTOP TABLE */}
//       {/* ========================= */}

//       <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-hidden">
//         <div className="px-5 py-4 border-b border-[rgba(196,149,74,0.1)]">
//           <h2 className="font-['Fraunces'] text-lg text-[#ede4d4]">
//             Review Directory
//           </h2>

//           <p className="mt-1 font-['Jost'] text-xs text-[#8a7d6a]">
//             {filteredReviews.length}{" "}
//             {filteredReviews.length === 1
//               ? "review"
//               : "reviews"}{" "}
//             found
//           </p>
//         </div>

//         <div className="hidden lg:block overflow-x-auto">
//           <table className="w-full min-w-[850px] text-xs font-['DM_Mono']">
//             <thead>
//               <tr className="border-b border-[rgba(196,149,74,0.1)]">
//                 {[
//                   "Guest",
//                   "Apartment",
//                   "Rating",
//                   "Comment",
//                   "Date",
//                   "Actions",
//                 ].map((heading) => (
//                   <th
//                     key={heading}
//                     className="text-left py-3 px-4 text-[9px] text-[#8a7d6a] tracking-[0.15em] uppercase font-normal"
//                   >
//                     {heading}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {filteredReviews.map((review) => (
//                 <tr
//                   key={review.id}
//                   className="border-b border-[rgba(196,149,74,0.06)] hover:bg-[rgba(196,149,74,0.03)] transition-colors"
//                 >
//                   {/* GUEST */}
//                   <td className="py-4 px-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 shrink-0 flex items-center justify-center border border-[rgba(196,149,74,0.2)] bg-[#0c0a08] text-[#c4954a] font-['Fraunces'] text-xs">
//                         {review.user
//                           .split(" ")
//                           .map((word) => word[0])
//                           .join("")
//                           .slice(0, 2)}
//                       </div>

//                       <div>
//                         <p className="text-[#ede4d4]">
//                           {review.user}
//                         </p>

//                         <p className="text-[9px] text-[#8a7d6a] mt-0.5">
//                           {review.id}
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   {/* APARTMENT */}
//                   <td className="py-4 px-4 text-[#8a7d6a]">
//                     {review.apartment}
//                   </td>

//                   {/* RATING */}
//                   <td className="py-4 px-4">
//                     <RatingStars rating={review.rating} />
//                   </td>

//                   {/* COMMENT */}
//                   <td className="py-4 px-4 max-w-[280px]">
//                     <p
//                       className="text-[#8a7d6a] truncate"
//                       title={review.comment}
//                     >
//                       {review.comment}
//                     </p>
//                   </td>

//                   {/* DATE */}
//                   <td className="py-4 px-4 text-[#8a7d6a]">
//                     {review.date}
//                   </td>

//                   {/* ACTIONS */}
//                   <td className="py-4 px-4">
//                     <div className="flex items-center gap-2">
//                       <button
//                         onClick={() => setViewReview(review)}
//                         className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] border border-transparent hover:border-[rgba(196,149,74,0.2)] hover:text-[#c4954a] transition-colors"
//                         title="View review"
//                       >
//                         <MessageSquare size={14} />
//                       </button>

//                       <button
//                         onClick={() => deleteReview(review.id)}
//                         className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] border border-transparent hover:border-red-400/20 hover:text-red-400 transition-colors"
//                         title="Delete review"
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

//         {/* ========================= */}
//         {/* MOBILE REVIEW CARDS */}
//         {/* ========================= */}

//         <div className="lg:hidden divide-y divide-[rgba(196,149,74,0.06)]">
//           {filteredReviews.map((review) => (
//             <div
//               key={`${review.id}-card`}
//               className="p-4 hover:bg-[rgba(196,149,74,0.03)] transition-colors"
//             >
//               <div className="flex items-start justify-between gap-4">
//                 <div className="flex items-center gap-3 min-w-0">
//                   <div className="w-9 h-9 shrink-0 flex items-center justify-center border border-[rgba(196,149,74,0.2)] bg-[#0c0a08] text-[#c4954a] font-['Fraunces'] text-xs">
//                     {review.user
//                       .split(" ")
//                       .map((word) => word[0])
//                       .join("")
//                       .slice(0, 2)}
//                   </div>

//                   <div className="min-w-0">
//                     <p className="text-sm font-['Jost'] text-[#ede4d4] truncate">
//                       {review.user}
//                     </p>

//                     <p className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] truncate">
//                       {review.apartment}
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   onClick={() => deleteReview(review.id)}
//                   className="shrink-0 text-[#8a7d6a] hover:text-red-400 transition-colors"
//                   title="Delete review"
//                 >
//                   <Trash2 size={14} />
//                 </button>
//               </div>

//               <div className="mt-3">
//                 <RatingStars rating={review.rating} />
//               </div>

//               <p className="mt-2 text-xs font-['Jost'] text-[#8a7d6a] leading-relaxed">
//                 {review.comment}
//               </p>

//               <div className="mt-3 flex items-center justify-between">
//                 <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a]/50">
//                   {review.id}
//                 </p>

//                 <p className="text-[10px] font-['DM_Mono'] text-[#8a7d6a]/60">
//                   {review.date}
//                 </p>
//               </div>

//               <button
//                 onClick={() => setViewReview(review)}
//                 className="mt-3 w-full py-2 border border-[rgba(196,149,74,0.12)] text-[9px] font-['DM_Mono'] tracking-[0.15em] uppercase text-[#8a7d6a] hover:text-[#c4954a] hover:border-[rgba(196,149,74,0.3)] transition-colors"
//               >
//                 View Review
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* EMPTY STATE */}

//         {filteredReviews.length === 0 && (
//           <div className="py-16 text-center">
//             <MessageSquare
//               size={28}
//               strokeWidth={1}
//               className="mx-auto text-[#8a7d6a]"
//             />

//             <p className="mt-3 font-['Fraunces'] text-lg text-[#ede4d4]">
//               No reviews found
//             </p>

//             <p className="mt-1 font-['Jost'] text-sm text-[#8a7d6a]">
//               Try searching for another guest or apartment.
//             </p>
//           </div>
//         )}
//       </div>

//       {/* ========================= */}
//       {/* REVIEW DETAILS MODAL */}
//       {/* ========================= */}

//       {viewReview && (
//         <div
//           className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75"
//           onClick={() => setViewReview(null)}
//         >
//           <div
//             className="w-full max-w-lg bg-[#161310] border border-[rgba(196,149,74,0.15)] shadow-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* HEADER */}

//             <div className="px-5 py-4 border-b border-[rgba(196,149,74,0.1)] flex items-center justify-between">
//               <div>
//                 <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.18em] text-[#c4954a]">
//                   Guest Review
//                 </p>

//                 <h2 className="mt-1 font-['Fraunces'] text-xl text-[#ede4d4]">
//                   {viewReview.user}
//                 </h2>
//               </div>

//               <button
//                 onClick={() => setViewReview(null)}
//                 className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4]"
//               >
//                 <X size={17} />
//               </button>
//             </div>

//             {/* CONTENT */}

//             <div className="p-5">
//               <div className="flex items-center justify-between gap-4 pb-5 border-b border-[rgba(196,149,74,0.08)]">
//                 <div>
//                   <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.15em] text-[#8a7d6a]">
//                     Apartment
//                   </p>

//                   <p className="mt-1 font-['Jost'] text-sm text-[#ede4d4]">
//                     {viewReview.apartment}
//                   </p>
//                 </div>

//                 <div className="text-right">
//                   <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.15em] text-[#8a7d6a]">
//                     Rating
//                   </p>

//                   <div className="mt-2">
//                     <RatingStars rating={viewReview.rating} />
//                   </div>
//                 </div>
//               </div>

//               {/* COMMENT */}

//               <div className="mt-5">
//                 <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.15em] text-[#8a7d6a]">
//                   Comment
//                 </p>

//                 <div className="mt-2 p-4 bg-[#0c0a08] border border-[rgba(196,149,74,0.08)]">
//                   <p className="font-['Jost'] text-sm leading-relaxed text-[#ede4d4]">
//                     {viewReview.comment}
//                   </p>
//                 </div>
//               </div>

//               {/* DATE */}

//               <div className="mt-5 flex justify-between items-center">
//                 <span className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.15em] text-[#8a7d6a]">
//                   Review Date
//                 </span>

//                 <span className="font-['Jost'] text-sm text-[#8a7d6a]">
//                   {viewReview.date}
//                 </span>
//               </div>
//             </div>

//             {/* FOOTER */}

//             <div className="px-5 py-4 border-t border-[rgba(196,149,74,0.1)] flex items-center justify-between">
//               <button
//                 onClick={() => deleteReview(viewReview.id)}
//                 className="px-4 py-2.5 border border-red-400/20 text-red-400 font-['DM_Mono'] text-[9px] tracking-[0.15em] uppercase hover:bg-red-400/5 transition-colors"
//               >
//                 Delete Review
//               </button>

//               <button
//                 onClick={() => setViewReview(null)}
//                 className="px-5 py-2.5 border border-[rgba(196,149,74,0.25)] text-[#c4954a] font-['DM_Mono'] text-[9px] tracking-[0.15em] uppercase hover:bg-[rgba(196,149,74,0.08)] transition-colors"
//               >
//                 Close
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }











"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Star,
  Trash2,
  MessageSquare,
  X,
} from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/lib/api";

/* ========================================================= */
/* TYPES */
/* ========================================================= */

type ReviewReference = {
  _id?: string;
  title?: string;
  name?: string;
  orderId?: string;
  reference?: string;
};

type Review = {
  _id: string;
  user:
    | {
        _id?: string;
        name?: string;
        firstName?: string;
        lastName?: string;
        email?: string;
      }
    | string
    | null;

  booking?: {
    _id?: string;
    apartment?: {
      _id?: string;
      title?: string;
    } | string;
    apartmentTitle?: string;
    reference?: string;
  } | string | null;

  order?: {
    _id?: string;
    orderId?: string;
    reference?: string;
  } | string | null;

  rating: number;
  comment: string;
  createdAt: string;
  updatedAt?: string;
};

/* ========================================================= */
/* INPUT STYLE */
/* ========================================================= */

const INPUT = `
  w-full
  bg-[#0c0a08]
  border
  border-[rgba(196,149,74,0.15)]
  px-3 py-2.5
  text-sm
  font-['Jost']
  text-[#ede4d4]
  outline-none
  transition-colors
  focus:border-[rgba(196,149,74,0.5)]
  placeholder:text-[#8a7d6a]/50
`;

const gold = "#c4954a";

/* ========================================================= */
/* HELPERS */
/* ========================================================= */

function getUserName(review: Review) {
  if (!review.user) {
    return "Guest";
  }

  if (typeof review.user === "string") {
    return review.user;
  }

  if (review.user.name) {
    return review.user.name;
  }

  const fullName = [
    review.user.firstName,
    review.user.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return fullName || review.user.email || "Guest";
}

/* ========================================================= */
/* GET REVIEW TYPE */
/* ========================================================= */

function getReviewType(review: Review): "Booking" | "Order" {
  if (review.booking) {
    return "Booking";
  }

  return "Order";
}

/* ========================================================= */
/* GET REVIEW REFERENCE */
/* ========================================================= */

function getReviewReference(review: Review) {
  /*
   * BOOKING
   * Example:
   * BOOKING
   * Presidential Suite
   */

  if (review.booking) {
    if (typeof review.booking === "string") {
      return "Booking";
    }

    if (review.booking.apartmentTitle) {
      return review.booking.apartmentTitle;
    }

    if (
      review.booking.apartment &&
      typeof review.booking.apartment !== "string"
    ) {
      return review.booking.apartment.title || "Apartment Booking";
    }

    if (review.booking.reference) {
      return review.booking.reference;
    }

    return "Apartment Booking";
  }

  /*
   * ORDER
   * Example:
   * ORDER
   * Order #ORD-20261004
   */

  if (review.order) {
    if (typeof review.order === "string") {
      return `Order #${review.order}`;
    }

    const reference =
      review.order.orderId ||
      review.order.reference ||
      review.order._id;

    if (reference) {
      return `Order #${reference}`;
    }

    return "Restaurant Order";
  }

  return "Review";
}

/* ========================================================= */
/* FORMAT DATE */
/* ========================================================= */

function formatDate(date: string) {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

/* ========================================================= */
/* RATING STARS */
/* ========================================================= */

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={12}
          fill={star <= rating ? gold : "transparent"}
          color={star <= rating ? gold : "#6b6052"}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

/* ========================================================= */
/* STAT CARD */
/* ========================================================= */

function StatCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-5">
      <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.16em] text-[#8a7d6a]">
        {label}
      </p>

      <h3 className="mt-2 font-['Fraunces'] text-2xl text-[#ede4d4]">
        {value}
      </h3>

      <p className="mt-1 font-['Jost'] text-xs text-[#8a7d6a]">
        {description}
      </p>
    </div>
  );
}

/* ========================================================= */
/* REVIEWS PAGE */
/* ========================================================= */

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [search, setSearch] = useState("");
  const [viewReview, setViewReview] = useState<Review | null>(null);

  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  /* ======================================================= */
  /* FETCH REVIEWS */
  /* ======================================================= */

  const fetchReviews = async () => {
    try {
      setLoading(true);

      const response = await api.get("/review/all");

      const fetchedReviews =
        response.data?.reviews ||
        response.data?.data ||
        [];

      setReviews(fetchedReviews);
    } catch (error: any) {
      console.error("FETCH REVIEWS FAILED:", error);
      console.error("BACKEND RESPONSE:", error?.response?.data);

      toast.error(
        error?.response?.data?.message ||
          "Failed to load reviews."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  /* ======================================================= */
  /* FILTER REVIEWS */
  /* ======================================================= */

  const filteredReviews = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return reviews;
    }

    return reviews.filter((review) => {
      const guestName = getUserName(review).toLowerCase();

      const reviewType = getReviewType(review).toLowerCase();

      const reference =
        getReviewReference(review).toLowerCase();

      const comment =
        review.comment?.toLowerCase() || "";

      return (
        guestName.includes(query) ||
        reviewType.includes(query) ||
        reference.includes(query) ||
        comment.includes(query)
      );
    });
  }, [reviews, search]);

  /* ======================================================= */
  /* STATS */
  /* ======================================================= */

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : "0.0";

  const fiveStarReviews = reviews.filter(
    (review) => review.rating === 5
  ).length;

  /* ======================================================= */
  /* DELETE REVIEW */
  /* ======================================================= */

  const deleteReview = async (review: Review) => {
    const confirmed = window.confirm(
      `Delete the review by ${getUserName(review)}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await api.delete(`/review/${review._id}`);

      setReviews((current) =>
        current.filter(
          (item) => item._id !== review._id
        )
      );

      if (viewReview?._id === review._id) {
        setViewReview(null);
      }

      toast.success("Review deleted successfully.");
    } catch (error: any) {
      console.error("DELETE REVIEW FAILED:", error);
      console.error("BACKEND RESPONSE:", error?.response?.data);

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete review."
      );
    } finally {
      setDeleting(false);
    }
  };

  /* ======================================================= */
  /* LOADING STATE */
  /* ======================================================= */

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border border-[#c4954a]/20 border-t-[#c4954a] rounded-full animate-spin mx-auto" />

          <p className="mt-4 font-['DM_Mono'] text-[9px] uppercase tracking-[0.15em] text-[#8a7d6a]">
            Loading reviews...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* =================================================== */}
      {/* PAGE HEADER */}
      {/* =================================================== */}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="font-['DM_Mono'] text-[9px] uppercase tracking-[0.2em] text-[#c4954a]">
            Guest Feedback
          </p>

          <h1 className="mt-1 font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
            Guest Reviews
          </h1>

          <p className="mt-1 font-['Jost'] text-sm text-[#8a7d6a]">
            Manage guest feedback and ratings.
          </p>
        </div>

        {/* SEARCH */}

        <div className="relative w-full sm:w-72">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search reviews..."
            className={`${INPUT} pl-9 text-xs`}
          />
        </div>
      </div>

      {/* =================================================== */}
      {/* REVIEW STATS */}
      {/* =================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <StatCard
          label="Total Reviews"
          value={reviews.length.toString()}
          description="Guest reviews"
        />

        <StatCard
          label="Average Rating"
          value={`${averageRating} / 5`}
          description="Across all reviews"
        />

        <StatCard
          label="5-Star Reviews"
          value={fiveStarReviews.toString()}
          description="Excellent experiences"
        />

      </div>

      {/* =================================================== */}
      {/* REVIEW DIRECTORY */}
      {/* =================================================== */}

      <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-hidden">

        {/* HEADER */}

        <div className="px-5 py-4 border-b border-[rgba(196,149,74,0.1)]">
          <h2 className="font-['Fraunces'] text-lg text-[#ede4d4]">
            Review Directory
          </h2>

          <p className="mt-1 font-['Jost'] text-xs text-[#8a7d6a]">
            {filteredReviews.length}{" "}
            {filteredReviews.length === 1
              ? "review"
              : "reviews"}{" "}
            found
          </p>
        </div>

        {/* ================================================= */}
        {/* DESKTOP TABLE */}
        {/* ================================================= */}

        <div className="hidden lg:block overflow-x-auto">

          <table className="w-full min-w-[850px] text-xs font-['DM_Mono']">

            <thead>
              <tr className="border-b border-[rgba(196,149,74,0.1)]">

                {[
                  "Guest",
                  "Type",
                  "Reference",
                  "Rating",
                  "Comment",
                  "Date",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="text-left py-3 px-4 text-[9px] text-[#8a7d6a] tracking-[0.15em] uppercase font-normal"
                  >
                    {heading}
                  </th>
                ))}

              </tr>
            </thead>

            <tbody>

              {filteredReviews.map((review) => {

                const guestName =
                  getUserName(review);

                const reviewType =
                  getReviewType(review);

                const reference =
                  getReviewReference(review);

                return (
                  <tr
                    key={review._id}
                    className="
                      border-b
                      border-[rgba(196,149,74,0.06)]
                      hover:bg-[rgba(196,149,74,0.03)]
                      transition-colors
                    "
                  >

                    {/* GUEST */}

                    <td className="py-4 px-4">

                      <div className="flex items-center gap-3">

                        <div className="
                          w-8
                          h-8
                          shrink-0
                          flex
                          items-center
                          justify-center
                          border
                          border-[rgba(196,149,74,0.2)]
                          bg-[#0c0a08]
                          text-[#c4954a]
                          font-['Fraunces']
                          text-xs
                        ">
                          {guestName
                            .split(" ")
                            .map(
                              (word) => word[0]
                            )
                            .join("")
                            .slice(0, 2)}
                        </div>

                        <div>

                          <p className="text-[#ede4d4]">
                            {guestName}
                          </p>

                          <p className="text-[9px] text-[#8a7d6a] mt-0.5">
                            {review._id}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* TYPE */}

                    <td className="py-4 px-4">

                      <span
                        className={`
                          inline-flex
                          px-2
                          py-1
                          border
                          text-[9px]
                          uppercase
                          tracking-[0.1em]
                          ${
                            reviewType === "Booking"
                              ? `
                                border-[rgba(196,149,74,0.25)]
                                text-[#c4954a]
                              `
                              : `
                                border-[rgba(196,149,74,0.12)]
                                text-[#8a7d6a]
                              `
                          }
                        `}
                      >
                        {reviewType}
                      </span>

                    </td>

                    {/* REFERENCE */}

                    <td className="py-4 px-4 text-[#ede4d4]">
                      {reference}
                    </td>

                    {/* RATING */}

                    <td className="py-4 px-4">
                      <RatingStars
                        rating={review.rating}
                      />
                    </td>

                    {/* COMMENT */}

                    <td className="py-4 px-4 max-w-[280px]">

                      <p
                        className="text-[#8a7d6a] truncate"
                        title={review.comment}
                      >
                        {review.comment}
                      </p>

                    </td>

                    {/* DATE */}

                    <td className="py-4 px-4 text-[#8a7d6a]">
                      {formatDate(review.createdAt)}
                    </td>

                    {/* ACTIONS */}

                    <td className="py-4 px-4">

                      <div className="flex items-center gap-2">

                        <button
                          onClick={() =>
                            setViewReview(review)
                          }
                          className="
                            w-8
                            h-8
                            flex
                            items-center
                            justify-center
                            text-[#8a7d6a]
                            border
                            border-transparent
                            hover:border-[rgba(196,149,74,0.2)]
                            hover:text-[#c4954a]
                            transition-colors
                          "
                          title="View review"
                        >
                          <MessageSquare size={14} />
                        </button>

                        <button
                          onClick={() =>
                            deleteReview(review)
                          }
                          disabled={deleting}
                          className="
                            w-8
                            h-8
                            flex
                            items-center
                            justify-center
                            text-[#8a7d6a]
                            border
                            border-transparent
                            hover:border-red-400/20
                            hover:text-red-400
                            transition-colors
                            disabled:opacity-40
                          "
                          title="Delete review"
                        >
                          <Trash2 size={14} />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

        {/* ================================================= */}
        {/* MOBILE REVIEW CARDS */}
        {/* ================================================= */}

        <div className="lg:hidden divide-y divide-[rgba(196,149,74,0.06)]">

          {filteredReviews.map((review) => {

            const guestName =
              getUserName(review);

            const reviewType =
              getReviewType(review);

            const reference =
              getReviewReference(review);

            return (
              <div
                key={`${review._id}-card`}
                className="
                  p-4
                  hover:bg-[rgba(196,149,74,0.03)]
                  transition-colors
                "
              >

                {/* TOP */}

                <div className="flex items-start justify-between gap-4">

                  <div className="flex items-center gap-3 min-w-0">

                    <div className="
                      w-9
                      h-9
                      shrink-0
                      flex
                      items-center
                      justify-center
                      border
                      border-[rgba(196,149,74,0.2)]
                      bg-[#0c0a08]
                      text-[#c4954a]
                      font-['Fraunces']
                      text-xs
                    ">
                      {guestName
                        .split(" ")
                        .map(
                          (word) => word[0]
                        )
                        .join("")
                        .slice(0, 2)}
                    </div>

                    <div className="min-w-0">

                      <p className="
                        text-sm
                        font-['Jost']
                        text-[#ede4d4]
                        truncate
                      ">
                        {guestName}
                      </p>

                      <p className="
                        text-[10px]
                        font-['DM_Mono']
                        text-[#8a7d6a]
                        truncate
                      ">
                        {reviewType} · {reference}
                      </p>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      deleteReview(review)
                    }
                    disabled={deleting}
                    className="
                      shrink-0
                      text-[#8a7d6a]
                      hover:text-red-400
                      transition-colors
                      disabled:opacity-40
                    "
                    title="Delete review"
                  >
                    <Trash2 size={14} />
                  </button>

                </div>

                {/* RATING */}

                <div className="mt-3">
                  <RatingStars
                    rating={review.rating}
                  />
                </div>

                {/* COMMENT */}

                <p className="
                  mt-2
                  text-xs
                  font-['Jost']
                  text-[#8a7d6a]
                  leading-relaxed
                ">
                  {review.comment}
                </p>

                {/* DATE */}

                <div className="
                  mt-3
                  flex
                  items-center
                  justify-between
                ">

                  <p className="
                    text-[9px]
                    font-['DM_Mono']
                    text-[#8a7d6a]/50
                  ">
                    {review._id}
                  </p>

                  <p className="
                    text-[10px]
                    font-['DM_Mono']
                    text-[#8a7d6a]/60
                  ">
                    {formatDate(review.createdAt)}
                  </p>

                </div>

                {/* VIEW */}

                <button
                  onClick={() =>
                    setViewReview(review)
                  }
                  className="
                    mt-3
                    w-full
                    py-2
                    border
                    border-[rgba(196,149,74,0.12)]
                    text-[9px]
                    font-['DM_Mono']
                    tracking-[0.15em]
                    uppercase
                    text-[#8a7d6a]
                    hover:text-[#c4954a]
                    hover:border-[rgba(196,149,74,0.3)]
                    transition-colors
                  "
                >
                  View Review
                </button>

              </div>
            );
          })}

        </div>

        {/* ================================================= */}
        {/* EMPTY STATE */}
        {/* ================================================= */}

        {filteredReviews.length === 0 && (
          <div className="py-16 text-center">

            <MessageSquare
              size={28}
              strokeWidth={1}
              className="mx-auto text-[#8a7d6a]"
            />

            <p className="
              mt-3
              font-['Fraunces']
              text-lg
              text-[#ede4d4]
            ">
              No reviews found
            </p>

            <p className="
              mt-1
              font-['Jost']
              text-sm
              text-[#8a7d6a]
            ">
              {search
                ? "Try searching for another guest or reference."
                : "There are no guest reviews yet."}
            </p>

          </div>
        )}

      </div>

      {/* =================================================== */}
      {/* REVIEW DETAILS MODAL */}
      {/* =================================================== */}

      {viewReview && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            p-4
            bg-black/75
          "
          onClick={() =>
            setViewReview(null)
          }
        >

          <div
            className="
              w-full
              max-w-lg
              bg-[#161310]
              border
              border-[rgba(196,149,74,0.15)]
              shadow-2xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* ================================================= */}
            {/* MODAL HEADER */}
            {/* ================================================= */}

            <div className="
              px-5
              py-4
              border-b
              border-[rgba(196,149,74,0.1)]
              flex
              items-center
              justify-between
            ">

              <div>

                <p className="
                  font-['DM_Mono']
                  text-[9px]
                  uppercase
                  tracking-[0.18em]
                  text-[#c4954a]
                ">
                  Guest Review
                </p>

                <h2 className="
                  mt-1
                  font-['Fraunces']
                  text-xl
                  text-[#ede4d4]
                ">
                  {getUserName(viewReview)}
                </h2>

              </div>

              <button
                onClick={() =>
                  setViewReview(null)
                }
                className="
                  w-8
                  h-8
                  flex
                  items-center
                  justify-center
                  text-[#8a7d6a]
                  hover:text-[#ede4d4]
                "
              >
                <X size={17} />
              </button>

            </div>

            {/* ================================================= */}
            {/* MODAL CONTENT */}
            {/* ================================================= */}

            <div className="p-5">

              {/* BOOKING / ORDER */}

              <div className="
                flex
                items-center
                justify-between
                gap-4
                pb-5
                border-b
                border-[rgba(196,149,74,0.08)]
              ">

                <div>

                  <p className="
                    font-['DM_Mono']
                    text-[9px]
                    uppercase
                    tracking-[0.15em]
                    text-[#8a7d6a]
                  ">
                    {getReviewType(viewReview)}
                  </p>

                  <p className="
                    mt-1
                    font-['Jost']
                    text-sm
                    text-[#ede4d4]
                  ">
                    {getReviewReference(viewReview)}
                  </p>

                </div>

                {/* RATING */}

                <div className="text-right">

                  <p className="
                    font-['DM_Mono']
                    text-[9px]
                    uppercase
                    tracking-[0.15em]
                    text-[#8a7d6a]
                  ">
                    Rating
                  </p>

                  <div className="mt-2">
                    <RatingStars
                      rating={viewReview.rating}
                    />
                  </div>

                </div>

              </div>

              {/* ================================================= */}
              {/* COMMENT */}
              {/* ================================================= */}

              <div className="mt-5">

                <p className="
                  font-['DM_Mono']
                  text-[9px]
                  uppercase
                  tracking-[0.15em]
                  text-[#8a7d6a]
                ">
                  Comment
                </p>

                <div className="
                  mt-2
                  p-4
                  bg-[#0c0a08]
                  border
                  border-[rgba(196,149,74,0.08)]
                ">

                  <p className="
                    font-['Jost']
                    text-sm
                    leading-relaxed
                    text-[#ede4d4]
                  ">
                    {viewReview.comment}
                  </p>

                </div>

              </div>

              {/* ================================================= */}
              {/* DATE */}
              {/* ================================================= */}

              <div className="
                mt-5
                flex
                justify-between
                items-center
              ">

                <span className="
                  font-['DM_Mono']
                  text-[9px]
                  uppercase
                  tracking-[0.15em]
                  text-[#8a7d6a]
                ">
                  Review Date
                </span>

                <span className="
                  font-['Jost']
                  text-sm
                  text-[#8a7d6a]
                ">
                  {formatDate(
                    viewReview.createdAt
                  )}
                </span>

              </div>

            </div>

            {/* ================================================= */}
            {/* MODAL FOOTER */}
            {/* ================================================= */}

            <div className="
              px-5
              py-4
              border-t
              border-[rgba(196,149,74,0.1)]
              flex
              items-center
              justify-between
            ">

              <button
                onClick={() =>
                  deleteReview(viewReview)
                }
                disabled={deleting}
                className="
                  px-4
                  py-2.5
                  border
                  border-red-400/20
                  text-red-400
                  font-['DM_Mono']
                  text-[9px]
                  tracking-[0.15em]
                  uppercase
                  hover:bg-red-400/5
                  transition-colors
                  disabled:opacity-40
                "
              >
                {deleting
                  ? "Deleting..."
                  : "Delete Review"}
              </button>

              <button
                onClick={() =>
                  setViewReview(null)
                }
                className="
                  px-5
                  py-2.5
                  border
                  border-[rgba(196,149,74,0.25)]
                  text-[#c4954a]
                  font-['DM_Mono']
                  text-[9px]
                  tracking-[0.15em]
                  uppercase
                  hover:bg-[rgba(196,149,74,0.08)]
                  transition-colors
                "
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}