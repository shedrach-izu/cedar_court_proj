// 'use client'

// import React from 'react'

// import { TESTIMONIALS } from '@/index'
// import { Star } from 'lucide-react'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation, Pagination } from 'swiper/modules';

// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

// const gold = "#c4954a"

// const Testimonial = () => {
//   return (
//     <div>
//       <section className="bg-[#161310] py-24">
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center mb-14">
//             <div className="flex items-center justify-center gap-3 mb-3"><div className="h-px w-8 bg-[#c4954a]" /><span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">Guest Stories</span><div className="h-px w-8 bg-[#c4954a]" /></div>
//             <h2 className="font-['Fraunces'] text-4xl text-[#ede4d4]">In Their Own <em className="italic">Words</em></h2>
//           </div>
//           <Swiper
//             modules={[Autoplay, Navigation, Pagination]}
//             loop={true}
//             speed={800}
//             spaceBetween={24}
//             navigation={false}
//             pagination={{
//                 clickable: true,
//             }}
//             autoplay={{
//                 delay: 3000,
//                 disableOnInteraction: false,
//                 pauseOnMouseEnter: true,
//             }}
//             breakpoints={{
//                 0: {
//                 slidesPerView: 1,
//                 },
//                 768: {
//                 slidesPerView: 2,
//                 },
//                 1024: {
//                 slidesPerView: 3,
//                 },
//             }}
//         >
//         {TESTIMONIALS.map((t) => (
//             <SwiperSlide key={t.id}>
//             <div className="h-full bg-[#0c0a08] border border-[rgba(196,149,74,0.12)] p-8 flex flex-col gap-4">

//                 <div className="flex gap-1">
//                 {[...Array(t.rating)].map((_, i) => (
//                     <Star
//                     key={i}
//                     size={13}
//                     fill={gold}
//                     color={gold}
//                     strokeWidth={1}
//                     />
//                 ))}
//                 </div>

//                 <p className="font-['Jost'] text-[#ede4d4]/75 leading-relaxed text-sm italic font-light flex-1">
//                 &ldquo;{t.text}&rdquo;
//                 </p>

//                 <div className="flex items-center gap-3 pt-4 border-t border-[rgba(196,149,74,0.08)]">
//                 <div className="w-10 h-10 bg-[rgba(196,149,74,0.12)] border border-[rgba(196,149,74,0.25)] flex items-center justify-center shrink-0">
//                     <span className="text-[#c4954a] text-xs font-['DM_Mono']">
//                     {t.initials}
//                     </span>
//                 </div>

//                 <div>
//                     <div className="text-sm font-['Jost'] text-[#ede4d4]">
//                     {t.name}
//                     </div>

//                     <div className="text-xs font-['DM_Mono'] text-[#8a7d6a]">
//                     {t.role}
//                     </div>
//                 </div>
//                 </div>

//             </div>
//             </SwiperSlide>
//         ))}
//         </Swiper>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Testimonial












"use client";

import React, { useEffect, useState } from "react";
import api from "@/lib/api";
import { Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const gold = "#c4954a";

type Review = {
  _id: string;
  id?: string;
  rating: number;
  text?: string;
  comment?: string;
  review?: string;
  name?: string;
  initials?: string;
  role?: string;
  user?: {
    name?: string;
    firstName?: string;
    lastName?: string;
  } | string;
};

const Testimonial = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await api.get("/review/all");
        const data = response.data;

        const fetchedReviews: Review[] = Array.isArray(data)
          ? data
          : Array.isArray(data.reviews)
            ? data.reviews
            : [];

        setReviews(
          fetchedReviews.filter(
            (review) =>
              typeof review.rating === "number" &&
              Boolean(
                review.text?.trim() ||
                  review.comment?.trim() ||
                  review.review?.trim()
              )
          )
        );
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
        setError("Guest stories are temporarily unavailable.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const getReviewText = (review: Review) =>
    review.text || review.comment || review.review || "";

  const getGuestName = (review: Review) => {
    if (review.name?.trim()) return review.name;

    if (review.user && typeof review.user === "object") {
      const name =
        review.user.name ||
        [review.user.firstName, review.user.lastName]
          .filter(Boolean)
          .join(" ");

      if (name.trim()) return name;
    }

    return "Cedar Court Guest";
  };

  const getInitials = (review: Review) => {
    if (review.initials?.trim()) return review.initials;

    return getGuestName(review)
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div>
      <section className="bg-[#161310] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-[#c4954a]" />

              <span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">
                Guest Stories
              </span>

              <div className="h-px w-8 bg-[#c4954a]" />
            </div>

            <h2 className="font-['Fraunces'] text-4xl text-[#ede4d4]">
              In Their Own <em className="italic">Words</em>
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="w-8 h-8 border-2 border-[#c4954a]/30 border-t-[#c4954a] rounded-full animate-spin" />
            </div>
          ) : error ? (
            <p className="text-center py-12 text-sm font-['Jost'] text-[#8a7d6a]">
              {error}
            </p>
          ) : reviews.length === 0 ? (
            <p className="text-center py-12 text-sm font-['Jost'] text-[#8a7d6a]">
              No guest reviews available yet.
            </p>
          ) : (
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              loop={reviews.length > 3}
              speed={800}
              spaceBetween={24}
              navigation={false}
              pagination={{ clickable: true }}
              autoplay={
                reviews.length > 1
                  ? {
                      delay: 3000,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
            >
              {reviews.map((review) => {
                const rating = Math.min(
                  5,
                  Math.max(0, Math.floor(review.rating))
                );

                const name = getGuestName(review);

                return (
                  <SwiperSlide key={review._id || review.id}>
                    <div className="h-full bg-[#0c0a08] border border-[rgba(196,149,74,0.12)] p-8 flex flex-col gap-4">
                      {/* Original star layout */}
                      <div className="flex gap-1">
                        {[...Array(rating)].map((_, i) => (
                          <Star
                            key={i}
                            size={13}
                            fill={gold}
                            color={gold}
                            strokeWidth={1}
                          />
                        ))}
                      </div>

                      {/* Original review text styling */}
                      <p className="font-['Jost'] text-[#ede4d4]/75 leading-relaxed text-sm italic font-light flex-1">
                        &ldquo;{getReviewText(review)}&rdquo;
                      </p>

                      {/* Original guest information layout */}
                      <div className="flex items-center gap-3 pt-4 border-t border-[rgba(196,149,74,0.08)]">
                        <div className="w-10 h-10 bg-[rgba(196,149,74,0.12)] border border-[rgba(196,149,74,0.25)] flex items-center justify-center shrink-0">
                          <span className="text-[#c4954a] text-xs font-['DM_Mono']">
                            {getInitials(review)}
                          </span>
                        </div>

                        <div>
                          <div className="text-sm font-['Jost'] text-[#ede4d4]">
                            {name}
                          </div>

                          <div className="text-xs font-['DM_Mono'] text-[#8a7d6a]">
                            {review.role || "Guest"}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonial;