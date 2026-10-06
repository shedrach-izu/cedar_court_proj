{/**
import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, Bell, User, Menu, X, ChevronRight, Star,
  MapPin, Phone, Mail, Clock, Wifi, Coffee,
  Calendar, Users, Search, Plus, Minus, Edit2, Trash2,
  LayoutDashboard, BedDouble, UtensilsCrossed, LogOut, ArrowRight,
  TrendingUp, Lock, CheckCircle, Instagram, Twitter, Facebook,
  Eye, CreditCard, Shield, Settings,
  ChevronDown, FileText, UserCheck, Check,
  EyeOff, Home, Info, Heart, MessageSquare,
  PieChart, Activity, Zap, Wind, Tv, ChefHat, Sofa
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart as RechartsPie, Pie, Cell
} from "recharts";
import { Toaster, toast } from "sonner";

// ─────────────────────────── CONSTANTS ────────────────────────────

const gold = "#c4954a";
const bg = "#0c0a08";
const card = "#161310";
const textPrimary = "#ede4d4";
const textMuted = "#8a7d6a";

const INPUT = "w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-4 py-3 text-sm font-['Jost'] text-[#ede4d4] focus:outline-none focus:border-[#c4954a] placeholder-[#8a7d6a]/40 transition-colors";
const LABEL = "text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase block mb-1.5";
const BTN_PRIMARY = "bg-[#c4954a] text-[#0c0a08] font-['Jost'] font-semibold text-sm tracking-widest uppercase hover:bg-[#d4a55a] transition-colors";
const BTN_OUTLINE = "border border-[rgba(196,149,74,0.3)] text-[#ede4d4] font-['Jost'] text-sm tracking-widest uppercase hover:border-[#c4954a] hover:text-[#c4954a] transition-all";

// ─────────────────────────── DEFAULT DATA ────────────────────────────

const DEFAULT_APARTMENTS = [
  {
    id: 1, name: "The Premier Apartment", type: "Premier",
    price: 180, size: "120 m²", capacity: 6, view: "Pool View", status: "Available",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=560&fit=crop&auto=format",
    sections: [
      { name: "Sitting Room", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&h=600&fit=crop&auto=format", desc: "Spacious sitting room with plush L-shaped sofa, 65\" smart TV, air conditioning and direct balcony access. Perfect for unwinding after a long day." },
      { name: "Master Bedroom", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&h=600&fit=crop&auto=format", desc: "King-size bed with premium linen, walk-in wardrobe, en-suite bathroom with rain shower, AC, and smart TV." },
      { name: "Bedroom 2", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&h=600&fit=crop&auto=format", desc: "Queen bed with built-in wardrobe, private en-suite shower room, and AC. Bright and airy with natural light." },
      { name: "Bedroom 3", image: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=900&h=600&fit=crop&auto=format", desc: "Two single beds with en-suite facilities, ample storage, and AC. Ideal for additional guests or children." },
      { name: "Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&h=600&fit=crop&auto=format", desc: "Fully equipped modern kitchen with gas cooker, microwave, fridge-freezer, blender, complete cookware and crockery. Everything you need for home cooking." },
      { name: "Balcony", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=900&h=600&fit=crop&auto=format", desc: "Private balcony with outdoor seating, garden and pool views. A perfect spot for morning coffee or evening drinks." },
    ],
    amenities: ["3 En-suite Bedrooms", "Spacious Sitting Room", "Fully Equipped Kitchen", "Private Balcony", "Free WiFi", "Smart TV (All Rooms)", "Air Conditioning", "Washer/Dryer", "Daily Housekeeping", "24/7 Power Supply"],
    description: "Our flagship apartment occupies a generous 120 m² with panoramic pool views. Three en-suite bedrooms, a well-appointed sitting room and a fully fitted kitchen make this an ideal home away from home for families and corporate stays alike.",
    rating: 4.9, reviews: 87
  },
  {
    id: 2, name: "The Signature Apartment", type: "Signature",
    price: 150, size: "110 m²", capacity: 6, view: "Garden View", status: "Available",
    image: "https://images.unsplash.com/photo-1586023492125-27272f38f67e?w=800&h=560&fit=crop&auto=format",
    sections: [
      { name: "Sitting Room", image: "https://images.unsplash.com/photo-1586023492125-27272f38f67e?w=900&h=600&fit=crop&auto=format", desc: "Contemporary sitting room with premium sofas, accent lighting, 55\" smart TV, and serene garden views." },
      { name: "Master Bedroom", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&h=600&fit=crop&auto=format", desc: "King-size bed, built-in wardrobe, en-suite with hot shower and bathtub, AC and blackout curtains." },
      { name: "Bedroom 2", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&h=600&fit=crop&auto=format", desc: "Queen bed, private en-suite bathroom, wardrobe, AC, and smart TV for a comfortable stay." },
      { name: "Bedroom 3", image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&h=600&fit=crop&auto=format", desc: "Twin beds with shared en-suite, ample closet space and its own AC unit." },
      { name: "Kitchen", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900&h=600&fit=crop&auto=format", desc: "Sleek kitchen with induction cooker, microwave, full-size fridge, kettle, toaster and complete utensil set." },
      { name: "Balcony", image: "https://images.unsplash.com/photo-1533090161-83438d6a2b40?w=900&h=600&fit=crop&auto=format", desc: "Covered balcony overlooking the lush garden. Furnished with comfortable outdoor chairs and a side table." },
    ],
    amenities: ["3 En-suite Bedrooms", "Garden View", "Fully Equipped Kitchen", "Covered Balcony", "Free WiFi", "Smart TV", "Air Conditioning", "Daily Housekeeping", "24/7 Power Supply", "Security"],
    description: "The Signature Apartment brings calm garden views and warm interiors together. Three well-sized en-suite bedrooms, a generous sitting area and a fitted kitchen make for a truly comfortable extended stay.",
    rating: 4.8, reviews: 64
  },
  {
    id: 3, name: "The Executive Apartment", type: "Executive",
    price: 200, size: "130 m²", capacity: 6, view: "City View", status: "Available",
    image: "https://images.unsplash.com/photo-1560448204-e02c31e8e8d2?w=800&h=560&fit=crop&auto=format",
    sections: [
      { name: "Sitting Room", image: "https://images.unsplash.com/photo-1560448204-e02c31e8e8d2?w=900&h=600&fit=crop&auto=format", desc: "Executive-level sitting room with premium leather sofa set, large 65\" TV, mini bar, AC and floor-to-ceiling windows with city views." },
      { name: "Master Bedroom", image: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=900&h=600&fit=crop&auto=format", desc: "Oversized king bed, walk-in closet, luxurious en-suite with double vanity, rain shower and soaking tub." },
      { name: "Bedroom 2", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&h=600&fit=crop&auto=format", desc: "King bed, en-suite bathroom, work desk, wardrobe and AC. Suited for business guests." },
      { name: "Bedroom 3", image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&h=600&fit=crop&auto=format", desc: "Twin beds, en-suite shower, built-in wardrobe and AC. Comfortable and functional." },
      { name: "Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&h=600&fit=crop&auto=format", desc: "Premium kitchen with gas hob, oven, large fridge, dishwasher, complete cookware and dining essentials for six." },
      { name: "Balcony", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=900&h=600&fit=crop&auto=format", desc: "Spacious city-facing balcony with dining table, chairs, and views of the Lagos skyline at dusk." },
    ],
    amenities: ["3 En-suite Bedrooms", "City Skyline View", "Premium Kitchen", "Large Balcony", "Mini Bar", "High-Speed WiFi", "Air Conditioning", "Washer/Dryer", "Daily Housekeeping", "24/7 Power & Security"],
    description: "Designed for the discerning business executive and larger families, the Executive Apartment commands city skyline views from 130 m² of thoughtfully designed space with a premium finish throughout.",
    rating: 4.9, reviews: 52
  },
  {
    id: 4, name: "The Garden Apartment", type: "Garden",
    price: 140, size: "105 m²", capacity: 6, view: "Private Garden", status: "Available",
    image: "https://images.unsplash.com/photo-1567538096630-e531f5e2e77a?w=800&h=560&fit=crop&auto=format",
    sections: [
      { name: "Sitting Room", image: "https://images.unsplash.com/photo-1567538096630-e531f5e2e77a?w=900&h=600&fit=crop&auto=format", desc: "Relaxed sitting room with warm-toned furnishings, 55\" TV, garden-facing windows and AC. A calm retreat." },
      { name: "Master Bedroom", image: "https://images.unsplash.com/photo-1702814160779-4a88cfb330c7?w=900&h=600&fit=crop&auto=format", desc: "King bed, built-in wardrobe, en-suite bathroom with rain shower and garden views." },
      { name: "Bedroom 2", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&h=600&fit=crop&auto=format", desc: "Queen bed, en-suite shower, natural light and AC. Simple and cosy." },
      { name: "Bedroom 3", image: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=900&h=600&fit=crop&auto=format", desc: "Twin beds with en-suite and wardrobe space. Great for guests or children." },
      { name: "Kitchen", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900&h=600&fit=crop&auto=format", desc: "Comfortable kitchen with gas cooker, fridge, microwave, kettle and complete cooking utensils." },
      { name: "Balcony", image: "https://images.unsplash.com/photo-1533090161-83438d6a2b40?w=900&h=600&fit=crop&auto=format", desc: "Step-out balcony directly into the private garden. Ideal for alfresco breakfasts or evening relaxation." },
    ],
    amenities: ["3 En-suite Bedrooms", "Private Garden Access", "Equipped Kitchen", "Garden Balcony", "Free WiFi", "Smart TV", "Air Conditioning", "Daily Housekeeping", "24/7 Power Supply"],
    description: "A tranquil garden-level apartment offering direct garden access. With three comfortable en-suite bedrooms and a homely atmosphere, it is a favourite for families seeking peace and space.",
    rating: 4.7, reviews: 41
  },
  {
    id: 5, name: "The Classic Apartment", type: "Classic",
    price: 120, size: "95 m²", capacity: 5, view: "Courtyard View", status: "Available",
    image: "https://images.unsplash.com/photo-1600210491369-e753d65a0a24?w=800&h=560&fit=crop&auto=format",
    sections: [
      { name: "Sitting Room", image: "https://images.unsplash.com/photo-1600210491369-e753d65a0a24?w=900&h=600&fit=crop&auto=format", desc: "Neat sitting room with comfortable sofa, 50\" smart TV and AC. Clean and well-maintained." },
      { name: "Master Bedroom", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&h=600&fit=crop&auto=format", desc: "King bed, wardrobe, en-suite shower room, AC and TV." },
      { name: "Bedroom 2", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&h=600&fit=crop&auto=format", desc: "Double bed, en-suite shower, wardrobe and AC. Comfortable and practical." },
      { name: "Bedroom 3", image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&h=600&fit=crop&auto=format", desc: "Single bed with en-suite, ample storage and AC unit." },
      { name: "Kitchen", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&h=600&fit=crop&auto=format", desc: "Practical kitchen with gas cooker, fridge, microwave and all necessary cooking equipment." },
      { name: "Balcony", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=900&h=600&fit=crop&auto=format", desc: "Balcony with courtyard views, outdoor seating for quiet mornings." },
    ],
    amenities: ["3 En-suite Bedrooms", "Courtyard View", "Equipped Kitchen", "Balcony", "Free WiFi", "Smart TV", "Air Conditioning", "Daily Housekeeping", "24/7 Power Supply"],
    description: "Great value without compromise. The Classic Apartment delivers three en-suite bedrooms, a fitted kitchen and a bright sitting room at an accessible price point.",
    rating: 4.6, reviews: 118
  },
  {
    id: 6, name: "The Penthouse Apartment", type: "Penthouse",
    price: 280, size: "160 m²", capacity: 6, view: "Panoramic City & Sea View", status: "Occupied",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=560&fit=crop&auto=format",
    sections: [
      { name: "Sitting Room", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=600&fit=crop&auto=format", desc: "Grand penthouse sitting room with premium furnishings, 75\" OLED TV, wet bar, panoramic windows and city views. The pinnacle of comfort." },
      { name: "Master Bedroom", image: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=900&h=600&fit=crop&auto=format", desc: "Master suite with super-king bed, dressing room, spa en-suite with freestanding bath and separate rain shower." },
      { name: "Bedroom 2", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&h=600&fit=crop&auto=format", desc: "King bed, private en-suite, dressing area, AC and premium linen." },
      { name: "Bedroom 3", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&h=600&fit=crop&auto=format", desc: "Queen bed with en-suite, large wardrobe and sweeping views." },
      { name: "Kitchen", image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=900&h=600&fit=crop&auto=format", desc: "Chef-grade kitchen with full gas range, oven, dishwasher, wine fridge, and complete premium cookware and dining set for six." },
      { name: "Balcony", image: "https://images.unsplash.com/photo-1533090161-83438d6a2b40?w=900&h=600&fit=crop&auto=format", desc: "Full-width wrap-around balcony with panoramic views of Lagos. Outdoor dining table, sunloungers and mood lighting." },
    ],
    amenities: ["3 En-suite Bedrooms", "Panoramic Rooftop Views", "Chef Kitchen", "Wrap-around Balcony", "Wet Bar", "High-Speed WiFi", "Premium AC", "Washer/Dryer", "Daily Housekeeping", "24/7 Power & Concierge"],
    description: "The Penthouse is Cedar Court at its finest. A full-floor 160 m² retreat with panoramic city and sea views, a chef kitchen, wrap-around balcony and spa-level master suite.",
    rating: 5.0, reviews: 29
  },
];

const DEFAULT_MENU = [
  { id: "m1", cat: "Breakfast", name: "Cedar Court Eggs Benedict", desc: "Free-range eggs, smoked salmon, hollandaise, sourdough", price: 24, available: true, img: "https://images.unsplash.com/photo-1513772457252-c0417654a2a0?w=400&h=280&fit=crop&auto=format" },
  { id: "m2", cat: "Breakfast", name: "Avocado & Burrata Toast", desc: "Heritage tomatoes, micro herbs, chilli flakes, cold-pressed olive oil", price: 18, available: true, img: "https://images.unsplash.com/photo-1723437515844-fd3cb91ef1df?w=400&h=280&fit=crop&auto=format" },
  { id: "m3", cat: "Breakfast", name: "Full Cedar Breakfast", desc: "Pork sausages, smoked bacon, eggs your way, grilled tomato, toast", price: 28, available: true, img: "https://images.unsplash.com/photo-1513772457252-c0417654a2a0?w=400&h=280&fit=crop&auto=format" },
  { id: "m4", cat: "Breakfast", name: "Seasonal Fruit Platter", desc: "Hand-selected seasonal fruits, honey yoghurt, granola", price: 14, available: true, img: "https://images.unsplash.com/photo-1750943041213-db8328856b48?w=400&h=280&fit=crop&auto=format" },
  { id: "m5", cat: "Lunch", name: "Pan-Seared Sea Bass", desc: "Lemon butter sauce, stir-fried vegetables, steamed rice", price: 32, available: true, img: "https://images.unsplash.com/photo-1750943041213-db8328856b48?w=400&h=280&fit=crop&auto=format" },
  { id: "m6", cat: "Lunch", name: "Grilled Chicken Burger", desc: "Marinated chicken breast, lettuce, tomato, garlic aioli, brioche bun, fries", price: 22, available: true, img: "https://images.unsplash.com/photo-1723437515844-fd3cb91ef1df?w=400&h=280&fit=crop&auto=format" },
  { id: "m7", cat: "Lunch", name: "Jollof Rice & Chicken", desc: "Signature smoky jollof, grilled chicken, coleslaw, fried plantain", price: 20, available: true, img: "https://images.unsplash.com/photo-1513772457252-c0417654a2a0?w=400&h=280&fit=crop&auto=format" },
  { id: "m8", cat: "Lunch", name: "Pasta Primavera", desc: "Penne, fresh vegetables, light tomato sauce, parmesan", price: 18, available: true, img: "https://images.unsplash.com/photo-1750943041213-db8328856b48?w=400&h=280&fit=crop&auto=format" },
  { id: "m9", cat: "Dinner", name: "Ribeye Steak 300g", desc: "Grilled to order, peppercorn sauce, roasted potatoes, vegetables", price: 65, available: true, img: "https://images.unsplash.com/photo-1750943041213-db8328856b48?w=400&h=280&fit=crop&auto=format" },
  { id: "m10", cat: "Dinner", name: "Roasted Lamb Chops", desc: "Herb-crusted, red wine jus, mashed potato, greens", price: 58, available: true, img: "https://images.unsplash.com/photo-1723437515844-fd3cb91ef1df?w=400&h=280&fit=crop&auto=format" },
  { id: "m11", cat: "Dinner", name: "Grilled Tilapia", desc: "Whole tilapia, peppered sauce or butter sauce, fried plantain, rice", price: 40, available: true, img: "https://images.unsplash.com/photo-1513772457252-c0417654a2a0?w=400&h=280&fit=crop&auto=format" },
  { id: "m12", cat: "Dinner", name: "Chef Special (Changes Daily)", desc: "Ask your server for today's special. Chef-curated from seasonal ingredients.", price: 45, available: true, img: "https://images.unsplash.com/photo-1750943041213-db8328856b48?w=400&h=280&fit=crop&auto=format" },
  { id: "m13", cat: "Drinks", name: "Cedar Court Signature", desc: "Aged rum, coconut, pineapple, lime, paprika foam", price: 12, available: true, img: "https://images.unsplash.com/photo-1702814160779-4a88cfb330c7?w=400&h=280&fit=crop&auto=format" },
  { id: "m14", cat: "Drinks", name: "Chapman", desc: "Classic Nigerian Chapman with orange soda, grenadine, cucumber, bitters", price: 6, available: true, img: "https://images.unsplash.com/photo-1513772457252-c0417654a2a0?w=400&h=280&fit=crop&auto=format" },
  { id: "m15", cat: "Drinks", name: "Zobo Mocktail", desc: "House-made hibiscus drink, ginger, pineapple, mint", price: 5, available: true, img: "https://images.unsplash.com/photo-1702814160779-4a88cfb330c7?w=400&h=280&fit=crop&auto=format" },
  { id: "m16", cat: "Desserts", name: "Chocolate Lava Cake", desc: "Warm dark chocolate cake, vanilla ice cream, caramel sauce", price: 14, available: true, img: "https://images.unsplash.com/photo-1750943041213-db8328856b48?w=400&h=280&fit=crop&auto=format" },
  { id: "m17", cat: "Desserts", name: "Puff Puff & Ice Cream", desc: "Nigerian puff puff, served warm with a scoop of vanilla ice cream", price: 10, available: true, img: "https://images.unsplash.com/photo-1513772457252-c0417654a2a0?w=400&h=280&fit=crop&auto=format" },
  { id: "m18", cat: "Desserts", name: "Fruit Cheesecake", desc: "New York-style cheesecake, strawberry compote, cream", price: 12, available: true, img: "https://images.unsplash.com/photo-1723437515844-fd3cb91ef1df?w=400&h=280&fit=crop&auto=format" },
];

const DEFAULT_BOOKINGS = [
  { id: "BK-2841", guest: "Victoria Ashworth", email: "v.ashworth@email.com", room: "The Premier Apartment", roomId: 1, checkIn: "2026-07-12", checkOut: "2026-07-16", nights: 4, total: 720, status: "Confirmed", guests: 2, special: "Anniversary celebration" },
  { id: "BK-2840", guest: "James Laurent", email: "james@laurent.fr", room: "The Penthouse Apartment", roomId: 6, checkIn: "2026-07-10", checkOut: "2026-07-17", nights: 7, total: 1960, status: "Checked In", guests: 4, special: "Birthday package" },
  { id: "BK-2839", guest: "Michael Chen", email: "m.chen@chen.hk", room: "The Executive Apartment", roomId: 3, checkIn: "2026-07-08", checkOut: "2026-07-10", nights: 2, total: 400, status: "Checked Out", guests: 1, special: "" },
  { id: "BK-2838", guest: "Claire Beaumont", email: "claire.b@beaumont.com", room: "The Classic Apartment", roomId: 5, checkIn: "2026-07-15", checkOut: "2026-07-18", nights: 3, total: 360, status: "Confirmed", guests: 2, special: "Late checkout requested" },
  { id: "BK-2837", guest: "Adebayo Okafor", email: "adebayo.o@corp.ng", room: "The Signature Apartment", roomId: 2, checkIn: "2026-07-09", checkOut: "2026-07-11", nights: 2, total: 300, status: "Checked In", guests: 2, special: "Business stay" },
  { id: "BK-2836", guest: "Chioma Nwosu", email: "chioma@nwosu.ng", room: "The Garden Apartment", roomId: 4, checkIn: "2026-07-14", checkOut: "2026-07-16", nights: 2, total: 280, status: "Pending", guests: 3, special: "" },
];

const DEFAULT_GUESTS = [
  { id: "G-001", name: "Victoria Ashworth", email: "v.ashworth@email.com", phone: "+44 7700 123456", stays: 12, total: 8640, tier: "Platinum", lastStay: "2026-07-12", nationality: "British", notes: "Prefers upper-floor apartments" },
  { id: "G-002", name: "James Laurent", email: "james@laurent.fr", phone: "+33 6 12 34 56 78", stays: 7, total: 6860, tier: "Gold", lastStay: "2026-07-10", nationality: "French", notes: "Always with family, birthday packages" },
  { id: "G-003", name: "Michael Chen", email: "m.chen@chen.hk", phone: "+852 9000 1234", stays: 4, total: 1600, tier: "Silver", lastStay: "2026-07-08", nationality: "Hong Kong", notes: "Business traveller, early check-in" },
  { id: "G-004", name: "Adebayo Okafor", email: "adebayo.o@corp.ng", phone: "+234 803 123 4567", stays: 8, total: 4800, tier: "Gold", lastStay: "2026-07-09", nationality: "Nigerian", notes: "Corporate account" },
  { id: "G-005", name: "Chioma Nwosu", email: "chioma@nwosu.ng", phone: "+234 706 234 5678", stays: 3, total: 840, tier: "Silver", lastStay: "2026-07-14", nationality: "Nigerian", notes: "" },
  { id: "G-006", name: "Claire Beaumont", email: "claire.b@beaumont.com", phone: "+44 7711 234567", stays: 2, total: 720, tier: "Silver", lastStay: "2026-06-20", nationality: "British", notes: "Vegetarian meals preferred" },
];

const DEFAULT_ORDERS = [
  { id: "ORD-8A2B1C", customer: "Victoria Ashworth", email: "v.ashworth@email.com", items: "Cedar Court Eggs Benedict × 2, Cedar Court Signature × 2", total: 72, date: "2026-07-12", time: "09:30", status: "Served" },
  { id: "ORD-7F3E9D", customer: "James Laurent", email: "james@laurent.fr", items: "Ribeye Steak 300g × 2, Chocolate Lava Cake × 2, Chapman × 2", total: 166, date: "2026-07-11", time: "20:15", status: "Served" },
  { id: "ORD-6C1A8B", customer: "Adebayo Okafor", email: "adebayo.o@corp.ng", items: "Jollof Rice & Chicken × 2, Zobo Mocktail × 2", total: 50, date: "2026-07-10", time: "13:45", status: "Delivered" },
  { id: "ORD-5D4F2E", customer: "Chioma Nwosu", email: "chioma@nwosu.ng", items: "Full Cedar Breakfast × 3, Chapman × 3", total: 102, date: "2026-07-14", time: "08:00", status: "Preparing" },
  { id: "ORD-4B7G3H", customer: "Michael Chen", email: "m.chen@chen.hk", items: "Pan-Seared Sea Bass × 1, Fruit Cheesecake × 1", total: 44, date: "2026-07-09", time: "19:30", status: "Served" },
  { id: "ORD-3A9C5K", customer: "Claire Beaumont", email: "claire.b@beaumont.com", items: "Pasta Primavera × 2, Puff Puff & Ice Cream × 2", total: 56, date: "2026-07-15", time: "12:00", status: "Pending" },
];

const DEFAULT_REVIEWS = [
  { id: "REV-001", user: "Victoria Ashworth", email: "v.ashworth@email.com", apartment: "The Premier Apartment", rating: 5, comment: "Absolutely stunning apartment. The sitting room was massive and so well furnished. Kids loved having their own rooms with private bathrooms. Will definitely book again!", date: "2026-07-16", bookingId: "BK-2841", status: "Published" },
  { id: "REV-002", user: "Michael Chen", email: "m.chen@chen.hk", apartment: "The Executive Apartment", rating: 5, comment: "Perfect for a business stay. The kitchen was stocked well and the city view from the balcony was spectacular at night. The WiFi was fast and reliable.", date: "2026-07-10", bookingId: "BK-2839", status: "Published" },
  { id: "REV-003", user: "Adebayo Okafor", email: "adebayo.o@corp.ng", apartment: "The Signature Apartment", rating: 4, comment: "Great apartment, very clean and well-maintained. The kitchen had everything we needed. Only minor issue was the AC in bedroom 3 took a while to cool. Staff were very helpful.", date: "2026-07-12", bookingId: "BK-2837", status: "Published" },
  { id: "REV-004", user: "Sophie Eze", email: "sophie.e@gmail.com", apartment: "The Garden Apartment", rating: 5, comment: "Such a peaceful stay! The garden balcony was our favourite spot. The apartment was spotless and the housekeeping team was wonderful. Highly recommend Cedar Court.", date: "2026-06-28", bookingId: "BK-2820", status: "Published" },
  { id: "REV-005", user: "Tunde Abiodun", email: "tunde.a@abiodun.com", apartment: "The Classic Apartment", rating: 3, comment: "Decent apartment for the price. Clean and functional. Would have liked a bigger TV in the sitting room. Food from the restaurant was excellent though.", date: "2026-06-15", bookingId: "BK-2812", status: "Published" },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 18000, bookings: 42, occupancy: 58 },
  { month: "Feb", revenue: 14500, bookings: 36, occupancy: 48 },
  { month: "Mar", revenue: 22000, bookings: 55, occupancy: 68 },
  { month: "Apr", revenue: 28000, bookings: 71, occupancy: 74 },
  { month: "May", revenue: 31000, bookings: 78, occupancy: 78 },
  { month: "Jun", revenue: 38000, bookings: 95, occupancy: 85 },
  { month: "Jul", revenue: 42000, bookings: 108, occupancy: 90 },
];

const APT_TYPE_DATA = [
  { name: "Classic", value: 118, color: "#8a7d6a" },
  { name: "Garden", value: 41, color: "#c4954a" },
  { name: "Signature", value: 64, color: "#d4a55a" },
  { name: "Premier", value: 87, color: "#ede4d4" },
  { name: "Executive", value: 52, color: "#6b6052" },
  { name: "Penthouse", value: 29, color: "#a07840" },
];

const TESTIMONIALS = [
  { id: 1, name: "Victoria Ashworth", role: "Returning Guest", rating: 5, text: "Cedar Court has become our go-to for Lagos visits. Three kids, three bedrooms — every one with its own bathroom. The sitting room is bigger than most hotel lobbies. Value is unmatched.", initials: "VA" },
  { id: 2, name: "Adebayo Okafor", role: "Business Executive", rating: 5, text: "I've stayed at many serviced apartments in Lagos. Cedar Court stands out — the WiFi is genuinely fast, 24/7 power is reliable, security is top-tier and the restaurant is exceptional.", initials: "AO" },
  { id: 3, name: "Chidinma Eze-Obasi", role: "Extended Stay Guest", rating: 5, text: "Three months here while we renovated our Ikoyi home. Felt like we never left. The kitchen is fully equipped, daily housekeeping kept everything fresh, and the team treated us like family.", initials: "CE" },
];

const GALLERY_IMAGES = [
  { id: 1, url: "https://images.unsplash.com/photo-1637730827702-de34e9ae4ede?w=600&h=400&fit=crop&auto=format", alt: "Hotel dining room", cat: "Dining" },
  { id: 2, url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=800&fit=crop&auto=format", alt: "Apartment sitting room", cat: "Apartments" },
  { id: 3, url: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&h=500&fit=crop&auto=format", alt: "Balcony outdoor", cat: "Amenities" },
  { id: 4, url: "https://images.unsplash.com/photo-1776993298456-98c71c0e177e?w=600&h=400&fit=crop&auto=format", alt: "Restaurant dining", cat: "Dining" },
  { id: 5, url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=500&fit=crop&auto=format", alt: "Master bedroom", cat: "Apartments" },
  { id: 6, url: "https://images.unsplash.com/photo-1702814160779-4a88cfb330c7?w=600&h=400&fit=crop&auto=format", alt: "Bar and lounge", cat: "Dining" },
  { id: 7, url: "https://images.unsplash.com/photo-1533090161-83438d6a2b40?w=600&h=800&fit=crop&auto=format", alt: "Garden balcony", cat: "Amenities" },
  { id: 8, url: "https://images.unsplash.com/photo-1750943041213-db8328856b48?w=600&h=400&fit=crop&auto=format", alt: "Fine dining dish", cat: "Dining" },
  { id: 9, url: "https://images.unsplash.com/photo-1586023492125-27272f38f67e?w=600&h=400&fit=crop&auto=format", alt: "Signature apartment", cat: "Apartments" },
  { id: 10, url: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&h=600&fit=crop&auto=format", alt: "Apartment kitchen", cat: "Apartments" },
  { id: 11, url: "https://images.unsplash.com/photo-1723437515844-fd3cb91ef1df?w=600&h=400&fit=crop&auto=format", alt: "Restaurant menu item", cat: "Dining" },
  { id: 12, url: "https://images.unsplash.com/photo-1560448204-e02c31e8e8d2?w=800&h=500&fit=crop&auto=format", alt: "Executive apartment", cat: "Apartments" },
];

const USER_NOTIFICATIONS = [
  { id: 1, type: "booking", message: "Your apartment booking BK-2841 is confirmed!", time: "Just now", read: false },
  { id: 2, type: "offer", message: "Weekend special: 15% off all apartments this weekend", time: "1 hr ago", read: false },
  { id: 3, type: "order", message: "Your food order ORD-8A2B1C has been served", time: "3 hrs ago", read: true },
  { id: 4, type: "reminder", message: "Check-in reminder: Tomorrow at 14:00", time: "1 day ago", read: true },
];

// ─────────────────────────── UTILITIES ────────────────────────────

function genRef(prefix: string) {
  return prefix + Math.random().toString(36).slice(2, 10).toUpperCase();
}
function formatCard(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}
function formatExpiry(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
}
function cardBrand(n: string) {
  const d = n.replace(/\s/g, "");
  if (d.startsWith("4")) return "VISA";
  if (d.startsWith("5")) return "MC";
  if (d.startsWith("3")) return "AMEX";
  return "";
}

// ─────────────────────────── SHARED COMPONENTS ────────────────────────────

function CedarLogo({ size = "default" }: { size?: "default" | "sm" }) {
  const box = size === "sm" ? "w-7 h-7" : "w-8 h-8";
  const title = size === "sm" ? "text-base" : "text-xl";
  return (
    <div className="flex items-center gap-3">
      <div className={`${box} border border-[#c4954a] rotate-45 flex items-center justify-center shrink-0`}>
        <span className="text-[#c4954a] text-[10px] font-['DM_Mono'] -rotate-45">CC</span>
      </div>
      <div>
        <div className={`font-['Fraunces'] ${title} text-[#ede4d4] tracking-wider leading-none`}>Cedar Court</div>
        <div className="text-[9px] font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">Serviced Apartments</div>
      </div>
    </div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="h-px w-8 bg-[#c4954a]" />
      <span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">{text}</span>
    </div>
  );
}

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} fill={i <= Math.round(rating) ? gold : "transparent"} color={i <= Math.round(rating) ? gold : "#6b6052"} strokeWidth={1.5} />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Confirmed": "bg-emerald-900/40 text-emerald-400 border-emerald-800",
    "Checked In": "bg-blue-900/40 text-blue-400 border-blue-800",
    "Checked Out": "bg-zinc-800 text-zinc-400 border-zinc-700",
    "Pending": "bg-amber-900/40 text-amber-400 border-amber-800",
    "Cancelled": "bg-red-900/40 text-red-400 border-red-800",
  };
  return <span className={`inline-flex px-2.5 py-0.5 text-[10px] font-['DM_Mono'] border ${map[status] ?? map["Pending"]}`}>{status}</span>;
}

function RoomStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Available": "bg-emerald-900/60 text-emerald-400 border-emerald-800",
    "Occupied": "bg-blue-900/60 text-blue-400 border-blue-800",
    "Maintenance": "bg-amber-900/60 text-amber-400 border-amber-800",
  };
  return <span className={`inline-flex px-2 py-0.5 text-[10px] font-['DM_Mono'] border ${map[status] ?? "bg-zinc-800 text-zinc-400 border-zinc-700"}`}>{status}</span>;
}

function OrderStatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    "Served": "bg-emerald-900/40 text-emerald-400 border-emerald-800",
    "Delivered": "bg-emerald-900/40 text-emerald-400 border-emerald-800",
    "Preparing": "bg-blue-900/40 text-blue-400 border-blue-800",
    "Pending": "bg-amber-900/40 text-amber-400 border-amber-800",
    "Cancelled": "bg-red-900/40 text-red-400 border-red-800",
  };
  return <span className={`inline-flex px-2.5 py-0.5 text-[10px] font-['DM_Mono'] border ${map[status] ?? map["Pending"]}`}>{status}</span>;
}

function ModalWrapper({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/75 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className={`bg-[#161310] border border-[rgba(196,149,74,0.2)] w-full ${wide ? "max-w-3xl" : "max-w-lg"} max-h-[90vh] overflow-y-auto pointer-events-auto`}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(196,149,74,0.12)] sticky top-0 bg-[#161310] z-10">
            <h2 className="font-['Fraunces'] text-xl text-[#ede4d4]">{title}</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4] transition-colors"><X size={16} /></button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    </>
  );
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={LABEL}>{label}</label>
      {children}
    </div>
  );
}

function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 flex items-center justify-center text-xs font-['DM_Mono'] border transition-all ${
              i + 1 < current ? "bg-[#c4954a] border-[#c4954a] text-[#0c0a08]" :
              i + 1 === current ? "border-[#c4954a] text-[#c4954a]" :
              "border-[rgba(196,149,74,0.2)] text-[#8a7d6a]"
            }`}>
              {i + 1 < current ? <Check size={12} /> : i + 1}
            </div>
            <span className={`text-xs font-['Jost'] hidden sm:block ${i + 1 === current ? "text-[#c4954a]" : "text-[#8a7d6a]"}`}>{step}</span>
          </div>
          {i < steps.length - 1 && <div className={`w-8 sm:w-16 h-px mx-2 ${i + 1 < current ? "bg-[#c4954a]" : "bg-[rgba(196,149,74,0.2)]"}`} />}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────── AUTH MODAL ────────────────────────────

function AuthModal({ mode, setMode, onClose, onLogin, registeredUsers, setRegisteredUsers }: {
  mode: "login" | "register"; setMode: (m: "login" | "register") => void;
  onClose: () => void; onLogin: (user: any) => void;
  registeredUsers: any[]; setRegisteredUsers: (u: any[]) => void;
}) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: mode === "login" ? "victoria@cedarcourt.co.uk" : "", password: mode === "login" ? "guest123" : "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true);
    setTimeout(() => {
      const user = registeredUsers.find(u => u.email === form.email && u.password === form.password);
      if (user) { onLogin(user); toast.success(`Welcome back, ${user.firstName}!`); }
      else setError("Invalid email or password. Try the demo credentials.");
      setLoading(false);
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); return; }
    const existing = registeredUsers.find(u => u.email === form.email);
    if (existing) { setError("An account with this email already exists."); return; }
    setLoading(true);
    setTimeout(() => {
      const newUser = { id: genRef("U"), firstName: form.firstName, lastName: form.lastName, email: form.email, password: form.password };
      setRegisteredUsers([...registeredUsers, newUser]);
      onLogin(newUser);
      toast.success(`Welcome to Cedar Court, ${form.firstName}!`);
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/75 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.2)] w-full max-w-md pointer-events-auto">
          <div className="flex items-center justify-between px-6 py-4 border-b border-[rgba(196,149,74,0.12)]">
            <CedarLogo size="sm" />
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4] transition-colors"><X size={16} /></button>
          </div>
          <div className="flex border-b border-[rgba(196,149,74,0.12)]">
            {(["login", "register"] as const).map(m => (
              <button key={m} onClick={() => { setMode(m); setError(""); }} className={`flex-1 py-3 text-xs font-['DM_Mono'] tracking-widest uppercase transition-colors ${mode === m ? "text-[#c4954a] border-b-2 border-[#c4954a]" : "text-[#8a7d6a] hover:text-[#ede4d4]"}`}>
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>
          <div className="p-6">
            {error && <div className="bg-red-900/20 border border-red-800/50 text-red-400 text-xs font-['DM_Mono'] p-3 mb-4">{error}</div>}
            {mode === "login" ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <FormField label="Email"><input type="email" required value={form.email} onChange={set("email")} className={INPUT} placeholder="victoria@cedarcourt.co.uk" /></FormField>
                <FormField label="Password">
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} required value={form.password} onChange={set("password")} className={INPUT + " pr-10"} placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7d6a] hover:text-[#c4954a] transition-colors">
                      {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </FormField>
                <button type="submit" disabled={loading} className={`w-full py-3.5 ${BTN_PRIMARY} disabled:opacity-60`}>{loading ? "Signing in..." : "Sign In"}</button>
                <div className="text-center text-xs font-['DM_Mono'] text-[#8a7d6a] pt-2">Demo: victoria@cedarcourt.co.uk / guest123</div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="First Name"><input type="text" required value={form.firstName} onChange={set("firstName")} className={INPUT} placeholder="Adaeze" /></FormField>
                  <FormField label="Last Name"><input type="text" required value={form.lastName} onChange={set("lastName")} className={INPUT} placeholder="Okonkwo" /></FormField>
                </div>
                <FormField label="Email"><input type="email" required value={form.email} onChange={set("email")} className={INPUT} placeholder="you@example.com" /></FormField>
                <FormField label="Password">
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} required value={form.password} onChange={set("password")} className={INPUT + " pr-10"} placeholder="Min. 6 characters" />
                    <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"><EyeOff size={14} /></button>
                  </div>
                </FormField>
                <FormField label="Confirm Password"><input type="password" required value={form.confirm} onChange={set("confirm")} className={INPUT} placeholder="Repeat password" /></FormField>
                <button type="submit" disabled={loading} className={`w-full py-3.5 ${BTN_PRIMARY} disabled:opacity-60`}>{loading ? "Creating account..." : "Create Account"}</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─────────────────────────── HEADER ────────────────────────────

function Header({ page, setPage, cartCount, setCartOpen, authUser, setAuthModal, onLogout }: {
  page: string; setPage: (p: string) => void; cartCount: number;
  setCartOpen: (v: boolean) => void; authUser: any;
  setAuthModal: (m: "login" | "register") => void; onLogout: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(USER_NOTIFICATIONS);
  const dropRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setUserDropdown(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { label: "Home", page: "home" },
    { label: "Apartments", page: "apartments" },
    { label: "Menu", page: "menu" },
    { label: "Gallery", page: "gallery" },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" },
  ];

  const transparent = page === "home" && !scrolled;
  const notifIcons: Record<string, string> = { booking: "🏠", offer: "🎁", order: "🍽️", reminder: "🔔" };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${transparent ? "bg-transparent" : "bg-[#0c0a08]/95 backdrop-blur-md border-b border-[rgba(196,149,74,0.12)]"}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button onClick={() => setPage("home")}><CedarLogo /></button>
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(link => (
            <button key={link.page} onClick={() => setPage(link.page)} className={`text-sm font-['Jost'] tracking-wide transition-colors relative group ${page === link.page ? "text-[#c4954a]" : "text-[#ede4d4]/80 hover:text-[#ede4d4]"}`}>
              {link.label}
              <span className={`absolute -bottom-0.5 left-0 h-px bg-[#c4954a] transition-all duration-300 ${page === link.page ? "w-full" : "w-0 group-hover:w-full"}`} />
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <button onClick={() => setCartOpen(true)} className="relative w-10 h-10 flex items-center justify-center text-[#ede4d4]/70 hover:text-[#c4954a] transition-colors" title="Your order">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#c4954a] text-[#0c0a08] text-[9px] font-bold rounded-full flex items-center justify-center">{cartCount}</span>}
          </button>

          //Notification Bell with Dropdown
          <div className="relative" ref={notifRef}>
            <button onClick={() => setNotifOpen(v => !v)} className="relative w-10 h-10 flex items-center justify-center text-[#ede4d4]/70 hover:text-[#c4954a] transition-colors" title="Notifications">
              <Bell size={20} />
              {unreadCount > 0 && <span className="absolute top-2 right-2 w-4 h-4 bg-[#c4954a] text-[#0c0a08] text-[9px] font-bold rounded-full flex items-center justify-center">{unreadCount}</span>}
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-12 w-80 bg-[#161310] border border-[rgba(196,149,74,0.2)] z-50 shadow-2xl">
                <div className="flex items-center justify-between px-4 py-3 border-b border-[rgba(196,149,74,0.1)]">
                  <span className="text-sm font-['Fraunces'] text-[#ede4d4]">Notifications</span>
                  {unreadCount > 0 && (
                    <button onClick={() => setNotifications(ns => ns.map(n => ({ ...n, read: true })))} className="text-[10px] font-['DM_Mono'] text-[#c4954a] hover:underline tracking-widest">MARK ALL READ</button>
                  )}
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} onClick={() => setNotifications(ns => ns.map(x => x.id === n.id ? { ...x, read: true } : x))} className={`flex gap-3 px-4 py-3 border-b border-[rgba(196,149,74,0.06)] cursor-pointer hover:bg-[rgba(196,149,74,0.04)] transition-colors last:border-b-0 ${!n.read ? "bg-[rgba(196,149,74,0.04)]" : ""}`}>
                      <span className="text-lg mt-0.5 shrink-0">{notifIcons[n.type] ?? "🔔"}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-['Jost'] leading-relaxed ${!n.read ? "text-[#ede4d4]" : "text-[#8a7d6a]"}`}>{n.message}</p>
                        <p className="text-[10px] font-['DM_Mono'] text-[#8a7d6a]/60 mt-1">{n.time}</p>
                      </div>
                      {!n.read && <div className="w-2 h-2 bg-[#c4954a] rounded-full mt-1.5 shrink-0" />}
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2 border-t border-[rgba(196,149,74,0.1)]">
                  <button className="w-full text-center text-[10px] font-['DM_Mono'] text-[#8a7d6a] hover:text-[#c4954a] tracking-widest py-1 transition-colors">VIEW ALL</button>
                </div>
              </div>
            )}
          </div>

          <div className="relative" ref={dropRef}>
            <button onClick={() => { if (authUser) setUserDropdown(v => !v); else setAuthModal("login"); }} className="w-10 h-10 flex items-center justify-center text-[#ede4d4]/70 hover:text-[#c4954a] transition-colors">
              {authUser ? (
                <div className="w-7 h-7 bg-[rgba(196,149,74,0.2)] border border-[rgba(196,149,74,0.4)] flex items-center justify-center">
                  <span className="text-[10px] font-['DM_Mono'] text-[#c4954a]">{authUser.firstName[0]}{authUser.lastName?.[0] ?? ""}</span>
                </div>
              ) : <User size={20} />}
            </button>
            {userDropdown && authUser && (
              <div className="absolute right-0 top-12 w-52 bg-[#161310] border border-[rgba(196,149,74,0.2)] z-50">
                <div className="px-4 py-3 border-b border-[rgba(196,149,74,0.1)]">
                  <p className="text-sm font-['Jost'] text-[#ede4d4]">{authUser.firstName} {authUser.lastName}</p>
                  <p className="text-xs font-['DM_Mono'] text-[#8a7d6a] truncate">{authUser.email}</p>
                </div>
                <div className="py-1">
                  <button onClick={() => { setPage("profile"); setUserDropdown(false); }} className="w-full text-left px-4 py-2 text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#c4954a] hover:bg-[rgba(196,149,74,0.05)] transition-colors flex items-center gap-2">
                    <UserCheck size={13} /> My Profile
                  </button>
                  <button onClick={() => { setPage("my-bookings"); setUserDropdown(false); }} className="w-full text-left px-4 py-2 text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#c4954a] hover:bg-[rgba(196,149,74,0.05)] transition-colors flex items-center gap-2">
                    <Calendar size={13} /> My Bookings
                  </button>
                  <button onClick={() => { onLogout(); setUserDropdown(false); toast.success("Signed out successfully."); }} className="w-full text-left px-4 py-2 text-sm font-['Jost'] text-red-400/80 hover:text-red-400 hover:bg-[rgba(196,149,74,0.05)] transition-colors flex items-center gap-2">
                    <LogOut size={13} /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
          <button className="lg:hidden w-10 h-10 flex items-center justify-center text-[#ede4d4]/70 hover:text-[#c4954a] transition-colors ml-1" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {mobileOpen && (
        <div className="lg:hidden bg-[#0c0a08]/98 border-t border-[rgba(196,149,74,0.12)] px-6 py-3 flex flex-col">
          {navLinks.map(link => (
            <button key={link.page} onClick={() => { setPage(link.page); setMobileOpen(false); }} className={`text-left py-3.5 text-sm font-['Jost'] border-b border-[rgba(196,149,74,0.08)] last:border-b-0 ${page === link.page ? "text-[#c4954a]" : "text-[#ede4d4]/80"}`}>{link.label}</button>
          ))}
          {!authUser && <button onClick={() => { setAuthModal("login"); setMobileOpen(false); }} className="text-left py-3.5 text-sm font-['Jost'] text-[#c4954a]">Sign In</button>}
        </div>
      )}
    </header>
  );
}

// ─────────────────────────── CART SLIDEOUT ────────────────────────────

function CartSlideout({ isOpen, setIsOpen, items, removeItem, updateQty, onCheckout }: {
  isOpen: boolean; setIsOpen: (v: boolean) => void; items: any[];
  removeItem: (id: string) => void; updateQty: (id: string, qty: number) => void;
  onCheckout: () => void;
}) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const service = subtotal * 0.1;
  const total = subtotal + service;
  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 z-40" onClick={() => setIsOpen(false)} />}
      <div className={`fixed top-0 right-0 h-full w-96 max-w-full bg-[#161310] border-l border-[rgba(196,149,74,0.15)] z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(196,149,74,0.12)]">
          <div>
            <h2 className="font-['Fraunces'] text-xl text-[#ede4d4]">Your Order</h2>
            <p className="text-xs font-['DM_Mono'] text-[#8a7d6a] mt-0.5">{items.length} item{items.length !== 1 ? "s" : ""}</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4] transition-colors"><X size={18} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
              <div className="w-16 h-16 border border-[rgba(196,149,74,0.2)] flex items-center justify-center"><ShoppingCart size={24} className="text-[#8a7d6a]" /></div>
              <p className="text-[#8a7d6a] font-['Jost']">Your cart is empty</p>
              <button onClick={() => setIsOpen(false)} className="text-[#c4954a] text-sm font-['Jost'] hover:underline">Browse our menu</button>
            </div>
          ) : items.map(item => (
            <div key={item.id} className="flex gap-3 border-b border-[rgba(196,149,74,0.08)] pb-4 last:border-b-0">
              <img src={item.img} alt={item.name} className="w-16 h-16 object-cover bg-[#0c0a08] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-['Jost'] text-[#ede4d4] leading-tight">{item.name}</p>
                <p className="text-xs text-[#8a7d6a] mt-0.5">${item.price} each</p>
                <div className="flex items-center gap-2 mt-2">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 border border-[rgba(196,149,74,0.3)] text-[#c4954a] flex items-center justify-center hover:bg-[rgba(196,149,74,0.1)] transition-colors"><Minus size={10} /></button>
                  <span className="text-sm font-['DM_Mono'] text-[#ede4d4] w-4 text-center">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 border border-[rgba(196,149,74,0.3)] text-[#c4954a] flex items-center justify-center hover:bg-[rgba(196,149,74,0.1)] transition-colors"><Plus size={10} /></button>
                </div>
              </div>
              <div className="flex flex-col items-end justify-between shrink-0">
                <button onClick={() => removeItem(item.id)} className="text-[#8a7d6a] hover:text-red-400 transition-colors"><X size={14} /></button>
                <p className="text-sm font-['DM_Mono'] text-[#c4954a]">${(item.price * item.qty).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        {items.length > 0 && (
          <div className="px-6 py-5 border-t border-[rgba(196,149,74,0.12)]">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm"><span className="font-['Jost'] text-[#8a7d6a]">Subtotal</span><span className="font-['DM_Mono'] text-[#ede4d4]">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="font-['Jost'] text-[#8a7d6a]">Service (10%)</span><span className="font-['DM_Mono'] text-[#ede4d4]">${service.toFixed(2)}</span></div>
              <div className="flex justify-between pt-2 border-t border-[rgba(196,149,74,0.1)]"><span className="font-['Jost'] text-[#ede4d4] font-semibold">Total</span><span className="font-['DM_Mono'] text-[#c4954a] font-semibold">${total.toFixed(2)}</span></div>
            </div>
            <button onClick={() => { setIsOpen(false); onCheckout(); }} className={`w-full py-3.5 ${BTN_PRIMARY}`}>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}

// ─────────────────────────── PAYMENT FORM ────────────────────────────

function PaymentForm({ payment, setPayment }: { payment: any; setPayment: (p: any) => void }) {
  const brand = cardBrand(payment.cardNumber);
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <Shield size={16} className="text-[#c4954a]" />
        <span className="text-xs font-['DM_Mono'] text-[#8a7d6a] tracking-widest">256-BIT SSL SECURED PAYMENT</span>
      </div>
      <FormField label="Card Number">
        <div className="relative">
          <input type="text" placeholder="1234 5678 9012 3456" value={payment.cardNumber}
            onChange={e => setPayment((p: any) => ({ ...p, cardNumber: formatCard(e.target.value) }))}
            className={INPUT + " pr-16"} maxLength={19} />
          {brand && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-['DM_Mono'] text-[#c4954a] border border-[rgba(196,149,74,0.3)] px-1.5 py-0.5">{brand}</span>}
        </div>
      </FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Expiry (MM/YY)">
          <input type="text" placeholder="08/28" value={payment.expiry}
            onChange={e => setPayment((p: any) => ({ ...p, expiry: formatExpiry(e.target.value) }))}
            className={INPUT} maxLength={5} />
        </FormField>
        <FormField label="CVV">
          <input type="text" placeholder="123" value={payment.cvv}
            onChange={e => setPayment((p: any) => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
            className={INPUT} maxLength={4} />
        </FormField>
      </div>
      <FormField label="Cardholder Name">
        <input type="text" placeholder="As on card" value={payment.name}
          onChange={e => setPayment((p: any) => ({ ...p, name: e.target.value }))}
          className={INPUT} />
      </FormField>
    </div>
  );
}

// ─────────────────────────── FOOTER ────────────────────────────

function Footer({ setPage }: { setPage: (p: string) => void }) {
  return (
    <footer className="bg-[#0a0806] border-t border-[rgba(196,149,74,0.1)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div>
            <CedarLogo />
            <p className="text-sm font-['Jost'] text-[#8a7d6a] mt-4 leading-relaxed">Premium serviced apartments in the heart of Ikoyi, Lagos. Where comfort meets convenience.</p>
            <div className="flex gap-3 mt-5">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <button key={i} className="w-8 h-8 border border-[rgba(196,149,74,0.2)] flex items-center justify-center text-[#8a7d6a] hover:border-[#c4954a] hover:text-[#c4954a] transition-all"><Icon size={14} /></button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-4">Explore</h4>
            <div className="space-y-2.5">
              {["home", "apartments", "menu", "gallery", "about", "contact"].map(p => (
                <button key={p} onClick={() => setPage(p)} className="block text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#c4954a] transition-colors capitalize">{p === "apartments" ? "Apartments" : p.charAt(0).toUpperCase() + p.slice(1)}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5"><MapPin size={14} className="text-[#c4954a] mt-0.5 shrink-0" /><span className="text-sm font-['Jost'] text-[#8a7d6a]">14 Bourdillon Road, Ikoyi, Lagos</span></div>
              <div className="flex items-center gap-2.5"><Phone size={14} className="text-[#c4954a] shrink-0" /><span className="text-sm font-['Jost'] text-[#8a7d6a]">+234 1 700 2000</span></div>
              <div className="flex items-center gap-2.5"><Mail size={14} className="text-[#c4954a] shrink-0" /><span className="text-sm font-['Jost'] text-[#8a7d6a]">hello@cedarcourt.ng</span></div>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-4">Newsletter</h4>
            <p className="text-sm font-['Jost'] text-[#8a7d6a] mb-3">Get exclusive offers and updates.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email" className={INPUT + " text-xs"} />
              <button onClick={() => toast.success("Subscribed!")} className={`px-4 py-2 ${BTN_PRIMARY} shrink-0`}><ArrowRight size={14} /></button>
            </div>
          </div>
        </div>
        <div className="border-t border-[rgba(196,149,74,0.08)] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-['DM_Mono'] text-[#8a7d6a]/60">© 2026 Cedar Court Serviced Apartments. All rights reserved.</p>
          <p className="text-xs font-['DM_Mono'] text-[#8a7d6a]/40 tracking-widest">IKOYI · LAGOS · NIGERIA</p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────── HOME PAGE ────────────────────────────

function HomePage({ setPage, setSelectedApartment, apartments }: {
  setPage: (p: string) => void;
  setSelectedApartment: (a: any) => void;
  apartments: any[];
}) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const amenities = [
    { icon: Wind, label: "Air Conditioning", desc: "All rooms & sitting areas" },
    { icon: Zap, label: "24/7 Power Supply", desc: "Uninterrupted electricity" },
    { icon: Wifi, label: "Free High-Speed WiFi", desc: "Throughout the building" },
    { icon: Shield, label: "24/7 Security", desc: "CCTV & manned gate" },
    { icon: Tv, label: "Smart TV", desc: "All rooms, Netflix ready" },
    { icon: ChefHat, label: "On-site Restaurant", desc: "Breakfast, lunch & dinner" },
    { icon: Coffee, label: "Room Service", desc: "Available 7am – 10pm" },
    { icon: Sofa, label: "Daily Housekeeping", desc: "Fresh linen & cleaning" },
  ];

  return (
    <div className="bg-[#0c0a08]">
      //Hero
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1637730827702-de34e9ae4ede?w=1920&h=1080&fit=crop&auto=format" alt="Cedar Court" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a08]/40 via-[#0c0a08]/20 to-[#0c0a08]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <SectionLabel text="Welcome to Cedar Court" />
          <h1 className="font-['Fraunces'] text-5xl sm:text-6xl lg:text-7xl text-[#ede4d4] leading-tight mb-6">
            Premium Serviced<br /><em className="text-[#c4954a] not-italic">Apartments</em> in Lagos
          </h1>
          <p className="text-lg font-['Jost'] text-[#ede4d4]/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Three en-suite bedrooms, fully equipped kitchens, and all the comforts of home — in the heart of Ikoyi.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setPage("apartments")} className={`px-8 py-4 ${BTN_PRIMARY}`}>View Apartments</button>
            <button onClick={() => setPage("menu")} className={`px-8 py-4 ${BTN_OUTLINE}`}>Explore Menu</button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <div className="w-px h-12 bg-[#c4954a]/50" />
          <span className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest">SCROLL</span>
        </div>
      </section>

      //Stats
      <section className="py-16 border-y border-[rgba(196,149,74,0.1)]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "Est. 2019", label: "Serving Lagos" },
            { value: "12", label: "Apartments" },
            { value: "4.9★", label: "Avg. Rating Online" },
            { value: "3,500+", label: "Happy Guests" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-['Fraunces'] text-3xl sm:text-4xl text-[#c4954a] mb-1">{s.value}</div>
              <div className="text-xs font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      //Featured Apartments
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <SectionLabel text="Our Apartments" />
          <h2 className="font-['Fraunces'] text-4xl text-[#ede4d4]">Choose Your Space</h2>
          <p className="text-[#8a7d6a] font-['Jost'] mt-3 max-w-xl mx-auto">Every apartment features 3 en-suite bedrooms, a sitting room, full kitchen and balcony.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apartments.slice(0, 6).map(apt => (
            <div key={apt.id} className="bg-[#161310] border border-[rgba(196,149,74,0.1)] group hover:border-[rgba(196,149,74,0.3)] transition-all duration-300 flex flex-col">
              <div className="relative overflow-hidden h-56">
                <img src={apt.image} alt={apt.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161310] via-transparent to-transparent" />
                <div className="absolute top-3 left-3"><RoomStatusBadge status={apt.status} /></div>
                <div className="absolute top-3 right-3 bg-[#0c0a08]/80 border border-[rgba(196,149,74,0.2)] px-2 py-1">
                  <span className="text-xs font-['DM_Mono'] text-[#c4954a]">${apt.price}<span className="text-[#8a7d6a]">/night</span></span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-['Fraunces'] text-lg text-[#ede4d4]">{apt.name}</h3>
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <Star size={11} fill={gold} color={gold} />
                    <span className="text-xs font-['DM_Mono'] text-[#8a7d6a]">{apt.rating}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-xs font-['DM_Mono'] text-[#8a7d6a] mb-3">
                  <span className="flex items-center gap-1"><BedDouble size={11} className="text-[#c4954a]" /> 3 Bedrooms</span>
                  <span className="flex items-center gap-1"><Users size={11} className="text-[#c4954a]" /> Up to {apt.capacity} guests</span>
                  <span className="flex items-center gap-1"><MapPin size={11} className="text-[#c4954a]" /> {apt.view}</span>
                </div>
                <p className="text-xs font-['Jost'] text-[#8a7d6a] leading-relaxed flex-1 line-clamp-2">{apt.description}</p>
                <button
                  onClick={() => { setSelectedApartment(apt); setPage("apartment-detail"); }}
                  disabled={apt.status !== "Available"}
                  className={`mt-4 w-full py-3 text-sm ${apt.status === "Available" ? BTN_PRIMARY : "bg-[rgba(196,149,74,0.1)] text-[#8a7d6a] cursor-not-allowed font-['Jost'] text-sm"}`}
                >
                  {apt.status === "Available" ? "View & Book" : "Not Available"}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button onClick={() => setPage("apartments")} className={`px-8 py-3.5 ${BTN_OUTLINE}`}>View All Apartments</button>
        </div>
      </section>

      //Amenities
      <section className="py-20 bg-[#0f0d0b] border-y border-[rgba(196,149,74,0.1)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <SectionLabel text="What's Included" />
            <h2 className="font-['Fraunces'] text-4xl text-[#ede4d4]">Every Apartment Comes With</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {amenities.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex flex-col items-center text-center p-6 border border-[rgba(196,149,74,0.1)] hover:border-[rgba(196,149,74,0.3)] transition-all group">
                <div className="w-12 h-12 border border-[rgba(196,149,74,0.2)] flex items-center justify-center mb-4 group-hover:border-[#c4954a] transition-all">
                  <Icon size={20} className="text-[#c4954a]" />
                </div>
                <h3 className="text-sm font-['Jost'] text-[#ede4d4] font-semibold mb-1">{label}</h3>
                <p className="text-xs font-['DM_Mono'] text-[#8a7d6a]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      //Testimonials
      <section className="py-24 max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <SectionLabel text="Guest Reviews" />
          <h2 className="font-['Fraunces'] text-4xl text-[#ede4d4]">What Our Guests Say</h2>
        </div>
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-8 md:p-12">
          <div className="text-4xl text-[#c4954a]/30 font-['Fraunces'] mb-4">"</div>
          <p className="font-['Fraunces'] text-xl text-[#ede4d4] italic leading-relaxed mb-8">{TESTIMONIALS[activeTestimonial].text}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-[rgba(196,149,74,0.15)] border border-[rgba(196,149,74,0.3)] flex items-center justify-center">
                <span className="text-sm font-['DM_Mono'] text-[#c4954a]">{TESTIMONIALS[activeTestimonial].initials}</span>
              </div>
              <div>
                <p className="text-sm font-['Jost'] text-[#ede4d4] font-semibold">{TESTIMONIALS[activeTestimonial].name}</p>
                <p className="text-xs font-['DM_Mono'] text-[#8a7d6a]">{TESTIMONIALS[activeTestimonial].role}</p>
              </div>
            </div>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} className={`w-2 h-2 rounded-full transition-all ${i === activeTestimonial ? "bg-[#c4954a] w-6" : "bg-[rgba(196,149,74,0.3)]"}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      //CTA
      <section className="py-20 px-6 text-center bg-[#0f0d0b] border-t border-[rgba(196,149,74,0.1)]">
        <SectionLabel text="Ready to Book?" />
        <h2 className="font-['Fraunces'] text-4xl text-[#ede4d4] mb-4">Your Lagos Home Awaits</h2>
        <p className="text-[#8a7d6a] font-['Jost'] max-w-lg mx-auto mb-8">Browse available apartments and secure your stay today. No hidden charges.</p>
        <button onClick={() => setPage("apartments")} className={`px-10 py-4 ${BTN_PRIMARY}`}>Check Availability</button>
      </section>
    </div>
  );
}

// ─────────────────────────── APARTMENTS PAGE ────────────────────────────

function ApartmentsPage({ apartments, setSelectedApartment, setPage }: {
  apartments: any[]; setSelectedApartment: (a: any) => void; setPage: (p: string) => void;
}) {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const types = ["All", ...Array.from(new Set(apartments.map(a => a.type)))];
  const filtered = apartments.filter(a =>
    (filter === "All" || a.type === filter) &&
    (a.name.toLowerCase().includes(search.toLowerCase()))
  );
  return (
    <div className="min-h-screen bg-[#0c0a08] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <SectionLabel text="Our Apartments" />
          <h1 className="font-['Fraunces'] text-4xl text-[#ede4d4]">Find Your Perfect Space</h1>
          <p className="text-[#8a7d6a] font-['Jost'] mt-2">All apartments include 3 en-suite bedrooms, kitchen, sitting room & balcony.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search apartments..." className={INPUT + " pl-9"} />
          </div>
          <div className="flex flex-wrap gap-2">
            {types.map(t => (
              <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2.5 text-xs font-['DM_Mono'] tracking-widest uppercase border transition-all ${filter === t ? "bg-[#c4954a] text-[#0c0a08] border-[#c4954a]" : "border-[rgba(196,149,74,0.2)] text-[#8a7d6a] hover:border-[#c4954a] hover:text-[#c4954a]"}`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map(apt => (
            <div key={apt.id} className="bg-[#161310] border border-[rgba(196,149,74,0.1)] group hover:border-[rgba(196,149,74,0.3)] transition-all duration-300 flex flex-col">
              <div className="relative overflow-hidden h-52">
                <img src={apt.image} alt={apt.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161310] via-transparent to-transparent" />
                <div className="absolute top-3 left-3"><RoomStatusBadge status={apt.status} /></div>
                <div className="absolute top-3 right-3 bg-[#0c0a08]/80 border border-[rgba(196,149,74,0.2)] px-2 py-1">
                  <span className="text-xs font-['DM_Mono'] text-[#c4954a]">${apt.price}<span className="text-[#8a7d6a]">/night</span></span>
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-['Fraunces'] text-lg text-[#ede4d4]">{apt.name}</h3>
                  <div className="flex items-center gap-1 shrink-0 ml-2">
                    <Star size={11} fill={gold} color={gold} />
                    <span className="text-xs font-['DM_Mono'] text-[#8a7d6a]">{apt.rating} ({apt.reviews})</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 text-xs font-['DM_Mono'] text-[#8a7d6a] mb-3">
                  <span className="flex items-center gap-1"><BedDouble size={11} className="text-[#c4954a]" /> 3 Bedrooms</span>
                  <span className="flex items-center gap-1"><Users size={11} className="text-[#c4954a]" /> Up to {apt.capacity}</span>
                  <span className="flex items-center gap-1"><MapPin size={11} className="text-[#c4954a]" /> {apt.view}</span>
                </div>
                <p className="text-xs font-['Jost'] text-[#8a7d6a] leading-relaxed flex-1 line-clamp-2">{apt.description}</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => { setSelectedApartment(apt); setPage("apartment-detail"); }} className={`flex-1 py-2.5 text-sm ${BTN_OUTLINE}`}>Details</button>
                  <button
                    onClick={() => { if (apt.status === "Available") { setSelectedApartment(apt); setPage("apartment-detail"); } }}
                    disabled={apt.status !== "Available"}
                    className={`flex-1 py-2.5 text-sm ${apt.status === "Available" ? BTN_PRIMARY : "bg-[rgba(196,149,74,0.1)] text-[#8a7d6a] cursor-not-allowed font-['Jost'] text-sm"}`}
                  >
                    {apt.status === "Available" ? "Book Now" : "Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#8a7d6a] font-['Jost']">No apartments match your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────── APARTMENT DETAIL PAGE ────────────────────────────

function ApartmentDetailPage({ apartment, onBook, setPage }: {
  apartment: any; onBook: (apt: any) => void; setPage: (p: string) => void;
}) {
  const [activeSection, setActiveSection] = useState(0);
  const [nights, setNights] = useState(3);
  const [checkIn, setCheckIn] = useState("");
  const [guests, setGuests] = useState(2);
  const section = apartment.sections[activeSection];
  const total = apartment.price * nights;

  return (
    <div className="min-h-screen bg-[#0c0a08] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        //Breadcrumb
        <button onClick={() => setPage("apartments")} className="flex items-center gap-2 text-xs font-['DM_Mono'] text-[#8a7d6a] hover:text-[#c4954a] tracking-widest uppercase mb-6 transition-colors">
          <ChevronRight size={12} className="rotate-180" /> Back to Apartments
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          //Left: Sections Viewer
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-6">
              <div>
                <SectionLabel text={apartment.type + " Apartment"} />
                <h1 className="font-['Fraunces'] text-3xl text-[#ede4d4]">{apartment.name}</h1>
                <div className="flex items-center gap-4 mt-2">
                  <StarRating rating={apartment.rating} />
                  <span className="text-xs font-['DM_Mono'] text-[#8a7d6a]">{apartment.reviews} reviews</span>
                  <span className="text-xs font-['DM_Mono'] text-[#8a7d6a] flex items-center gap-1"><MapPin size={11} className="text-[#c4954a]" />{apartment.view}</span>
                </div>
              </div>
              <RoomStatusBadge status={apartment.status} />
            </div>

            //Section Tabs
            <div className="flex flex-wrap gap-1 mb-4 border-b border-[rgba(196,149,74,0.1)] pb-0">
              {apartment.sections.map((sec: any, i: number) => (
                <button key={i} onClick={() => setActiveSection(i)} className={`px-4 py-2.5 text-xs font-['DM_Mono'] tracking-widest uppercase transition-all border-b-2 -mb-px ${activeSection === i ? "text-[#c4954a] border-[#c4954a]" : "text-[#8a7d6a] border-transparent hover:text-[#ede4d4]"}`}>
                  {sec.name}
                </button>
              ))}
            </div>

            //Section Image
            <div className="relative overflow-hidden mb-4" style={{ height: "420px" }}>
              <img src={section.image} alt={section.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0c0a08] to-transparent p-6">
                <h3 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-1">{section.name}</h3>
                <p className="text-sm font-['Jost'] text-[#ede4d4]/80 leading-relaxed">{section.desc}</p>
              </div>
            </div>

            //Thumbnail Strip
            <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
              {apartment.sections.map((sec: any, i: number) => (
                <button key={i} onClick={() => setActiveSection(i)} className={`shrink-0 w-20 h-14 overflow-hidden border-2 transition-all ${activeSection === i ? "border-[#c4954a]" : "border-transparent opacity-60 hover:opacity-100"}`}>
                  <img src={sec.image} alt={sec.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            //Description
            <div className="mb-8">
              <h3 className="font-['Fraunces'] text-xl text-[#ede4d4] mb-3">About This Apartment</h3>
              <p className="text-sm font-['Jost'] text-[#8a7d6a] leading-relaxed">{apartment.description}</p>
            </div>

            //Amenities
            <div>
              <h3 className="font-['Fraunces'] text-xl text-[#ede4d4] mb-4">Included Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {apartment.amenities.map((a: string) => (
                  <div key={a} className="flex items-center gap-2 text-xs font-['Jost'] text-[#8a7d6a]">
                    <CheckCircle size={12} className="text-[#c4954a] shrink-0" /> {a}
                  </div>
                ))}
              </div>
            </div>
          </div>

          //Right: Booking Sidebar
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-[#161310] border border-[rgba(196,149,74,0.2)] p-6">
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <span className="font-['Fraunces'] text-3xl text-[#c4954a]">${apartment.price}</span>
                  <span className="text-sm font-['Jost'] text-[#8a7d6a]"> / night</span>
                </div>
                <StarRating rating={apartment.rating} size={12} />
              </div>
              <div className="space-y-3 mb-4">
                <FormField label="Check-in Date">
                  <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className={INPUT} min={new Date().toISOString().split("T")[0]} />
                </FormField>
                <FormField label="Nights">
                  <div className="flex items-center gap-3">
                    <button onClick={() => setNights(Math.max(1, nights - 1))} className="w-9 h-9 border border-[rgba(196,149,74,0.3)] text-[#c4954a] flex items-center justify-center hover:bg-[rgba(196,149,74,0.1)] transition-colors"><Minus size={14} /></button>
                    <span className="text-lg font-['DM_Mono'] text-[#ede4d4] flex-1 text-center">{nights}</span>
                    <button onClick={() => setNights(nights + 1)} className="w-9 h-9 border border-[rgba(196,149,74,0.3)] text-[#c4954a] flex items-center justify-center hover:bg-[rgba(196,149,74,0.1)] transition-colors"><Plus size={14} /></button>
                  </div>
                </FormField>
                <FormField label="Guests">
                  <select value={guests} onChange={e => setGuests(Number(e.target.value))} className={INPUT}>
                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n} guest{n > 1 ? "s" : ""}</option>)}
                  </select>
                </FormField>
              </div>
              <div className="border-t border-[rgba(196,149,74,0.1)] pt-4 mb-5 space-y-2">
                <div className="flex justify-between text-sm"><span className="font-['Jost'] text-[#8a7d6a]">${apartment.price} × {nights} nights</span><span className="font-['DM_Mono'] text-[#ede4d4]">${total}</span></div>
                <div className="flex justify-between text-sm font-semibold"><span className="font-['Jost'] text-[#ede4d4]">Total</span><span className="font-['DM_Mono'] text-[#c4954a]">${total}</span></div>
              </div>
              <button
                onClick={() => { if (apartment.status === "Available") onBook({ apartment, nights, checkIn, guests }); else toast.error("This apartment is not available."); }}
                className={`w-full py-4 ${apartment.status === "Available" ? BTN_PRIMARY : "bg-[rgba(196,149,74,0.1)] text-[#8a7d6a] cursor-not-allowed font-['Jost'] text-sm"}`}
              >
                {apartment.status === "Available" ? "Reserve Now" : "Not Available"}
              </button>
              <p className="text-[10px] font-['DM_Mono'] text-[#8a7d6a]/60 text-center mt-3">Free cancellation up to 48 hours before check-in</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── BOOKING CHECKOUT ────────────────────────────

function BookingCheckout({ bookingData, onComplete, onCancel }: {
  bookingData: any; onComplete: (ref: string, booking: any) => void; onCancel: () => void;
}) {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState({ firstName: "", lastName: "", email: "", phone: "", special: "" });
  const [payment, setPayment] = useState({ cardNumber: "", expiry: "", cvv: "", name: "" });
  const { apartment, nights, checkIn, guests } = bookingData;
  const total = apartment.price * nights;

  const det = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setDetails(d => ({ ...d, [k]: e.target.value }));

  return (
    <div className="min-h-screen bg-[#0c0a08] pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <button onClick={onCancel} className="flex items-center gap-2 text-xs font-['DM_Mono'] text-[#8a7d6a] hover:text-[#c4954a] tracking-widest uppercase mb-6 transition-colors">
          <ChevronRight size={12} className="rotate-180" /> Back
        </button>
        <SectionLabel text="Reservation" />
        <h1 className="font-['Fraunces'] text-3xl text-[#ede4d4] mb-6">Complete Your Booking</h1>
        <div className="mb-8"><StepIndicator steps={["Review", "Details", "Payment"]} current={step} /></div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
            {step === 1 && (
              <div className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-6">
                <h2 className="font-['Fraunces'] text-xl text-[#ede4d4] mb-5">Booking Summary</h2>
                <img src={apartment.image} alt={apartment.name} className="w-full h-40 object-cover mb-5" />
                <div className="space-y-3">
                  {[["Apartment", apartment.name], ["Type", apartment.type], ["Check-in", checkIn || "TBD"], ["Nights", `${nights} nights`], ["Guests", `${guests} guest${guests > 1 ? "s" : ""}`]].map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm border-b border-[rgba(196,149,74,0.06)] pb-2 last:border-b-0">
                      <span className="font-['DM_Mono'] text-[#8a7d6a] text-xs tracking-widest uppercase">{k}</span>
                      <span className="font-['Jost'] text-[#ede4d4]">{v}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className={`w-full py-3.5 mt-6 ${BTN_PRIMARY}`}>Continue <ChevronRight size={14} className="inline" /></button>
              </div>
            )}
            {step === 2 && (
              <form onSubmit={e => { e.preventDefault(); setStep(3); }} className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-6 space-y-4">
                <h2 className="font-['Fraunces'] text-xl text-[#ede4d4] mb-5">Guest Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="First Name"><input required value={details.firstName} onChange={det("firstName")} className={INPUT} placeholder="First name" /></FormField>
                  <FormField label="Last Name"><input required value={details.lastName} onChange={det("lastName")} className={INPUT} placeholder="Last name" /></FormField>
                </div>
                <FormField label="Email"><input type="email" required value={details.email} onChange={det("email")} className={INPUT} placeholder="your@email.com" /></FormField>
                <FormField label="Phone"><input type="tel" required value={details.phone} onChange={det("phone")} className={INPUT} placeholder="+234 800 000 0000" /></FormField>
                <FormField label="Special Requests (optional)">
                  <textarea value={details.special} onChange={det("special")} className={INPUT + " resize-none h-20"} placeholder="Any special requirements..." />
                </FormField>
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setStep(1)} className={`flex-1 py-3.5 ${BTN_OUTLINE}`}>Back</button>
                  <button type="submit" className={`flex-1 py-3.5 ${BTN_PRIMARY}`}>Continue to Payment</button>
                </div>
              </form>
            )}
            {step === 3 && (
              <form onSubmit={e => {
                e.preventDefault();
                const ref = genRef("BK-");
                onComplete(ref, { apartment, nights, checkIn, guests, details, total, ref });
              }} className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-6 space-y-4">
                <h2 className="font-['Fraunces'] text-xl text-[#ede4d4] mb-5">Payment</h2>
                <PaymentForm payment={payment} setPayment={setPayment} />
                <div className="flex gap-3 pt-2">
                  <button type="button" onClick={() => setStep(2)} className={`flex-1 py-3.5 ${BTN_OUTLINE}`}>Back</button>
                  <button type="submit" className={`flex-1 py-3.5 ${BTN_PRIMARY}`}>Confirm & Pay ${total}</button>
                </div>
              </form>
            )}
          </div>
          <div className="lg:col-span-2">
            <div className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-5">
              <h3 className="font-['Fraunces'] text-lg text-[#ede4d4] mb-4">Price Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="font-['Jost'] text-[#8a7d6a]">${apartment.price} × {nights} nights</span><span className="font-['DM_Mono'] text-[#ede4d4]">${total}</span></div>
                <div className="flex justify-between"><span className="font-['Jost'] text-[#8a7d6a]">Taxes & fees</span><span className="font-['DM_Mono'] text-[#ede4d4]">Included</span></div>
                <div className="border-t border-[rgba(196,149,74,0.1)] pt-2 flex justify-between font-semibold"><span className="font-['Jost'] text-[#ede4d4]">Total</span><span className="font-['DM_Mono'] text-[#c4954a]">${total}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── CONFIRMATION PAGE ────────────────────────────

function ConfirmationPage({ confirmation, setPage, onAddReview }: {
  confirmation: any; setPage: (p: string) => void; onAddReview: (r: any) => void;
}) {
  const [reviewStep, setReviewStep] = useState<"none" | "form" | "done">("none");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReview = () => {
    if (rating === 0) { toast.error("Please select a star rating."); return; }
    onAddReview({
      id: genRef("REV-"),
      user: `${confirmation.details?.firstName ?? "Guest"} ${confirmation.details?.lastName ?? ""}`.trim(),
      email: confirmation.details?.email ?? "",
      apartment: confirmation.apartment?.name ?? "Apartment",
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
      bookingId: confirmation.ref,
      status: "Published",
    });
    setReviewStep("done");
    toast.success("Thank you for your review!");
  };

  return (
    <div className="min-h-screen bg-[#0c0a08] pt-28 pb-20 flex items-center justify-center px-6">
      <div className="w-full max-w-lg">
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.2)] p-8 text-center">
          <div className="w-16 h-16 bg-[rgba(196,149,74,0.1)] border border-[rgba(196,149,74,0.3)] flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={28} className="text-[#c4954a]" />
          </div>
          <SectionLabel text="Booking Confirmed" />
          <h1 className="font-['Fraunces'] text-3xl text-[#ede4d4] mb-2">You are all set!</h1>
          <p className="text-[#8a7d6a] font-['Jost'] mb-6">Your booking reference is:</p>
          <div className="bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-6 py-3 font-['DM_Mono'] text-[#c4954a] text-xl tracking-widest mb-6">{confirmation.ref}</div>
          <div className="space-y-2 text-left mb-6">
            {[["Apartment", confirmation.apartment?.name], ["Check-in", confirmation.checkIn || "TBD"], ["Nights", `${confirmation.nights} nights`], ["Total Paid", `$${confirmation.total}`]].map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm border-b border-[rgba(196,149,74,0.06)] pb-2">
                <span className="font-['DM_Mono'] text-[#8a7d6a] text-xs tracking-widest uppercase">{k}</span>
                <span className="font-['Jost'] text-[#ede4d4]">{v}</span>
              </div>
            ))}
          </div>

          //Review Section
          {reviewStep === "none" && (
            <div className="border-t border-[rgba(196,149,74,0.1)] pt-5 mt-4">
              <p className="text-sm font-['Jost'] text-[#8a7d6a] mb-3">Had a great stay? Leave a review to help others.</p>
              <button onClick={() => setReviewStep("form")} className={`w-full py-3 ${BTN_OUTLINE}`}>Leave a Review</button>
            </div>
          )}
          {reviewStep === "form" && (
            <div className="border-t border-[rgba(196,149,74,0.1)] pt-5 mt-4 text-left">
              <h3 className="font-['Fraunces'] text-lg text-[#ede4d4] mb-4">Your Review</h3>
              <div className="mb-4">
                <label className={LABEL}>Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <button key={i} onClick={() => setRating(i)} className={`w-10 h-10 border flex items-center justify-center transition-all ${i <= rating ? "border-[#c4954a] bg-[rgba(196,149,74,0.1)]" : "border-[rgba(196,149,74,0.2)] hover:border-[#c4954a]"}`}>
                      <Star size={16} fill={i <= rating ? gold : "transparent"} color={i <= rating ? gold : textMuted} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <label className={LABEL}>Comment</label>
                <textarea value={comment} onChange={e => setComment(e.target.value)} rows={3} className={INPUT + " resize-none"} placeholder="Share your experience..." />
              </div>
              <div className="flex gap-2">
                <button onClick={() => setReviewStep("none")} className={`flex-1 py-2.5 ${BTN_OUTLINE}`}>Cancel</button>
                <button onClick={submitReview} className={`flex-1 py-2.5 ${BTN_PRIMARY}`}>Submit Review</button>
              </div>
            </div>
          )}
          {reviewStep === "done" && (
            <div className="border-t border-[rgba(196,149,74,0.1)] pt-5 mt-4">
              <p className="text-sm font-['Jost'] text-[#c4954a]">Thank you for your review!</p>
            </div>
          )}

          <button onClick={() => setPage("home")} className={`w-full py-3.5 mt-5 ${BTN_PRIMARY}`}>Back to Home</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── RESTAURANT CHECKOUT ────────────────────────────

function RestaurantCheckout({ items, onComplete, onCancel }: {
  items: any[]; onComplete: (ref: string, data: any) => void; onCancel: () => void;
}) {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState({ name: "", room: "", phone: "" });
  const [payment, setPayment] = useState({ cardNumber: "", expiry: "", cvv: "", name: "" });
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const service = subtotal * 0.1;
  const total = subtotal + service;
  const det = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setDetails(d => ({ ...d, [k]: e.target.value }));

  return (
    <div className="min-h-screen bg-[#0c0a08] pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <button onClick={onCancel} className="flex items-center gap-2 text-xs font-['DM_Mono'] text-[#8a7d6a] hover:text-[#c4954a] tracking-widest uppercase mb-6 transition-colors">
          <ChevronRight size={12} className="rotate-180" /> Back
        </button>
        <SectionLabel text="Restaurant" />
        <h1 className="font-['Fraunces'] text-3xl text-[#ede4d4] mb-6">Your Order</h1>
        <div className="mb-8"><StepIndicator steps={["Order Review", "Details", "Payment"]} current={step} /></div>

        {step === 1 && (
          <div className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-6">
            <div className="space-y-3 mb-5">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm border-b border-[rgba(196,149,74,0.06)] pb-2">
                  <span className="font-['Jost'] text-[#ede4d4]">{item.name} <span className="text-[#8a7d6a]">× {item.qty}</span></span>
                  <span className="font-['DM_Mono'] text-[#c4954a]">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="flex justify-between text-sm"><span className="font-['Jost'] text-[#8a7d6a]">Service (10%)</span><span className="font-['DM_Mono'] text-[#ede4d4]">${service.toFixed(2)}</span></div>
              <div className="flex justify-between font-semibold pt-1"><span className="font-['Jost'] text-[#ede4d4]">Total</span><span className="font-['DM_Mono'] text-[#c4954a]">${total.toFixed(2)}</span></div>
            </div>
            <button onClick={() => setStep(2)} className={`w-full py-3.5 ${BTN_PRIMARY}`}>Continue</button>
          </div>
        )}
        {step === 2 && (
          <form onSubmit={e => { e.preventDefault(); setStep(3); }} className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-6 space-y-4">
            <h2 className="font-['Fraunces'] text-xl text-[#ede4d4] mb-4">Delivery Details</h2>
            <FormField label="Your Name"><input required value={details.name} onChange={det("name")} className={INPUT} placeholder="Full name" /></FormField>
            <FormField label="Apartment / Room Number"><input required value={details.room} onChange={det("room")} className={INPUT} placeholder="e.g. Apt 4B or Penthouse" /></FormField>
            <FormField label="Phone"><input type="tel" required value={details.phone} onChange={det("phone")} className={INPUT} placeholder="+234 800 000 0000" /></FormField>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setStep(1)} className={`flex-1 py-3.5 ${BTN_OUTLINE}`}>Back</button>
              <button type="submit" className={`flex-1 py-3.5 ${BTN_PRIMARY}`}>Continue to Payment</button>
            </div>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={e => {
            e.preventDefault();
            const ref = genRef("ORD-");
            onComplete(ref, { items, details, total, ref });
          }} className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-6 space-y-4">
            <PaymentForm payment={payment} setPayment={setPayment} />
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setStep(2)} className={`flex-1 py-3.5 ${BTN_OUTLINE}`}>Back</button>
              <button type="submit" className={`flex-1 py-3.5 ${BTN_PRIMARY}`}>Pay ${total.toFixed(2)}</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────── MENU PAGE ────────────────────────────

function MenuPage({ menuItems, cartItems, addToCart }: {
  menuItems: any[]; cartItems: any[]; addToCart: (item: any) => void;
}) {
  const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(menuItems.map(m => m.cat)))];
  const filtered = cat === "All" ? menuItems : menuItems.filter(m => m.cat === cat);

  return (
    <div className="min-h-screen bg-[#0c0a08] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <SectionLabel text="The Restaurant" />
          <h1 className="font-['Fraunces'] text-4xl text-[#ede4d4]">Our Menu</h1>
          <p className="text-[#8a7d6a] font-['Jost'] mt-2">Fresh ingredients, bold flavours. Dine in or order to your apartment.</p>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {cats.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`px-4 py-2.5 text-xs font-['DM_Mono'] tracking-widest uppercase border transition-all ${cat === c ? "bg-[#c4954a] text-[#0c0a08] border-[#c4954a]" : "border-[rgba(196,149,74,0.2)] text-[#8a7d6a] hover:border-[#c4954a] hover:text-[#c4954a]"}`}>{c}</button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(item => {
            const inCart = cartItems.find(c => c.id === item.id);
            return (
              <div key={item.id} className="bg-[#161310] border border-[rgba(196,149,74,0.1)] hover:border-[rgba(196,149,74,0.25)] transition-all group flex flex-col">
                <div className="relative h-44 overflow-hidden">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-2 right-2 bg-[#0c0a08]/80 border border-[rgba(196,149,74,0.2)] px-2 py-0.5">
                    <span className="text-xs font-['DM_Mono'] text-[#c4954a]">${item.price}</span>
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-sm font-['Jost'] text-[#ede4d4] font-semibold leading-tight">{item.name}</h3>
                    <span className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] border border-[rgba(196,149,74,0.15)] px-1.5 py-0.5 ml-2 shrink-0">{item.cat}</span>
                  </div>
                  <p className="text-xs font-['Jost'] text-[#8a7d6a] leading-relaxed flex-1">{item.desc}</p>
                  <button
                    onClick={() => { if (item.available) addToCart(item); else toast.error("Item not available."); }}
                    disabled={!item.available}
                    className={`mt-4 w-full py-2.5 text-sm transition-all ${item.available ? (inCart ? "bg-[rgba(196,149,74,0.2)] text-[#c4954a] border border-[#c4954a] font-['Jost'] font-semibold text-sm tracking-widest uppercase" : BTN_PRIMARY) : "bg-[rgba(196,149,74,0.08)] text-[#8a7d6a] cursor-not-allowed font-['Jost'] text-sm"}`}
                  >
                    {!item.available ? "Unavailable" : inCart ? `In Cart (${inCart.qty})` : "Add to Order"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── GALLERY PAGE ────────────────────────────

function GalleryPage() {
  const [filter, setFilter] = useState("All");
  const cats = ["All", "Apartments", "Dining", "Amenities"];
  const filtered = filter === "All" ? GALLERY_IMAGES : GALLERY_IMAGES.filter(i => i.cat === filter);
  return (
    <div className="min-h-screen bg-[#0c0a08] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10">
          <SectionLabel text="Gallery" />
          <h1 className="font-['Fraunces'] text-4xl text-[#ede4d4]">Life at Cedar Court</h1>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2.5 text-xs font-['DM_Mono'] tracking-widest uppercase border transition-all ${filter === c ? "bg-[#c4954a] text-[#0c0a08] border-[#c4954a]" : "border-[rgba(196,149,74,0.2)] text-[#8a7d6a] hover:border-[#c4954a] hover:text-[#c4954a]"}`}>{c}</button>
          ))}
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map(img => (
            <div key={img.id} className="break-inside-avoid overflow-hidden group relative">
              <img src={img.url} alt={img.alt} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                <span className="text-xs font-['DM_Mono'] text-[#ede4d4] tracking-widest opacity-0 group-hover:opacity-100 transition-all">{img.cat.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── ABOUT PAGE ────────────────────────────

function AboutPage({ setPage }: { setPage: (p: string) => void }) {
  const achievements = [
    { icon: Star, value: "4.9★", label: "Google Reviews", sub: "Based on 400+ verified reviews" },
    { icon: Heart, value: "#1", label: "TripAdvisor", sub: "Top Serviced Apartments in Ikoyi" },
    { icon: CheckCircle, value: "Verified", label: "Booking.com", sub: "Traveller Review Award 2025" },
    { icon: Award, value: "Winner", label: "Lagos Hospitality Awards", sub: "Best Serviced Apartment 2024" },
  ];
  const values = [
    { icon: Home, title: "Feels Like Home", desc: "Full kitchens, spacious sitting rooms and enough bedrooms for the whole family. No compromise on space." },
    { icon: Shield, title: "Safe & Secure", desc: "24/7 security personnel, CCTV coverage and manned entrance gate for total peace of mind." },
    { icon: Zap, title: "No Power Cuts", desc: "Uninterrupted 24/7 power supply. Work, rest, charge your devices — without interruption." },
    { icon: Coffee, title: "On-call Service", desc: "Housekeeping, maintenance, food delivery to your door — we are always reachable." },
  ];
  return (
    <div className="min-h-screen bg-[#0c0a08]">
      //Hero
      <section className="relative h-80 flex items-end pb-12">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1730367019960-9906d9cbbf05?w=1600&h=600&fit=crop&auto=format" alt="About Cedar Court" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08] to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 pt-28">
          <SectionLabel text="About Us" />
          <h1 className="font-['Fraunces'] text-5xl text-[#ede4d4]">Our Story</h1>
        </div>
      </section>

      //Story 
      <section className="py-20 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel text="Since 2019" />
          <h2 className="font-['Fraunces'] text-3xl text-[#ede4d4] mb-5">A Different Kind of Stay</h2>
          <p className="text-sm font-['Jost'] text-[#8a7d6a] leading-relaxed mb-4">Cedar Court was founded on a simple idea — Lagos needed a premium serviced apartment that genuinely felt like home. Not a hotel room. Not a bare apartment. A real home, fully furnished and professionally maintained, in one of Lagos's most sought-after addresses.</p>
          <p className="text-sm font-['Jost'] text-[#8a7d6a] leading-relaxed mb-6">Since opening in 2019, we have hosted thousands of guests — families relocating, executives on extended assignments, couples celebrating milestones, and locals wanting a short escape. Every stay teaches us something new about what our guests need, and we keep improving.</p>
          <button onClick={() => setPage("apartments")} className={`px-8 py-3.5 ${BTN_PRIMARY}`}>View Apartments</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop&auto=format" className="w-full h-40 object-cover" alt="Apartment" />
          <img src="https://images.unsplash.com/photo-1637730827702-de34e9ae4ede?w=400&h=300&fit=crop&auto=format" className="w-full h-40 object-cover mt-8" alt="Dining" />
          <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=400&h=300&fit=crop&auto=format" className="w-full h-40 object-cover" alt="Balcony" />
          <img src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=300&fit=crop&auto=format" className="w-full h-40 object-cover mt-8" alt="Kitchen" />
        </div>
      </section>

      //Achievements
      <section className="py-20 bg-[#0f0d0b] border-y border-[rgba(196,149,74,0.1)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <SectionLabel text="Recognition" />
            <h2 className="font-['Fraunces'] text-3xl text-[#ede4d4]">Trusted by Guests Everywhere</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {achievements.map(({ icon: Icon, value, label, sub }) => (
              <div key={label} className="bg-[#161310] border border-[rgba(196,149,74,0.12)] p-6 text-center hover:border-[rgba(196,149,74,0.3)] transition-all">
                <Icon size={22} className="text-[#c4954a] mx-auto mb-3" />
                <div className="font-['Fraunces'] text-2xl text-[#c4954a] mb-1">{value}</div>
                <div className="text-sm font-['Jost'] text-[#ede4d4] font-semibold mb-1">{label}</div>
                <div className="text-xs font-['DM_Mono'] text-[#8a7d6a]">{sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      //Why Stay With Us
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <SectionLabel text="Why Cedar Court" />
          <h2 className="font-['Fraunces'] text-3xl text-[#ede4d4]">What Sets Us Apart</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="border border-[rgba(196,149,74,0.1)] p-6 hover:border-[rgba(196,149,74,0.3)] transition-all group">
              <div className="w-10 h-10 border border-[rgba(196,149,74,0.2)] flex items-center justify-center mb-4 group-hover:border-[#c4954a] transition-all">
                <Icon size={18} className="text-[#c4954a]" />
              </div>
              <h3 className="font-['Fraunces'] text-lg text-[#ede4d4] mb-2">{title}</h3>
              <p className="text-xs font-['Jost'] text-[#8a7d6a] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────── CONTACT PAGE ────────────────────────────

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <div className="min-h-screen bg-[#0c0a08] pt-28 pb-0">
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="mb-12">
          <SectionLabel text="Get in Touch" />
          <h1 className="font-['Fraunces'] text-4xl text-[#ede4d4]">Contact Us</h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-6 mb-10">
              {[
                { icon: MapPin, label: "Address", value: "14 Bourdillon Road, Ikoyi, Lagos, Nigeria" },
                { icon: Phone, label: "Phone", value: "+234 1 700 2000" },
                { icon: Mail, label: "Email", value: "hello@cedarcourt.ng" },
                { icon: Clock, label: "Reception Hours", value: "24 hours, 7 days a week" },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-10 h-10 border border-[rgba(196,149,74,0.2)] flex items-center justify-center shrink-0"><Icon size={16} className="text-[#c4954a]" /></div>
                  <div>
                    <p className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-0.5">{label}</p>
                    <p className="text-sm font-['Jost'] text-[#ede4d4]">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={e => { e.preventDefault(); toast.success("Message sent! We will respond within 24 hours."); setForm({ name: "", email: "", subject: "", message: "" }); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField label="Name"><input required value={form.name} onChange={set("name")} className={INPUT} placeholder="Your name" /></FormField>
                <FormField label="Email"><input type="email" required value={form.email} onChange={set("email")} className={INPUT} placeholder="your@email.com" /></FormField>
              </div>
              <FormField label="Subject"><input required value={form.subject} onChange={set("subject")} className={INPUT} placeholder="How can we help?" /></FormField>
              <FormField label="Message"><textarea required value={form.message} onChange={set("message")} rows={5} className={INPUT + " resize-none"} placeholder="Your message..." /></FormField>
              <button type="submit" className={`w-full py-3.5 ${BTN_PRIMARY}`}>Send Message</button>
            </form>
          </div>
          <div className="h-80 lg:h-auto min-h-[320px]">
            <div className="bg-[#161310] border border-[rgba(196,149,74,0.15)] overflow-hidden h-full min-h-[320px]">
              <iframe
                title="Cedar Court Location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=3.4200%2C6.4300%2C3.4500%2C6.4500&layer=mapnik&marker=6.4400%2C3.4350"
                width="100%"
                height="100%"
                style={{ minHeight: "320px", filter: "invert(90%) hue-rotate(180deg) brightness(0.7) contrast(0.9) saturate(0.8)" }}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      //Map section before footer
      <div className="border-t border-[rgba(196,149,74,0.1)]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-xs font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase text-center">14 Bourdillon Road, Ikoyi, Lagos · Find Us on Google Maps: Cedar Court Serviced Apartments</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── MY BOOKINGS PAGE ────────────────────────────

function MyBookingsPage({ bookings, authUser }: { bookings: any[]; authUser: any }) {
  const myBookings = bookings.filter(b => b.email === authUser?.email);
  return (
    <div className="min-h-screen bg-[#0c0a08] pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <SectionLabel text="My Account" />
        <h1 className="font-['Fraunces'] text-3xl text-[#ede4d4] mb-8">My Bookings</h1>
        {myBookings.length === 0 ? (
          <div className="text-center py-20"><p className="text-[#8a7d6a] font-['Jost']">No bookings found.</p></div>
        ) : (
          <div className="space-y-4">
            {myBookings.map(b => (
              <div key={b.id} className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-['DM_Mono'] text-[#c4954a] text-sm">{b.id}</p>
                    <h3 className="font-['Fraunces'] text-lg text-[#ede4d4]">{b.room}</h3>
                  </div>
                  <StatusBadge status={b.status} />
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs">
                  {[["Check-in", b.checkIn], ["Check-out", b.checkOut], ["Total", `$${b.total}`]].map(([k, v]) => (
                    <div key={k}><p className="font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase mb-1">{k}</p><p className="font-['Jost'] text-[#ede4d4]">{v}</p></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────── PROFILE PAGE ────────────────────────────

function ProfilePage({ authUser }: { authUser: any }) {
  return (
    <div className="min-h-screen bg-[#0c0a08] pt-28 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <SectionLabel text="My Account" />
        <h1 className="font-['Fraunces'] text-3xl text-[#ede4d4] mb-8">My Profile</h1>
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-6 space-y-4">
          <div className="flex items-center gap-4 pb-4 border-b border-[rgba(196,149,74,0.1)]">
            <div className="w-14 h-14 bg-[rgba(196,149,74,0.15)] border border-[rgba(196,149,74,0.3)] flex items-center justify-center">
              <span className="text-lg font-['DM_Mono'] text-[#c4954a]">{authUser.firstName[0]}{authUser.lastName?.[0] ?? ""}</span>
            </div>
            <div>
              <p className="font-['Fraunces'] text-xl text-[#ede4d4]">{authUser.firstName} {authUser.lastName}</p>
              <p className="text-sm font-['DM_Mono'] text-[#8a7d6a]">{authUser.email}</p>
            </div>
          </div>
          <FormField label="First Name"><input defaultValue={authUser.firstName} className={INPUT} /></FormField>
          <FormField label="Last Name"><input defaultValue={authUser.lastName} className={INPUT} /></FormField>
          <FormField label="Email"><input type="email" defaultValue={authUser.email} className={INPUT} /></FormField>
          <button onClick={() => toast.success("Profile updated!")} className={`w-full py-3.5 ${BTN_PRIMARY}`}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── ADMIN LAYOUT ────────────────────────────

function AdminLayout({ adminPage, setAdminPage, children, onLogout }: {
  adminPage: string; setAdminPage: (p: string) => void; children: React.ReactNode; onLogout: () => void;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "bookings", icon: Calendar, label: "Bookings" },
    { id: "apartments", icon: BedDouble, label: "Apartments" },
    { id: "orders", icon: UtensilsCrossed, label: "Orders" },
    { id: "menu", icon: ChefHat, label: "Menu" },
    { id: "guests", icon: Users, label: "Guests" },
    { id: "reviews", icon: MessageSquare, label: "Reviews" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-[#0c0a08] flex">
      //Sidebar Overlay (mobile)
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      //Sidebar
      <aside className={`fixed top-0 left-0 h-full w-60 bg-[#0a0806] border-r border-[rgba(196,149,74,0.1)] z-40 flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:z-auto`}>
        <div className="p-5 border-b border-[rgba(196,149,74,0.1)] flex items-center justify-between">
          <CedarLogo size="sm" />
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-[#8a7d6a] hover:text-[#ede4d4]"><X size={16} /></button>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-3 mb-2">
            <span className="text-[9px] font-['DM_Mono'] text-[#8a7d6a]/50 tracking-widest uppercase px-2">Management</span>
          </div>
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setAdminPage(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-5 py-3 text-sm font-['Jost'] transition-all ${adminPage === item.id ? "text-[#c4954a] bg-[rgba(196,149,74,0.06)] border-l-2 border-[#c4954a]" : "text-[#8a7d6a] hover:text-[#ede4d4] hover:bg-[rgba(196,149,74,0.04)]"}`}>
              <item.icon size={15} />
              {item.label}
            </button>
          ))}
        </div>
        <div className="p-4 border-t border-[rgba(196,149,74,0.1)]">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-['Jost'] text-red-400/70 hover:text-red-400 transition-colors">
            <LogOut size={15} /> Sign Out
          </button>
        </div>
      </aside>

      //Main 
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 bg-[#0a0806] border-b border-[rgba(196,149,74,0.1)] flex items-center px-4 sm:px-6 gap-3">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-8 h-8 flex items-center justify-center text-[#8a7d6a] hover:text-[#c4954a] transition-colors">
            <Menu size={18} />
          </button>
          <div className="flex-1">
            <h1 className="text-sm font-['Fraunces'] text-[#ede4d4] capitalize">{adminPage}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[rgba(196,149,74,0.15)] border border-[rgba(196,149,74,0.3)] flex items-center justify-center">
              <span className="text-[10px] font-['DM_Mono'] text-[#c4954a]">AD</span>
            </div>
            <span className="text-xs font-['DM_Mono'] text-[#8a7d6a] hidden sm:block">Admin</span>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

// ─────────────────────────── ADMIN DASHBOARD ────────────────────────────

function AdminDashboard({ bookings, apartments, orders, reviews }: { bookings: any[]; apartments: any[]; orders: any[]; reviews: any[] }) {
  const occupied = apartments.filter(a => a.status === "Occupied").length;
  const revenue = bookings.reduce((s, b) => s + b.total, 0);
  const pendingOrders = orders.filter(o => o.status === "Pending" || o.status === "Preparing").length;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Bookings", value: bookings.length, icon: Calendar, color: "text-blue-400" },
          { label: "Occupied Apts", value: `${occupied}/${apartments.length}`, icon: BedDouble, color: "text-[#c4954a]" },
          { label: "Total Revenue", value: `$${revenue.toLocaleString()}`, icon: TrendingUp, color: "text-emerald-400" },
          { label: "Pending Orders", value: pendingOrders, icon: UtensilsCrossed, color: "text-amber-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-4 sm:p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">{label}</span>
              <Icon size={15} className={color} />
            </div>
            <div className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">{value}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#161310] border border-[rgba(196,149,74,0.1)] p-5">
          <h2 className="font-['Fraunces'] text-lg text-[#ede4d4] mb-4">Monthly Revenue</h2>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={REVENUE_DATA}>
              <defs><linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#c4954a" stopOpacity={0.2} /><stop offset="95%" stopColor="#c4954a" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,149,74,0.08)" />
              <XAxis dataKey="month" tick={{ fill: "#8a7d6a", fontSize: 10, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#8a7d6a", fontSize: 10, fontFamily: "DM Mono" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#161310", border: "1px solid rgba(196,149,74,0.2)", borderRadius: 0 }} labelStyle={{ color: "#ede4d4" }} itemStyle={{ color: "#c4954a" }} />
              <Area type="monotone" dataKey="revenue" stroke="#c4954a" fill="url(#revGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-5">
          <h2 className="font-['Fraunces'] text-lg text-[#ede4d4] mb-4">Apt. Types</h2>
          <ResponsiveContainer width="100%" height={200}>
            <RechartsPie>
              <Pie data={APT_TYPE_DATA} cx="50%" cy="50%" outerRadius={70} dataKey="value" strokeWidth={0}>
                {APT_TYPE_DATA.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#161310", border: "1px solid rgba(196,149,74,0.2)" }} />
            </RechartsPie>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {APT_TYPE_DATA.map(d => <span key={d.name} className="flex items-center gap-1 text-[10px] font-['DM_Mono'] text-[#8a7d6a]"><span className="w-2 h-2 rounded-full inline-block" style={{ background: d.color }} />{d.name}</span>)}
          </div>
        </div>
      </div>
      //Recent Bookings 
      <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-5">
        <h2 className="font-['Fraunces'] text-lg text-[#ede4d4] mb-4">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-['DM_Mono']">
            <thead><tr className="border-b border-[rgba(196,149,74,0.1)]">{["ID", "Guest", "Apartment", "Check-in", "Status"].map(h => <th key={h} className="text-left py-2 px-2 text-[#8a7d6a] tracking-widest uppercase">{h}</th>)}</tr></thead>
            <tbody>
              {bookings.slice(0, 5).map(b => (
                <tr key={b.id} className="border-b border-[rgba(196,149,74,0.06)] hover:bg-[rgba(196,149,74,0.03)] transition-colors">
                  <td className="py-2.5 px-2 text-[#c4954a]">{b.id}</td>
                  <td className="py-2.5 px-2 text-[#ede4d4]">{b.guest}</td>
                  <td className="py-2.5 px-2 text-[#8a7d6a] hidden sm:table-cell">{b.room}</td>
                  <td className="py-2.5 px-2 text-[#8a7d6a] hidden md:table-cell">{b.checkIn}</td>
                  <td className="py-2.5 px-2"><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── ADMIN BOOKINGS ────────────────────────────

function AdminBookings({ bookings, setBookings }: { bookings: any[]; setBookings: (b: any[]) => void }) {
  const [search, setSearch] = useState("");
  const [viewBooking, setViewBooking] = useState<any>(null);
  const filtered = bookings.filter(b => b.guest.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase()));

  const updateStatus = (id: string, status: string) => setBookings(bookings.map(b => b.id === id ? { ...b, status } : b));
  const deleteBooking = (id: string) => { setBookings(bookings.filter(b => b.id !== id)); toast.success("Booking removed."); };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4]">Bookings</h2>
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." className={INPUT + " pl-9 text-xs"} />
        </div>
      </div>
      <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-x-auto">
        <table className="w-full text-xs font-['DM_Mono']">
          <thead><tr className="border-b border-[rgba(196,149,74,0.1)]">{["ID", "Guest", "Apartment", "Check-in / Out", "Total", "Status", "Actions"].map(h => <th key={h} className="text-left py-3 px-4 text-[#8a7d6a] tracking-widest uppercase">{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id} className="border-b border-[rgba(196,149,74,0.06)] hover:bg-[rgba(196,149,74,0.03)]">
                <td className="py-3 px-4 text-[#c4954a]">{b.id}</td>
                <td className="py-3 px-4 text-[#ede4d4]">{b.guest}</td>
                <td className="py-3 px-4 text-[#8a7d6a] hidden sm:table-cell">{b.room}</td>
                <td className="py-3 px-4 text-[#8a7d6a] hidden md:table-cell">{b.checkIn} → {b.checkOut}</td>
                <td className="py-3 px-4 text-[#ede4d4]">${b.total}</td>
                <td className="py-3 px-4"><StatusBadge status={b.status} /></td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button onClick={() => setViewBooking(b)} className="text-[#8a7d6a] hover:text-[#c4954a] transition-colors"><Eye size={14} /></button>
                    <button onClick={() => deleteBooking(b.id)} className="text-[#8a7d6a] hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {viewBooking && (
        <ModalWrapper title={`Booking ${viewBooking.id}`} onClose={() => setViewBooking(null)}>
          <div className="space-y-3">
            {Object.entries(viewBooking).map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm border-b border-[rgba(196,149,74,0.06)] pb-2">
                <span className="font-['DM_Mono'] text-[#8a7d6a] text-xs tracking-widest uppercase">{k}</span>
                <span className="font-['Jost'] text-[#ede4d4] text-right max-w-[60%]">{String(v)}</span>
              </div>
            ))}
            <div className="pt-2">
              <label className={LABEL}>Update Status</label>
              <select className={INPUT} defaultValue={viewBooking.status} onChange={e => { updateStatus(viewBooking.id, e.target.value); setViewBooking({ ...viewBooking, status: e.target.value }); }}>
                {["Confirmed", "Checked In", "Checked Out", "Pending", "Cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
}

// ─────────────────────────── ADMIN APARTMENTS ────────────────────────────

function AdminApartments({ apartments, setApartments }: { apartments: any[]; setApartments: (a: any[]) => void }) {
  const [showForm, setShowForm] = useState(false);
  const emptySections = [
    { name: "Sitting Room", image: "", desc: "" },
    { name: "Master Bedroom", image: "", desc: "" },
    { name: "Bedroom 2", image: "", desc: "" },
    { name: "Bedroom 3", image: "", desc: "" },
    { name: "Kitchen", image: "", desc: "" },
    { name: "Balcony", image: "", desc: "" },
  ];
  const [form, setForm] = useState<any>({ name: "", type: "Classic", price: "", size: "", capacity: 6, view: "", status: "Available", image: "", description: "", amenities: "", sections: emptySections });
  const setF = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm((f: any) => ({ ...f, [k]: e.target.value }));
  const setSec = (i: number, k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const secs = [...form.sections];
    secs[i] = { ...secs[i], [k]: e.target.value };
    setForm((f: any) => ({ ...f, sections: secs }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newApt = {
      ...form, id: Date.now(), price: Number(form.price), capacity: Number(form.capacity),
      image: form.sections[0].image || form.image,
      amenities: form.amenities.split(",").map((s: string) => s.trim()).filter(Boolean),
      rating: 4.5, reviews: 0,
    };
    setApartments([...apartments, newApt]);
    setShowForm(false);
    setForm({ name: "", type: "Classic", price: "", size: "", capacity: 6, view: "", status: "Available", image: "", description: "", amenities: "", sections: emptySections });
    toast.success("Apartment added!");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4]">Apartments</h2>
        <button onClick={() => setShowForm(true)} className={`px-4 py-2.5 ${BTN_PRIMARY} flex items-center gap-2`}><Plus size={14} /> Add Apartment</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {apartments.map(apt => (
          <div key={apt.id} className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-4">
            <img src={apt.image} alt={apt.name} className="w-full h-32 object-cover mb-3" />
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-['Fraunces'] text-base text-[#ede4d4]">{apt.name}</h3>
              <RoomStatusBadge status={apt.status} />
            </div>
            <div className="text-xs font-['DM_Mono'] text-[#8a7d6a] flex flex-wrap gap-3 mb-3">
              <span>${apt.price}/night</span><span>{apt.type}</span><span>{apt.view}</span>
            </div>
            <div className="flex gap-2">
              <select className={INPUT + " text-xs py-1.5"} defaultValue={apt.status}
                onChange={e => setApartments(apartments.map(a => a.id === apt.id ? { ...a, status: e.target.value } : a))}>
                {["Available", "Occupied", "Maintenance"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <button onClick={() => setApartments(apartments.filter(a => a.id !== apt.id))} className="px-3 py-1.5 text-xs border border-red-900/50 text-red-400/70 hover:border-red-400 hover:text-red-400 transition-all font-['DM_Mono']"><Trash2 size={12} /></button>
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <ModalWrapper title="Add New Apartment" onClose={() => setShowForm(false)} wide>
          <form onSubmit={handleAdd} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Apartment Name"><input required value={form.name} onChange={setF("name")} className={INPUT} placeholder="The Premier Apartment" /></FormField>
              <FormField label="Type">
                <select required value={form.type} onChange={setF("type")} className={INPUT}>
                  {["Classic", "Premier", "Signature", "Executive", "Garden", "Penthouse"].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </FormField>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <FormField label="Price/Night ($)"><input required type="number" value={form.price} onChange={setF("price")} className={INPUT} placeholder="180" /></FormField>
              <FormField label="Size"><input value={form.size} onChange={setF("size")} className={INPUT} placeholder="120 m²" /></FormField>
              <FormField label="Capacity"><input type="number" value={form.capacity} onChange={setF("capacity")} className={INPUT} min={1} max={10} /></FormField>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="View"><input value={form.view} onChange={setF("view")} className={INPUT} placeholder="Pool View" /></FormField>
              <FormField label="Status">
                <select value={form.status} onChange={setF("status")} className={INPUT}>
                  {["Available", "Occupied", "Maintenance"].map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </FormField>
            </div>
            <FormField label="Description"><textarea required value={form.description} onChange={setF("description")} rows={2} className={INPUT + " resize-none"} placeholder="Apartment description..." /></FormField>
            <FormField label="Amenities (comma separated)"><input value={form.amenities} onChange={setF("amenities")} className={INPUT} placeholder="WiFi, AC, Kitchen, Balcony..." /></FormField>

            <div className="border-t border-[rgba(196,149,74,0.1)] pt-4">
              <label className={LABEL + " mb-3"}>Apartment Sections</label>
              <div className="space-y-4">
                {form.sections.map((sec: any, i: number) => (
                  <div key={i} className="bg-[#0c0a08] border border-[rgba(196,149,74,0.1)] p-4">
                    <p className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-3">{sec.name}</p>
                    <div className="space-y-2">
                      <FormField label="Image URL"><input value={sec.image} onChange={setSec(i, "image")} className={INPUT} placeholder={`Unsplash URL for ${sec.name}...`} /></FormField>
                      <FormField label="Description"><textarea value={sec.desc} onChange={setSec(i, "desc")} rows={2} className={INPUT + " resize-none"} placeholder={`Describe the ${sec.name}...`} /></FormField>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className={`flex-1 py-3 ${BTN_OUTLINE}`}>Cancel</button>
              <button type="submit" className={`flex-1 py-3 ${BTN_PRIMARY}`}>Add Apartment</button>
            </div>
          </form>
        </ModalWrapper>
      )}
    </div>
  );
}

// ─────────────────────────── ADMIN ORDERS ────────────────────────────

function AdminOrders({ orders, setOrders }: { orders: any[]; setOrders: (o: any[]) => void }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewOrder, setViewOrder] = useState<any>(null);

  const statuses = ["All", "Pending", "Preparing", "Served", "Delivered", "Cancelled"];
  const filtered = orders.filter(o =>
    (statusFilter === "All" || o.status === statusFilter) &&
    (o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()))
  );

  const updateStatus = (id: string, status: string) => setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  const deleteOrder = (id: string) => { setOrders(orders.filter(o => o.id !== id)); toast.success("Order deleted."); };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4]">Orders</h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders..." className={INPUT + " pl-9 text-xs w-full sm:w-52"} />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className={INPUT + " text-xs w-full sm:w-36"}>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-x-auto">
        <table className="w-full text-xs font-['DM_Mono']">
          <thead>
            <tr className="border-b border-[rgba(196,149,74,0.1)]">
              {["Order ID", "Customer", "Items", "Amount", "Date", "Status", "Actions"].map(h => (
                <th key={h} className="text-left py-3 px-4 text-[#8a7d6a] tracking-widest uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => (
              <tr key={o.id} className="border-b border-[rgba(196,149,74,0.06)] hover:bg-[rgba(196,149,74,0.03)]">
                <td className="py-3 px-4 text-[#c4954a]">{o.id}</td>
                <td className="py-3 px-4 text-[#ede4d4]">{o.customer}</td>
                <td className="py-3 px-4 text-[#8a7d6a] hidden lg:table-cell max-w-[200px] truncate">{o.items}</td>
                <td className="py-3 px-4 text-[#ede4d4]">${o.total}</td>
                <td className="py-3 px-4 text-[#8a7d6a] hidden md:table-cell">{o.date} {o.time}</td>
                <td className="py-3 px-4"><OrderStatusBadge status={o.status} /></td>
                <td className="py-3 px-4">
                  <div className="flex gap-2">
                    <button onClick={() => setViewOrder(o)} className="text-[#8a7d6a] hover:text-[#c4954a] transition-colors"><Eye size={14} /></button>
                    <button onClick={() => deleteOrder(o.id)} className="text-[#8a7d6a] hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-10 text-[#8a7d6a] font-['Jost'] text-sm">No orders found.</div>}
      </div>
      {viewOrder && (
        <ModalWrapper title={`Order ${viewOrder.id}`} onClose={() => setViewOrder(null)}>
          <div className="space-y-3">
            {[["Customer", viewOrder.customer], ["Email", viewOrder.email], ["Items", viewOrder.items], ["Amount", `$${viewOrder.total}`], ["Date", `${viewOrder.date} at ${viewOrder.time}`]].map(([k, v]) => (
              <div key={k} className="flex flex-col sm:flex-row sm:justify-between text-sm border-b border-[rgba(196,149,74,0.06)] pb-2">
                <span className="font-['DM_Mono'] text-[#8a7d6a] text-xs tracking-widest uppercase">{k}</span>
                <span className="font-['Jost'] text-[#ede4d4] sm:text-right mt-0.5">{v}</span>
              </div>
            ))}
            <div className="pt-2">
              <label className={LABEL}>Update Status</label>
              <select className={INPUT} defaultValue={viewOrder.status} onChange={e => { updateStatus(viewOrder.id, e.target.value); setViewOrder({ ...viewOrder, status: e.target.value }); }}>
                {["Pending", "Preparing", "Served", "Delivered", "Cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </ModalWrapper>
      )}
    </div>
  );
}

// ─────────────────────────── ADMIN MENU ────────────────────────────

function AdminMenu({ menuItems, setMenuItems }: { menuItems: any[]; setMenuItems: (m: any[]) => void }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", cat: "Breakfast", desc: "", price: "", img: "", available: true });
  const setF = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const item = { ...form, id: genRef("m"), price: Number(form.price) };
    setMenuItems([...menuItems, item]);
    setShowForm(false);
    setForm({ name: "", cat: "Breakfast", desc: "", price: "", img: "", available: true });
    toast.success("Menu item added!");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4]">Menu Items</h2>
        <button onClick={() => setShowForm(true)} className={`px-4 py-2.5 ${BTN_PRIMARY} flex items-center gap-2`}><Plus size={14} /> Add Item</button>
      </div>
      <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-x-auto">
        <table className="w-full text-xs font-['DM_Mono']">
          <thead><tr className="border-b border-[rgba(196,149,74,0.1)]">{["Name", "Category", "Price", "Available", "Actions"].map(h => <th key={h} className="text-left py-3 px-4 text-[#8a7d6a] tracking-widest uppercase">{h}</th>)}</tr></thead>
          <tbody>
            {menuItems.map(item => (
              <tr key={item.id} className="border-b border-[rgba(196,149,74,0.06)] hover:bg-[rgba(196,149,74,0.03)]">
                <td className="py-3 px-4 text-[#ede4d4]">{item.name}</td>
                <td className="py-3 px-4 text-[#8a7d6a]">{item.cat}</td>
                <td className="py-3 px-4 text-[#c4954a]">${item.price}</td>
                <td className="py-3 px-4">
                  <button onClick={() => setMenuItems(menuItems.map(m => m.id === item.id ? { ...m, available: !m.available } : m))}
                    className={`text-xs font-['DM_Mono'] px-2 py-0.5 border ${item.available ? "text-emerald-400 border-emerald-800" : "text-red-400 border-red-900"}`}>
                    {item.available ? "On" : "Off"}
                  </button>
                </td>
                <td className="py-3 px-4">
                  <button onClick={() => setMenuItems(menuItems.filter(m => m.id !== item.id))} className="text-[#8a7d6a] hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showForm && (
        <ModalWrapper title="Add Menu Item" onClose={() => setShowForm(false)}>
          <form onSubmit={handleAdd} className="space-y-4">
            <FormField label="Item Name"><input required value={form.name} onChange={setF("name")} className={INPUT} placeholder="Pan-Seared Sea Bass" /></FormField>
            <FormField label="Category">
              <select required value={form.cat} onChange={setF("cat")} className={INPUT}>
                {["Breakfast", "Lunch", "Dinner", "Drinks", "Desserts"].map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </FormField>
            <FormField label="Description"><textarea required value={form.desc} onChange={setF("desc")} rows={2} className={INPUT + " resize-none"} placeholder="Dish description..." /></FormField>
            <FormField label="Price ($)"><input required type="number" value={form.price} onChange={setF("price")} className={INPUT} placeholder="32" /></FormField>
            <FormField label="Image URL"><input value={form.img} onChange={setF("img")} className={INPUT} placeholder="https://images.unsplash.com/..." /></FormField>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => setShowForm(false)} className={`flex-1 py-3 ${BTN_OUTLINE}`}>Cancel</button>
              <button type="submit" className={`flex-1 py-3 ${BTN_PRIMARY}`}>Add Item</button>
            </div>
          </form>
        </ModalWrapper>
      )}
    </div>
  );
}

// ─────────────────────────── ADMIN GUESTS ────────────────────────────

function AdminGuests({ guests }: { guests: any[] }) {
  const [search, setSearch] = useState("");
  const [viewGuest, setViewGuest] = useState<any>(null);
  const filtered = guests.filter(g => g.name.toLowerCase().includes(search.toLowerCase()) || g.email.toLowerCase().includes(search.toLowerCase()));

  const tierColor: Record<string, string> = {
    Platinum: "text-[#ede4d4] border-[#ede4d4]/40",
    Gold: "text-[#c4954a] border-[rgba(196,149,74,0.4)]",
    Silver: "text-[#8a7d6a] border-[#8a7d6a]/40",
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4]">Guests</h2>
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search guests..." className={INPUT + " pl-9 text-xs"} />
        </div>
      </div>
      <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-x-auto">
        <table className="w-full text-xs font-['DM_Mono']">
          <thead><tr className="border-b border-[rgba(196,149,74,0.1)]">{["Name", "Email", "Stays", "Total Spend", "Tier", "Action"].map(h => <th key={h} className="text-left py-3 px-4 text-[#8a7d6a] tracking-widest uppercase">{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map(g => (
              <tr key={g.id} className="border-b border-[rgba(196,149,74,0.06)] hover:bg-[rgba(196,149,74,0.03)]">
                <td className="py-3 px-4 text-[#ede4d4]">{g.name}</td>
                <td className="py-3 px-4 text-[#8a7d6a] hidden sm:table-cell">{g.email}</td>
                <td className="py-3 px-4 text-[#ede4d4]">{g.stays}</td>
                <td className="py-3 px-4 text-[#c4954a]">${g.total.toLocaleString()}</td>
                <td className="py-3 px-4"><span className={`px-2 py-0.5 border text-[10px] ${tierColor[g.tier] ?? ""}`}>{g.tier}</span></td>
                <td className="py-3 px-4"><button onClick={() => setViewGuest(g)} className="text-[#8a7d6a] hover:text-[#c4954a] transition-colors"><Eye size={14} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {viewGuest && (
        <ModalWrapper title={viewGuest.name} onClose={() => setViewGuest(null)}>
          <div className="space-y-3">
            {Object.entries(viewGuest).map(([k, v]) => (
              <div key={k} className="flex justify-between text-sm border-b border-[rgba(196,149,74,0.06)] pb-2">
                <span className="font-['DM_Mono'] text-[#8a7d6a] text-xs tracking-widest uppercase">{k}</span>
                <span className="font-['Jost'] text-[#ede4d4] text-right">{String(v)}</span>
              </div>
            ))}
          </div>
        </ModalWrapper>
      )}
    </div>
  );
}

// ─────────────────────────── ADMIN REVIEWS ────────────────────────────

function AdminReviews({ reviews, setReviews }: { reviews: any[]; setReviews: (r: any[]) => void }) {
  const [search, setSearch] = useState("");
  const filtered = reviews.filter(r => r.user.toLowerCase().includes(search.toLowerCase()) || r.apartment.toLowerCase().includes(search.toLowerCase()));

  const deleteReview = (id: string) => { setReviews(reviews.filter(r => r.id !== id)); toast.success("Review deleted."); };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4]">Guest Reviews</h2>
        <div className="relative w-full sm:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search reviews..." className={INPUT + " pl-9 text-xs"} />
        </div>
      </div>
      <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-x-auto">
        <table className="w-full text-xs font-['DM_Mono']">
          <thead>
            <tr className="border-b border-[rgba(196,149,74,0.1)]">
              {["Guest", "Apartment", "Rating", "Comment", "Date", "Actions"].map(h => (
                <th key={h} className="text-left py-3 px-4 text-[#8a7d6a] tracking-widest uppercase">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} className="border-b border-[rgba(196,149,74,0.06)] hover:bg-[rgba(196,149,74,0.03)]">
                <td className="py-3 px-4 text-[#ede4d4]">{r.user}</td>
                <td className="py-3 px-4 text-[#8a7d6a] hidden sm:table-cell">{r.apartment}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill={i <= r.rating ? gold : "transparent"} color={i <= r.rating ? gold : "#6b6052"} />)}
                  </div>
                </td>
                <td className="py-3 px-4 text-[#8a7d6a] hidden lg:table-cell max-w-[240px] truncate">{r.comment}</td>
                <td className="py-3 px-4 text-[#8a7d6a] hidden md:table-cell">{r.date}</td>
                <td className="py-3 px-4">
                  <button onClick={() => deleteReview(r.id)} className="text-[#8a7d6a] hover:text-red-400 transition-colors" title="Delete review"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="text-center py-10 text-[#8a7d6a] font-['Jost'] text-sm">No reviews found.</div>}
      </div>
      //Review cards for mobile 
      <div className="mt-4 space-y-3 lg:hidden">
        {filtered.map(r => (
          <div key={r.id + "card"} className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-sm font-['Jost'] text-[#ede4d4]">{r.user}</p>
                <p className="text-xs font-['DM_Mono'] text-[#8a7d6a]">{r.apartment}</p>
              </div>
              <button onClick={() => deleteReview(r.id)} className="text-[#8a7d6a] hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
            </div>
            <div className="flex gap-0.5 mb-2">{[1, 2, 3, 4, 5].map(i => <Star key={i} size={11} fill={i <= r.rating ? gold : "transparent"} color={i <= r.rating ? gold : "#6b6052"} />)}</div>
            <p className="text-xs font-['Jost'] text-[#8a7d6a] leading-relaxed">{r.comment}</p>
            <p className="text-[10px] font-['DM_Mono'] text-[#8a7d6a]/50 mt-2">{r.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────── ADMIN SETTINGS ────────────────────────────

function AdminSettings() {
  const [settings, setSettings] = useState({
    hotelName: "Cedar Court Serviced Apartments",
    email: "hello@cedarcourt.ng",
    phone: "+234 1 700 2000",
    address: "14 Bourdillon Road, Ikoyi, Lagos, Nigeria",
    checkInTime: "14:00",
    checkOutTime: "12:00",
    currency: "USD",
    taxRate: "10",
    maintenanceMode: false,
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setSettings(s => ({ ...s, [k]: e.target.value }));

  return (
    <div>
      <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-6">Settings</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-6 space-y-4">
          <h3 className="font-['Fraunces'] text-lg text-[#ede4d4] mb-2">Property Details</h3>
          <FormField label="Property Name"><input value={settings.hotelName} onChange={set("hotelName")} className={INPUT} /></FormField>
          <FormField label="Email"><input type="email" value={settings.email} onChange={set("email")} className={INPUT} /></FormField>
          <FormField label="Phone"><input value={settings.phone} onChange={set("phone")} className={INPUT} /></FormField>
          <FormField label="Address"><input value={settings.address} onChange={set("address")} className={INPUT} /></FormField>
        </div>
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-6 space-y-4">
          <h3 className="font-['Fraunces'] text-lg text-[#ede4d4] mb-2">Operations</h3>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="Check-in Time"><input type="time" value={settings.checkInTime} onChange={set("checkInTime")} className={INPUT} /></FormField>
            <FormField label="Check-out Time"><input type="time" value={settings.checkOutTime} onChange={set("checkOutTime")} className={INPUT} /></FormField>
          </div>
          <FormField label="Currency">
            <select value={settings.currency} onChange={set("currency")} className={INPUT}>
              {["USD", "NGN", "GBP", "EUR"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </FormField>
          <FormField label="Service Charge (%)"><input type="number" value={settings.taxRate} onChange={set("taxRate")} className={INPUT} /></FormField>
          <div className="flex items-center justify-between py-2 border-t border-[rgba(196,149,74,0.1)] mt-2">
            <div>
              <p className="text-sm font-['Jost'] text-[#ede4d4]">Maintenance Mode</p>
              <p className="text-xs font-['DM_Mono'] text-[#8a7d6a]">Disable booking from the website</p>
            </div>
            <button onClick={() => setSettings(s => ({ ...s, maintenanceMode: !s.maintenanceMode }))}
              className={`w-12 h-6 border flex items-center px-0.5 transition-all ${settings.maintenanceMode ? "bg-[rgba(196,149,74,0.2)] border-[#c4954a] justify-end" : "border-[rgba(196,149,74,0.2)] justify-start"}`}>
              <div className={`w-4 h-4 transition-colors ${settings.maintenanceMode ? "bg-[#c4954a]" : "bg-[#8a7d6a]"}`} />
            </button>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button onClick={() => toast.success("Settings saved!")} className={`px-8 py-3.5 ${BTN_PRIMARY}`}>Save Settings</button>
      </div>
    </div>
  );
}

// ─────────────────────────── ADMIN LOGIN ────────────────────────────

function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("admin@cedarcourt.co.uk");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email === "admin@cedarcourt.co.uk" && password === "admin123") {
        onLogin(); toast.success("Welcome, Admin.");
      } else {
        setError("Invalid admin credentials.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8"><CedarLogo /></div>
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.2)] p-8">
          <SectionLabel text="Administration" />
          <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-6">Admin Sign In</h2>
          {error && <div className="bg-red-900/20 border border-red-800/50 text-red-400 text-xs font-['DM_Mono'] p-3 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Email"><input type="email" required value={email} onChange={e => setEmail(e.target.value)} className={INPUT} placeholder="admin@cedarcourt.co.uk" /></FormField>
            <FormField label="Password"><input type="password" required value={password} onChange={e => setPassword(e.target.value)} className={INPUT} placeholder="••••••••" /></FormField>
            <button type="submit" disabled={loading} className={`w-full py-3.5 mt-2 ${BTN_PRIMARY} disabled:opacity-60 flex items-center justify-center gap-2`}>
              <Lock size={14} /> {loading ? "Signing in..." : "Access Dashboard"}
            </button>
          </form>
          <p className="text-center text-xs font-['DM_Mono'] text-[#8a7d6a] mt-4">Demo: admin@cedarcourt.co.uk / admin123</p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── MAIN APP ────────────────────────────

export default function App() {
  const [view, setView] = useState<"user" | "admin-login" | "admin">("user");
  const [page, setPage] = useState("home");
  const [adminPage, setAdminPage] = useState("dashboard");
  const [selectedApartment, setSelectedApartment] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [authUser, setAuthUser] = useState<any>(null);
  const [authModal, setAuthModal] = useState<"none" | "login" | "register">("none");
  const [registeredUsers, setRegisteredUsers] = useState([
    { id: "U001", firstName: "Victoria", lastName: "Ashworth", email: "victoria@cedarcourt.co.uk", password: "guest123" },
  ]);
  const [checkout, setCheckout] = useState<{ type: "none" | "restaurant" | "apartment"; data?: any }>({ type: "none" });
  const [confirmation, setConfirmation] = useState<any>(null);
  const [bookings, setBookings] = useState([...DEFAULT_BOOKINGS]);
  const [apartments, setApartments] = useState([...DEFAULT_APARTMENTS]);
  const [menuItems, setMenuItems] = useState([...DEFAULT_MENU]);
  const [guests, setGuests] = useState([...DEFAULT_GUESTS]);
  const [orders, setOrders] = useState([...DEFAULT_ORDERS]);
  const [reviews, setReviews] = useState([...DEFAULT_REVIEWS]);

  const cartCount = cartItems.reduce((s, i) => s + i.qty, 0);

  const addToCart = (item: any) => {
    setCartItems(c => {
      const ex = c.find(x => x.id === item.id);
      if (ex) return c.map(x => x.id === item.id ? { ...x, qty: x.qty + 1 } : x);
      return [...c, { ...item, qty: 1 }];
    });
    toast.success(`${item.name} added to order!`);
  };

  const removeFromCart = (id: string) => setCartItems(c => c.filter(x => x.id !== id));
  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setCartItems(c => c.map(x => x.id === id ? { ...x, qty } : x));
  };

  const handleRestaurantCheckout = () => {
    if (!authUser) { setAuthModal("login"); return; }
    setCheckout({ type: "restaurant" });
  };

  const handleRestaurantComplete = (ref: string, data: any) => {
    const newOrder = {
      id: ref,
      customer: data.details?.name ?? authUser?.firstName + " " + (authUser?.lastName ?? ""),
      email: authUser?.email ?? "",
      items: data.items.map((i: any) => `${i.name} × ${i.qty}`).join(", "),
      total: Math.round(data.total),
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      status: "Pending",
    };
    setOrders(prev => [newOrder, ...prev]);
    setCartItems([]);
    setCheckout({ type: "none" });
    setConfirmation({ type: "restaurant", ref, ...data });
    setPage("confirmation");
    toast.success(`Order placed! Ref: ${ref}`);
  };

  const handleApartmentBook = (bookingData: any) => {
    if (!authUser) { setAuthModal("login"); return; }
    setCheckout({ type: "apartment", data: bookingData });
  };

  const handleApartmentComplete = (ref: string, data: any) => {
    const newBooking = {
      id: ref,
      guest: `${data.details?.firstName ?? authUser.firstName} ${data.details?.lastName ?? authUser.lastName}`,
      email: data.details?.email ?? authUser.email,
      room: data.apartment.name,
      roomId: data.apartment.id,
      checkIn: data.checkIn || new Date().toISOString().split("T")[0],
      checkOut: "",
      nights: data.nights,
      total: data.total,
      status: "Confirmed",
      guests: data.guests,
      special: data.details?.special ?? "",
    };
    setBookings(prev => [newBooking, ...prev]);
    setCheckout({ type: "none" });
    setConfirmation({ ...data, ref, type: "apartment" });
    setPage("confirmation");
    toast.success(`Booking confirmed! ${ref}`);
  };

  const handleAddReview = (review: any) => {
    setReviews(prev => [review, ...prev]);
  };

  // Admin view
  if (view === "admin-login") {
    return (
      <>
        <Toaster position="top-right" theme="dark" richColors />
        <AdminLogin onLogin={() => setView("admin")} />
        <div className="fixed bottom-4 right-4">
          <button onClick={() => setView("user")} className={`px-4 py-2 ${BTN_OUTLINE} text-xs`}>← Back to Website</button>
        </div>
      </>
    );
  }

  if (view === "admin") {
    return (
      <>
        <Toaster position="top-right" theme="dark" richColors />
        <AdminLayout adminPage={adminPage} setAdminPage={setAdminPage} onLogout={() => setView("user")}>
          {adminPage === "dashboard" && <AdminDashboard bookings={bookings} apartments={apartments} orders={orders} reviews={reviews} />}
          {adminPage === "bookings" && <AdminBookings bookings={bookings} setBookings={setBookings} />}
          {adminPage === "apartments" && <AdminApartments apartments={apartments} setApartments={setApartments} />}
          {adminPage === "orders" && <AdminOrders orders={orders} setOrders={setOrders} />}
          {adminPage === "menu" && <AdminMenu menuItems={menuItems} setMenuItems={setMenuItems} />}
          {adminPage === "guests" && <AdminGuests guests={guests} />}
          {adminPage === "reviews" && <AdminReviews reviews={reviews} setReviews={setReviews} />}
          {adminPage === "settings" && <AdminSettings />}
        </AdminLayout>
      </>
    );
  }

  // Restaurant checkout flow
  if (checkout.type === "restaurant") {
    return (
      <>
        <Toaster position="top-right" theme="dark" richColors />
        <RestaurantCheckout items={cartItems} onComplete={handleRestaurantComplete} onCancel={() => setCheckout({ type: "none" })} />
      </>
    );
  }

  // Apartment booking checkout flow
  if (checkout.type === "apartment" && checkout.data) {
    return (
      <>
        <Toaster position="top-right" theme="dark" richColors />
        <BookingCheckout bookingData={checkout.data} onComplete={handleApartmentComplete} onCancel={() => setCheckout({ type: "none" })} />
      </>
    );
  }

  // Main user view
  return (
    <div className="bg-[#0c0a08] min-h-screen">
      <Toaster position="top-right" theme="dark" richColors />

      <Header
        page={page} setPage={setPage} cartCount={cartCount}
        setCartOpen={setCartOpen} authUser={authUser}
        setAuthModal={setAuthModal} onLogout={() => setAuthUser(null)}
      />

      <CartSlideout
        isOpen={cartOpen} setIsOpen={setCartOpen}
        items={cartItems} removeItem={removeFromCart} updateQty={updateQty}
        onCheckout={handleRestaurantCheckout}
      />

      {authModal !== "none" && (
        <AuthModal
          mode={authModal} setMode={setAuthModal}
          onClose={() => setAuthModal("none")}
          onLogin={user => { setAuthUser(user); setAuthModal("none"); }}
          registeredUsers={registeredUsers} setRegisteredUsers={setRegisteredUsers}
        />
      )}

      //Pages
      {page === "home" && (
        <>
          <HomePage setPage={setPage} setSelectedApartment={setSelectedApartment} apartments={apartments} />
          <Footer setPage={setPage} />
        </>
      )}

      {page === "apartments" && (
        <>
          <ApartmentsPage apartments={apartments} setSelectedApartment={setSelectedApartment} setPage={setPage} />
          <Footer setPage={setPage} />
        </>
      )}

      {page === "apartment-detail" && selectedApartment && (
        <>
          <ApartmentDetailPage apartment={selectedApartment} onBook={handleApartmentBook} setPage={setPage} />
          <Footer setPage={setPage} />
        </>
      )}

      {page === "menu" && (
        <>
          <MenuPage menuItems={menuItems} cartItems={cartItems} addToCart={addToCart} />
          <Footer setPage={setPage} />
        </>
      )}

      {page === "gallery" && (
        <>
          <GalleryPage />
          <Footer setPage={setPage} />
        </>
      )}

      {page === "about" && (
        <>
          <AboutPage setPage={setPage} />
          <Footer setPage={setPage} />
        </>
      )}

      {page === "contact" && (
        <>
          <ContactPage />
          <Footer setPage={setPage} />
        </>
      )}

      {page === "confirmation" && confirmation && (
        <ConfirmationPage confirmation={confirmation} setPage={setPage} onAddReview={handleAddReview} />
      )}

      {page === "my-bookings" && (
        <>
          <MyBookingsPage bookings={bookings} authUser={authUser} />
          <Footer setPage={setPage} />
        </>
      )}

      {page === "profile" && authUser && (
        <>
          <ProfilePage authUser={authUser} />
          <Footer setPage={setPage} />
        </>
      )}

      //Admin button
      <div className="fixed bottom-4 right-4 z-30">
        <button onClick={() => setView("admin-login")} className="px-3 py-2 text-[10px] font-['DM_Mono'] text-[#8a7d6a] border border-[rgba(196,149,74,0.15)] hover:text-[#c4954a] hover:border-[rgba(196,149,74,0.4)] transition-all tracking-widest">ADMIN</button>
      </div>
    </div>
  );
}    
*/}