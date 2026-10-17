// "use client"

// import { useState, useEffect } from "react"
// import { GALLERY_IMAGES } from "@/index";
// import SectionLabel from "@/component/user/SectionLabel";
// import api from "@/lib/api";



// interface Category {
//   _id: string,
//   title: string
// }

// interface Gallery {
//   _id: string,
//   image: string
// }

// function GalleryPage() {
//   const cats = ["All","Rooms","Dining","Amenities"];
//   const [filter, setFilter] = useState("All");
//   const filtered = filter==="All"?GALLERY_IMAGES:GALLERY_IMAGES.filter(g=>g.cat===filter);

//   const [categories, setCategories] = useState<Category[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const filteredCategories = [{ _id: "all", title: "All" }, ...categories];
//   const [galleries, setGalleries] = useState<Gallery[]>([]);

//   useEffect(() => {
//     const getGalleryCategories = async () => {
//       try {
//         const response = await api.get("/gallery-category/all-categories");
//         setCategories(response.data);
//         console.log("gallery categories:", response.data);
//       } catch (error) {
//         console.log("Error getting gallery categories:", error)
//       }
//     }

//     getGalleryCategories();
//   }, [])

//   const displayGalleries = async (id: string) => {
//     try {
//       if(id === "all"){
//         const response = await api.get("/gallery/galleries");
//         setGalleries(response.data);
//         setSelectedCategory("all")
//         console.log("all galleries:", response.data)
//       }else{
//         const response = await api.get(`/gallery/category/${id}`);
//         setGalleries(response.data);
//         setSelectedCategory(id)
//         console.log("galleries under category:", response.data)
//       }
//     } catch (error) {
//       console.log("Error displaying galleries:", error)
//     }
//   }

//   useEffect(() => {
//     displayGalleries("all")
//   }, [])
//   return (
//     <div className="pt-20 bg-[#0c0a08]">
//       <div className="bg-[#161310] border-b border-[rgba(196,149,74,0.12)] py-16">
//         <div className="max-w-7xl mx-auto px-6"><SectionLabel text="Gallery" /><h1 className="font-['Fraunces'] text-5xl text-[#ede4d4]">Seen at <em className="italic">Cedar Court</em></h1></div>
//       </div>
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="flex gap-2 mb-10 flex-wrap">
//           {filteredCategories.map(category => <button key={category._id} onClick={() => displayGalleries(category._id)} className={`px-4 py-2 text-[10px] font-['DM_Mono'] tracking-widest uppercase transition-all border ${selectedCategory === category._id ?"bg-[#c4954a] text-[#0c0a08] border-[#c4954a]":"border-[rgba(196,149,74,0.2)] text-[#8a7d6a] hover:border-[#c4954a] hover:text-[#c4954a]"}`}>{category.title}</button>)}
//         </div>
//         <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
//           {galleries.map(gallery => <div key={gallery._id} className="break-inside-avoid mb-4 group overflow-hidden bg-[#161310]"><img src={gallery.image.url} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>)}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GalleryPage











// "use client"

// import { useState, useEffect } from "react"
// import { GALLERY_IMAGES } from "@/index";
// import SectionLabel from "@/component/user/SectionLabel";
// import api from "@/lib/api";

// interface Category {
//   _id: string,
//   title: string
// }

// interface Gallery {
//   _id: string,
//   image: {
//     url: string,
//     publicId?: string
//   },
//   category?: Category
// }

// function GalleryPage() {
//   const cats = ["All","Rooms","Dining","Amenities"];
//   const [filter, setFilter] = useState("All");
//   const filtered = filter==="All"?GALLERY_IMAGES:GALLERY_IMAGES.filter(g=>g.cat===filter);

//   const [categories, setCategories] = useState<Category[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const filteredCategories = [{ _id: "all", title: "All" }, ...categories];
//   const [galleries, setGalleries] = useState<Gallery[]>([]);

//   useEffect(() => {
//     const getGalleryCategories = async () => {
//       try {
//         const response = await api.get("/gallery-category/all-categories");
//         setCategories(response.data.categories ?? response.data);
//         console.log("gallery categories:", response.data);
//       } catch (error) {
//         console.log("Error getting gallery categories:", error)
//       }
//     }

//     getGalleryCategories();
//   }, [])

//   const displayGalleries = async (id: string) => {
//     try {
//       if(id === "all"){
//         const response = await api.get("/gallery/galleries");
//         setGalleries(response.data.galleries ?? response.data);
//         setSelectedCategory("all")
//         console.log("all galleries:", response.data)
//       }else{
//         const response = await api.get(`/gallery/category/${id}`);
//         setGalleries(response.data.galleries ?? response.data);
//         setSelectedCategory(id)
//         console.log("galleries under category:", response.data)
//       }
//     } catch (error) {
//       console.log("Error displaying galleries:", error)
//     }
//   }

//   useEffect(() => {
//     displayGalleries("all")
//   }, [])

