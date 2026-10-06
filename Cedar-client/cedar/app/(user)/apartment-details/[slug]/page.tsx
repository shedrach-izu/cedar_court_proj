"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Minus,
  Plus,
} from "lucide-react";

import StarRating from "@/component/user/StarRating";
import api from "@/lib/api";

interface GalleryImage {
  _id: string;
  url: string;
  type: string;
  alt: string;
}

interface Amenity {
  _id: string;
  name: string;
  isActive: boolean;
}

interface Category {
  _id: string;
  title: string;
}

interface Apartment {
  _id: string;
  title: string;
  description: string;
  gallery: GalleryImage[];
  area: number;
  guests: number;
  view: string;
  price: number;
  status: string;
  reviewCount: number;
  category: Category;
  rating: number;
  slug: string;
  isFeatured: boolean;
  amenities: Amenity[];
}

const ApartmentDetailsPage = () => {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug as string;

  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [imgIdx, setImgIdx] = useState(0);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [guests, setGuests] = useState(1);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getApartment = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/apartment/${slug}`);

        console.log("Apartment:", response.data);

        setApartment(response.data);
      } catch (error) {
        console.error("Error getting apartment:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      getApartment();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="pt-20 min-h-screen bg-[#0c0a08] text-[#ede4d4] flex items-center justify-center">
        <p className="font-['DM_Mono'] text-[#8a7d6a]">
          Loading apartment...
        </p>
      </main>
    );
  }

  if (!apartment) {
    return (
      <main className="pt-20 min-h-screen bg-[#0c0a08] text-[#ede4d4] flex flex-col items-center justify-center">
        <h1 className="font-['Fraunces'] text-4xl mb-4">
          Apartment not found
        </h1>

        <button
          onClick={() => router.push("/rooms")}
          className="text-[#c4954a] font-['Jost']"
        >
          Back to Rooms
        </button>
      </main>
    );
  }


  const livingRoomImage = apartment.gallery.find(
    (image) => image.type === "living-room"
  );

  const otherImages = apartment.gallery.filter(
    (image) => image.type !== "living-room"
  );

  const currentImage = apartment.gallery[imgIdx];

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const difference = end.getTime() - start.getTime();

    return Math.max(
      0,
      Math.ceil(difference / (1000 * 60 * 60 * 24))
    );
  };

  const nights = calculateNights();

  const subtotal = apartment.price * nights;
  const serviceCharge = Math.round(subtotal * 0.1);
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + serviceCharge + taxes;

  const previousImage = () => {
    setImgIdx((current) =>
      current === 0 ? apartment.gallery.length - 1 : current - 1
    );
  };

  const nextImage = () => {
    setImgIdx((current) =>
      current === apartment.gallery.length - 1 ? 0 : current + 1
    );
  };

  return (
    <main className="pt-20 bg-[#0c0a08] min-h-screen">

      {/* Back button */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <button
          onClick={() => router.push("/rooms")}
          className="flex items-center gap-2 text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#c4954a] transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Rooms
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">

        {/* ================= GALLERY ================= */}

        <div className="mb-12">


          {/* Apartment Gallery */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-12">

                {/* Large living room image */}
                <div className="h-[500px] overflow-hidden bg-[#0c0a08]">
                    {livingRoomImage && (
                    <img
                        src={livingRoomImage.url}
                        alt={livingRoomImage.alt || apartment.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                    )}
                </div>

                {/* Other images */}
                <div className="grid grid-cols-2 gap-3 h-[500px]">
                    {otherImages.map((image) => (
                    <div
                        key={image._id}
                        className="overflow-hidden bg-[#0c0a08]"
                    >
                        <img
                        src={image.url}
                        alt={image.alt || apartment.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                    ))}
                </div>

            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto">
                {apartment.gallery.map((image, index) => (
                <button
                    key={image._id}
                    onClick={() => setImgIdx(index)}
                    className={`w-24 h-16 shrink-0 overflow-hidden border-2 transition-all ${
                    imgIdx === index
                        ? "border-[#c4954a]"
                        : "border-transparent opacity-50 hover:opacity-80"
                    }`}
                >
                    <img
                    src={image.url}
                    alt={image.alt || ""}
                    className="w-full h-full object-cover"
                    />
                </button>
                ))}
            </div>
        </div>



        {/* ================= DETAILS + BOOKING ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ================= LEFT ================= */}

          <div className="lg:col-span-2">

            {/* Category */}
            <span className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase">
              {apartment.category?.title}
            </span>

            {/* Title */}
            <h1 className="font-['Fraunces'] text-4xl md:text-5xl text-[#ede4d4] mt-1 mb-4">
              {apartment.title}
            </h1>

            {/* Apartment information */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-['DM_Mono'] text-[#8a7d6a]">
              <span>{apartment.area} m²</span>

              <span className="text-[#c4954a]/40">
                ·
              </span>

              <span>
                Up to {apartment.guests} guests
              </span>

              <span className="text-[#c4954a]/40">
                ·
              </span>

              <span>
                {apartment.view}
              </span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-8">
              <StarRating
                rating={apartment.rating}
                size={16}
              />

              <span className="text-sm font-['DM_Mono'] text-[#8a7d6a]">
                {apartment.rating} ({apartment.reviewCount} reviews)
              </span>
            </div>

            {/* Description */}
            <p className="font-['Jost'] text-[#ede4d4]/70 leading-relaxed mb-10 font-light">
              {apartment.description}
            </p>

            {/* Amenities */}
            <h3 className="font-['Fraunces'] text-xl text-[#ede4d4] mb-5">
              Apartment Amenities
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">

              {apartment.amenities?.map((amenity) => (
                <div
                  key={amenity._id}
                  className="flex items-center gap-2 text-sm font-['Jost'] text-[#8a7d6a]"
                >
                  <CheckCircle
                    size={14}
                    className="text-[#c4954a] shrink-0"
                  />

                  {amenity.name}
                </div>
              ))}

            </div>
          </div>

          {/* ================= BOOKING CARD ================= */}

          <div className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-6 h-fit lg:sticky lg:top-24">

            {/* Price */}
            <div className="flex items-baseline justify-between mb-6">

              <div>
                <span className="font-['Fraunces'] text-3xl text-[#c4954a]">
                  ${apartment.price}
                </span>

                <span className="text-sm font-['DM_Mono'] text-[#8a7d6a] ml-1">
                  / night
                </span>
              </div>

              <StarRating
                rating={apartment.rating}
                size={12}
              />

            </div>

            {/* Dates */}
            <div className="space-y-3 mb-4">

              {/* Check in */}
              <div>
                <label className="block text-[10px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-wider mb-2">
                  Check-in
                </label>

                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-3 py-3 text-sm font-['DM_Mono'] text-[#ede4d4] outline-none focus:border-[#c4954a] [color-scheme:dark]"
                />
              </div>

              {/* Check out */}
              <div>
                <label className="block text-[10px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-wider mb-2">
                  Check-out
                </label>

                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-3 py-3 text-sm font-['DM_Mono'] text-[#ede4d4] outline-none focus:border-[#c4954a] [color-scheme:dark]"
                />
              </div>

              {/* Guests */}
              <div>
                <label className="block text-[10px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-wider mb-2">
                  Guests
                </label>

                <div className="flex items-center bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-3 py-2">

                  <button
                    onClick={() =>
                      setGuests((current) =>
                        Math.max(1, current - 1)
                      )
                    }
                    className="text-[#c4954a] p-1"
                  >
                    <Minus size={13} />
                  </button>

                  <span className="flex-1 text-center text-sm font-['DM_Mono'] text-[#ede4d4]">
                    {guests} guest{guests > 1 ? "s" : ""}
                  </span>

                  <button
                    onClick={() =>
                      setGuests((current) =>
                        Math.min(
                          apartment.guests,
                          current + 1
                        )
                      )
                    }
                    className="text-[#c4954a] p-1"
                  >
                    <Plus size={13} />
                  </button>

                </div>
              </div>

            </div>

            {/* Price breakdown */}

            {nights > 0 && (
              <div className="border-t border-[rgba(196,149,74,0.1)] pt-4 mb-4 space-y-2 text-sm">

                <div className="flex justify-between">
                  <span className="font-['Jost'] text-[#8a7d6a]">
                    ${apartment.price} × {nights} nights
                  </span>

                  <span className="font-['DM_Mono'] text-[#ede4d4]">
                    ${subtotal}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-['Jost'] text-[#8a7d6a]">
                    Service (10%)
                  </span>

                  <span className="font-['DM_Mono'] text-[#ede4d4]">
                    ${serviceCharge}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-['Jost'] text-[#8a7d6a]">
                    Taxes (12%)
                  </span>

                  <span className="font-['DM_Mono'] text-[#ede4d4]">
                    ${taxes}
                  </span>
                </div>

                <div className="flex justify-between pt-3 border-t border-[rgba(196,149,74,0.1)]">

                  <span className="font-['Fraunces'] text-[#ede4d4]">
                    Total
                  </span>

                  <span className="font-['DM_Mono'] text-[#c4954a] font-semibold">
                    ${total.toLocaleString()}
                  </span>

                </div>

              </div>
            )}

            {/* Reserve */}
            <button
              type="button"
              onClick={() => {
                if (!checkIn || !checkOut || nights <= 0) {
                  alert(
                    "Please select a valid check-in and check-out date."
                  );

                  return;
                }

                if (guests < 1 || guests > apartment.guests) {
                  alert(
                    `This apartment allows a maximum of ${apartment.guests} guests.`
                  );

                  return;
                }

                router.push(
                  `/checkout?type=booking&slug=${encodeURIComponent(
                    apartment.slug
                  )}&checkIn=${encodeURIComponent(
                    checkIn
                  )}&checkOut=${encodeURIComponent(
                    checkOut
                  )}&guests=${guests}`
                );
              }}
              className="w-full py-4 bg-[#c4954a] text-[#0c0a08] font-['Jost'] font-medium hover:bg-[#d5aa63] transition-colors"
            >
              Reserve Now
            </button>

            <p className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] text-center mt-3">
              Free cancellation up to 48 hours prior
            </p>

          </div>
        </div>
      </div>
    </main>
  );
};

export default ApartmentDetailsPage;