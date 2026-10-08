// "use client";

// import Link from "next/link";
// import {
//   BedDouble,
//   Eye,
//   Star,
//   Users,
// } from "lucide-react";

// interface GalleryImage {
//   _id?: string;
//   url: string;
//   type: string;
//   alt?: string;
// }

// interface Apartment {
//   _id: string;
//   title: string;
//   description: string;
//   price: number;
//   guests: number;
//   area: number;
//   view: string;
//   status: string;
//   rating: number;
//   reviewCount?: number;
//   slug: string;

//   gallery: GalleryImage[];

//   category?: {
//     _id: string;
//     title: string;
//   };

//   bedrooms?: number;
// }

// function RoomCard({ apartment }: { apartment: Apartment }) {
//   const livingRoomImage = apartment.gallery?.find(
//     (image) => image.type === "living-room"
//   );

//   const image =
//     livingRoomImage?.url ||
//     apartment.gallery?.[0]?.url ||
//     "/images/placeholder-room.jpg";

//   const imageAlt =
//     livingRoomImage?.alt ||
//     apartment.title;

//   const isAvailable =
//     apartment.status?.toLowerCase() === "available";

//   return (
//     <Link
//       href={`/apartment-details/${apartment.slug}`}
//       className="
//         group
//         block
//         w-full
//         overflow-hidden
//         border
//         border-[#2b2721]
//         bg-[#161310]
//         transition-all
//         duration-300
//         hover:border-[#c4954a]/50
//         hover:-translate-y-1
//       "
//     >
//       {/* ========================= */}
//       {/* IMAGE */}
//       {/* ========================= */}

//       <div className="relative h-[235px] overflow-hidden bg-[#0c0a08]">

//         <img
//           src={image}
//           alt={imageAlt}
//           className="
//             absolute
//             inset-0
//             h-full
//             w-full
//             object-cover
//             transition-transform
//             duration-700
//             group-hover:scale-105
//           "
//         />

//         {/* Dark gradient at bottom */}
//         <div
//           className="
//             absolute
//             inset-0
//             bg-gradient-to-t
//             from-[#161310]
//             via-transparent
//             to-transparent
//           "
//         />

//         {/* ========================= */}
//         {/* STATUS */}
//         {/* ========================= */}

//         <div
//           className="
//             absolute
//             left-3
//             top-3
//             border
//             border-[#c4954a]
//             bg-[#161310]/90
//             px-2
//             py-1
//             text-[10px]
//             font-['DM_Mono']
//             uppercase
//             tracking-widest
//             text-[#c4954a]
//           "
//         >
//           {isAvailable ? "Available" : apartment.status}
//         </div>

//         {/* ========================= */}
//         {/* PRICE */}
//         {/* ========================= */}

//         <div
//           className="
//             absolute
//             right-3
//             top-3
//             bg-[#161310]/95
//             px-3
//             py-2
//           "
//         >
//           <div className="font-['Fraunces'] text-base text-[#c4954a]">
//             ${apartment.price}
//             <span className="ml-1 text-xs text-[#8a7d6a]">
//               /night
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* ========================= */}
//       {/* CONTENT */}
//       {/* ========================= */}

//       <div className="px-5 pb-5 pt-4">

//         {/* Title + Rating */}

//         <div className="mb-3 flex items-start justify-between gap-4">

//           <h3
//             className="
//               font-['Fraunces']
//               text-[20px]
//               leading-tight
//               text-[#ede4d4]
//               transition-colors
//               duration-300
//               group-hover:text-[#c4954a]
//             "
//           >
//             {apartment.title}
//           </h3>

//           <div className="flex shrink-0 items-center gap-1 pt-1">
//             <Star
//               size={12}
//               fill="currentColor"
//               className="text-[#c4954a]"
//             />

//             <span
//               className="
//                 text-[11px]
//                 font-['DM_Mono']
//                 text-[#c4954a]
//               "
//             >
//               {apartment.rating
//                 ? apartment.rating.toFixed(1)
//                 : "0.0"}
//             </span>
//           </div>
//         </div>

//         {/* ========================= */}
//         {/* DETAILS */}
//         {/* ========================= */}