//   return (
//     <div className="pt-20 bg-[#0c0a08]">
//       <div className="bg-[#161310] border-b border-[rgba(196,149,74,0.12)] py-16">
//         <div className="max-w-7xl mx-auto px-6"><SectionLabel text="Gallery" /><h1 className="font-['Fraunces'] text-5xl text-[#ede4d4]">Seen at <em className="italic">Cedar Court</em></h1></div>
//       </div>
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         <div className="flex gap-2 mb-10 flex-wrap">
//           {filteredCategories.map(category => <button key={category._id} onClick={() => displayGalleries(category._id)} className={`px-4 py-2 text-[10px] font-['DM_Mono'] tracking-widest uppercase transition-all border ${selectedCategory === category._id ?"bg-[#c4954a] text-[#0c0a08] border-[#c4954a]":"border-[rgba(196,149,74,0.2)] text-[#8a7d6a] hover:border-[#c4954a] hover:text-[#c4954a]"}`}>{category.title}</button>)}
//         </div>
//         <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
//           {galleries.map(gallery => <div key={gallery._id} className="break-inside-avoid mb-4 group overflow-hidden bg-[#161310]"><img src={gallery.image.url} alt={gallery.category?.title ?? "Cedar Court gallery"} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>)}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default GalleryPage











"use client"

import { useState, useEffect } from "react"
import SectionLabel from "@/component/user/SectionLabel";
import api from "@/lib/api";

interface Category {
  _id: string,
  title: string
}

interface Gallery {
  _id: string,
  image: {
    url: string,
    publicId?: string
  },
  category?: Category
}

function GalleryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredCategories = [{ _id: "all", title: "All" }, ...categories];
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch gallery categories from the backend.
  useEffect(() => {
    const getGalleryCategories = async () => {
      try {
        const response = await api.get("/gallery-category/all-categories");
        const data = response.data.categories ?? response.data;

        setCategories(Array.isArray(data) ? data : []);
        console.log("gallery categories:", data);
      } catch (error) {
        console.log("Error getting gallery categories:", error);
      }
    };

    getGalleryCategories();
  }, []);

  // Fetch all galleries or galleries belonging to a category.
  const displayGalleries = async (id: string) => {
    setSelectedCategory(id);
    setLoading(true);
    setError("");

    try {
      const response =
        id === "all"
          ? await api.get("/gallery/galleries")
          : await api.get(`/gallery/category/${id}`);

      const data = response.data.galleries ?? response.data;

      setGalleries(Array.isArray(data) ? data : []);
      console.log(
        id === "all" ? "all galleries:" : "galleries under category:",
        data
      );
    } catch (error) {
      console.log("Error displaying galleries:", error);
      setGalleries([]);
      setError("Unable to load gallery images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Load all galleries when the page opens.
  useEffect(() => {
    displayGalleries("all");
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-[#0c0a08]">
      <div className="bg-[#161310] border-b border-[rgba(196,149,74,0.12)] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel text="Gallery" />

          <h1 className="font-['Fraunces'] text-5xl text-[#ede4d4]">
            Seen at <em className="italic">Cedar Court</em>
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Category filters */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {filteredCategories.map(category => (
            <button
              key={category._id}
              type="button"
              onClick={() => displayGalleries(category._id)}
              disabled={loading}
              className={`px-4 py-2 text-[10px] font-['DM_Mono'] tracking-widest uppercase transition-all border ${
                selectedCategory === category._id
                  ? "bg-[#c4954a] text-[#0c0a08] border-[#c4954a]"
                  : "border-[rgba(196,149,74,0.2)] text-[#8a7d6a] hover:border-[#c4954a] hover:text-[#c4954a]"
              } disabled:opacity-60`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Loading state */}
        {loading && (
          <div className="py-16 text-center">
            <div className="w-8 h-8 mx-auto mb-4 rounded-full border-2 border-[rgba(196,149,74,0.2)] border-t-[#c4954a] animate-spin" />

            <p className="font-['DM_Mono'] text-xs tracking-widest uppercase text-[#8a7d6a]">
              Loading gallery...
            </p>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="py-16 text-center border border-[rgba(196,149,74,0.12)] bg-[#161310]">
            <p className="text-sm text-[#8a7d6a]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => displayGalleries(selectedCategory)}
              className="mt-5 px-5 py-2 border border-[#c4954a] text-[#c4954a] text-xs uppercase tracking-widest hover:bg-[#c4954a] hover:text-[#0c0a08] transition-all"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty state when the selected category has no images */}
        {!loading && !error && galleries.length === 0 && (
          <div className="py-16 px-6 text-center border border-[rgba(196,149,74,0.12)] bg-[#161310]">
            <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4]">
              No Images Yet
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#8a7d6a]">
              {selectedCategory === "all"
                ? "Our gallery is currently empty. Please check back later."
                : "There are currently no gallery images in this category. Please check back later."}
            </p>
          </div>
        )}

        {/* Gallery images */}
        {!loading && !error && galleries.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
            {galleries.map(gallery => (
              <div
                key={gallery._id}
                className="break-inside-avoid mb-4 group overflow-hidden bg-[#161310]"
              >
                <img
                  src={gallery.image.url}
                  alt={
                    gallery.category?.title
                      ? `${gallery.category.title} at Cedar Court`
                      : "Cedar Court gallery"
                  }
                  loading="lazy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GalleryPage
