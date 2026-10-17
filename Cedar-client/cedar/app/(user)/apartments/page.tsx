// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import api from "@/lib/api";
// import SectionLabel from "@/component/user/SectionLabel";
// import RoomCard from "@/component/user/RoomCard";

// interface Category {
//   _id: string;
//   title: string;
// }

// interface GalleryImage {
//   _id: string;
//   url: string;
//   type: string;
//   alt: string;
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
//   reviewCount: number;
//   slug: string;
//   category: Category;
//   gallery: GalleryImage[];
// }

// const Apartment = () => {
//   const router = useRouter();

//   const [apartments, setApartments] = useState<Apartment[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");

//   // Get categories
//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         const res = await api.get("/apartment-category/all-categories");

//         setCategories(res.data.categories);
//         console.log("Categories:", res.data.categories);
//       } catch (error) {
//         console.log("Error getting categories:", error);
//       }
//     };

//     getCategories();
//   }, []);

//   // Get all apartments
//   useEffect(() => {
//     const getApartments = async () => {
//       try {
//         const res = await api.get("/apartment/all-apartments");

//         setApartments(res.data.apartments);
//         console.log("All apartments:", res.data.apartments);
//       } catch (error) {
//         console.log("Error fetching apartments:", error);
//       }
//     };

//     getApartments();
//   }, []);

//   // Filter apartments by category
//   const displayApartments = async (id: string) => {
//     try {
//       if (id === "all") {
//         const res = await api.get("/apartment/all-apartments");

//         setApartments(res.data.apartments);
//         setSelectedCategory("all");

//         console.log("All apartments:", res.data.apartments);
//       } else {
//         const res = await api.get(`/apartment/category/${id}`);

//         setApartments(res.data.apartments);
//         setSelectedCategory(id);

//         console.log(
//           `Apartments in category ${id}:`,
//           res.data.apartments
//         );
//       }
//     } catch (error) {
//       console.log("Error fetching apartments:", error);
//     }
//   };

//   const categoriesWithAll = [
//     { _id: "all", title: "All" },
//     ...categories,
//   ];

//   return (
//     <div className="pt-20 bg-[#0c0a08]">

//       {/* Header */}
//       <div className="bg-[#161310] border-b border-[rgba(196,149,74,0.12)] py-16">
//         <div className="max-w-7xl mx-auto px-6">
//           <SectionLabel text="Accommodation" />

//           <h1 className="font-['Fraunces'] text-5xl text-[#ede4d4]">
//             Rooms & <em className="italic">Suites</em>
//           </h1>
//         </div>
//       </div>

//       {/* Apartments */}
//       <div className="max-w-7xl mx-auto px-6 py-12">

//         {/* Category filters */}
//         <div className="flex flex-wrap gap-2 mb-10">

//           {categoriesWithAll.map((category) => (
//             <button
//               key={category._id}
//               onClick={() => displayApartments(category._id)}
//               className={`
//                 px-4 py-2
//                 text-[10px]
//                 font-['DM_Mono']
//                 tracking-widest
//                 uppercase
//                 transition-all
//                 border

//                 ${
//                   selectedCategory === category._id
//                     ? "bg-[#c4954a] text-[#0c0a08] border-[#c4954a]"
//                     : "border-[rgba(196,149,74,0.2)] text-[#8a7d6a] hover:border-[#c4954a] hover:text-[#c4954a]"
//                 }
//               `}
//             >
//               {category.title}
//             </button>
//           ))}

//         </div>

//         {/* Apartment cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

//           {apartments.map((apartment) => (
//             <RoomCard
//               key={apartment._id}
//               apartment={apartment}
//             />
//           ))}

//         </div>

//       </div>
//     </div>
//   );
// };

// export default Apartment;












"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import SectionLabel from "@/component/user/SectionLabel";
import RoomCard from "@/component/user/RoomCard";

interface Category {
  _id: string;
  title: string;
}

interface GalleryImage {
  _id?: string;
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
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);

  // Fetch apartment categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await api.get("/apartment-category/all-categories");

        setCategories(res.data.categories ?? res.data);
      } catch (error) {
        console.error("Error fetching apartment categories:", error);
      }
    };

    getCategories();
  }, []);

  // Fetch apartments by category, or fetch all apartments
  const displayApartments = async (id: string) => {
    setSelectedCategory(id);
    setLoading(true);

    try {
      const endpoint =
        id === "all"
          ? "/apartment/all-apartments"
          : `/apartment/category/${id}`;

      const res = await api.get(endpoint);

      const data = res.data.apartments ?? res.data;

      setApartments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching apartments:", error);
      setApartments([]);
    } finally {
      setLoading(false);
    }
  };

  // Load all apartments on first render
  useEffect(() => {
    displayApartments("all");
  }, []);

  const categoriesWithAll = [
    { _id: "all", title: "All" },
    ...categories.filter((category) => category._id !== "all"),
  ];

  return (
    <div className="pt-20 bg-[#0c0a08] min-h-screen">
      {/* Header */}
      <div className="bg-[#161310] border-b border-[rgba(196,149,74,0.12)] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel text="Accommodation" />

          <h1 className="font-['Fraunces'] text-4xl sm:text-5xl text-[#ede4d4]">
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
              className={`px-4 py-2 text-[10px] font-['DM_Mono'] tracking-widest uppercase transition-all border ${
                selectedCategory === category._id
                  ? "bg-[#c4954a] text-[#0c0a08] border-[#c4954a]"
                  : "border-[rgba(196,149,74,0.2)] text-[#8a7d6a] hover:border-[#c4954a] hover:text-[#c4954a]"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Apartment cards */}
        {loading ? (
          <p className="text-center text-[#8a7d6a] py-16">
            Loading apartments...
          </p>
        ) : apartments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apartments.map((apartment) => (
              <RoomCard
                key={apartment._id}
                apartment={apartment}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-[#8a7d6a] py-16">
            No apartments found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default Apartment;