//         <div
//           className="
//             mb-3
//             flex
//             flex-wrap
//             items-center
//             gap-x-3
//             gap-y-2
//             text-[11px]
//             font-['DM_Mono']
//             text-[#8a7d6a]
//           "
//         >

//           {/* Bedrooms */}

//           <div className="flex items-center gap-1.5">
//             <BedDouble
//               size={13}
//               className="text-[#c4954a]"
//             />

//             <span>
//               {apartment.bedrooms ?? 3} Bedrooms
//             </span>
//           </div>

//           <span className="text-[#c4954a]/40">
//             ·
//           </span>

//           {/* Guests */}

//           <div className="flex items-center gap-1.5">
//             <Users
//               size={13}
//               className="text-[#c4954a]"
//             />

//             <span>
//               Up to {apartment.guests} guests
//             </span>
//           </div>

//           <span className="text-[#c4954a]/40">
//             ·
//           </span>

//           {/* View */}

//           <div className="flex items-center gap-1.5">
//             <Eye
//               size={13}
//               className="text-[#c4954a]"
//             />

//             <span>
//               {apartment.view}
//             </span>
//           </div>
//         </div>

//         {/* ========================= */}
//         {/* DESCRIPTION */}
//         {/* ========================= */}

//         <p
//           className="
//             mb-5
//             line-clamp-2
//             min-h-[38px]
//             text-[12px]
//             leading-5
//             text-[#8a7d6a]
//           "
//         >
//           {apartment.description}
//         </p>

//         {/* ========================= */}
//         {/* VIEW & BOOK */}
//         {/* ========================= */}

//         <div
//           className="
//             flex
//             h-10
//             w-full
//             items-center
//             justify-center
//             bg-[#c4954a]
//             text-[12px]
//             font-medium
//             uppercase
//             tracking-[0.12em]
//             text-[#0c0a08]
//             transition-all
//             duration-300
//             group-hover:bg-[#d2a65a]
//           "
//         >
//           View & Book
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
    livingRoomImage?.alt || apartment.title;

  // Normalize backend status
  const status = apartment.status?.toLowerCase();

  const isAvailable = status === "available";
  const isBooked = status === "booked";
  const isMaintenance = status === "maintenance";

  const canBook = isAvailable;

  // Status styling
  const statusStyles = isAvailable
    ? "border-green-500/40 bg-green-500/10 text-green-400"
    : isBooked
    ? "border-blue-500/40 bg-blue-500/10 text-blue-400"
    : "border-yellow-500/40 bg-yellow-500/10 text-yellow-400";

  const statusLabel = isAvailable
    ? "Available"
    : isBooked
    ? "Booked"
    : "Maintenance";

  // Button styling
  const buttonStyles = canBook
    ? "bg-[#c4954a] text-[#0c0a08] group-hover:bg-[#d2a65a]"
    : "cursor-not-allowed bg-[#2b2721] text-[#8a7d6a]";

  const cardContent = (
    <>
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

        {/* Dark gradient */}
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
          className={`
            absolute
            left-3
            top-3
            border
            px-2
            py-1
            text-[10px]
            font-['DM_Mono']
            uppercase
            tracking-widest
            ${statusStyles}
          `}
        >
          {statusLabel}
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
            ₦{apartment.price.toLocaleString()}

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
          className={`
            flex
            h-10
            w-full
            items-center
            justify-center
            text-[12px]
            font-medium
            uppercase
            tracking-[0.12em]
            transition-all
            duration-300
            ${buttonStyles}
          `}
        >
          {canBook ? "View & Book" : "Not Available"}
        </div>
      </div>
    </>
  );

  // Available apartments remain clickable.
  if (canBook) {
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
          hover:-translate-y-1
          hover:border-[#c4954a]/50
        "
      >
        {cardContent}
      </Link>
    );
  }

  // Booked / maintenance apartments are not clickable.
  return (
    <div
      className="
        group
        block
        w-full
        overflow-hidden
        border
        border-[#2b2721]
        bg-[#161310]
        opacity-90
      "
    >
      {cardContent}
    </div>
  );
}

export default RoomCard;