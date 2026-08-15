'use client'

import React from 'react'

import { TESTIMONIALS } from '@/index'
import { Star } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const gold = "#c4954a"

const Testimonial = () => {
  return (
    <div>
      <section className="bg-[#161310] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3"><div className="h-px w-8 bg-[#c4954a]" /><span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">Guest Stories</span><div className="h-px w-8 bg-[#c4954a]" /></div>
            <h2 className="font-['Fraunces'] text-4xl text-[#ede4d4]">In Their Own <em className="italic">Words</em></h2>
          </div>
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            loop={true}
            speed={800}
            spaceBetween={24}
            navigation={false}
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
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
        {TESTIMONIALS.map((t) => (
            <SwiperSlide key={t.id}>
            <div className="h-full bg-[#0c0a08] border border-[rgba(196,149,74,0.12)] p-8 flex flex-col gap-4">

                <div className="flex gap-1">
                {[...Array(t.rating)].map((_, i) => (
                    <Star
                    key={i}
                    size={13}
                    fill={gold}
                    color={gold}
                    strokeWidth={1}
                    />
                ))}
                </div>

                <p className="font-['Jost'] text-[#ede4d4]/75 leading-relaxed text-sm italic font-light flex-1">
                &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-[rgba(196,149,74,0.08)]">
                <div className="w-10 h-10 bg-[rgba(196,149,74,0.12)] border border-[rgba(196,149,74,0.25)] flex items-center justify-center shrink-0">
                    <span className="text-[#c4954a] text-xs font-['DM_Mono']">
                    {t.initials}
                    </span>
                </div>

                <div>
                    <div className="text-sm font-['Jost'] text-[#ede4d4]">
                    {t.name}
                    </div>

                    <div className="text-xs font-['DM_Mono'] text-[#8a7d6a]">
                    {t.role}
                    </div>
                </div>
                </div>

            </div>
            </SwiperSlide>
        ))}
        </Swiper>
        </div>
      </section>
    </div>
  )
}

export default Testimonial