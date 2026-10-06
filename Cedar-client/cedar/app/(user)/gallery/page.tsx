"use client"

import { useState, useEffect } from "react"
import { GALLERY_IMAGES } from "@/index";
import SectionLabel from "@/component/user/SectionLabel";
import api from "@/lib/api";



interface Category {
  _id: string,
  title: string
}

interface Gallery {
  _id: string,
  image: string
}

function GalleryPage() {
  const cats = ["All","Rooms","Dining","Amenities"];
  const [filter, setFilter] = useState("All");
  const filtered = filter==="All"?GALLERY_IMAGES:GALLERY_IMAGES.filter(g=>g.cat===filter);

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const filteredCategories = [{ _id: "all", title: "All" }, ...categories];
  const [galleries, setGalleries] = useState<Gallery[]>([]);

  useEffect(() => {
    const getGalleryCategories = async () => {
      try {
        const response = await api.get("/gallery-category/all-categories");
        setCategories(response.data);
        console.log("gallery categories:", response.data);
      } catch (error) {
        console.log("Error getting gallery categories:", error)
      }
    }

    getGalleryCategories();
  }, [])

  const displayGalleries = async (id: string) => {
    try {
      if(id === "all"){
        const response = await api.get("/gallery/galleries");
        setGalleries(response.data);
        setSelectedCategory("all")
        console.log("all galleries:", response.data)
      }else{
        const response = await api.get(`/gallery/category/${id}`);
        setGalleries(response.data);
        setSelectedCategory(id)
        console.log("galleries under category:", response.data)
      }
    } catch (error) {
      console.log("Error displaying galleries:", error)
    }
  }

  useEffect(() => {
    displayGalleries("all")
  }, [])
  return (
    <div className="pt-20 bg-[#0c0a08]">
      <div className="bg-[#161310] border-b border-[rgba(196,149,74,0.12)] py-16">
        <div className="max-w-7xl mx-auto px-6"><SectionLabel text="Gallery" /><h1 className="font-['Fraunces'] text-5xl text-[#ede4d4]">Seen at <em className="italic">Cedar Court</em></h1></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-2 mb-10 flex-wrap">
          {filteredCategories.map(category => <button key={category._id} onClick={() => displayGalleries(category._id)} className={`px-4 py-2 text-[10px] font-['DM_Mono'] tracking-widest uppercase transition-all border ${selectedCategory === category._id ?"bg-[#c4954a] text-[#0c0a08] border-[#c4954a]":"border-[rgba(196,149,74,0.2)] text-[#8a7d6a] hover:border-[#c4954a] hover:text-[#c4954a]"}`}>{category.title}</button>)}
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {galleries.map(gallery => <div key={gallery._id} className="break-inside-avoid mb-4 group overflow-hidden bg-[#161310]"><img src={gallery.image.url} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>)}
        </div>
      </div>
    </div>
  );
}

export default GalleryPage