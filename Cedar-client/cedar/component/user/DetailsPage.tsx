// "use client";

// import { useState } from "react";
// import { CheckCircle, Star } from "lucide-react";
// import api from "@/lib/api";
// import { toast } from "react-hot-toast";

// function DetailsPage({
//     type,
//     reference,
//     reviewId,
//     setPage,
//     clearCart,
//     details,
// }: {
//     type: "restaurant" | "room";
//     reference: string;
//     reviewId: string;
//     setPage: (p: string) => void;
//     clearCart?: () => void;
//     details?: any;
// }) {
//     const BTN_PRIMARY =
//         "bg-[#c4954a] text-[#0c0a08] font-['Jost'] font-semibold text-sm tracking-widest uppercase hover:bg-[#d4a55a] transition-colors";

//     const BTN_OUTLINE =
//         "border border-[rgba(196,149,74,0.3)] text-[#ede4d4] font-['Jost'] text-sm tracking-widest uppercase hover:border-[#c4954a] hover:text-[#c4954a] transition-all";

//     // =========================
//     // REVIEW STATE
//     // =========================

//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState("");
//     const [submittingReview, setSubmittingReview] = useState(false);
//     const [reviewSubmitted, setReviewSubmitted] = useState(false);
//     const [showReview, setShowReview] = useState(true);


//     // =========================
//     // SUBMIT REVIEW
//     // =========================

//     const handleSubmitReview = async () => {
//         if (rating === 0) {
//             toast.error("Please select a star rating.");
//             return;
//         }

//         if (comment.trim().length < 3) {
//             toast.error("Please tell us a little about your experience.");
//             return;
//         }

//         if (!reviewId) {
//             toast.error("Unable to identify your order or booking.");
//             return;
//         }

//         try {
//             setSubmittingReview(true);

//             const reviewData =
//                 type === "restaurant"
//                     ? {
//                         orderId: reviewId,
//                         rating,
//                         comment: comment.trim(),
//                     }
//                     : {
//                         bookingId: reviewId,
//                         rating,
//                         comment: comment.trim(),
//                     };

//             const response = await api.post(
//                 "/review/create",
//                 reviewData
//             );

//             console.log("Review created:", response.data);

//             setReviewSubmitted(true);

//             toast.success("Thank you for your review!");

//         } catch (error: any) {
//             console.error(
//                 "Error submitting review:",
//                 error.response?.data || error.message
//             );

//             toast.error(
//                 error.response?.data?.message ||
//                 "Unable to submit your review."
//             );
//         } finally {
//             setSubmittingReview(false);
//         }
//     };


//     // =========================
//     // SKIP REVIEW
//     // =========================

//     const handleSkipReview = () => {
//         setShowReview(false);
//     };


//     return (
//         <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center px-6 pt-20 pb-16">

//             <div className="max-w-xl w-full text-center">

//                 {/* ============================= */}
//                 {/* SUCCESS ICON */}
//                 {/* ============================= */}

//                 <div className="w-20 h-20 border-2 border-[#c4954a] flex items-center justify-center mx-auto mb-6">

//                     <CheckCircle
//                         size={40}
//                         className="text-[#c4954a]"
//                         strokeWidth={1.5}
//                     />

//                 </div>


//                 {/* ============================= */}
//                 {/* CONFIRMATION LABEL */}
//                 {/* ============================= */}

//                 <div className="flex items-center justify-center gap-3 mb-3">

//                     <div className="h-px w-8 bg-[#c4954a]" />

//                     <span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">

//                         {type === "restaurant"
//                             ? "Order Confirmed"
//                             : "Booking Confirmed"}

//                     </span>

//                     <div className="h-px w-8 bg-[#c4954a]" />

//                 </div>


//                 {/* ============================= */}
//                 {/* TITLE */}
//                 {/* ============================= */}

//                 <h1 className="font-['Fraunces'] text-4xl text-[#ede4d4] mb-3">

//                     Thank You

//                 </h1>


//                 {/* ============================= */}
//                 {/* MESSAGE */}
//                 {/* ============================= */}

//                 <p className="font-['Jost'] text-[#8a7d6a] mb-6 font-light">

