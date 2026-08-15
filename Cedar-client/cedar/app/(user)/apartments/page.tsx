// "use client"

// import { useState, useEffect } from "react";
// import api from "@/lib/api";
// import SectionLabel from "@/component/user/SectionLabel";
// import RoomCard from "@/component/user/RoomCard";


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
// const Apartment = () => {
//     const [apartments, setApartments] = useState<Apartment[]>([]);

//     const [categories, setCategories] = useState([]);
//     const filteredCategories = [{ _id: "all", title: "All" }, ...categories];
//     const [selectedCategory, setSelectedCategory] = useState("all");

//     useEffect(() => {
//         const getCategories = async () => {
//             try{
//                 const res = await api.get("/category/all-categories")
//                 setCategories(res.data);
//                 console.log(res.data)
//             }catch(error){
//                 console.log("Error getting categories:", error)
//             }
//         }

//         getCategories()
//     }, [])

//     const displayApartments = async (id) => {
//         try{
//             if(id === "all"){
//                 const res = await api.get("/apartment/all-apartments");
//                 setApartments(res.data);
//                 setSelectedCategory("all");
//                 console.log("All apartments:", res.data)
//             }else{
//                 const res = await api.get(`/apartment/category/${id}`);
//                 setApartments(res.data);
//                 setSelectedCategory(id);
//                 console.log(`apartments in category ${id}:`, res.data)
//             }
//         }catch(error){
//             console.log("Error fetching apartments:", error)
//         }
//     }

//     useEffect(() => {
//         displayApartments("all");
//     }, []);

//     useEffect(() => {
//         const getApartments = async () => {
//             try{
//                 const response = await api.get("/apartment/all-apartments");

//                 setApartments(response.data)
//             }catch(error){
//                 console.log("Error fetching apartments:", error)
//             }
//         }

//         getApartments()
//     }, [])
//     return ()
// }


"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import SectionLabel from "@/component/user/SectionLabel";
import RoomCard from "@/component/user/RoomCard";

interface Category {
  _id: string;
  title: string;
}

interface GalleryImage {
  _id: string;
  url: string;
  type: string;
  alt: string;
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
  reviewCount: number;
  slug: string;
  category: Category;
  gallery: GalleryImage[];
}

const Apartment = () => {
  const router = useRouter();

  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Get categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await api.get("/apartment-category/all-categories");

        setCategories(res.data.categories);
        console.log("Categories:", res.data.categories);
      } catch (error) {
        console.log("Error getting categories:", error);
      }
    };

    getCategories();
  }, []);

  // Get all apartments
  useEffect(() => {
    const getApartments = async () => {
      try {
        const res = await api.get("/apartment/all-apartments");

        setApartments(res.data.apartments);
        console.log("All apartments:", res.data.apartments);
      } catch (error) {
        console.log("Error fetching apartments:", error);
      }
    };

    getApartments();
  }, []);

  // Filter apartments by category
  const displayApartments = async (id: string) => {
    try {
      if (id === "all") {
        const res = await api.get("/apartment/all-apartments");

        setApartments(res.data.apartments);
        setSelectedCategory("all");

        console.log("All apartments:", res.data.apartments);
      } else {
        const res = await api.get(`/apartment/category/${id}`);

        setApartments(res.data.apartments);
        setSelectedCategory(id);

        console.log(
          `Apartments in category ${id}:`,
          res.data.apartments
        );
      }
    } catch (error) {
      console.log("Error fetching apartments:", error);
    }
  };

  const categoriesWithAll = [
    { _id: "all", title: "All" },
    ...categories,
  ];

  return (
    <div className="pt-20 bg-[#0c0a08]">

      {/* Header */}
      <div className="bg-[#161310] border-b border-[rgba(196,149,74,0.12)] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel text="Accommodation" />

          <h1 className="font-['Fraunces'] text-5xl text-[#ede4d4]">
            Rooms & <em className="italic">Suites</em>
          </h1>
        </div>
      </div>

      {/* Apartments */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">

          {categoriesWithAll.map((category) => (
            <button
              key={category._id}
              onClick={() => displayApartments(category._id)}
              className={`
                px-4 py-2
                text-[10px]
                font-['DM_Mono']
                tracking-widest
                uppercase
                transition-all
                border

                ${
                  selectedCategory === category._id
                    ? "bg-[#c4954a] text-[#0c0a08] border-[#c4954a]"
                    : "border-[rgba(196,149,74,0.2)] text-[#8a7d6a] hover:border-[#c4954a] hover:text-[#c4954a]"
                }
              `}
            >
              {category.title}
            </button>
          ))}

        </div>

        {/* Apartment cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {apartments.map((apartment) => (
            <RoomCard
              key={apartment._id}
              apartment={apartment}
            />
          ))}

        </div>

      </div>
    </div>
  );
};

export default Apartment;