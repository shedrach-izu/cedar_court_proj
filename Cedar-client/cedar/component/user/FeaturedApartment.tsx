// 'use client'

// import React from 'react'
// import SectionLabel from './SectionLabel'
// import { useState, useEffect } from 'react'
// import { rooms } from '@/index'
// import RoomCard from './RoomCard'
// import { ArrowRight } from 'lucide-react'
// import { Fraunces, Jost } from "next/font/google";
// import api from '@/lib/api'

// const fraunces = Fraunces({
//   subsets: ["latin"],
// });

// const jost = Jost({
//   subsets: ["latin"],
// });

// interface Apartment {
//   _id: string;
//   title: string;
//   description: string;
//   image: string;
//   price: number;
//   guests: number;
//   area: number;
//   view: string;
//   status: string;
//   rating: number;
// }

// const FeaturedApartment = () => {

//     const [apartments, setApartments] = useState<Apartment[]>([])

//     useEffect(() => {
//         const getFeaturedApartments = async () => {
//             try{
//                 const response = await api.get("/apartment/featured");

//                 console.log("Featured apartments:", response.data);
//                 setApartments(response.data);
//             }catch(error){
//                 console.log("Error getting featured apartments:", error)
//             }
//         }

//         getFeaturedApartments();
//     }, [])
//     return (
//         <div className='max-w-full bg-[#0c0a08]'>
//             <section className="py-24 max-w-7xl mx-auto px-6">
//                 <div className="flex items-end justify-between mb-12">
//                     <div><SectionLabel text="Accommodation" /><h2 className={`${fraunces.className} text-4xl md:text-5xl text-[#ede4d4]`}>Our Finest<br /><em className="italic">Rooms &amp; Suites</em></h2></div>
//                     <button className="hidden md:flex items-center gap-2 text-sm font-['Jost'] text-[#c4954a] hover:gap-3 transition-all">View All <ArrowRight size={16} /></button>
//                 </div>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                    {apartments.slice(0, 3).map(apartment => <RoomCard key={apartment._id} apartment={apartment} />)}
//                 </div>
//                 <button className="md:hidden mt-8 w-full flex items-center justify-center gap-2 text-sm font-['Jost'] text-[#c4954a] hover:gap-3 transition-all">View All <ArrowRight size={16} /></button>
//                 {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                    {rooms.slice(0, 3).map(room => <RoomCard key={room.id} room={room} />)}
//                 </div> */}
//             </section>
//         </div>
//     )
// }

// export default FeaturedApartment





"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Fraunces } from "next/font/google";

import SectionLabel from "./SectionLabel";
import RoomCard from "./RoomCard";
import api from "@/lib/api";

const fraunces = Fraunces({
  subsets: ["latin"],
});

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

const FeaturedApartment = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    const getFeaturedApartments = async () => {
      try {
        const response = await api.get("/apartment/featured");

        console.log("Featured apartments:", response.data);

        /*
          This handles either:

          [
            {...},
            {...}
          ]

          OR

          {
            apartments: [
              {...},
              {...}
            ]
          }
        */

        const data = Array.isArray(response.data)
          ? response.data
          : response.data.apartments || [];

        setApartments(data);
      } catch (error) {
        console.error(
          "Error getting featured apartments:",
          error
        );
      }
    };

    getFeaturedApartments();
  }, []);

  return (
    <section className="bg-[#0c0a08] py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* ========================= */}
        {/* SECTION HEADER */}
        {/* ========================= */}

        <div className="mb-12 flex items-end justify-between">

          <div>
            <SectionLabel text="Accommodation" />

            <h2
              className={`${fraunces.className} mt-2 text-4xl leading-tight text-[#ede4d4] md:text-5xl`}
            >
              Our Finest
              <br />

              <em className="italic text-[#c4954a]">
                Rooms & Suites
              </em>
            </h2>
          </div>

          {/* Desktop View All */}

          <button
            className="
              hidden
              items-center
              gap-2
              text-sm
              text-[#c4954a]
              transition-all
              duration-300
              hover:gap-3
              md:flex
            "
          >
            <span className="font-['Jost']">
              View All
            </span>

            <ArrowRight size={16} />
          </button>
        </div>

        {/* ========================= */}
        {/* APARTMENTS */}
        {/* ========================= */}

        {apartments.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {apartments
              .slice(0, 3)
              .map((apartment) => (
                <RoomCard
                  key={apartment._id}
                  apartment={apartment}
                />
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="
                  h-[430px]
                  animate-pulse
                  border
                  border-[#2b2721]
                  bg-[#161310]
                "
              />
            ))}
          </div>
        )}

        {/* ========================= */}
        {/* MOBILE VIEW ALL */}
        {/* ========================= */}

        <button
          className="
            mt-8
            flex
            w-full
            items-center
            justify-center
            gap-2
            text-sm
            text-[#c4954a]
            transition-all
            duration-300
            hover:gap-3
            md:hidden
          "
        >
          <span className="font-['Jost']">
            View All
          </span>

          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default FeaturedApartment;