//                     Your {type === "restaurant" ? "order" : "booking"} has
//                     been confirmed. You will receive a confirmation email
//                     shortly.

//                 </p>


//                 {/* ============================= */}
//                 {/* DETAILS CARD */}
//                 {/* ============================= */}

//                 <div className="bg-[#161310] border border-[rgba(196,149,74,0.2)] p-6 mb-8">

//                     {/* REFERENCE */}

//                     <p className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-2">

//                         Reference Number

//                     </p>

//                     <p className="font-['Fraunces'] text-2xl text-[#ede4d4]">

//                         {reference}

//                     </p>


//                     {/* DETAILS */}

//                     {details && (

//                         <div className="mt-4 pt-4 border-t border-[rgba(196,149,74,0.1)] space-y-1 text-sm font-['Jost'] text-[#8a7d6a] text-left">

//                             {/* ============================= */}
//                             {/* ROOM BOOKING */}
//                             {/* ============================= */}

//                             {type === "room" && (
//                                 <>

//                                     {details.room && (
//                                         <div className="flex justify-between gap-4">

//                                             <span>
//                                                 Room:
//                                             </span>

//                                             <span className="text-[#ede4d4] text-right">

//                                                 {details.room}

//                                             </span>

//                                         </div>
//                                     )}


//                                     {details.checkIn && (
//                                         <div className="flex justify-between gap-4">

//                                             <span>
//                                                 Check-in:
//                                             </span>

//                                             <span className="text-[#ede4d4] text-right">

//                                                 {details.checkIn}

//                                             </span>

//                                         </div>
//                                     )}


//                                     {details.checkOut && (
//                                         <div className="flex justify-between gap-4">

//                                             <span>
//                                                 Check-out:
//                                             </span>

//                                             <span className="text-[#ede4d4] text-right">

//                                                 {details.checkOut}

//                                             </span>

//                                         </div>
//                                     )}


//                                     {details.total !== undefined && (
//                                         <div className="flex justify-between gap-4">

//                                             <span>
//                                                 Total Paid:
//                                             </span>

//                                             <span className="text-[#c4954a] text-right">

//                                                 ₦
//                                                 {Number(
//                                                     details.total
//                                                 ).toLocaleString()}

//                                             </span>

//                                         </div>
//                                     )}

//                                 </>
//                             )}


//                             {/* ============================= */}
//                             {/* RESTAURANT ORDER */}
//                             {/* ============================= */}

//                             {type === "restaurant" && (
//                                 <>

//                                     {details.name && (
//                                         <div className="flex justify-between gap-4">

//                                             <span>
//                                                 Name:
//                                             </span>

//                                             <span className="text-[#ede4d4] text-right">

//                                                 {details.name}

//                                             </span>

//                                         </div>
//                                     )}


//                                     {details.date && (
//                                         <div className="flex justify-between gap-4">

//                                             <span>
//                                                 Date:
//                                             </span>

//                                             <span className="text-[#ede4d4] text-right">

//                                                 {details.date}

//                                             </span>

//                                         </div>
//                                     )}


//                                     {details.time && (
//                                         <div className="flex justify-between gap-4">

//                                             <span>
//                                                 Time:
//                                             </span>

//                                             <span className="text-[#ede4d4] text-right">

//                                                 {details.time}

//                                             </span>

//                                         </div>
//                                     )}


//                                     {details.guests && (
//                                         <div className="flex justify-between gap-4">

//                                             <span>
//                                                 Guests:
//                                             </span>

//                                             <span className="text-[#ede4d4] text-right">

//                                                 {details.guests}

//                                             </span>

//                                         </div>
//                                     )}


//                                     {details.total !== undefined && (
//                                         <div className="flex justify-between gap-4">

//                                             <span>
//                                                 Total Paid:
//                                             </span>

//                                             <span className="text-[#c4954a] text-right">

//                                                 ₦
//                                                 {Number(
//                                                     details.total
//                                                 ).toLocaleString()}

//                                             </span>

//                                         </div>
//                                     )}

//                                 </>
//                             )}

//                         </div>

//                     )}

//                 </div>


//                 {/* ============================= */}
//                 {/* REVIEW SECTION */}
//                 {/* ============================= */}

