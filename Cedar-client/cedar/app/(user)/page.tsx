import Image from "next/image";
import HeroImage from "@/public/cedar_hero.jpg";
import Hero from "@/component/user/Hero";
import Qualities from "@/component/user/Qualities";
import FeaturedApartment from "@/component/user/FeaturedApartment";
import Dining from "@/component/user/Dining";
import Amenities from "@/component/user/Amenities";
import Testimonial from "@/component/user/Testimonial";
import CTA from "@/component/user/CTA";
import Map from "@/component/user/Map";

const HomePage = () => {
  return (
    <div>
      <main>
        <Hero />
        <Qualities />
        <FeaturedApartment />
        <Dining />
        <Amenities />
        <Testimonial />
        <CTA />
        <Map />
      </main>
    </div>
  );
};

export default HomePage;