'use client'

import React from 'react'
import SectionLabel from './SectionLabel'
import { useState, useEffect } from 'react'
import { rooms } from '@/index'
import RoomCard from './RoomCard'
import { ArrowRight } from 'lucide-react'
import { Fraunces, Jost } from "next/font/google";
import api from '@/lib/api'

const fraunces = Fraunces({
  subsets: ["latin"],
});

const jost = Jost({
  subsets: ["latin"],
});

interface Apartment {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  guests: number;
  area: number;
  view: string;
  status: string;
  rating: number;
}

const FeaturedApartment = () => {

    const [apartments, setApartments] = useState<Apartment[]>([])

    useEffect(() => {
        const getFeaturedApartments = async () => {
            try{
                const response = await api.get("/apartment/all-apartments");

                console.log("Featured apartments:", response.data.apartments);
                setApartments(response.data.apartments);
            }catch(error){
                console.log("Error getting featured apartments:", error)
            }
        }

        getFeaturedApartments();
    }, [])
    return (
        <div className='max-w-full bg-[#0c0a08]'>
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-12">
                    <div><SectionLabel text="Accommodation" /><h2 className={`${fraunces.className} text-4xl md:text-5xl text-[#ede4d4]`}>Our Finest<br /><em className="italic">Rooms &amp; Suites</em></h2></div>
                    <button className="hidden md:flex items-center gap-2 text-sm font-['Jost'] text-[#c4954a] hover:gap-3 transition-all">View All <ArrowRight size={16} /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {apartments.slice(0, 3).map(apartment => <RoomCard key={apartment._id} apartment={apartment} />)}
                </div>
                <button className="md:hidden mt-8 w-full flex items-center justify-center gap-2 text-sm font-['Jost'] text-[#c4954a] hover:gap-3 transition-all">View All <ArrowRight size={16} /></button>
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {rooms.slice(0, 3).map(room => <RoomCard key={room.id} room={room} />)}
                </div> */}
            </section>
        </div>
    )
}

export default FeaturedApartment