//                 {showReview && (

//                     <div className="bg-[#161310] border border-[rgba(196,149,74,0.2)] p-6 mb-8 text-left">

//                         {!reviewSubmitted ? (
//                             <>

//                                 {/* REVIEW HEADER */}

//                                 <div className="text-center mb-6">

//                                     <p className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-[0.25em] uppercase mb-2">

//                                         Share Your Experience

//                                     </p>

//                                     <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-2">

//                                         How was your experience?

//                                     </h2>

//                                     <p className="font-['Jost'] text-sm text-[#8a7d6a] font-light">

//                                         We would love to hear what you thought
//                                         about your Cedar Court experience.

//                                     </p>

//                                 </div>


//                                 {/* STAR RATING */}

//                                 <div className="flex flex-col items-center mb-6">

//                                     <div className="flex items-center gap-2">

//                                         {[1, 2, 3, 4, 5].map((star) => (

//                                             <button
//                                                 key={star}
//                                                 type="button"
//                                                 onClick={() => setRating(star)}
//                                                 className="p-1 transition-transform hover:scale-110"
//                                                 aria-label={`Rate ${star} out of 5`}
//                                             >

//                                                 <Star
//                                                     size={30}
//                                                     strokeWidth={1.5}
//                                                     className={
//                                                         star <= rating
//                                                             ? "fill-[#c4954a] text-[#c4954a]"
//                                                             : "text-[#5d5347]"
//                                                     }
//                                                 />

//                                             </button>

//                                         ))}

//                                     </div>


//                                     {rating > 0 && (
//                                         <p className="mt-2 text-xs font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase">

//                                             {rating === 1 && "Poor"}

//                                             {rating === 2 && "Fair"}

//                                             {rating === 3 && "Good"}

//                                             {rating === 4 && "Very Good"}

//                                             {rating === 5 && "Excellent"}

//                                         </p>
//                                     )}

//                                 </div>


//                                 {/* COMMENT */}

//                                 <div className="mb-5">

//                                     <label
//                                         htmlFor="review-comment"
//                                         className="block text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase mb-2"
//                                     >
//                                         Your Review
//                                     </label>

//                                     <textarea
//                                         id="review-comment"
//                                         value={comment}
//                                         onChange={(e) =>
//                                             setComment(e.target.value)
//                                         }
//                                         placeholder="Tell us about your experience..."
//                                         rows={5}
//                                         maxLength={1000}
//                                         className="w-full resize-none bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-4 py-3 font-['Jost'] text-sm text-[#ede4d4] placeholder:text-[#5d5347] outline-none focus:border-[#c4954a] transition-colors"
//                                     />

//                                     <div className="flex justify-end mt-1">

//                                         <span className="text-[10px] font-['DM_Mono'] text-[#5d5347]">

//                                             {comment.length}/1000

//                                         </span>

//                                     </div>

//                                 </div>


//                                 {/* REVIEW BUTTONS */}

//                                 <div className="flex flex-col sm:flex-row gap-3">

//                                     <button
//                                         type="button"
//                                         onClick={handleSubmitReview}
//                                         disabled={submittingReview}
//                                         className={`flex-1 py-3 ${BTN_PRIMARY} disabled:opacity-50 disabled:cursor-not-allowed`}
//                                     >

//                                         {submittingReview
//                                             ? "Submitting..."
//                                             : "Submit Review"}

//                                     </button>


//                                     <button
//                                         type="button"
//                                         onClick={handleSkipReview}
//                                         disabled={submittingReview}
//                                         className={`flex-1 py-3 ${BTN_OUTLINE} disabled:opacity-50`}
//                                     >

//                                         Maybe Later

//                                     </button>

//                                 </div>

//                             </>
//                         ) : (

//                             /* ============================= */
//                             /* REVIEW SUBMITTED */
//                             /* ============================= */

//                             <div className="text-center py-4">

//                                 <div className="w-14 h-14 border border-[#c4954a] flex items-center justify-center mx-auto mb-4">

//                                     <CheckCircle
//                                         size={28}
//                                         className="text-[#c4954a]"
//                                         strokeWidth={1.5}
//                                     />

