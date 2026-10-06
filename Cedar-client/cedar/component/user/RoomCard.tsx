// import StarRating from "./StarRating";
// import Link from "next/link";

// function RoomCard({ apartment }: { apartment: any }) {
//     const livingRoomImage = apartment.gallery.find(
//   (image: any) => image.type === "living-room"
// );
//   return (
//     <Link className="group text-left border border-[rgba(196,149,74,0.1)] hover:border-[rgba(196,149,74,0.45)] transition-all duration-300 bg-[#161310] overflow-hidden w-full"
//           href={`/apartment-details/${apartment.slug}`}>
//       <div className="overflow-hidden h-56 bg-[#0c0a08]">
//         <img src={livingRoomImage?.url} alt={livingRoomImage?.alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
//       </div>
//       <div className="p-6">
//         <div className="flex justify-between items-start mb-2">
//           <div>
//             <span className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase">{apartment.category.title}</span>
//             <h3 className="font-['Fraunces'] text-xl text-[#ede4d4] mt-0.5">{apartment.title}</h3>
//           </div>
//           <div className="text-right shrink-0 ml-2">
//             <div className="font-['Fraunces'] text-2xl text-[#c4954a]">${apartment.price}</div>
//             <div className="text-[10px] font-['DM_Mono'] text-[#8a7d6a]">per night</div>
//           </div>
//         </div>
//         <div className="flex items-center gap-3 mb-3 text-xs font-['DM_Mono'] text-[#8a7d6a]">
//           <span>{apartment.area}</span><span className="text-[#c4954a]/40">·</span><span>{apartment.guests} guests</span><span className="text-[#c4954a]/40">·</span><span className="truncate">{apartment.view}</span>
//         </div>
//         <div className="flex items-center justify-between">
//           <StarRating rating={apartment.rating} size={12} />
//           <span className="text-xs font-['DM_Mono'] text-[#8a7d6a]">{apartment.reviewCount} reviews</span>
//         </div>
//       </div>
//     </Link>
//   );
// }

// export default RoomCard;





"use client";

import Link from "next/link";
import {
  BedDouble,
  Eye,
  Star,
  Users,
} from "lucide-react";

interface GalleryImage {
  _id?: string;
  url: string;
  type: string;
  alt?: string;
}

interface Apartment {
  _id: string;
  title: string;
  description: string;
  price: number;
  guests: number;
  area: number;
  view: string;
  status: string;
  rating: number;
  reviewCount?: number;
  slug: string;

  gallery: GalleryImage[];

  category?: {
    _id: string;
    title: string;
  };

  bedrooms?: number;
}

function RoomCard({ apartment }: { apartment: Apartment }) {
  const livingRoomImage = apartment.gallery?.find(
    (image) => image.type === "living-room"
  );

  const image =
    livingRoomImage?.url ||
    apartment.gallery?.[0]?.url ||
    "/images/placeholder-room.jpg";

  const imageAlt =
    livingRoomImage?.alt ||
    apartment.title;

  const isAvailable =
    apartment.status?.toLowerCase() === "available";

  return (
    <Link
      href={`/apartment-details/${apartment.slug}`}
      className="
        group
        block
        w-full
        overflow-hidden
        border
        border-[#2b2721]
        bg-[#161310]
        transition-all
        duration-300
        hover:border-[#c4954a]/50
        hover:-translate-y-1
      "
    >
      {/* ========================= */}
      {/* IMAGE */}
      {/* ========================= */}

      <div className="relative h-[235px] overflow-hidden bg-[#0c0a08]">

        <img
          src={image}
          alt={imageAlt}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />

        {/* Dark gradient at bottom */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#161310]
            via-transparent
            to-transparent
          "
        />

        {/* ========================= */}
        {/* STATUS */}
        {/* ========================= */}

        <div
          className="
            absolute
            left-3
            top-3
            border
            border-[#c4954a]
            bg-[#161310]/90
            px-2
            py-1
            text-[10px]
            font-['DM_Mono']
            uppercase
            tracking-widest
            text-[#c4954a]
          "
        >
          {isAvailable ? "Available" : apartment.status}
        </div>

        {/* ========================= */}
        {/* PRICE */}
        {/* ========================= */}

        <div
          className="
            absolute
            right-3
            top-3
            bg-[#161310]/95
            px-3
            py-2
          "
        >
          <div className="font-['Fraunces'] text-base text-[#c4954a]">
            ${apartment.price}
            <span className="ml-1 text-xs text-[#8a7d6a]">
              /night
            </span>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* CONTENT */}
      {/* ========================= */}

      <div className="px-5 pb-5 pt-4">

        {/* Title + Rating */}

        <div className="mb-3 flex items-start justify-between gap-4">

          <h3
            className="
              font-['Fraunces']
              text-[20px]
              leading-tight
              text-[#ede4d4]
              transition-colors
              duration-300
              group-hover:text-[#c4954a]
            "
          >
            {apartment.title}
          </h3>

          <div className="flex shrink-0 items-center gap-1 pt-1">
            <Star
              size={12}
              fill="currentColor"
              className="text-[#c4954a]"
            />

            <span
              className="
                text-[11px]
                font-['DM_Mono']
                text-[#c4954a]
              "
            >
              {apartment.rating
                ? apartment.rating.toFixed(1)
                : "0.0"}
            </span>
          </div>
        </div>

        {/* ========================= */}
        {/* DETAILS */}
        {/* ========================= */}

        <div
          className="
            mb-3
            flex
            flex-wrap
            items-center
            gap-x-3
            gap-y-2
            text-[11px]
            font-['DM_Mono']
            text-[#8a7d6a]
          "
        >

          {/* Bedrooms */}

          <div className="flex items-center gap-1.5">
            <BedDouble
              size={13}
              className="text-[#c4954a]"
            />

            <span>
              {apartment.bedrooms ?? 3} Bedrooms
            </span>
          </div>

          <span className="text-[#c4954a]/40">
            ·
          </span>

          {/* Guests */}

          <div className="flex items-center gap-1.5">
            <Users
              size={13}
              className="text-[#c4954a]"
            />

            <span>
              Up to {apartment.guests} guests
            </span>
          </div>

          <span className="text-[#c4954a]/40">
            ·
          </span>

          {/* View */}

          <div className="flex items-center gap-1.5">
            <Eye
              size={13}
              className="text-[#c4954a]"
            />

            <span>
              {apartment.view}
            </span>
          </div>
        </div>

        {/* ========================= */}
        {/* DESCRIPTION */}
        {/* ========================= */}

        <p
          className="
            mb-5
            line-clamp-2
            min-h-[38px]
            text-[12px]
            leading-5
            text-[#8a7d6a]
          "
        >
          {apartment.description}
        </p>

        {/* ========================= */}
        {/* VIEW & BOOK */}
        {/* ========================= */}

        <div
          className="
            flex
            h-10
            w-full
            items-center
            justify-center
            bg-[#c4954a]
            text-[12px]
            font-medium
            uppercase
            tracking-[0.12em]
            text-[#0c0a08]
            transition-all
            duration-300
            group-hover:bg-[#d2a65a]
          "
        >
          View & Book
        </div>
      </div>
    </Link>
  );
}

export default RoomCard;