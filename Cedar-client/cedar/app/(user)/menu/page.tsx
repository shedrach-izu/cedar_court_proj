"use client";

import { MENU } from "@/index";
import SectionLabel from "@/component/user/SectionLabel";
import { useState, useEffect } from "react";
import { Minus, Plus } from "lucide-react";
import api from "@/lib/api";

interface MenuItem {
    _id: string;
    title: string;
    price: number;
    image: string;
    description: string;
    cat: string;
    available: boolean;
}

interface Category {
    _id: string;
    title: string;
}

interface Menu {
  _id: string
}

function MenuPage() {
  const cats = ["Breakfast","Lunch","Dinner","Drinks","Desserts"];
  const [activeCat, setActiveCat] = useState("Breakfast");
  const filtered = MENU.filter(m => m.cat === activeCat && m.available);
  //const getQty = (id: string) => cartItems.find(c => c.id === id)?.qty ?? 0;


  const [categories, setCategories] = useState<Category[]>([]);
  const filteredCategories = [{ _id: "all", title: "All" }, ...categories];
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [menu, setMenu] = useState<MenuItem[]>([]);

  useEffect(() => {
    const getMenuCategories = async () => {
      try{
        const res = await api.get("/menu-category/all-categories");
        console.log("Menu categories:", res.data);
        setCategories(res.data);
      }catch(error){
        console.log("Error fetching menu categories:", error)
      }
    }

    getMenuCategories()
  }, [])


  const displayProduct = async (id: string) => {
    try{
      if(id === "all"){
        const res = await api.get("/menu/all-menu");
        setMenu(res.data);
        setSelectedCategory("all");
        console.log("All menu items:", res.data)
      }else{
        const res = await api.get(`/menu/category/${id}`);
        setMenu(res.data);
        setSelectedCategory(id);
        console.log(`Menu items in category ${id}:`, res.data)
      }
    }catch(error){
      console.log("Error fetching menu items:", error)
    }
  }

  useEffect(() => {
    displayProduct("all");
  }, []);

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: "NGN"
  })

  return (
    <div className="pt-20 bg-[#0c0a08]">
      <div className="bg-[#161310] border-b border-[rgba(196,149,74,0.12)] py-16">
        <div className="max-w-7xl mx-auto px-6"><SectionLabel text="The Restaurant" /><h1 className="font-['Fraunces'] text-5xl text-[#ede4d4]">Our <em className="italic">Menu</em></h1></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex border border-[rgba(196,149,74,0.15)] w-fit mb-12 overflow-x-auto">
          {filteredCategories.map(category => <button key={category._id} onClick={() => displayProduct(category._id)} className={`px-5 py-3 text-[10px] font-['DM_Mono'] tracking-widest uppercase transition-all whitespace-nowrap border-r border-[rgba(196,149,74,0.15)] last:border-r-0 ${selectedCategory === category._id?"bg-[#c4954a] text-[#0c0a08]":"text-[#8a7d6a] hover:text-[#c4954a]"}`}>{category.title}</button>)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menu.map(menu => {
            const qty = 0; //getQty(item.id);
            return (
              <div key={menu._id} className="group bg-[#161310] border border-[rgba(196,149,74,0.1)] hover:border-[rgba(196,149,74,0.35)] transition-all overflow-hidden">
                <div className="h-48 overflow-hidden bg-[#0c0a08]"><img src={menu.image.url} alt={menu.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-1.5">
                    <h3 className="font-['Fraunces'] text-lg text-[#ede4d4] leading-tight">{menu.title}</h3>
                    <span className="font-['DM_Mono'] text-[#c4954a] text-sm shrink-0 ml-3">{formattedPrice.format(menu.price)}</span>
                  </div>
                  <p className="text-xs font-['Jost'] text-[#8a7d6a] mb-4 leading-relaxed font-light">{menu.description}</p>
                  {qty > 0 ? (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-['DM_Mono'] text-[#c4954a]">In order</span>
                      <div className="flex items-center gap-2">
                        <button className="w-7 h-7 border border-[rgba(196,149,74,0.3)] text-[#c4954a] flex items-center justify-center hover:bg-[rgba(196,149,74,0.1)] transition-colors"><Minus size={11} /></button>
                        <span className="text-sm font-['DM_Mono'] text-[#ede4d4] w-5 text-center">{qty || 0}</span>
                        <button className="w-7 h-7 border border-[rgba(196,149,74,0.3)] text-[#c4954a] flex items-center justify-center hover:bg-[rgba(196,149,74,0.1)] transition-colors"><Plus size={11} /></button>
                      </div>
                    </div>
                  ) : (
                    <button className="w-full border border-[rgba(196,149,74,0.3)] text-[#c4954a] py-2.5 text-[10px] font-['DM_Mono'] tracking-widest uppercase hover:bg-[rgba(196,149,74,0.1)] transition-colors">Add to Order</button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MenuPage