//                                 </div>

//                                 <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-2">

//                                     Thank You For Your Review

//                                 </h2>

//                                 <p className="font-['Jost'] text-sm text-[#8a7d6a] font-light">

//                                     Your feedback means a lot to us.

//                                 </p>

//                             </div>

//                         )}

//                     </div>

//                 )}


//                 {/* ============================= */}
//                 {/* BUTTONS */}
//                 {/* ============================= */}

//                 <div className="flex flex-col sm:flex-row gap-4">

//                     <button
//                         onClick={() => {

//                             setPage("home");

//                             if (clearCart) {
//                                 clearCart();
//                             }

//                         }}
//                         className={`flex-1 py-4 ${BTN_PRIMARY}`}
//                     >

//                         Return to Homepage

//                     </button>


//                     <button
//                         onClick={() => {

//                             setPage("my-bookings");

//                             if (clearCart) {
//                                 clearCart();
//                             }

//                         }}
//                         className={`flex-1 py-4 ${BTN_OUTLINE}`}
//                     >

//                         View My Bookings

//                     </button>

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default DetailsPage;









"use client";

import { useState } from "react";
import {
    CheckCircle,
    Star,
} from "lucide-react";
import api from "@/lib/api";
import { toast } from "react-hot-toast";

function DetailsPage({
    type,
    reference,
    reviewId,
    setPage,
    clearCart,
    details,
}: {
    type: "restaurant" | "room";
    reference: string;
    reviewId: string;
    setPage: (p: string) => void;
    clearCart?: () => void;
    details?: any;
}) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [submittingReview, setSubmittingReview] = useState(false);
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const [showReview, setShowReview] = useState(true);

    const BTN_PRIMARY =
        "bg-[#c4954a] text-[#0c0a08] font-['Jost'] font-semibold text-sm tracking-widest uppercase hover:bg-[#d4a55a] transition-colors";

    const BTN_OUTLINE =
        "border border-[rgba(196,149,74,0.3)] text-[#ede4d4] font-['Jost'] text-sm tracking-widest uppercase hover:border-[#c4954a] hover:text-[#c4954a] transition-all";

    const handleSubmitReview = async () => {
        if (!rating) {
            toast.error("Please select a rating");
            return;
        }

        if (comment.trim().length < 3) {
            toast.error("Please write at least 3 characters");
            return;
        }

        if (!reviewId) {
            toast.error("Review reference is missing");
            return;
        }

        try {
            setSubmittingReview(true);

            const reviewData =
                type === "restaurant"
                    ? {
                          orderId: reviewId,
                          rating,
                          comment: comment.trim(),
                      }
                    : {
                          bookingId: reviewId,
                          rating,
                          comment: comment.trim(),
                      };

            console.log("Submitting review:", reviewData);

            const response = await api.post(
                "/review/create",
                reviewData
            );

            console.log("Review created:", response.data);

            setReviewSubmitted(true);

            toast.success("Thank you for your review!");

        } catch (error: any) {
            console.error(
                "Error submitting review:",
                error.response?.data || error
            );

            toast.error(
                error.response?.data?.message ||
                    "Failed to submit review"
            );

        } finally {
            setSubmittingReview(false);
        }
    };

    const handleSkipReview = () => {
        setShowReview(false);
    };

    const getRatingLabel = () => {
        switch (rating) {
            case 1:
                return "Poor";
            case 2:
                return "Fair";
            case 3:
                return "Good";
            case 4:
                return "Very Good";
            case 5:
                return "Excellent";
            default:
                return "";
        }
    };

    return (
        <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center px-6 pt-20 pb-16">

            <div className="max-w-xl w-full text-center">

                {/* SUCCESS ICON */}
                <div className="w-20 h-20 border-2 border-[#c4954a] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle
                        size={40}
                        className="text-[#c4954a]"
                        strokeWidth={1.5}
                    />
                </div>

                {/* CONFIRMATION LABEL */}
                <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="h-px w-8 bg-[#c4954a]" />

                    <span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">
                        {type === "restaurant"
                            ? "Order Confirmed"
                            : "Booking Confirmed"}
                    </span>

                    <div className="h-px w-8 bg-[#c4954a]" />
                </div>

                {/* TITLE */}
                <h1 className="font-['Fraunces'] text-4xl text-[#ede4d4] mb-3">
                    Thank You
                </h1>

                {/* MESSAGE */}
                <p className="font-['Jost'] text-[#8a7d6a] mb-6 font-light">
                    Your{" "}
                    {type === "restaurant"
                        ? "order"
                        : "booking"}{" "}
                    has been confirmed. You will receive a
                    confirmation email shortly.
                </p>

                {/* DETAILS CARD */}
                <div className="bg-[#161310] border border-[rgba(196,149,74,0.2)] p-6 mb-8">

                    {/* REFERENCE */}
                    <p className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-2">
                        Reference Number
                    </p>

                    <p className="font-['Fraunces'] text-2xl text-[#ede4d4]">
                        {reference}
                    </p>

                    {details && (
                        <div className="mt-4 pt-4 border-t border-[rgba(196,149,74,0.1)] space-y-1 text-sm font-['Jost'] text-[#8a7d6a] text-left">

                            {/* ROOM / APARTMENT DETAILS */}
                            {type === "room" && (
                                <>
                                    {details.room && (
                                        <div className="flex justify-between">
                                            <span>Room:</span>

                                            <span className="text-[#ede4d4]">
                                                {details.room}
                                            </span>
                                        </div>
                                    )}

                                    {details.checkIn && (
                                        <div className="flex justify-between">
                                            <span>Check-in:</span>

                                            <span className="text-[#ede4d4]">
                                                {details.checkIn}
                                            </span>
                                        </div>
                                    )}

                                    {details.checkOut && (
                                        <div className="flex justify-between">
                                            <span>Check-out:</span>

                                            <span className="text-[#ede4d4]">
                                                {details.checkOut}
                                            </span>
                                        </div>
                                    )}

                                    {details.total !== undefined && (
                                        <div className="flex justify-between">
                                            <span>Total Paid:</span>

                                            <span className="text-[#c4954a]">
                                                ₦
                                                {Number(
                                                    details.total
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </>
                            )}

                            {/* RESTAURANT DETAILS */}
                            {type === "restaurant" && (
                                <>
                                    {details.name && (
                                        <div className="flex justify-between">
                                            <span>Name:</span>

                                            <span className="text-[#ede4d4]">
                                                {details.name}
                                            </span>
                                        </div>
                                    )}

                                    {details.date && (
                                        <div className="flex justify-between">
                                            <span>Date:</span>

                                            <span className="text-[#ede4d4]">
                                                {details.date}
                                            </span>
                                        </div>
                                    )}

                                    {details.time && (
                                        <div className="flex justify-between">
                                            <span>Time:</span>

                                            <span className="text-[#ede4d4]">
                                                {details.time}
                                            </span>
                                        </div>
                                    )}

                                    {details.guests && (
                                        <div className="flex justify-between">
                                            <span>Guests:</span>

                                            <span className="text-[#ede4d4]">
                                                {details.guests}
                                            </span>
                                        </div>
                                    )}

                                    {details.total !== undefined && (
                                        <div className="flex justify-between">
                                            <span>Total Paid:</span>

                                            <span className="text-[#c4954a]">
                                                ₦
                                                {Number(
                                                    details.total
                                                ).toLocaleString()}
                                            </span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* ============================== */}
                {/* REVIEW SECTION */}
                {/* ============================== */}

                {showReview && (
                    <div className="bg-[#161310] border border-[rgba(196,149,74,0.2)] p-6 mb-8">

                        {!reviewSubmitted ? (
                            <>
                                {/* REVIEW LABEL */}
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    <div className="h-px w-8 bg-[#c4954a]" />

                                    <span className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">
                                        Share Your Experience
                                    </span>

                                    <div className="h-px w-8 bg-[#c4954a]" />
                                </div>

                                {/* REVIEW TITLE */}
                                <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-2">
                                    How was your experience?
                                </h2>

                                <p className="font-['Jost'] text-sm text-[#8a7d6a] mb-6 font-light">
                                    We would love to hear what you
                                    thought about your Cedar Court
                                    experience.
                                </p>

                                {/* STARS */}
                                <div className="flex justify-center gap-4 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() =>
                                                setRating(star)
                                            }
                                            className="transition-transform hover:scale-110 focus:outline-none"
                                            aria-label={`Rate ${star} out of 5`}
                                        >
                                            <Star
                                                size={31}
                                                strokeWidth={1.5}
                                                className={
                                                    star <= rating
                                                        ? "text-[#c4954a] fill-[#c4954a]"
                                                        : "text-[#5f5548]"
                                                }
                                            />
                                        </button>
                                    ))}
                                </div>

                                {/* RATING LABEL */}
                                <div className="h-5 mb-6">
                                    {rating > 0 && (
                                        <p className="text-[11px] font-['DM_Mono'] text-[#c4954a] tracking-[0.2em] uppercase">
                                            {getRatingLabel()}
                                        </p>
                                    )}
                                </div>

                                {/* COMMENT LABEL */}
                                <div className="text-left mb-2">
                                    <label className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
                                        Your Review
                                    </label>
                                </div>

                                {/* COMMENT */}
                                <textarea
                                    value={comment}
                                    onChange={(e) =>
                                        setComment(e.target.value)
                                    }
                                    maxLength={1000}
                                    rows={5}
                                    placeholder="Tell us about your experience..."
                                    className="w-full resize-none bg-[#0c0a08] border border-[rgba(196,149,74,0.7)] px-4 py-3 text-sm font-['Jost'] text-[#ede4d4] placeholder:text-[#62584c] focus:outline-none focus:border-[#c4954a] transition-colors"
                                />

                                {/* CHARACTER COUNT */}
                                <div className="flex justify-end mt-1 mb-6">
                                    <span className="text-[10px] font-['DM_Mono'] text-[#62584c]">
                                        {comment.length}/1000
                                    </span>
                                </div>

                                {/* REVIEW BUTTONS */}
                                <div className="flex flex-col sm:flex-row gap-3">

                                    <button
                                        type="button"
                                        onClick={handleSubmitReview}
                                        disabled={submittingReview}
                                        className={`flex-1 py-4 ${BTN_PRIMARY} ${
                                            submittingReview
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                    >
                                        {submittingReview
                                            ? "Submitting..."
                                            : "Submit Review"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleSkipReview}
                                        disabled={submittingReview}
                                        className={`flex-1 py-4 ${BTN_OUTLINE} ${
                                            submittingReview
                                                ? "opacity-50 cursor-not-allowed"
                                                : ""
                                        }`}
                                    >
                                        Maybe Later
                                    </button>

                                </div>
                            </>
                        ) : (
                            /* ============================== */
                            /* REVIEW SUCCESS */
                            /* ============================== */

                            <div className="py-6">

                                <div className="w-16 h-16 border border-[#c4954a] flex items-center justify-center mx-auto mb-5">
                                    <CheckCircle
                                        size={32}
                                        className="text-[#c4954a]"
                                        strokeWidth={1.5}
                                    />
                                </div>

                                <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-2">
                                    Thank You For Your Review
                                </h2>

                                <p className="font-['Jost'] text-sm text-[#8a7d6a] font-light">
                                    Your feedback helps us improve the
                                    Cedar Court experience.
                                </p>

                            </div>
                        )}
                    </div>
                )}

                {/* ============================== */}
                {/* BOTTOM BUTTONS */}
                {/* ============================== */}

                <div className="flex flex-col sm:flex-row gap-4">

                    <button
                        type="button"
                        onClick={() => {
                            setPage("home");

                            if (clearCart) {
                                clearCart();
                            }
                        }}
                        className={`flex-1 py-4 ${BTN_PRIMARY}`}
                    >
                        Return to Homepage
                    </button>

                    <button
                        type="button"
                        onClick={() => {
                            setPage("my-bookings");

                            if (clearCart) {
                                clearCart();
                            }
                        }}
                        className={`flex-1 py-4 ${BTN_OUTLINE}`}
                    >
                        View My Bookings
                    </button>

                </div>
            </div>
        </div>
    );
}

export default DetailsPage;





// next is to connect the booking to the backend