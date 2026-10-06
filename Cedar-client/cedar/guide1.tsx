{/*

import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, Bell, User, Menu, X, ChevronRight, ChevronLeft, Star,
  MapPin, Phone, Mail, Clock, Wifi, Car, Coffee, Dumbbell, Waves,
  Calendar, Users, Search, Plus, Minus, Edit2, Trash2,
  LayoutDashboard, BedDouble, UtensilsCrossed, LogOut, ArrowRight,
  Award, TrendingUp, Lock, CheckCircle, Instagram, Twitter, Facebook,
  Eye, Leaf, Globe, CreditCard, Shield, AlertTriangle, Settings,
  ChevronDown, BarChart2, FileText, UserCheck, RefreshCw, Download,
  Toggle, Check, EyeOff, Home, Utensils, Image, Info, Heart,
  PieChart, Activity
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart as RechartsPie, Pie, Cell, Legend
} from "recharts";
import { Toaster, toast } from "sonner";

// ─────────────────────────── CONSTANTS ───────────────────────────  

const gold = "#c4954a";
const bg = "#0c0a08";
const card = "#161310";
const darker = "#0a0806";
const textPrimary = "#ede4d4";
const textMuted = "#8a7d6a";
const borderGold = "rgba(196,149,74,0.15)";
const borderGoldHover = "rgba(196,149,74,0.4)";

const INPUT = "w-full bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-4 py-3 text-sm font-['Jost'] text-[#ede4d4] focus:outline-none focus:border-[#c4954a] placeholder-[#8a7d6a]/40 transition-colors";
const LABEL = "text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase block mb-1.5";
const BTN_PRIMARY = "bg-[#c4954a] text-[#0c0a08] font-['Jost'] font-semibold text-sm tracking-widest uppercase hover:bg-[#d4a55a] transition-colors";
const BTN_OUTLINE = "border border-[rgba(196,149,74,0.3)] text-[#ede4d4] font-['Jost'] text-sm tracking-widest uppercase hover:border-[#c4954a] hover:text-[#c4954a] transition-all";

// ─────────────────────────── DEFAULT DATA ────────────────────────────

const DEFAULT_ROOMS = [
  { id: 1, name: "Deluxe Room", type: "Deluxe", price: 280, size: "35 m²", capacity: 2, view: "City View", status: "Available",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=560&fit=crop&auto=format",
    gallery: ["https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&h=700&fit=crop&auto=format","https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=700&fit=crop&auto=format"],
    amenities: ["King Bed", "Free WiFi", "Minibar", "Flat-screen TV", "En-suite Bathroom", "Air Conditioning"],
    description: "Elegantly appointed with warm tones and bespoke furnishings, our Deluxe Room offers a refined retreat. Floor-to-ceiling windows frame sweeping city views while hand-picked art creates a sense of place.",
    rating: 4.8, reviews: 124 },
  { id: 2, name: "Executive Suite", type: "Suite", price: 450, size: "65 m²", capacity: 2, view: "Garden View", status: "Available",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=560&fit=crop&auto=format",
    gallery: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=700&fit=crop&auto=format","https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200&h=700&fit=crop&auto=format"],
    amenities: ["King Bed", "Separate Living Area", "Free WiFi", "Minibar", "Bathtub & Rain Shower", "Butler Service"],
    description: "The Executive Suite redefines indulgence. A separate living area, private butler service, and curated art collection make this the choice of discerning travellers.",
    rating: 4.9, reviews: 87 },
  { id: 3, name: "Presidential Suite", type: "Presidential", price: 850, size: "120 m²", capacity: 4, view: "Panoramic View", status: "Occupied",
    image: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=800&h=560&fit=crop&auto=format",
    gallery: ["https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1200&h=700&fit=crop&auto=format","https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&h=700&fit=crop&auto=format"],
    amenities: ["2 King Bedrooms", "Grand Living Room", "Private Dining", "Dedicated Butler", "Private Terrace", "Bespoke Amenities"],
    description: "The pinnacle of luxury at Cedar Court. Our Presidential Suite commands panoramic views from a private terrace, with a grand living room and dedicated butler service.",
    rating: 5.0, reviews: 34 },
  { id: 4, name: "Garden Villa", type: "Villa", price: 1200, size: "180 m²", capacity: 4, view: "Private Garden & Pool", status: "Available",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=560&fit=crop&auto=format",
    gallery: ["https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&h=700&fit=crop&auto=format","https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=1200&h=700&fit=crop&auto=format"],
    amenities: ["Private Pool", "2 Bedrooms", "Full Kitchen", "Private Butler", "Garden Terrace", "Outdoor Dining"],
    description: "A secluded garden villa with your own heated pool and lush private gardens. A dedicated villa host creates a genuinely residential sanctuary.",
    rating: 5.0, reviews: 21 },
  { id: 5, name: "Junior Suite", type: "Suite", price: 380, size: "50 m²", capacity: 2, view: "Pool View", status: "Available",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&h=560&fit=crop&auto=format",
    gallery: ["https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&h=700&fit=crop&auto=format","https://images.unsplash.com/photo-1549294413-26f195200c16?w=1200&h=700&fit=crop&auto=format"],
    amenities: ["King Bed", "Sitting Area", "Free WiFi", "Walk-in Closet", "Spa Bath", "Pool Access"],
    description: "Wake to serene pool views from your Junior Suite. A generous sitting area and spa-inspired bathroom make this suite a favourite for special occasions.",
    rating: 4.7, reviews: 156 },
  { id: 6, name: "Classic Room", type: "Classic", price: 220, size: "28 m²", capacity: 2, view: "Courtyard View", status: "Maintenance",
    image: "https://images.unsplash.com/photo-1702814160779-4a88cfb330c7?w=800&h=560&fit=crop&auto=format",
    gallery: ["https://images.unsplash.com/photo-1702814160779-4a88cfb330c7?w=1200&h=700&fit=crop&auto=format","https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=1200&h=700&fit=crop&auto=format"],
    amenities: ["Queen Bed", "Free WiFi", "Work Desk", "Flat-screen TV", "En-suite Bathroom"],
    description: "Thoughtfully designed for the well-travelled guest who values comfort and craft over excess. The Classic Room is Cedar Court distilled to its warm, welcoming essence.",
    rating: 4.6, reviews: 203 },
];

const DEFAULT_MENU = [
  { id: "m1", cat: "Breakfast", name: "Cedar Court Eggs Benedict", desc: "Free-range eggs, smoked salmon, hollandaise, sourdough", price: 24, available: true, img: "https://images.unsplash.com/photo-1513772457252-c0417654a2a0?w=400&h=280&fit=crop&auto=format" },
  { id: "m2", cat: "Breakfast", name: "Avocado & Burrata Toast", desc: "Heritage tomatoes, micro herbs, chilli flakes, cold-pressed olive oil", price: 18, available: true, img: "https://images.unsplash.com/photo-1723437515844-fd3cb91ef1df?w=400&h=280&fit=crop&auto=format" },
  { id: "m3", cat: "Breakfast", name: "Full Cedar Breakfast", desc: "Wagyu sausages, smoked bacon, eggs your way, grilled tomato", price: 32, available: true, img: "https://images.unsplash.com/photo-1513772457252-c0417654a2a0?w=400&h=280&fit=crop&auto=format" },
  { id: "m4", cat: "Breakfast", name: "Seasonal Fruit Platter", desc: "Hand-selected seasonal fruits, honey yoghurt, granola, bee pollen", price: 16, available: true, img: "https://images.unsplash.com/photo-1750943041213-db8328856b48?w=400&h=280&fit=crop&auto=format" },
  { id: "m5", cat: "Lunch", name: "Pan-Seared Sea Bass", desc: "Saffron beurre blanc, samphire, roasted fennel, caperberries", price: 38, available: true, img: "https://images.unsplash.com/photo-1750943041213-db8328856b48?w=400&h=280&fit=crop&auto=format" },
  { id: "m6", cat: "Lunch", name: "Wagyu Beef Burger", desc: "200g wagyu patty, aged cheddar, truffle aioli, brioche, hand-cut fries", price: 34, available: true, img: "https://images.unsplash.com/photo-1723437515844-fd3cb91ef1df?w=400&h=280&fit=crop&auto=format" },
  { id: "m7", cat: "Lunch", name: "Heritage Tomato Salad", desc: "Burrata, basil oil, aged balsamic, fleur de sel, toasted pine nuts", price: 22, available: true, img: "https://images.unsplash.com/photo-1513772457252-c0417654a2a0?w=400&h=280&fit=crop&auto=format" },
  { id: "m8", cat: "Lunch", name: "Black Truffle Risotto", desc: "Carnaroli rice, black truffle, aged parmesan, chive oil", price: 42, available: true, img: "https://images.unsplash.com/photo-1750943041213-db8328856b48?w=400&h=280&fit=crop&auto=format" },
  { id: "m9", cat: "Dinner", name: "A5 Wagyu Striploin", desc: "200g A5 wagyu, bone marrow butter, triple-cooked chips, watercress", price: 95, available: true, img: "https://images.unsplash.com/photo-1750943041213-db8328856b48?w=400&h=280&fit=crop&auto=format" },
  { id: "m10", cat: "Dinner", name: "Whole Roasted Duck", desc: "Citrus glaze, cherry jus, dauphinoise potato, braised red cabbage", price: 72, available: true, img: "https://images.unsplash.com/photo-1723437515844-fd3cb91ef1df?w=400&h=280&fit=crop&auto=format" },
  { id: "m11", cat: "Dinner", name: "Lobster Thermidor", desc: "Half Nova Scotia lobster, gruyere, cognac cream, pomme puree", price: 88, available: true, img: "https://images.unsplash.com/photo-1513772457252-c0417654a2a0?w=400&h=280&fit=crop&auto=format" },
  { id: "m12", cat: "Dinner", name: "Tasting Menu", desc: "Seven-course chef selection, wine flight available on request", price: 145, available: true, img: "https://images.unsplash.com/photo-1750943041213-db8328856b48?w=400&h=280&fit=crop&auto=format" },
  { id: "m13", cat: "Drinks", name: "Cedar Court Signature", desc: "Aged rum, coconut, pineapple shrub, lime, smoked paprika foam", price: 18, available: true, img: "https://images.unsplash.com/photo-1702814160779-4a88cfb330c7?w=400&h=280&fit=crop&auto=format" },
  { id: "m14", cat: "Drinks", name: "Dom Perignon 2015", desc: "Vintage champagne by the glass, from our private cellar", price: 45, available: true, img: "https://images.unsplash.com/photo-1513772457252-c0417654a2a0?w=400&h=280&fit=crop&auto=format" },
  { id: "m15", cat: "Drinks", name: "18-Year Single Malt", desc: "Curated expressions from our whisky library, sommelier recommended", price: 28, available: true, img: "https://images.unsplash.com/photo-1702814160779-4a88cfb330c7?w=400&h=280&fit=crop&auto=format" },
  { id: "m16", cat: "Desserts", name: "Valrhona Chocolate Souffle", desc: "70% dark chocolate, vanilla creme anglaise, gold leaf", price: 22, available: true, img: "https://images.unsplash.com/photo-1750943041213-db8328856b48?w=400&h=280&fit=crop&auto=format" },
  { id: "m17", cat: "Desserts", name: "Classic Creme Brulee", desc: "Tahitian vanilla, caramelised sugar, seasonal berries", price: 16, available: true, img: "https://images.unsplash.com/photo-1513772457252-c0417654a2a0?w=400&h=280&fit=crop&auto=format" },
  { id: "m18", cat: "Desserts", name: "Artisan Cheese Board", desc: "Five cheeses, quince jelly, house-made crackers, fresh grapes", price: 28, available: true, img: "https://images.unsplash.com/photo-1723437515844-fd3cb91ef1df?w=400&h=280&fit=crop&auto=format" },
];

const DEFAULT_BOOKINGS = [
  { id: "BK-2841", guest: "Victoria Ashworth", email: "v.ashworth@email.com", room: "Presidential Suite", roomId: 3, checkIn: "2026-07-12", checkOut: "2026-07-16", nights: 4, total: 3400, status: "Confirmed", guests: 2, special: "Anniversary celebration, champagne on arrival" },
  { id: "BK-2840", guest: "James Laurent", email: "james@laurent.fr", room: "Garden Villa", roomId: 4, checkIn: "2026-07-10", checkOut: "2026-07-17", nights: 7, total: 8400, status: "Checked In", guests: 2, special: "Honeymoon package" },
  { id: "BK-2839", guest: "Michael Chen", email: "m.chen@chen.hk", room: "Executive Suite", roomId: 2, checkIn: "2026-07-08", checkOut: "2026-07-10", nights: 2, total: 900, status: "Checked Out", guests: 1, special: "" },
  { id: "BK-2838", guest: "Claire Beaumont", email: "claire.b@beaumont.com", room: "Deluxe Room", roomId: 1, checkIn: "2026-07-15", checkOut: "2026-07-18", nights: 3, total: 840, status: "Confirmed", guests: 2, special: "Late checkout requested" },
  { id: "BK-2837", guest: "Oliver Whitfield", email: "o.whitfield@corp.uk", room: "Junior Suite", roomId: 5, checkIn: "2026-07-09", checkOut: "2026-07-11", nights: 2, total: 760, status: "Checked In", guests: 1, special: "Business stay, early breakfast" },
  { id: "BK-2836", guest: "Amara Osei", email: "amara.o@ama.gh", room: "Classic Room", roomId: 6, checkIn: "2026-07-14", checkOut: "2026-07-16", nights: 2, total: 440, status: "Pending", guests: 2, special: "" },
  { id: "BK-2835", guest: "Hiroshi Tanaka", email: "h.tanaka@tanaka.jp", room: "Deluxe Room", roomId: 1, checkIn: "2026-07-20", checkOut: "2026-07-23", nights: 3, total: 840, status: "Confirmed", guests: 2, special: "" },
  { id: "BK-2834", guest: "Isabella Greco", email: "isabella@greco.it", room: "Executive Suite", roomId: 2, checkIn: "2026-07-25", checkOut: "2026-07-28", nights: 3, total: 1350, status: "Confirmed", guests: 2, special: "Dietary: vegetarian" },
];

const DEFAULT_GUESTS = [
  { id: "G-001", name: "Victoria Ashworth", email: "v.ashworth@email.com", phone: "+44 7700 123456", stays: 12, total: 28400, tier: "Platinum", lastStay: "2026-07-12", nationality: "British", notes: "Prefers corner suites, allergic to feather pillows" },
  { id: "G-002", name: "James Laurent", email: "james@laurent.fr", phone: "+33 6 12 34 56 78", stays: 7, total: 16800, tier: "Gold", lastStay: "2026-07-10", nationality: "French", notes: "Honeymooning, champagne on arrival always appreciated" },
  { id: "G-003", name: "Michael Chen", email: "m.chen@chen.hk", phone: "+852 9000 1234", stays: 4, total: 8200, tier: "Gold", lastStay: "2026-07-08", nationality: "Hong Kong", notes: "Business traveller, early breakfast, quiet room" },
  { id: "G-004", name: "Claire Beaumont", email: "claire.b@beaumont.com", phone: "+44 7711 234567", stays: 2, total: 2400, tier: "Silver", lastStay: "2026-06-20", nationality: "British", notes: "" },
  { id: "G-005", name: "Oliver Whitfield", email: "o.whitfield@corp.uk", phone: "+44 7722 345678", stays: 8, total: 14600, tier: "Gold", lastStay: "2026-07-09", nationality: "British", notes: "Corporate account, always requires invoice" },
  { id: "G-006", name: "Amara Osei", email: "amara.o@ama.gh", phone: "+233 20 123 4567", stays: 1, total: 440, tier: "Silver", lastStay: "2026-07-14", nationality: "Ghanaian", notes: "" },
  { id: "G-007", name: "Hiroshi Tanaka", email: "h.tanaka@tanaka.jp", phone: "+81 90 1234 5678", stays: 3, total: 2520, tier: "Silver", lastStay: "2026-06-15", nationality: "Japanese", notes: "Prefers Japanese toiletries if available" },
  { id: "G-008", name: "Isabella Greco", email: "isabella@greco.it", phone: "+39 347 123 4567", stays: 5, total: 6750, tier: "Gold", lastStay: "2026-05-22", nationality: "Italian", notes: "Vegetarian, loves the tasting menu" },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 42000, bookings: 124, occupancy: 71 },
  { month: "Feb", revenue: 38500, bookings: 108, occupancy: 64 },
  { month: "Mar", revenue: 54200, bookings: 156, occupancy: 76 },
  { month: "Apr", revenue: 67800, bookings: 198, occupancy: 82 },
  { month: "May", revenue: 74100, bookings: 224, occupancy: 85 },
  { month: "Jun", revenue: 89300, bookings: 267, occupancy: 91 },
  { month: "Jul", revenue: 95400, bookings: 289, occupancy: 87 },
];

const ROOM_TYPE_DATA = [
  { name: "Classic", value: 203, color: "#8a7d6a" },
  { name: "Deluxe", value: 327, color: "#c4954a" },
  { name: "Suite", value: 243, color: "#d4a55a" },
  { name: "Presidential", value: 34, color: "#ede4d4" },
  { name: "Villa", value: 21, color: "#6b6052" },
];

const TESTIMONIALS = [
  { id: 1, name: "Victoria Ashworth", role: "Business Executive", rating: 5, text: "Cedar Court has become my home away from home. The staff anticipate your every need before you even know you have one. The Presidential Suite is an experience unlike any other.", initials: "VA" },
  { id: 2, name: "James & Sophie Laurent", role: "Honeymooners", rating: 5, text: "We chose Cedar Court for our honeymoon and were utterly enchanted. The Garden Villa, the private dining, the sunset cocktails — every moment felt crafted just for us.", initials: "JL" },
  { id: 3, name: "Dr. Michael Chen", role: "Returning Guest", rating: 5, text: "Four visits and counting. The consistency of excellence here is what sets Cedar Court apart. The restaurant alone would earn five stars — the tasting menu is extraordinary.", initials: "MC" },
];

const GALLERY_IMAGES = [
  { id: 1, url: "https://images.unsplash.com/photo-1637730827702-de34e9ae4ede?w=600&h=400&fit=crop&auto=format", alt: "Hotel dining room", cat: "Dining" },
  { id: 2, url: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&h=800&fit=crop&auto=format", alt: "Luxury bedroom", cat: "Rooms" },
  { id: 3, url: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&h=500&fit=crop&auto=format", alt: "Infinity pool", cat: "Amenities" },
  { id: 4, url: "https://images.unsplash.com/photo-1776993298456-98c71c0e177e?w=600&h=400&fit=crop&auto=format", alt: "Restaurant dining", cat: "Dining" },
  { id: 5, url: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=500&fit=crop&auto=format", alt: "Suite bedroom", cat: "Rooms" },
  { id: 6, url: "https://images.unsplash.com/photo-1702814160779-4a88cfb330c7?w=600&h=400&fit=crop&auto=format", alt: "Bar and lounge", cat: "Dining" },
  { id: 7, url: "https://images.unsplash.com/photo-1549294413-26f195200c16?w=600&h=800&fit=crop&auto=format", alt: "Pool area", cat: "Amenities" },
  { id: 8, url: "https://images.unsplash.com/photo-1750943041213-db8328856b48?w=600&h=400&fit=crop&auto=format", alt: "Fine dining dish", cat: "Dining" },
  { id: 9, url: "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=600&h=400&fit=crop&auto=format", alt: "Premium suite", cat: "Rooms" },
  { id: 10, url: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&h=600&fit=crop&auto=format", alt: "Villa bedroom", cat: "Rooms" },
  { id: 11, url: "https://images.unsplash.com/photo-1723437515844-fd3cb91ef1df?w=600&h=400&fit=crop&auto=format", alt: "Restaurant menu", cat: "Dining" },
  { id: 12, url: "https://images.unsplash.com/photo-1610641818989-c2051b5e2cfd?w=800&h=500&fit=crop&auto=format", alt: "Pool with palms", cat: "Amenities" },
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
        <div className="text-[9px] font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">Hotel &amp; Restaurant</div>
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

function ModalWrapper({ title, onClose, children, wide }: { title: string; onClose: () => void; children: React.ReactNode; wide?: boolean }) {
  return (
    <>
      <div className="fixed inset-0 bg-black/75 z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className={`bg-[#161310] border border-[rgba(196,149,74,0.2)] w-full ${wide ? "max-w-2xl" : "max-w-lg"} max-h-[90vh] overflow-y-auto pointer-events-auto`}>
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

function AuthModal({
  mode, setMode, onClose, onLogin, registeredUsers, setRegisteredUsers,
}: {
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
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const user = registeredUsers.find(u => u.email === form.email && u.password === form.password);
      if (user) { onLogin(user); toast.success(`Welcome back, ${user.firstName}!`); }
      else { setError("Invalid email or password. Try the demo credentials."); }
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
      const updated = [...registeredUsers, newUser];
      setRegisteredUsers(updated);
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
                <FormField label="Email">
                  <input type="email" required value={form.email} onChange={set("email")} className={INPUT} placeholder="victoria@cedarcourt.co.uk" />
                </FormField>
                <FormField label="Password">
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} required value={form.password} onChange={set("password")} className={INPUT + " pr-10"} placeholder="••••••••" />
                    <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7d6a] hover:text-[#c4954a] transition-colors">
                      {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </FormField>
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-[#8a7d6a] font-['Jost'] cursor-pointer">
                    <input type="checkbox" className="accent-[#c4954a]" /> Remember me
                  </label>
                  <button type="button" onClick={() => toast.info("Password reset email sent!")} className="text-[#c4954a] font-['Jost'] hover:underline">Forgot password?</button>
                </div>
                <button type="submit" disabled={loading} className={`w-full py-3.5 ${BTN_PRIMARY} disabled:opacity-60`}>
                  {loading ? "Signing in..." : "Sign In"}
                </button>
                <div className="text-center text-xs font-['DM_Mono'] text-[#8a7d6a] pt-2">Demo: victoria@cedarcourt.co.uk / guest123</div>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField label="First Name">
                    <input type="text" required value={form.firstName} onChange={set("firstName")} className={INPUT} placeholder="Victoria" />
                  </FormField>
                  <FormField label="Last Name">
                    <input type="text" required value={form.lastName} onChange={set("lastName")} className={INPUT} placeholder="Ashworth" />
                  </FormField>
                </div>
                <FormField label="Email">
                  <input type="email" required value={form.email} onChange={set("email")} className={INPUT} placeholder="you@example.com" />
                </FormField>
                <FormField label="Password">
                  <div className="relative">
                    <input type={showPass ? "text" : "password"} required value={form.password} onChange={set("password")} className={INPUT + " pr-10"} placeholder="Min. 6 characters" />
                    <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"><EyeOff size={14} /></button>
                  </div>
                </FormField>
                <FormField label="Confirm Password">
                  <input type="password" required value={form.confirm} onChange={set("confirm")} className={INPUT} placeholder="Repeat password" />
                </FormField>
                <button type="submit" disabled={loading} className={`w-full py-3.5 ${BTN_PRIMARY} disabled:opacity-60`}>
                  {loading ? "Creating account..." : "Create Account"}
                </button>
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
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (dropRef.current && !dropRef.current.contains(e.target as Node)) setUserDropdown(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { label: "Home", page: "home" },
    { label: "Rooms", page: "rooms" },
    { label: "Menu", page: "menu" },
    { label: "Gallery", page: "gallery" },
    { label: "About", page: "about" },
    { label: "Contact", page: "contact" },
  ];

  const transparent = page === "home" && !scrolled;

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
          <button onClick={() => toast.info("3 new notifications")} className="relative w-10 h-10 flex items-center justify-center text-[#ede4d4]/70 hover:text-[#c4954a] transition-colors" title="Notifications">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#c4954a] rounded-full" />
          </button>
          <div className="relative" ref={dropRef}>
            <button onClick={() => { if (authUser) setUserDropdown(v => !v); else setAuthModal("login"); }} className="w-10 h-10 flex items-center justify-center text-[#ede4d4]/70 hover:text-[#c4954a] transition-colors" title={authUser ? authUser.firstName : "Sign in"}>
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
            <button onClick={() => setIsOpen(false)} className="w-full mt-2 py-2.5 text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#ede4d4] transition-colors">Continue Ordering</button>
          </div>
        )}
      </div>
    </>
  );
}

// ─────────────────────────── PAYMENT FORM (shared) ────────────────────────────

function PaymentForm({ payment, setPayment }: { payment: any; setPayment: (p: any) => void }) {
  const brand = cardBrand(payment.cardNumber);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setPayment((p: any) => ({ ...p, [k]: e.target.value }));

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <Shield size={16} className="text-[#c4954a]" />
        <span className="text-xs font-['DM_Mono'] text-[#8a7d6a] tracking-widest">256-BIT SSL SECURED PAYMENT</span>
      </div>
      <FormField label="Card Number">
        <div className="relative">
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={payment.cardNumber}
            onChange={e => setPayment((p: any) => ({ ...p, cardNumber: formatCard(e.target.value) }))}
            className={INPUT + " pr-16"}
            maxLength={19}
          />
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
          <div className="relative">
            <input type="password" placeholder="•••" value={payment.cvv} onChange={set("cvv")} className={INPUT} maxLength={4} />
          </div>
        </FormField>
      </div>
      <FormField label="Name on Card">
        <input type="text" placeholder="Victoria Ashworth" value={payment.nameOnCard} onChange={set("nameOnCard")} className={INPUT} />
      </FormField>
      <div className="bg-[#0c0a08] border border-[rgba(196,149,74,0.1)] p-4 flex gap-3">
        <Info size={14} className="text-[#c4954a] shrink-0 mt-0.5" />
        <p className="text-xs font-['Jost'] text-[#8a7d6a] leading-relaxed">Your payment is fully secured and encrypted. Cedar Court does not store card details. For testing, use any 16-digit number.</p>
      </div>
    </div>
  );
}

// ─────────────────────────── RESTAURANT CHECKOUT ────────────────────────────

function RestaurantCheckout({ items, updateQty, removeItem, onComplete, onBack, authUser }: {
  items: any[]; updateQty: (id: string, qty: number) => void; removeItem: (id: string) => void;
  onComplete: (ref: string) => void; onBack: () => void; authUser: any;
}) {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState({ name: authUser ? `${authUser.firstName} ${authUser.lastName}` : "", email: authUser?.email ?? "", phone: "", date: "", time: "19:00", guests: "2", requests: "" });
  const [payment, setPayment] = useState({ cardNumber: "", expiry: "", cvv: "", nameOnCard: "" });
  const [agreed, setAgreed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const setDet = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setDetails(d => ({ ...d, [k]: e.target.value }));

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const service = subtotal * 0.1;
  const total = subtotal + service;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { toast.error("Please agree to the terms to continue."); return; }
    setProcessing(true);
    setTimeout(() => { setProcessing(false); onComplete(genRef("ORD-")); }, 2000);
  };

  const steps = ["Review", "Your Details", "Payment"];

  return (
    <div className="min-h-screen bg-[#0c0a08] pt-0">
      <div className="bg-[#161310] border-b border-[rgba(196,149,74,0.12)] px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#c4954a] transition-colors"><ChevronLeft size={16} /> Back</button>
        <CedarLogo size="sm" />
        <div className="flex items-center gap-2 text-xs font-['DM_Mono'] text-[#8a7d6a]"><Shield size={12} className="text-[#c4954a]" /> Secure Checkout</div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8"><StepIndicator steps={steps} current={step} /></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div>
                <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-6">Review Your Order</h2>
                <div className="space-y-4 mb-8">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4 bg-[#161310] border border-[rgba(196,149,74,0.1)] p-4 items-center">
                      <img src={item.img} alt={item.name} className="w-16 h-16 object-cover bg-[#0c0a08] shrink-0" />
                      <div className="flex-1">
                        <p className="font-['Jost'] text-[#ede4d4] text-sm">{item.name}</p>
                        <p className="text-xs font-['DM_Mono'] text-[#8a7d6a] mt-0.5">${item.price} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-7 h-7 border border-[rgba(196,149,74,0.3)] text-[#c4954a] flex items-center justify-center hover:bg-[rgba(196,149,74,0.1)] transition-colors"><Minus size={11} /></button>
                        <span className="w-6 text-center text-sm font-['DM_Mono'] text-[#ede4d4]">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-7 h-7 border border-[rgba(196,149,74,0.3)] text-[#c4954a] flex items-center justify-center hover:bg-[rgba(196,149,74,0.1)] transition-colors"><Plus size={11} /></button>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <p className="font-['DM_Mono'] text-[#c4954a] text-sm">${(item.price * item.qty).toFixed(2)}</p>
                        <button onClick={() => removeItem(item.id)} className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] hover:text-red-400 transition-colors mt-1">Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setStep(2)} className={`w-full py-4 ${BTN_PRIMARY}`}>Continue to Details <ArrowRight size={14} className="inline ml-2" /></button>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-6">Your Details</h2>
                <form onSubmit={e => { e.preventDefault(); setStep(3); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Full Name"><input type="text" required value={details.name} onChange={setDet("name")} className={INPUT} placeholder="Victoria Ashworth" /></FormField>
                    <FormField label="Email"><input type="email" required value={details.email} onChange={setDet("email")} className={INPUT} placeholder="you@example.com" /></FormField>
                  </div>
                  <FormField label="Phone"><input type="tel" value={details.phone} onChange={setDet("phone")} className={INPUT} placeholder="+44 20 0000 0000" /></FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Date">
                      <input type="date" required value={details.date} onChange={setDet("date")} className={INPUT + " [color-scheme:dark]"} />
                    </FormField>
                    <FormField label="Time">
                      <select value={details.time} onChange={setDet("time")} className={INPUT}>
                        {["12:00","12:30","13:00","13:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30"].map(t => <option key={t} value={t} className="bg-[#161310]">{t}</option>)}
                      </select>
                    </FormField>
                  </div>
                  <FormField label="Number of Guests">
                    <select value={details.guests} onChange={setDet("guests")} className={INPUT}>
                      {["1","2","3","4","5","6","7","8"].map(n => <option key={n} value={n} className="bg-[#161310]">{n} {n === "1" ? "guest" : "guests"}</option>)}
                    </select>
                  </FormField>
                  <FormField label="Special Requests (optional)">
                    <textarea value={details.requests} onChange={e => setDetails(d => ({ ...d, requests: e.target.value }))} rows={3} className={INPUT.replace("w-full", "w-full resize-none")} placeholder="Dietary requirements, celebrations, seating preferences..." />
                  </FormField>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setStep(1)} className={`flex-1 py-4 ${BTN_OUTLINE}`}><ChevronLeft size={14} className="inline mr-2" />Back</button>
                    <button type="submit" className={`flex-1 py-4 ${BTN_PRIMARY}`}>Continue to Payment <ArrowRight size={14} className="inline ml-2" /></button>
                  </div>
                </form>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-6">Payment</h2>
                <form onSubmit={handlePay} className="space-y-4">
                  <PaymentForm payment={payment} setPayment={setPayment} />
                  <label className="flex items-start gap-3 cursor-pointer pt-2">
                    <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 accent-[#c4954a]" />
                    <span className="text-xs font-['Jost'] text-[#8a7d6a] leading-relaxed">I agree to the Cedar Court <button type="button" onClick={() => toast.info("Terms & Conditions")} className="text-[#c4954a] hover:underline">Terms & Conditions</button> and <button type="button" onClick={() => toast.info("Privacy Policy")} className="text-[#c4954a] hover:underline">Privacy Policy</button></span>
                  </label>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setStep(2)} className={`flex-1 py-4 ${BTN_OUTLINE}`}><ChevronLeft size={14} className="inline mr-2" />Back</button>
                    <button type="submit" disabled={processing} className={`flex-1 py-4 ${BTN_PRIMARY} disabled:opacity-60`}>
                      {processing ? "Processing..." : `Pay $${total.toFixed(2)}`}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          <div className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-5 h-fit lg:sticky lg:top-28">
            <h3 className="font-['Fraunces'] text-[#ede4d4] mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="font-['Jost'] text-[#8a7d6a] truncate mr-2">{item.name} ×{item.qty}</span>
                  <span className="font-['DM_Mono'] text-[#ede4d4] shrink-0">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[rgba(196,149,74,0.1)] pt-3 space-y-1.5">
              <div className="flex justify-between text-sm"><span className="font-['Jost'] text-[#8a7d6a]">Subtotal</span><span className="font-['DM_Mono'] text-[#ede4d4]">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="font-['Jost'] text-[#8a7d6a]">Service (10%)</span><span className="font-['DM_Mono'] text-[#ede4d4]">${service.toFixed(2)}</span></div>
              <div className="flex justify-between pt-2 border-t border-[rgba(196,149,74,0.1)]"><span className="font-['Fraunces'] text-[#ede4d4]">Total</span><span className="font-['DM_Mono'] text-[#c4954a] text-lg">${total.toFixed(2)}</span></div>
            </div>
            {details.date && <div className="mt-4 pt-4 border-t border-[rgba(196,149,74,0.1)] space-y-1 text-xs font-['DM_Mono'] text-[#8a7d6a]">
              {details.date && <p>Date: {details.date}</p>}
              {details.time && <p>Time: {details.time}</p>}
              {details.guests && <p>Guests: {details.guests}</p>}
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── ROOM BOOKING CHECKOUT ────────────────────────────

function RoomBookingCheckout({ room, checkIn, checkOut, guestCount, onComplete, onBack, authUser }: {
  room: any; checkIn: string; checkOut: string; guestCount: number;
  onComplete: (ref: string, bookingData: any) => void; onBack: () => void; authUser: any;
}) {
  const [step, setStep] = useState(1);
  const [details, setDetails] = useState({ firstName: authUser?.firstName ?? "", lastName: authUser?.lastName ?? "", email: authUser?.email ?? "", phone: "", nationality: "", address: "", city: "", country: "", arrivalTime: "14:00", requests: "" });
  const [payment, setPayment] = useState({ cardNumber: "", expiry: "", cvv: "", nameOnCard: "" });
  const [agreed, setAgreed] = useState(false);
  const [processing, setProcessing] = useState(false);
  const setDet = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => setDetails(d => ({ ...d, [k]: e.target.value }));

  const nights = checkIn && checkOut ? Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)) : 0;
  const subtotal = room.price * nights;
  const service = Math.round(subtotal * 0.1);
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + service + taxes;

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) { toast.error("Please agree to the terms to continue."); return; }
    setProcessing(true);
    const ref = genRef("BK-");
    setTimeout(() => {
      setProcessing(false);
      onComplete(ref, { guest: `${details.firstName} ${details.lastName}`, email: details.email, room: room.name, roomId: room.id, checkIn, checkOut, nights, total, status: "Confirmed", guests: guestCount, special: details.requests });
    }, 2000);
  };

  const steps = ["Review Stay", "Guest Details", "Payment"];

  return (
    <div className="min-h-screen bg-[#0c0a08]">
      <div className="bg-[#161310] border-b border-[rgba(196,149,74,0.12)] px-6 py-4 flex items-center justify-between sticky top-0 z-40">
        <button onClick={onBack} className="flex items-center gap-2 text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#c4954a] transition-colors"><ChevronLeft size={16} /> Back</button>
        <CedarLogo size="sm" />
        <div className="flex items-center gap-2 text-xs font-['DM_Mono'] text-[#8a7d6a]"><Shield size={12} className="text-[#c4954a]" /> Secure Booking</div>
      </div>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8"><StepIndicator steps={steps} current={step} /></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div>
                <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-6">Review Your Stay</h2>
                <div className="bg-[#161310] border border-[rgba(196,149,74,0.15)] overflow-hidden mb-6">
                  <img src={room.gallery[0]} alt={room.name} className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase">{room.type}</span>
                        <h3 className="font-['Fraunces'] text-xl text-[#ede4d4] mt-0.5">{room.name}</h3>
                      </div>
                      <div className="text-right">
                        <span className="font-['Fraunces'] text-2xl text-[#c4954a]">${room.price}</span>
                        <span className="text-xs font-['DM_Mono'] text-[#8a7d6a] ml-1">/ night</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[rgba(196,149,74,0.1)]">
                      {[["Check-in", checkIn], ["Check-out", checkOut], ["Guests", String(guestCount)]].map(([l, v]) => (
                        <div key={l}>
                          <p className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-1">{l}</p>
                          <p className="text-sm font-['Jost'] text-[#ede4d4]">{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-4 mb-6">
                  <h4 className="font-['Fraunces'] text-[#ede4d4] mb-3">What is included</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {room.amenities.map((a: string) => (
                      <div key={a} className="flex items-center gap-2 text-xs font-['Jost'] text-[#8a7d6a]"><CheckCircle size={12} className="text-[#c4954a]" />{a}</div>
                    ))}
                  </div>
                </div>
                <div className="bg-amber-900/10 border border-amber-800/30 p-4 mb-6 flex gap-3">
                  <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                  <p className="text-xs font-['Jost'] text-amber-400/80">Free cancellation up to 48 hours before check-in. Late cancellations will incur a one-night charge.</p>
                </div>
                <button onClick={() => setStep(2)} className={`w-full py-4 ${BTN_PRIMARY}`}>Continue to Guest Details <ArrowRight size={14} className="inline ml-2" /></button>
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-6">Guest Details</h2>
                <form onSubmit={e => { e.preventDefault(); setStep(3); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="First Name"><input type="text" required value={details.firstName} onChange={setDet("firstName")} className={INPUT} placeholder="Victoria" /></FormField>
                    <FormField label="Last Name"><input type="text" required value={details.lastName} onChange={setDet("lastName")} className={INPUT} placeholder="Ashworth" /></FormField>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Email"><input type="email" required value={details.email} onChange={setDet("email")} className={INPUT} placeholder="you@example.com" /></FormField>
                    <FormField label="Phone"><input type="tel" required value={details.phone} onChange={setDet("phone")} className={INPUT} placeholder="+44 20 0000 0000" /></FormField>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Nationality"><input type="text" value={details.nationality} onChange={setDet("nationality")} className={INPUT} placeholder="British" /></FormField>
                    <FormField label="Expected Arrival Time">
                      <select value={details.arrivalTime} onChange={setDet("arrivalTime")} className={INPUT}>
                        {["12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","00:00"].map(t => <option key={t} value={t} className="bg-[#161310]">{t}</option>)}
                      </select>
                    </FormField>
                  </div>
                  <FormField label="Address"><input type="text" value={details.address} onChange={setDet("address")} className={INPUT} placeholder="123 Example Street" /></FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="City"><input type="text" value={details.city} onChange={setDet("city")} className={INPUT} placeholder="London" /></FormField>
                    <FormField label="Country"><input type="text" value={details.country} onChange={setDet("country")} className={INPUT} placeholder="United Kingdom" /></FormField>
                  </div>
                  <FormField label="Special Requests (optional)">
                    <textarea value={details.requests} onChange={e => setDetails(d => ({ ...d, requests: e.target.value }))} rows={3} className={INPUT.replace("w-full", "w-full resize-none")} placeholder="Room preferences, celebrations, dietary requirements..." />
                  </FormField>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setStep(1)} className={`flex-1 py-4 ${BTN_OUTLINE}`}><ChevronLeft size={14} className="inline mr-2" />Back</button>
                    <button type="submit" className={`flex-1 py-4 ${BTN_PRIMARY}`}>Continue to Payment <ArrowRight size={14} className="inline ml-2" /></button>
                  </div>
                </form>
              </div>
            )}
            {step === 3 && (
              <div>
                <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-6">Secure Payment</h2>
                <form onSubmit={handlePay} className="space-y-4">
                  <PaymentForm payment={payment} setPayment={setPayment} />
                  <label className="flex items-start gap-3 cursor-pointer pt-2">
                    <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 accent-[#c4954a]" />
                    <span className="text-xs font-['Jost'] text-[#8a7d6a] leading-relaxed">I agree to the Cedar Court <button type="button" onClick={() => toast.info("Terms & Conditions")} className="text-[#c4954a] hover:underline">Terms & Conditions</button>, <button type="button" onClick={() => toast.info("Privacy Policy")} className="text-[#c4954a] hover:underline">Privacy Policy</button>, and cancellation policy</span>
                  </label>
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={() => setStep(2)} className={`flex-1 py-4 ${BTN_OUTLINE}`}><ChevronLeft size={14} className="inline mr-2" />Back</button>
                    <button type="submit" disabled={processing} className={`flex-1 py-4 ${BTN_PRIMARY} disabled:opacity-60`}>
                      {processing ? "Processing..." : `Confirm & Pay $${total.toLocaleString()}`}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          <div className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-5 h-fit lg:sticky lg:top-28 space-y-3">
            <h3 className="font-['Fraunces'] text-[#ede4d4]">Booking Summary</h3>
            <div className="flex gap-3 pb-3 border-b border-[rgba(196,149,74,0.1)]">
              <img src={room.image} alt={room.name} className="w-16 h-14 object-cover bg-[#0c0a08] shrink-0" />
              <div>
                <p className="text-[10px] font-['DM_Mono'] text-[#c4954a]">{room.type.toUpperCase()}</p>
                <p className="text-sm font-['Jost'] text-[#ede4d4]">{room.name}</p>
                <p className="text-xs font-['DM_Mono'] text-[#8a7d6a]">{nights} night{nights !== 1 ? "s" : ""}</p>
              </div>
            </div>
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between"><span className="font-['Jost'] text-[#8a7d6a]">${room.price} × {nights} nights</span><span className="font-['DM_Mono'] text-[#ede4d4]">${subtotal.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="font-['Jost'] text-[#8a7d6a]">Service charge</span><span className="font-['DM_Mono'] text-[#ede4d4]">${service.toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="font-['Jost'] text-[#8a7d6a]">Taxes & fees</span><span className="font-['DM_Mono'] text-[#ede4d4]">${taxes.toLocaleString()}</span></div>
              <div className="flex justify-between pt-2 border-t border-[rgba(196,149,74,0.1)]"><span className="font-['Fraunces'] text-[#ede4d4]">Total</span><span className="font-['DM_Mono'] text-[#c4954a] text-lg">${total.toLocaleString()}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── CONFIRMATION PAGE ────────────────────────────

function ConfirmationPage({ type, reference, setPage, clearCart, details }: {
  type: "restaurant" | "room"; reference: string; setPage: (p: string) => void;
  clearCart?: () => void; details?: any;
}) {
  return (
    <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center px-6 pt-20">
      <div className="max-w-xl w-full text-center">
        <div className="w-20 h-20 border-2 border-[#c4954a] flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-[#c4954a]" strokeWidth={1.5} />
        </div>
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="h-px w-8 bg-[#c4954a]" />
          <span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">{type === "restaurant" ? "Order Confirmed" : "Booking Confirmed"}</span>
          <div className="h-px w-8 bg-[#c4954a]" />
        </div>
        <h1 className="font-['Fraunces'] text-4xl text-[#ede4d4] mb-3">Thank You</h1>
        <p className="font-['Jost'] text-[#8a7d6a] mb-6 font-light">Your {type === "restaurant" ? "order" : "booking"} has been confirmed. You will receive a confirmation email shortly.</p>
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.2)] p-6 mb-8">
          <p className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-2">Reference Number</p>
          <p className="font-['Fraunces'] text-2xl text-[#ede4d4]">{reference}</p>
          {details && (
            <div className="mt-4 pt-4 border-t border-[rgba(196,149,74,0.1)] space-y-1 text-sm font-['Jost'] text-[#8a7d6a] text-left">
              {details.room && <div className="flex justify-between"><span>Room:</span><span className="text-[#ede4d4]">{details.room}</span></div>}
              {details.checkIn && <div className="flex justify-between"><span>Check-in:</span><span className="text-[#ede4d4]">{details.checkIn}</span></div>}
              {details.checkOut && <div className="flex justify-between"><span>Check-out:</span><span className="text-[#ede4d4]">{details.checkOut}</span></div>}
              {details.total && <div className="flex justify-between"><span>Total Paid:</span><span className="text-[#c4954a]">${details.total.toLocaleString()}</span></div>}
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button onClick={() => { setPage("home"); if (clearCart) clearCart(); }} className={`flex-1 py-4 ${BTN_PRIMARY}`}>Return to Homepage</button>
          <button onClick={() => { setPage("my-bookings"); if (clearCart) clearCart(); }} className={`flex-1 py-4 ${BTN_OUTLINE}`}>View My Bookings</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── FOOTER ────────────────────────────

function Footer({ setPage, setView }: { setPage: (p: string) => void; setView: (v: string) => void }) {
  return (
    <footer className="bg-[#0a0806] border-t border-[rgba(196,149,74,0.12)] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="mb-5"><CedarLogo /></div>
            <p className="text-sm font-['Jost'] text-[#8a7d6a] leading-relaxed mb-6 font-light">Where luxury finds its language. Cedar Court has been welcoming distinguished guests since 1987.</p>
            <div className="flex gap-3">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <button key={i} onClick={() => toast.info("Follow us on social media!")} className="w-9 h-9 border border-[rgba(196,149,74,0.2)] flex items-center justify-center text-[#8a7d6a] hover:border-[#c4954a] hover:text-[#c4954a] transition-all"><Icon size={15} /></button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-['DM_Mono'] text-[#c4954a] text-xs tracking-widest uppercase mb-5">Explore</h4>
            <div className="flex flex-col gap-2.5">
              {["home","rooms","menu","gallery","about","contact"].map(p => (
                <button key={p} onClick={() => setPage(p)} className="text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#ede4d4] transition-colors text-left capitalize">{p}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-['DM_Mono'] text-[#c4954a] text-xs tracking-widest uppercase mb-5">Services</h4>
            <div className="flex flex-col gap-2.5">
              {["Room Service","Spa & Wellness","Fine Dining","Event Spaces","Airport Transfer","Concierge"].map(s => (
                <button key={s} onClick={() => toast.info(`Learn more about ${s}`)} className="text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#ede4d4] transition-colors text-left">{s}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-['DM_Mono'] text-[#c4954a] text-xs tracking-widest uppercase mb-5">Contact</h4>
            <div className="flex flex-col gap-3">
              {[
                { Icon: MapPin, text: "12 Cedar Court Lane\nMayfair, London W1K 4HF" },
                { Icon: Phone, text: "+44 20 7946 0312" },
                { Icon: Mail, text: "hello@cedarcourt.co.uk" },
                { Icon: Clock, text: "Concierge: 24 hours, 7 days" },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-start gap-3 text-sm font-['Jost'] text-[#8a7d6a]"><Icon size={14} className="text-[#c4954a] mt-0.5 shrink-0" /><span className="whitespace-pre-line">{text}</span></div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-[rgba(196,149,74,0.08)] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-['DM_Mono'] text-[#8a7d6a]">&copy; {new Date().getFullYear()} Cedar Court Hotel &amp; Restaurant. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => toast.info("Privacy Policy")} className="text-xs font-['DM_Mono'] text-[#8a7d6a] hover:text-[#c4954a] transition-colors">Privacy Policy</button>
            <button onClick={() => toast.info("Terms of Use")} className="text-xs font-['DM_Mono'] text-[#8a7d6a] hover:text-[#c4954a] transition-colors">Terms of Use</button>
            <button onClick={() => setView("admin-login")} className="text-xs font-['DM_Mono'] text-[#8a7d6a]/30 hover:text-[#8a7d6a] transition-colors">Admin Portal</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────── ROOM CARD ────────────────────────────

function RoomCard({ room, onClick }: { room: any; onClick: () => void }) {
  return (
    <button onClick={onClick} className="group text-left border border-[rgba(196,149,74,0.1)] hover:border-[rgba(196,149,74,0.45)] transition-all duration-300 bg-[#161310] overflow-hidden w-full">
      <div className="overflow-hidden h-56 bg-[#0c0a08]">
        <img src={room.image} alt={room.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase">{room.type}</span>
            <h3 className="font-['Fraunces'] text-xl text-[#ede4d4] mt-0.5">{room.name}</h3>
          </div>
          <div className="text-right shrink-0 ml-2">
            <div className="font-['Fraunces'] text-2xl text-[#c4954a]">${room.price}</div>
            <div className="text-[10px] font-['DM_Mono'] text-[#8a7d6a]">per night</div>
          </div>
        </div>
        <div className="flex items-center gap-3 mb-3 text-xs font-['DM_Mono'] text-[#8a7d6a]">
          <span>{room.size}</span><span className="text-[#c4954a]/40">·</span><span>{room.capacity} guests</span><span className="text-[#c4954a]/40">·</span><span className="truncate">{room.view}</span>
        </div>
        <div className="flex items-center justify-between">
          <StarRating rating={room.rating} size={12} />
          <span className="text-xs font-['DM_Mono'] text-[#8a7d6a]">{room.reviews} reviews</span>
        </div>
      </div>
    </button>
  );
}

// ─────────────────────────── HOME PAGE ────────────────────────────

function HomePage({ setPage, setSelectedRoom, rooms }: { setPage: (p: string) => void; setSelectedRoom: (r: any) => void; rooms: any[] }) {
  return (
    <div>
      <section className="relative h-screen min-h-[640px] flex items-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1637730827702-de34e9ae4ede?w=1920&h=1080&fit=crop&auto=format" alt="Cedar Court Hotel" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0a08]/92 via-[#0c0a08]/55 to-[#0c0a08]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a08]/80 via-transparent to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6"><div className="h-px w-12 bg-[#c4954a]" /><span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">Est. 1987 &middot; Mayfair, London</span></div>
            <h1 className="font-['Fraunces'] text-7xl md:text-8xl text-[#ede4d4] leading-[0.88] mb-6">Cedar<br /><em className="italic text-[#c4954a]">Court</em></h1>
            <p className="font-['Jost'] text-lg text-[#ede4d4]/70 leading-relaxed mb-10 max-w-md font-light">Where luxury finds its language. A singular retreat where every detail speaks of craft, care, and considered indulgence.</p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setPage("rooms")} className={`px-8 py-4 ${BTN_PRIMARY}`}>Explore Rooms</button>
              <button onClick={() => setPage("menu")} className={`px-8 py-4 ${BTN_OUTLINE}`}>Book a Table</button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-[0.4em]">SCROLL</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#c4954a] to-transparent" />
        </div>
      </section>
      <section className="bg-[#161310] border-y border-[rgba(196,149,74,0.12)]">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[["37","Years of Excellence"],["48","Luxury Suites & Villas"],["5★","Forbes Travel Guide"],["12k+","Distinguished Guests"]].map(([num, label]) => (
              <div key={label} className="text-center"><div className="font-['Fraunces'] text-4xl text-[#c4954a] mb-1">{num}</div><div className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">{label}</div></div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-12">
          <div><SectionLabel text="Accommodation" /><h2 className="font-['Fraunces'] text-4xl md:text-5xl text-[#ede4d4]">Our Finest<br /><em className="italic">Rooms &amp; Suites</em></h2></div>
          <button onClick={() => setPage("rooms")} className="hidden md:flex items-center gap-2 text-sm font-['Jost'] text-[#c4954a] hover:gap-3 transition-all">View All <ArrowRight size={16} /></button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rooms.slice(0, 3).map(room => <RoomCard key={room.id} room={room} onClick={() => { setSelectedRoom(room); setPage("room-detail"); }} />)}
        </div>
      </section>
      <section className="bg-[#161310] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <SectionLabel text="The Restaurant" />
              <h2 className="font-['Fraunces'] text-4xl md:text-5xl text-[#ede4d4] mb-6">Dining as an<br /><em className="italic">Art Form</em></h2>
              <p className="font-['Jost'] text-[#8a7d6a] leading-relaxed mb-4 font-light">Our restaurant holds two Michelin stars and offers an intimate dining experience. Executive Chef Isabelle Moreau transforms the finest seasonal produce into compositions of remarkable beauty and complexity.</p>
              <p className="font-['Jost'] text-[#8a7d6a] leading-relaxed mb-8 font-light">The seven-course tasting menu changes with the seasons, while our a la carte offering spans breakfast through late-night dining.</p>
              <div className="flex flex-wrap gap-4 mb-8">
                <button onClick={() => setPage("menu")} className={`px-6 py-3.5 ${BTN_PRIMARY}`}>View Menu</button>
                <button onClick={() => toast.success("Table reservation request received. We will contact you shortly.")} className={`px-6 py-3.5 ${BTN_OUTLINE}`}>Reserve a Table</button>
              </div>
              <div className="flex items-center gap-8">{[["2","Michelin Stars"],["#3","Best Hotel Restaurant"],["Open","7 Days a Week"]].map(([val,label]) => (<div key={label}><div className="font-['Fraunces'] text-xl text-[#c4954a]">{val}</div><div className="text-[10px] font-['DM_Mono'] text-[#8a7d6a]">{label}</div></div>))}</div>
            </div>
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1776993298456-98c71c0e177e?w=800&h=700&fit=crop&auto=format" alt="Cedar Court Restaurant" className="w-full h-[500px] object-cover" />
              <div className="absolute -bottom-5 -left-5 w-48 bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] p-4 hidden lg:block">
                <div className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-2">Open Daily</div>
                {["Breakfast 7–11am","Lunch 12–3pm","Dinner 6–11pm"].map(t => <div key={t} className="text-sm font-['Jost'] text-[#ede4d4]/80">{t}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-3"><div className="h-px w-8 bg-[#c4954a]" /><span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">Amenities</span><div className="h-px w-8 bg-[#c4954a]" /></div>
          <h2 className="font-['Fraunces'] text-4xl text-[#ede4d4]">Every <em className="italic">Comfort</em> Considered</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{Icon:Waves,title:"Infinity Pool",desc:"Heated year-round, 25m pool"},{Icon:Dumbbell,title:"Fitness Centre",desc:"State-of-the-art, open 24 hrs"},{Icon:Leaf,title:"Spa & Wellness",desc:"Six treatment rooms, hammam"},{Icon:Coffee,title:"Lobby Lounge",desc:"All-day dining, afternoon tea"},{Icon:Car,title:"Valet Parking",desc:"Secure underground with EV"},{Icon:Wifi,title:"High-Speed WiFi",desc:"Complimentary throughout"},{Icon:Globe,title:"Concierge",desc:"24-hour dedicated service"},{Icon:Users,title:"Event Spaces",desc:"Four elegant private rooms"}].map(({Icon,title,desc}) => (
            <div key={title} onClick={() => toast.info(`${title}: ${desc}`)} className="group p-6 border border-[rgba(196,149,74,0.1)] hover:border-[rgba(196,149,74,0.35)] transition-all bg-[#161310] hover:bg-[#1c1915] cursor-pointer">
              <Icon size={22} className="text-[#c4954a] mb-4" strokeWidth={1.5} />
              <h3 className="font-['Fraunces'] text-[#ede4d4] mb-1.5">{title}</h3>
              <p className="text-xs font-['Jost'] text-[#8a7d6a]">{desc}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[#161310] py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-3 mb-3"><div className="h-px w-8 bg-[#c4954a]" /><span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">Guest Stories</span><div className="h-px w-8 bg-[#c4954a]" /></div>
            <h2 className="font-['Fraunces'] text-4xl text-[#ede4d4]">In Their Own <em className="italic">Words</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map(t => (
              <div key={t.id} className="bg-[#0c0a08] border border-[rgba(196,149,74,0.12)] p-8 flex flex-col gap-4">
                <div className="flex gap-1">{[...Array(t.rating)].map((_,i) => <Star key={i} size={13} fill={gold} color={gold} strokeWidth={1} />)}</div>
                <p className="font-['Jost'] text-[#ede4d4]/75 leading-relaxed text-sm italic font-light">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[rgba(196,149,74,0.08)]">
                  <div className="w-10 h-10 bg-[rgba(196,149,74,0.12)] border border-[rgba(196,149,74,0.25)] flex items-center justify-center shrink-0"><span className="text-[#c4954a] text-xs font-['DM_Mono']">{t.initials}</span></div>
                  <div><div className="text-sm font-['Jost'] text-[#ede4d4]">{t.name}</div><div className="text-xs font-['DM_Mono'] text-[#8a7d6a]">{t.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-3"><div className="h-px w-8 bg-[#c4954a]" /><span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">The Cedar Circle</span><div className="h-px w-8 bg-[#c4954a]" /></div>
          <h2 className="font-['Fraunces'] text-3xl text-[#ede4d4] mb-3">Stay in Our World</h2>
          <p className="font-['Jost'] text-[#8a7d6a] mb-8 max-w-md mx-auto text-sm font-light">Exclusive offers, seasonal menus, and curated experiences for our most discerning guests.</p>
          <form onSubmit={e => { e.preventDefault(); toast.success("You have been subscribed to The Cedar Circle!"); }} className="flex max-w-md mx-auto">
            <input type="email" required placeholder="your@email.com" className="flex-1 bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] border-r-0 px-4 py-3 text-sm font-['Jost'] text-[#ede4d4] placeholder-[#8a7d6a]/40 focus:outline-none focus:border-[#c4954a]" />
            <button type="submit" className={`px-6 py-3 ${BTN_PRIMARY} whitespace-nowrap`}>Subscribe</button>
          </form>
        </div>
      </section>
    </div>
  );
}

// ─────────────────────────── ROOMS PAGE ────────────────────────────

function RoomsPage({ setPage, setSelectedRoom, rooms }: { setPage: (p: string) => void; setSelectedRoom: (r: any) => void; rooms: any[] }) {
  const [filter, setFilter] = useState("All");
  const types = ["All", "Classic", "Deluxe", "Suite", "Presidential", "Villa"];
  const filtered = filter === "All" ? rooms : rooms.filter(r => r.type === filter);
  return (
    <div className="pt-20">
      <div className="bg-[#161310] border-b border-[rgba(196,149,74,0.12)] py-16">
        <div className="max-w-7xl mx-auto px-6"><SectionLabel text="Accommodation" /><h1 className="font-['Fraunces'] text-5xl text-[#ede4d4]">Rooms &amp; <em className="italic">Suites</em></h1></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap gap-2 mb-10">
          {types.map(t => <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 text-[10px] font-['DM_Mono'] tracking-widest uppercase transition-all border ${filter === t ? "bg-[#c4954a] text-[#0c0a08] border-[#c4954a]" : "border-[rgba(196,149,74,0.2)] text-[#8a7d6a] hover:border-[#c4954a] hover:text-[#c4954a]"}`}>{t}</button>)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(room => <RoomCard key={room.id} room={room} onClick={() => { setSelectedRoom(room); setPage("room-detail"); }} />)}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── ROOM DETAIL ────────────────────────────

function RoomDetailPage({ room, setPage, onBookNow }: { room: any; setPage: (p: string) => void; onBookNow: (room: any, checkIn: string, checkOut: string, guests: number) => void }) {
  const [imgIdx, setImgIdx] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  useEffect(() => { setImgIdx(0); }, [room]);
  if (!room) return null;
  const nights = checkIn && checkOut ? Math.max(0, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / 86400000)) : 0;
  const total = nights > 0 ? Math.round(room.price * nights * 1.22) : 0;
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-6 py-6"><button onClick={() => setPage("rooms")} className="flex items-center gap-2 text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#c4954a] transition-colors"><ChevronLeft size={16} /> Back to Rooms</button></div>
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="mb-8">
          <div className="relative h-[480px] bg-[#0c0a08] overflow-hidden mb-3">
            <img src={room.gallery[imgIdx]} alt={room.name} className="w-full h-full object-cover" />
            {room.gallery.length > 1 && <>
              <button onClick={() => setImgIdx(i => (i-1+room.gallery.length)%room.gallery.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0c0a08]/80 border border-[rgba(196,149,74,0.3)] flex items-center justify-center text-[#c4954a] hover:bg-[rgba(196,149,74,0.1)] transition-colors"><ChevronLeft size={18} /></button>
              <button onClick={() => setImgIdx(i => (i+1)%room.gallery.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#0c0a08]/80 border border-[rgba(196,149,74,0.3)] flex items-center justify-center text-[#c4954a] hover:bg-[rgba(196,149,74,0.1)] transition-colors"><ChevronRight size={18} /></button>
            </>}
          </div>
          <div className="flex gap-2">
            {room.gallery.map((img: string, i: number) => (
              <button key={i} onClick={() => setImgIdx(i)} className={`w-20 h-14 overflow-hidden border-2 transition-all ${imgIdx===i?"border-[#c4954a]":"border-transparent opacity-50 hover:opacity-80"}`}><img src={img} alt="" className="w-full h-full object-cover" /></button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <span className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase">{room.type}</span>
            <h1 className="font-['Fraunces'] text-4xl text-[#ede4d4] mt-1 mb-3">{room.name}</h1>
            <div className="flex flex-wrap items-center gap-4 mb-5 text-sm font-['DM_Mono'] text-[#8a7d6a]">
              <span>{room.size}</span><span className="text-[#c4954a]/40">·</span><span>Up to {room.capacity} guests</span><span className="text-[#c4954a]/40">·</span><span>{room.view}</span>
            </div>
            <div className="flex items-center gap-3 mb-8"><StarRating rating={room.rating} /><span className="text-sm font-['DM_Mono'] text-[#8a7d6a]">{room.rating} ({room.reviews} reviews)</span></div>
            <p className="font-['Jost'] text-[#ede4d4]/70 leading-relaxed mb-10 font-light">{room.description}</p>
            <h3 className="font-['Fraunces'] text-xl text-[#ede4d4] mb-4">Room Amenities</h3>
            <div className="grid grid-cols-2 gap-3">
              {room.amenities.map((a: string) => <div key={a} className="flex items-center gap-2 text-sm font-['Jost'] text-[#8a7d6a]"><CheckCircle size={14} className="text-[#c4954a] shrink-0" />{a}</div>)}
            </div>
          </div>
          <div className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-6 h-fit lg:sticky lg:top-24">
            <div className="flex items-baseline justify-between mb-6">
              <div><span className="font-['Fraunces'] text-3xl text-[#c4954a]">${room.price}</span><span className="text-sm font-['DM_Mono'] text-[#8a7d6a] ml-1">/ night</span></div>
              <StarRating rating={room.rating} size={12} />
            </div>
            <div className="space-y-3 mb-4">
              <div>
                <label className={LABEL}>Check-in</label>
                <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} className={INPUT + " [color-scheme:dark]"} />
              </div>
              <div>
                <label className={LABEL}>Check-out</label>
                <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} className={INPUT + " [color-scheme:dark]"} />
              </div>
              <div>
                <label className={LABEL}>Guests</label>
                <div className="flex items-center bg-[#0c0a08] border border-[rgba(196,149,74,0.2)] px-3 py-2">
                  <button onClick={() => setGuests(g => Math.max(1,g-1))} className="text-[#c4954a] p-1"><Minus size={13} /></button>
                  <span className="flex-1 text-center text-sm font-['DM_Mono'] text-[#ede4d4]">{guests} guest{guests>1?"s":""}</span>
                  <button onClick={() => setGuests(g => Math.min(room.capacity,g+1))} className="text-[#c4954a] p-1"><Plus size={13} /></button>
                </div>
              </div>
            </div>
            {nights > 0 && (
              <div className="border-t border-[rgba(196,149,74,0.1)] pt-4 mb-4 space-y-1.5 text-sm">
                <div className="flex justify-between"><span className="font-['Jost'] text-[#8a7d6a]">${room.price} &times; {nights} nights</span><span className="font-['DM_Mono'] text-[#ede4d4]">${room.price*nights}</span></div>
                <div className="flex justify-between"><span className="font-['Jost'] text-[#8a7d6a]">Service (10%)</span><span className="font-['DM_Mono'] text-[#ede4d4]">${Math.round(room.price*nights*0.1)}</span></div>
                <div className="flex justify-between"><span className="font-['Jost'] text-[#8a7d6a]">Taxes (12%)</span><span className="font-['DM_Mono'] text-[#ede4d4]">${Math.round(room.price*nights*0.12)}</span></div>
                <div className="flex justify-between pt-2 border-t border-[rgba(196,149,74,0.1)]"><span className="font-['Fraunces'] text-[#ede4d4]">Total</span><span className="font-['DM_Mono'] text-[#c4954a] font-semibold">${total.toLocaleString()}</span></div>
              </div>
            )}
            <button onClick={() => { if (!checkIn || !checkOut || nights <= 0) { toast.error("Please select your check-in and check-out dates."); return; } onBookNow(room, checkIn, checkOut, guests); }} className={`w-full py-4 ${BTN_PRIMARY}`}>Reserve Now</button>
            <p className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] text-center mt-3">Free cancellation up to 48 hours prior</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── MENU PAGE ────────────────────────────

function MenuPage({ addToCart, cartItems, updateQty, menuItems }: { addToCart: (i: any) => void; cartItems: any[]; updateQty: (id: string, qty: number) => void; menuItems: any[] }) {
  const cats = ["Breakfast","Lunch","Dinner","Drinks","Desserts"];
  const [activeCat, setActiveCat] = useState("Breakfast");
  const filtered = menuItems.filter(m => m.cat === activeCat && m.available);
  const getQty = (id: string) => cartItems.find(c => c.id === id)?.qty ?? 0;
  return (
    <div className="pt-20">
      <div className="bg-[#161310] border-b border-[rgba(196,149,74,0.12)] py-16">
        <div className="max-w-7xl mx-auto px-6"><SectionLabel text="The Restaurant" /><h1 className="font-['Fraunces'] text-5xl text-[#ede4d4]">Our <em className="italic">Menu</em></h1></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex border border-[rgba(196,149,74,0.15)] w-fit mb-12 overflow-x-auto">
          {cats.map(cat => <button key={cat} onClick={() => setActiveCat(cat)} className={`px-5 py-3 text-[10px] font-['DM_Mono'] tracking-widest uppercase transition-all whitespace-nowrap border-r border-[rgba(196,149,74,0.15)] last:border-r-0 ${activeCat===cat?"bg-[#c4954a] text-[#0c0a08]":"text-[#8a7d6a] hover:text-[#c4954a]"}`}>{cat}</button>)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => {
            const qty = getQty(item.id);
            return (
              <div key={item.id} className="group bg-[#161310] border border-[rgba(196,149,74,0.1)] hover:border-[rgba(196,149,74,0.35)] transition-all overflow-hidden">
                <div className="h-48 overflow-hidden bg-[#0c0a08]"><img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>
                <div className="p-5">
                  <div className="flex justify-between items-start mb-1.5">
                    <h3 className="font-['Fraunces'] text-lg text-[#ede4d4] leading-tight">{item.name}</h3>
                    <span className="font-['DM_Mono'] text-[#c4954a] text-sm shrink-0 ml-3">${item.price}</span>
                  </div>
                  <p className="text-xs font-['Jost'] text-[#8a7d6a] mb-4 leading-relaxed font-light">{item.desc}</p>
                  {qty > 0 ? (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-['DM_Mono'] text-[#c4954a]">In order</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQty(item.id, qty-1)} className="w-7 h-7 border border-[rgba(196,149,74,0.3)] text-[#c4954a] flex items-center justify-center hover:bg-[rgba(196,149,74,0.1)] transition-colors"><Minus size={11} /></button>
                        <span className="text-sm font-['DM_Mono'] text-[#ede4d4] w-5 text-center">{qty}</span>
                        <button onClick={() => addToCart({id:item.id,name:item.name,price:item.price,img:item.img})} className="w-7 h-7 border border-[rgba(196,149,74,0.3)] text-[#c4954a] flex items-center justify-center hover:bg-[rgba(196,149,74,0.1)] transition-colors"><Plus size={11} /></button>
                      </div>
                    </div>
                  ) : (
                    <button onClick={() => addToCart({id:item.id,name:item.name,price:item.price,img:item.img})} className="w-full border border-[rgba(196,149,74,0.3)] text-[#c4954a] py-2.5 text-[10px] font-['DM_Mono'] tracking-widest uppercase hover:bg-[rgba(196,149,74,0.1)] transition-colors">Add to Order</button>
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

// ─────────────────────────── GALLERY, ABOUT, CONTACT PAGES ────────────────────────────

function GalleryPage() {
  const cats = ["All","Rooms","Dining","Amenities"];
  const [filter, setFilter] = useState("All");
  const filtered = filter==="All"?GALLERY_IMAGES:GALLERY_IMAGES.filter(g=>g.cat===filter);
  return (
    <div className="pt-20">
      <div className="bg-[#161310] border-b border-[rgba(196,149,74,0.12)] py-16">
        <div className="max-w-7xl mx-auto px-6"><SectionLabel text="Gallery" /><h1 className="font-['Fraunces'] text-5xl text-[#ede4d4]">Seen at <em className="italic">Cedar Court</em></h1></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-2 mb-10 flex-wrap">
          {cats.map(c => <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 text-[10px] font-['DM_Mono'] tracking-widest uppercase transition-all border ${filter===c?"bg-[#c4954a] text-[#0c0a08] border-[#c4954a]":"border-[rgba(196,149,74,0.2)] text-[#8a7d6a] hover:border-[#c4954a] hover:text-[#c4954a]"}`}>{c}</button>)}
        </div>
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          {filtered.map(img => <div key={img.id} className="break-inside-avoid mb-4 group overflow-hidden bg-[#161310]"><img src={img.url} alt={img.alt} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" /></div>)}
        </div>
      </div>
    </div>
  );
}

function AboutPage({ setPage }: { setPage: (p: string) => void }) {
  return (
    <div className="pt-20">
      <div className="relative h-80">
        <img src="https://images.unsplash.com/photo-1730367019960-9906d9cbbf05?w=1920&h=600&fit=crop&auto=format" alt="Cedar Court" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-[#0c0a08]/70" />
        <div className="absolute inset-0 flex items-center"><div className="max-w-7xl mx-auto px-6"><SectionLabel text="Our Story" /><h1 className="font-['Fraunces'] text-5xl text-[#ede4d4]">About <em className="italic">Cedar Court</em></h1></div></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
          <div>
            <h2 className="font-['Fraunces'] text-3xl text-[#ede4d4] mb-6">A Legacy of <em className="italic">Considered Luxury</em></h2>
            <p className="font-['Jost'] text-[#8a7d6a] leading-relaxed mb-4 font-light">Cedar Court was founded in 1987 by the Ashford family, who believed that true luxury was not about opulence alone, but about the quiet mastery of every detail. That founding philosophy remains at the heart of everything we do.</p>
            <p className="font-['Jost'] text-[#8a7d6a] leading-relaxed mb-4 font-light">Located on a private estate in the heart of Mayfair, Cedar Court occupies a Grade I listed townhouse extended to house 48 rooms and suites, four event spaces, a two-Michelin-starred restaurant, and a world-class spa.</p>
            <p className="font-['Jost'] text-[#8a7d6a] leading-relaxed font-light">Today, the hotel is led by General Manager Helena Voss, who has spent seventeen years at Cedar Court refining the art of hospitality.</p>
            <div className="flex gap-4 mt-8">
              <button onClick={() => setPage("rooms")} className={`px-6 py-3 ${BTN_PRIMARY}`}>Our Rooms</button>
              <button onClick={() => setPage("contact")} className={`px-6 py-3 ${BTN_OUTLINE}`}>Contact Us</button>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1702814160779-4a88cfb330c7?w=800&h=600&fit=crop&auto=format" alt="Cedar Court interior" className="w-full h-96 object-cover" />
            <div className="absolute -bottom-4 -right-4 bg-[#161310] border border-[rgba(196,149,74,0.2)] p-5 hidden lg:block"><div className="font-['Fraunces'] text-3xl text-[#c4954a]">1987</div><div className="text-[10px] font-['DM_Mono'] text-[#8a7d6a]">Founded in Mayfair</div></div>
          </div>
        </div>
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.12)] p-10 mb-20">
          <div className="text-center mb-10"><div className="flex items-center justify-center gap-3 mb-3"><div className="h-px w-8 bg-[#c4954a]" /><span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">Recognition</span><div className="h-px w-8 bg-[#c4954a]" /></div><h2 className="font-['Fraunces'] text-3xl text-[#ede4d4]">Awards &amp; <em className="italic">Accolades</em></h2></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[["Forbes Travel Guide","Five Star 2026"],["Michelin Guide","Two Stars, Restaurant"],["Conde Nast Traveller","Gold List 2025"],["World Travel Awards","Best Boutique Hotel"]].map(([award,level]) => (
              <div key={award} className="text-center"><Award size={26} className="text-[#c4954a] mx-auto mb-3" strokeWidth={1.5} /><div className="font-['Fraunces'] text-[#ede4d4] mb-1 text-sm">{award}</div><div className="text-[10px] font-['DM_Mono'] text-[#c4954a]">{level}</div></div>
            ))}
          </div>
        </div>
        <div>
          <div className="text-center mb-10"><div className="flex items-center justify-center gap-3 mb-3"><div className="h-px w-8 bg-[#c4954a]" /><span className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-[0.3em] uppercase">Leadership</span><div className="h-px w-8 bg-[#c4954a]" /></div><h2 className="font-['Fraunces'] text-3xl text-[#ede4d4]">Meet the <em className="italic">Team</em></h2></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[["Helena Voss","General Manager","HV"],["Isabelle Moreau","Executive Chef","IM"],["Thomas Ashford","Director of Hospitality","TA"],["Priya Nair","Spa Director","PN"]].map(([name,role,init]) => (
              <div key={name} className="text-center group cursor-pointer" onClick={() => toast.info(`${name} — ${role}`)}>
                <div className="w-full aspect-square bg-[#161310] border border-[rgba(196,149,74,0.1)] group-hover:border-[rgba(196,149,74,0.3)] transition-all mb-4 flex items-center justify-center"><span className="font-['Fraunces'] text-5xl text-[#c4954a]/30 group-hover:text-[#c4954a]/50 transition-colors">{init}</span></div>
                <h3 className="font-['Fraunces'] text-[#ede4d4]">{name}</h3><p className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] mt-1">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name:"",email:"",phone:"",subject:"General Enquiry",message:"" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => setForm(f => ({...f,[k]:e.target.value}));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setSubmitted(true); setLoading(false); toast.success("Message sent! We will respond within 24 hours."); }, 1000);
  };
  return (
    <div className="pt-20">
      <div className="bg-[#161310] border-b border-[rgba(196,149,74,0.12)] py-16"><div className="max-w-7xl mx-auto px-6"><SectionLabel text="Get in Touch" /><h1 className="font-['Fraunces'] text-5xl text-[#ede4d4]">Contact <em className="italic">Us</em></h1></div></div>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-[#161310] border border-[rgba(196,149,74,0.2)] p-12 text-center">
                <CheckCircle size={48} className="text-[#c4954a] mx-auto mb-4" strokeWidth={1.5} />
                <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-2">Thank You</h2>
                <p className="font-['Jost'] text-[#8a7d6a] font-light">{"We'll be in touch within 24 hours."}</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-['Jost'] text-[#c4954a] hover:underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-6">Send a Message</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <FormField label="Full Name"><input type="text" required value={form.name} onChange={set("name")} className={INPUT} placeholder="Victoria Ashworth" /></FormField>
                  <FormField label="Email"><input type="email" required value={form.email} onChange={set("email")} className={INPUT} placeholder="victoria@example.com" /></FormField>
                </div>
                <FormField label="Phone (optional)"><input type="tel" value={form.phone} onChange={set("phone")} className={INPUT} placeholder="+44 20 0000 0000" /></FormField>
                <FormField label="Subject">
                  <select value={form.subject} onChange={set("subject")} className={INPUT}>
                    {["General Enquiry","Room Booking","Restaurant Reservation","Event Planning","Spa & Wellness","Corporate Travel"].map(s => <option key={s} value={s} className="bg-[#161310]">{s}</option>)}
                  </select>
                </FormField>
                <FormField label="Message"><textarea required rows={5} value={form.message} onChange={set("message")} className={INPUT.replace("w-full","w-full resize-none")} placeholder="How can we assist you?" /></FormField>
                <button type="submit" disabled={loading} className={`w-full py-4 ${BTN_PRIMARY} disabled:opacity-60`}>{loading?"Sending...":"Send Message"}</button>
              </form>
            )}
          </div>
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-6">Get in Touch</h2>
            {[{Icon:MapPin,label:"Address",value:"12 Cedar Court Lane\nMayfair, London W1K 4HF"},{Icon:Phone,label:"Telephone",value:"+44 20 7946 0312"},{Icon:Mail,label:"Email",value:"hello@cedarcourt.co.uk"},{Icon:Clock,label:"Concierge",value:"24 hours, 7 days a week"}].map(({Icon,label,value}) => (
              <div key={label} className="flex gap-4 p-5 bg-[#161310] border border-[rgba(196,149,74,0.1)]">
                <div className="w-10 h-10 border border-[rgba(196,149,74,0.2)] flex items-center justify-center shrink-0"><Icon size={15} className="text-[#c4954a]" strokeWidth={1.5} /></div>
                <div><div className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-1">{label}</div><div className="text-sm font-['Jost'] text-[#ede4d4] whitespace-pre-line font-light">{value}</div></div>
              </div>
            ))}
            <div className="h-44 bg-[#161310] border border-[rgba(196,149,74,0.1)] flex items-center justify-center">
              <div className="text-center"><MapPin size={28} className="text-[#c4954a] mx-auto mb-2" strokeWidth={1.5} /><p className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest">MAYFAIR, LONDON</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── USER PROFILE / MY BOOKINGS ────────────────────────────

function UserProfile({ authUser, bookings, setPage }: { authUser: any; bookings: any[]; setPage: (p: string) => void }) {
  const [tab, setTab] = useState<"bookings"|"orders"|"profile">("bookings");
  const myBookings = bookings.filter(b => b.email === authUser?.email);
  return (
    <div className="pt-20">
      <div className="bg-[#161310] border-b border-[rgba(196,149,74,0.12)] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel text="My Account" />
          <h1 className="font-['Fraunces'] text-4xl text-[#ede4d4]">Welcome, <em className="italic">{authUser?.firstName}</em></h1>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex gap-0 border border-[rgba(196,149,74,0.15)] w-fit mb-10">
          {(["bookings","orders","profile"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-6 py-3 text-[10px] font-['DM_Mono'] tracking-widest uppercase transition-all border-r border-[rgba(196,149,74,0.15)] last:border-r-0 ${tab===t?"bg-[#c4954a] text-[#0c0a08]":"text-[#8a7d6a] hover:text-[#c4954a]"}`}>
              {t === "bookings" ? "My Bookings" : t === "orders" ? "My Orders" : "Profile"}
            </button>
          ))}
        </div>
        {tab === "bookings" && (
          <div>
            {myBookings.length === 0 ? (
              <div className="text-center py-20 bg-[#161310] border border-[rgba(196,149,74,0.1)]">
                <BedDouble size={40} className="text-[#c4954a]/40 mx-auto mb-4" strokeWidth={1.5} />
                <p className="font-['Jost'] text-[#8a7d6a]">No bookings yet</p>
                <button onClick={() => setPage("rooms")} className={`mt-6 px-6 py-3 ${BTN_PRIMARY}`}>Explore Our Rooms</button>
              </div>
            ) : (
              <div className="space-y-4">
                {myBookings.map(b => (
                  <div key={b.id} className="bg-[#161310] border border-[rgba(196,149,74,0.12)] p-5 flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-['DM_Mono'] text-[#c4954a]">{b.id}</span>
                        <StatusBadge status={b.status} />
                      </div>
                      <h3 className="font-['Fraunces'] text-lg text-[#ede4d4]">{b.room}</h3>
                      <div className="flex gap-4 text-xs font-['DM_Mono'] text-[#8a7d6a] mt-1">
                        <span>Check-in: {b.checkIn}</span><span>·</span><span>Check-out: {b.checkOut}</span><span>·</span><span>{b.nights} nights</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-['Fraunces'] text-xl text-[#c4954a]">${b.total.toLocaleString()}</div>
                      <div className="flex gap-2 mt-2 justify-end">
                        <button onClick={() => toast.info(`Booking ${b.id} details`)} className="px-3 py-1.5 text-[10px] font-['DM_Mono'] border border-[rgba(196,149,74,0.2)] text-[#8a7d6a] hover:border-[#c4954a] hover:text-[#c4954a] transition-all">View Details</button>
                        {b.status === "Confirmed" && <button onClick={() => toast.success(`Booking ${b.id} cancellation requested`)} className="px-3 py-1.5 text-[10px] font-['DM_Mono'] border border-red-800/50 text-red-400/70 hover:border-red-600 hover:text-red-400 transition-all">Cancel</button>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {tab === "orders" && (
          <div className="text-center py-20 bg-[#161310] border border-[rgba(196,149,74,0.1)]">
            <Utensils size={40} className="text-[#c4954a]/40 mx-auto mb-4" strokeWidth={1.5} />
            <p className="font-['Jost'] text-[#8a7d6a]">No restaurant orders yet</p>
            <button onClick={() => setPage("menu")} className={`mt-6 px-6 py-3 ${BTN_PRIMARY}`}>Browse Our Menu</button>
          </div>
        )}
        {tab === "profile" && (
          <div className="max-w-lg">
            <div className="bg-[#161310] border border-[rgba(196,149,74,0.12)] p-6 mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-[rgba(196,149,74,0.15)] border border-[rgba(196,149,74,0.3)] flex items-center justify-center">
                  <span className="font-['Fraunces'] text-2xl text-[#c4954a]">{authUser?.firstName?.[0]}{authUser?.lastName?.[0]}</span>
                </div>
                <div>
                  <h3 className="font-['Fraunces'] text-xl text-[#ede4d4]">{authUser?.firstName} {authUser?.lastName}</h3>
                  <p className="text-xs font-['DM_Mono'] text-[#8a7d6a]">{authUser?.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <FormField label="First Name"><input type="text" defaultValue={authUser?.firstName} className={INPUT} /></FormField>
                <FormField label="Last Name"><input type="text" defaultValue={authUser?.lastName} className={INPUT} /></FormField>
                <FormField label="Email"><input type="email" defaultValue={authUser?.email} className={INPUT} /></FormField>
                <FormField label="Phone"><input type="tel" placeholder="+44 20 0000 0000" className={INPUT} /></FormField>
              </div>
            </div>
            <button onClick={() => toast.success("Profile updated successfully!")} className={`w-full py-3.5 ${BTN_PRIMARY}`}>Save Changes</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────── ADMIN LOGIN ────────────────────────────

function AdminLogin({ onLogin, onBack }: { onLogin: () => void; onBack: () => void }) {
  const [email, setEmail] = useState("admin@cedarcourt.co.uk");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      if (email==="admin@cedarcourt.co.uk" && password==="admin123") { onLogin(); }
      else { setError("Invalid credentials."); }
      setLoading(false);
    }, 800);
  };
  return (
    <div className="min-h-screen bg-[#0c0a08] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 border border-[#c4954a] rotate-45 flex items-center justify-center mx-auto mb-5"><span className="text-[#c4954a] text-sm font-['DM_Mono'] -rotate-45">CC</span></div>
          <h1 className="font-['Fraunces'] text-3xl text-[#ede4d4]">Admin Portal</h1>
          <p className="text-xs font-['DM_Mono'] text-[#8a7d6a] mt-2 tracking-widest">CEDAR COURT MANAGEMENT</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#161310] border border-[rgba(196,149,74,0.15)] p-8 space-y-5">
          {error && <div className="bg-red-900/20 border border-red-800/50 text-red-400 text-xs font-['DM_Mono'] p-3">{error}</div>}
          <FormField label="Email"><div className="relative"><input type="email" value={email} onChange={e=>setEmail(e.target.value)} className={INPUT+" pl-10"} /><Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]" /></div></FormField>
          <FormField label="Password"><div className="relative"><input type="password" value={password} onChange={e=>setPassword(e.target.value)} className={INPUT+" pl-10"} /><Lock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]" /></div></FormField>
          <button type="submit" disabled={loading} className={`w-full py-3.5 ${BTN_PRIMARY} disabled:opacity-60`}>{loading?"Signing in...":"Sign In"}</button>
          <div className="border-t border-[rgba(196,149,74,0.1)] pt-4 text-center"><p className="text-[10px] font-['DM_Mono'] text-[#8a7d6a]">Demo credentials pre-filled above</p></div>
        </form>
        <button onClick={onBack} className="mt-5 w-full text-center text-sm font-['Jost'] text-[#8a7d6a] hover:text-[#c4954a] transition-colors">&larr; Back to Website</button>
      </div>
    </div>
  );
}

// ─────────────────────────── ADMIN: DASHBOARD ────────────────────────────

function AdminDashboard({ bookings }: { bookings: any[] }) {
  const confirmed = bookings.filter(b => b.status === "Confirmed").length;
  const checkedIn = bookings.filter(b => b.status === "Checked In").length;
  return (
    <div className="p-8">
      <div className="mb-8"><h1 className="font-['Fraunces'] text-3xl text-[#ede4d4]">Dashboard</h1><p className="text-xs font-['DM_Mono'] text-[#8a7d6a] mt-1">Wednesday, 8 July 2026</p></div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[
          {label:"Revenue (Jul)",value:"$95,400",change:"+12.4%",up:true,Icon:TrendingUp},
          {label:"Active Bookings",value:String(confirmed+checkedIn),change:"+8.2%",up:true,Icon:Calendar},
          {label:"Occupancy Rate",value:"87%",change:"+3.1%",up:true,Icon:BedDouble},
          {label:"Avg. Stay",value:"3.2 nights",change:"-0.2",up:false,Icon:Clock},
        ].map(({label,value,change,up,Icon}) => (
          <div key={label} className="bg-[#161310] border border-[rgba(196,149,74,0.12)] p-5">
            <div className="flex items-start justify-between mb-4"><Icon size={18} className="text-[#c4954a]" strokeWidth={1.5} /><span className={`text-xs font-['DM_Mono'] ${up?"text-emerald-400":"text-red-400"}`}>{change}</span></div>
            <div className="font-['Fraunces'] text-2xl text-[#ede4d4] mb-1">{value}</div>
            <div className="text-[10px] font-['DM_Mono'] text-[#8a7d6a]">{label}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 bg-[#161310] border border-[rgba(196,149,74,0.12)] p-6">
          <h2 className="font-['Fraunces'] text-[#ede4d4] mb-6">Revenue Overview</h2>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={REVENUE_DATA}>
              <defs><linearGradient id="revG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#c4954a" stopOpacity={0.25} /><stop offset="95%" stopColor="#c4954a" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(196,149,74,0.08)" />
              <XAxis dataKey="month" tick={{fill:"#8a7d6a",fontSize:11}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill:"#8a7d6a",fontSize:11}} axisLine={false} tickLine={false} tickFormatter={v=>`$${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{background:"#1c1915",border:"1px solid rgba(196,149,74,0.2)",borderRadius:0}} labelStyle={{color:"#c4954a",fontSize:11}} itemStyle={{color:"#ede4d4",fontSize:12}} formatter={(v:any)=>[`$${Number(v).toLocaleString()}`,"Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#c4954a" strokeWidth={2} fill="url(#revG)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.12)] p-6">
          <h2 className="font-['Fraunces'] text-[#ede4d4] mb-4">Room Types</h2>
          <ResponsiveContainer width="100%" height={220}>
            <RechartsPie>
              <Pie data={ROOM_TYPE_DATA} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({name,percent})=>`${name} ${(percent*100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                {ROOM_TYPE_DATA.map((e,i)=><Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{background:"#1c1915",border:"1px solid rgba(196,149,74,0.2)",borderRadius:0}} itemStyle={{color:"#ede4d4",fontSize:12}} />
            </RechartsPie>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-[#161310] border border-[rgba(196,149,74,0.12)]">
        <div className="px-6 py-4 border-b border-[rgba(196,149,74,0.1)] flex items-center justify-between">
          <h2 className="font-['Fraunces'] text-[#ede4d4]">Recent Bookings</h2>
          <span className="text-[10px] font-['DM_Mono'] text-[#8a7d6a]">Latest 5</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-[rgba(196,149,74,0.08)]">{["ID","Guest","Room","Check-in","Nights","Total","Status"].map(h=><th key={h} className="px-5 py-3 text-left text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody>
              {bookings.slice(0,5).map(b=>(
                <tr key={b.id} className="border-b border-[rgba(196,149,74,0.05)] hover:bg-[rgba(196,149,74,0.03)] transition-colors">
                  <td className="px-5 py-4 text-xs font-['DM_Mono'] text-[#c4954a]">{b.id}</td>
                  <td className="px-5 py-4 text-sm font-['Jost'] text-[#ede4d4]">{b.guest}</td>
                  <td className="px-5 py-4 text-sm font-['Jost'] text-[#8a7d6a] whitespace-nowrap">{b.room}</td>
                  <td className="px-5 py-4 text-xs font-['DM_Mono'] text-[#8a7d6a]">{b.checkIn}</td>
                  <td className="px-5 py-4 text-xs font-['DM_Mono'] text-[#8a7d6a]">{b.nights}</td>
                  <td className="px-5 py-4 text-sm font-['DM_Mono'] text-[#c4954a]">${b.total.toLocaleString()}</td>
                  <td className="px-5 py-4"><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── ADMIN: BOOKINGS ────────────────────────────

function AdminBookings({ bookings, setBookings }: { bookings: any[]; setBookings: (b: any[]) => void }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewBooking, setViewBooking] = useState<any>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBooking, setNewBooking] = useState({ guest:"",email:"",room:"Deluxe Room",roomId:1,checkIn:"",checkOut:"",nights:1,guests:2,special:"",total:0,status:"Confirmed" });

  const filtered = bookings.filter(b => {
    const ms = b.guest.toLowerCase().includes(search.toLowerCase()) || b.id.includes(search);
    const mf = statusFilter==="All" || b.status===statusFilter;
    return ms && mf;
  });

  const updateStatus = (id: string, status: string) => {
    setBookings(bookings.map(b => b.id===id ? {...b,status} : b));
    toast.success(`Booking ${id} updated to ${status}`);
  };

  const deleteBooking = (id: string) => {
    setBookings(bookings.filter(b => b.id!==id));
    toast.success(`Booking ${id} removed`);
  };

  const addBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const nights = newBooking.checkIn && newBooking.checkOut ? Math.max(1, Math.round((new Date(newBooking.checkOut).getTime()-new Date(newBooking.checkIn).getTime())/86400000)) : 1;
    const roomPrice = DEFAULT_ROOMS.find(r=>r.name===newBooking.room)?.price ?? 280;
    const newB = { ...newBooking, id: genRef("BK-"), nights, total: roomPrice * nights };
    setBookings([newB, ...bookings]);
    setShowAddModal(false);
    toast.success(`Booking ${newB.id} created!`);
  };

  return (
    <div className="p-8">
      {viewBooking && (
        <ModalWrapper title={`Booking ${viewBooking.id}`} onClose={() => setViewBooking(null)} wide>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[["Guest",viewBooking.guest],["Email",viewBooking.email||"—"],["Room",viewBooking.room],["Check-in",viewBooking.checkIn],["Check-out",viewBooking.checkOut],["Nights",viewBooking.nights],["Guests",viewBooking.guests||1],["Total","$"+viewBooking.total.toLocaleString()]].map(([l,v])=>(
                <div key={l} className="bg-[#0c0a08] border border-[rgba(196,149,74,0.1)] p-3">
                  <p className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-1">{l}</p>
                  <p className="font-['Jost'] text-[#ede4d4]">{v}</p>
                </div>
              ))}
            </div>
            {viewBooking.special && <div className="bg-[#0c0a08] border border-[rgba(196,149,74,0.1)] p-3"><p className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-1">Special Requests</p><p className="font-['Jost'] text-[#ede4d4] text-sm">{viewBooking.special}</p></div>}
            <div>
              <label className={LABEL}>Update Status</label>
              <div className="flex flex-wrap gap-2">
                {["Confirmed","Checked In","Checked Out","Pending","Cancelled"].map(s => (
                  <button key={s} onClick={() => { updateStatus(viewBooking.id, s); setViewBooking({...viewBooking,status:s}); }} className={`px-3 py-1.5 text-[10px] font-['DM_Mono'] border transition-all ${viewBooking.status===s?"bg-[#c4954a] text-[#0c0a08] border-[#c4954a]":"border-[rgba(196,149,74,0.2)] text-[#8a7d6a] hover:border-[#c4954a]"}`}>{s}</button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => { toast.success(`Invoice sent to ${viewBooking.email||viewBooking.guest}`); }} className={`flex-1 py-3 ${BTN_OUTLINE} text-sm`}><Download size={13} className="inline mr-2" />Send Invoice</button>
              <button onClick={() => { deleteBooking(viewBooking.id); setViewBooking(null); }} className="flex-1 py-3 border border-red-800/50 text-red-400 text-sm font-['Jost'] hover:border-red-600 transition-all"><Trash2 size={13} className="inline mr-2" />Delete</button>
            </div>
          </div>
        </ModalWrapper>
      )}
      {showAddModal && (
        <ModalWrapper title="New Booking" onClose={() => setShowAddModal(false)} wide>
          <form onSubmit={addBooking} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Guest Name"><input required value={newBooking.guest} onChange={e=>setNewBooking(b=>({...b,guest:e.target.value}))} className={INPUT} placeholder="Victoria Ashworth" /></FormField>
              <FormField label="Email"><input type="email" value={newBooking.email} onChange={e=>setNewBooking(b=>({...b,email:e.target.value}))} className={INPUT} placeholder="guest@email.com" /></FormField>
            </div>
            <FormField label="Room">
              <select value={newBooking.room} onChange={e=>{const r=DEFAULT_ROOMS.find(x=>x.name===e.target.value);setNewBooking(b=>({...b,room:e.target.value,roomId:r?.id??1}));}} className={INPUT}>
                {DEFAULT_ROOMS.map(r=><option key={r.id} value={r.name} className="bg-[#161310]">{r.name} — ${r.price}/night</option>)}
              </select>
            </FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Check-in"><input type="date" required value={newBooking.checkIn} onChange={e=>setNewBooking(b=>({...b,checkIn:e.target.value}))} className={INPUT+" [color-scheme:dark]"} /></FormField>
              <FormField label="Check-out"><input type="date" required value={newBooking.checkOut} onChange={e=>setNewBooking(b=>({...b,checkOut:e.target.value}))} className={INPUT+" [color-scheme:dark]"} /></FormField>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Guests">
                <select value={newBooking.guests} onChange={e=>setNewBooking(b=>({...b,guests:Number(e.target.value)}))} className={INPUT}>
                  {[1,2,3,4].map(n=><option key={n} value={n} className="bg-[#161310]">{n}</option>)}
                </select>
              </FormField>
              <FormField label="Status">
                <select value={newBooking.status} onChange={e=>setNewBooking(b=>({...b,status:e.target.value}))} className={INPUT}>
                  {["Confirmed","Pending","Checked In"].map(s=><option key={s} value={s} className="bg-[#161310]">{s}</option>)}
                </select>
              </FormField>
            </div>
            <FormField label="Special Requests"><input value={newBooking.special} onChange={e=>setNewBooking(b=>({...b,special:e.target.value}))} className={INPUT} placeholder="Optional" /></FormField>
            <div className="flex gap-3 pt-2">
              <button type="button" onClick={()=>setShowAddModal(false)} className={`flex-1 py-3 ${BTN_OUTLINE} text-sm`}>Cancel</button>
              <button type="submit" className={`flex-1 py-3 ${BTN_PRIMARY}`}>Create Booking</button>
            </div>
          </form>
        </ModalWrapper>
      )}
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-['Fraunces'] text-3xl text-[#ede4d4]">Bookings</h1><p className="text-xs font-['DM_Mono'] text-[#8a7d6a] mt-1">{bookings.length} total bookings</p></div>
        <button onClick={()=>setShowAddModal(true)} className={`px-4 py-2.5 ${BTN_PRIMARY} flex items-center gap-2`}><Plus size={13} /> New Booking</button>
      </div>
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-1 min-w-52 max-w-xs"><input type="text" placeholder="Search..." value={search} onChange={e=>setSearch(e.target.value)} className={INPUT.replace("bg-[#0c0a08]","bg-[#161310]")+" pl-9"} /><Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]" /></div>
        <div className="flex flex-wrap gap-2">
          {["All","Confirmed","Checked In","Pending","Checked Out"].map(s=>(
            <button key={s} onClick={()=>setStatusFilter(s)} className={`px-3 py-2 text-[10px] font-['DM_Mono'] tracking-wider uppercase transition-all border ${statusFilter===s?"bg-[#c4954a] text-[#0c0a08] border-[#c4954a]":"border-[rgba(196,149,74,0.2)] text-[#8a7d6a] hover:border-[#c4954a]"}`}>{s}</button>
          ))}
        </div>
      </div>
      <div className="bg-[#161310] border border-[rgba(196,149,74,0.12)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-[rgba(196,149,74,0.1)]">{["ID","Guest","Room","Check-in","Check-out","Nights","Total","Status","Actions"].map(h=><th key={h} className="px-5 py-3.5 text-left text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map(b=>(
                <tr key={b.id} className="border-b border-[rgba(196,149,74,0.05)] hover:bg-[rgba(196,149,74,0.03)] transition-colors">
                  <td className="px-5 py-4 text-xs font-['DM_Mono'] text-[#c4954a]">{b.id}</td>
                  <td className="px-5 py-4 text-sm font-['Jost'] text-[#ede4d4]">{b.guest}</td>
                  <td className="px-5 py-4 text-sm font-['Jost'] text-[#8a7d6a] whitespace-nowrap">{b.room}</td>
                  <td className="px-5 py-4 text-xs font-['DM_Mono'] text-[#8a7d6a]">{b.checkIn}</td>
                  <td className="px-5 py-4 text-xs font-['DM_Mono'] text-[#8a7d6a]">{b.checkOut}</td>
                  <td className="px-5 py-4 text-xs font-['DM_Mono'] text-[#8a7d6a]">{b.nights}</td>
                  <td className="px-5 py-4 text-sm font-['DM_Mono'] text-[#c4954a]">${b.total.toLocaleString()}</td>
                  <td className="px-5 py-4"><StatusBadge status={b.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={()=>setViewBooking(b)} className="w-7 h-7 border border-[rgba(196,149,74,0.2)] flex items-center justify-center text-[#8a7d6a] hover:text-[#c4954a] hover:border-[#c4954a] transition-all" title="View"><Eye size={11} /></button>
                      <button onClick={()=>deleteBooking(b.id)} className="w-7 h-7 border border-[rgba(196,149,74,0.2)] flex items-center justify-center text-[#8a7d6a] hover:text-red-400 hover:border-red-800 transition-all" title="Delete"><Trash2 size={11} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length===0 && <div className="py-16 text-center text-sm font-['Jost'] text-[#8a7d6a]">No bookings match your search.</div>}
      </div>
    </div>
  );
}

// ─────────────────────────── ADMIN: ROOMS ────────────────────────────

function AdminRooms({ rooms, setRooms }: { rooms: any[]; setRooms: (r: any[]) => void }) {
  const [editRoom, setEditRoom] = useState<any>(null);
  const [showAdd, setShowAdd] = useState(false);
  const emptyRoom = { name:"New Room",type:"Classic",price:220,size:"28 m²",capacity:2,view:"Garden View",status:"Available",description:"",amenities:["Free WiFi","En-suite Bathroom"],gallery:[],image:"https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=560&fit=crop&auto=format",rating:4.5,reviews:0 };
  const [formRoom, setFormRoom] = useState(emptyRoom);
  const fr = (k:string)=>(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>setFormRoom(r=>({...r,[k]:e.target.type==="number"?Number(e.target.value):e.target.value}));

  const saveRoom = (e:React.FormEvent) => {
    e.preventDefault();
    if (editRoom) {
      setRooms(rooms.map(r=>r.id===editRoom.id?{...editRoom,...formRoom}:r));
      toast.success(`${formRoom.name} updated!`);
      setEditRoom(null);
    } else {
      const newR = {...formRoom, id: Date.now(), gallery:[formRoom.image]};
      setRooms([...rooms, newR]);
      toast.success(`${formRoom.name} added!`);
      setShowAdd(false);
    }
  };

  const deleteRoom = (id:number) => { setRooms(rooms.filter(r=>r.id!==id)); toast.success("Room removed"); };

  const RoomForm = () => (
    <form onSubmit={saveRoom} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Room Name"><input required value={formRoom.name} onChange={fr("name")} className={INPUT} /></FormField>
        <FormField label="Type">
          <select value={formRoom.type} onChange={fr("type")} className={INPUT}>
            {["Classic","Deluxe","Suite","Presidential","Villa"].map(t=><option key={t} value={t} className="bg-[#161310]">{t}</option>)}
          </select>
        </FormField>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <FormField label="Price/Night ($)"><input type="number" required value={formRoom.price} onChange={fr("price")} className={INPUT} /></FormField>
        <FormField label="Size"><input value={formRoom.size} onChange={fr("size")} className={INPUT} placeholder="35 m²" /></FormField>
        <FormField label="Capacity"><input type="number" value={formRoom.capacity} onChange={fr("capacity")} className={INPUT} min={1} max={8} /></FormField>
      </div>
      <FormField label="View"><input value={formRoom.view} onChange={fr("view")} className={INPUT} placeholder="City View" /></FormField>
      <FormField label="Status">
        <select value={formRoom.status} onChange={fr("status")} className={INPUT}>
          {["Available","Occupied","Maintenance"].map(s=><option key={s} value={s} className="bg-[#161310]">{s}</option>)}
        </select>
      </FormField>
      <FormField label="Description"><textarea value={formRoom.description} onChange={fr("description")} rows={3} className={INPUT.replace("w-full","w-full resize-none")} placeholder="Room description..." /></FormField>
      <FormField label="Image URL"><input value={formRoom.image} onChange={fr("image")} className={INPUT} placeholder="https://images.unsplash.com/..." /></FormField>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={()=>{setEditRoom(null);setShowAdd(false);}} className={`flex-1 py-3 ${BTN_OUTLINE} text-sm`}>Cancel</button>
        <button type="submit" className={`flex-1 py-3 ${BTN_PRIMARY}`}>{editRoom?"Save Changes":"Add Room"}</button>
      </div>
    </form>
  );

  return (
    <div className="p-8">
      {(editRoom || showAdd) && (
        <ModalWrapper title={editRoom?`Edit: ${editRoom.name}`:"Add New Room"} onClose={()=>{setEditRoom(null);setShowAdd(false);}} wide>
          <RoomForm />
        </ModalWrapper>
      )}
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-['Fraunces'] text-3xl text-[#ede4d4]">Rooms</h1><p className="text-xs font-['DM_Mono'] text-[#8a7d6a] mt-1">{rooms.length} rooms &amp; villas</p></div>
        <button onClick={()=>{setFormRoom(emptyRoom);setShowAdd(true);}} className={`px-4 py-2.5 ${BTN_PRIMARY} flex items-center gap-2`}><Plus size={13} /> Add Room</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {rooms.map(room => (
          <div key={room.id} className="bg-[#161310] border border-[rgba(196,149,74,0.12)] overflow-hidden">
            <div className="h-40 overflow-hidden relative bg-[#0c0a08]">
              <img src={room.image} alt={room.name} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3"><RoomStatusBadge status={room.status} /></div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-1.5">
                <div><span className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase">{room.type}</span><h3 className="font-['Fraunces'] text-[#ede4d4]">{room.name}</h3></div>
                <span className="font-['DM_Mono'] text-[#c4954a] text-sm shrink-0 ml-2">${room.price}<span className="text-[10px] text-[#8a7d6a]">/n</span></span>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-['DM_Mono'] text-[#8a7d6a] mb-4"><span>{room.size}</span><span>·</span><span>{room.capacity} guests</span><span>·</span><span className="truncate">{room.view}</span></div>
              <div className="flex gap-2">
                <button onClick={()=>{setFormRoom({...room});setEditRoom(room);}} className="flex-1 border border-[rgba(196,149,74,0.2)] text-[#8a7d6a] py-2 text-[10px] font-['DM_Mono'] tracking-wider uppercase hover:border-[#c4954a] hover:text-[#c4954a] transition-all flex items-center justify-center gap-1.5"><Edit2 size={10} /> Edit</button>
                <button onClick={()=>deleteRoom(room.id)} className="flex-1 border border-[rgba(196,149,74,0.2)] text-[#8a7d6a] py-2 text-[10px] font-['DM_Mono'] tracking-wider uppercase hover:border-red-800 hover:text-red-400 transition-all flex items-center justify-center gap-1.5"><Trash2 size={10} /> Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────── ADMIN: MENU ────────────────────────────

function AdminMenu({ menuItems, setMenuItems }: { menuItems: any[]; setMenuItems: (m: any[]) => void }) {
  const cats = ["All","Breakfast","Lunch","Dinner","Drinks","Desserts"];
  const [activeCat, setActiveCat] = useState("All");
  const [editItem, setEditItem] = useState<any>(null);
  const [showAdd, setShowAdd] = useState(false);
  const emptyItem = { name:"",cat:"Breakfast",desc:"",price:0,available:true,img:"https://images.unsplash.com/photo-1513772457252-c0417654a2a0?w=400&h=280&fit=crop&auto=format" };
  const [formItem, setFormItem] = useState(emptyItem);
  const fi = (k:string)=>(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>setFormItem(i=>({...i,[k]:e.target.type==="number"?Number(e.target.value):e.target.value}));
  const filtered = activeCat==="All"?menuItems:menuItems.filter(m=>m.cat===activeCat);

  const saveItem = (e:React.FormEvent) => {
    e.preventDefault();
    if (editItem) {
      setMenuItems(menuItems.map(m=>m.id===editItem.id?{...m,...formItem}:m));
      toast.success(`${formItem.name} updated!`);
      setEditItem(null);
    } else {
      setMenuItems([...menuItems,{...formItem,id:"m"+Date.now()}]);
      toast.success(`${formItem.name} added to menu!`);
      setShowAdd(false);
    }
  };

  const toggleAvailable = (id:string) => {
    setMenuItems(menuItems.map(m=>m.id===id?{...m,available:!m.available}:m));
    toast.success("Availability updated");
  };

  const deleteItem = (id:string) => { setMenuItems(menuItems.filter(m=>m.id!==id)); toast.success("Item removed"); };

  const ItemForm = () => (
    <form onSubmit={saveItem} className="space-y-4">
      <FormField label="Item Name"><input required value={formItem.name} onChange={fi("name")} className={INPUT} placeholder="Wagyu Striploin" /></FormField>
      <div className="grid grid-cols-2 gap-4">
        <FormField label="Category">
          <select value={formItem.cat} onChange={fi("cat")} className={INPUT}>
            {["Breakfast","Lunch","Dinner","Drinks","Desserts"].map(c=><option key={c} value={c} className="bg-[#161310]">{c}</option>)}
          </select>
        </FormField>
        <FormField label="Price ($)"><input type="number" required value={formItem.price} onChange={fi("price")} className={INPUT} min={0} /></FormField>
      </div>
      <FormField label="Description"><textarea required value={formItem.desc} onChange={fi("desc")} rows={3} className={INPUT.replace("w-full","w-full resize-none")} placeholder="Describe the dish..." /></FormField>
      <FormField label="Image URL"><input value={formItem.img} onChange={fi("img")} className={INPUT} placeholder="https://images.unsplash.com/..." /></FormField>
      <div className="flex gap-3 pt-2">
        <button type="button" onClick={()=>{setEditItem(null);setShowAdd(false);}} className={`flex-1 py-3 ${BTN_OUTLINE} text-sm`}>Cancel</button>
        <button type="submit" className={`flex-1 py-3 ${BTN_PRIMARY}`}>{editItem?"Save Changes":"Add Item"}</button>
      </div>
    </form>
  );

  return (
    <div className="p-8">
      {(editItem||showAdd) && <ModalWrapper title={editItem?`Edit: ${editItem.name}`:"Add Menu Item"} onClose={()=>{setEditItem(null);setShowAdd(false);}}><ItemForm /></ModalWrapper>}
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-['Fraunces'] text-3xl text-[#ede4d4]">Menu Management</h1><p className="text-xs font-['DM_Mono'] text-[#8a7d6a] mt-1">{menuItems.length} items</p></div>
        <button onClick={()=>{setFormItem(emptyItem);setShowAdd(true);}} className={`px-4 py-2.5 ${BTN_PRIMARY} flex items-center gap-2`}><Plus size={13} /> Add Item</button>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {cats.map(c=><button key={c} onClick={()=>setActiveCat(c)} className={`px-3 py-1.5 text-[10px] font-['DM_Mono'] tracking-wider uppercase transition-all border ${activeCat===c?"bg-[#c4954a] text-[#0c0a08] border-[#c4954a]":"border-[rgba(196,149,74,0.2)] text-[#8a7d6a] hover:border-[#c4954a]"}`}>{c}</button>)}
      </div>
      <div className="bg-[#161310] border border-[rgba(196,149,74,0.12)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-[rgba(196,149,74,0.1)]">{["Item","Category","Price","Status","Actions"].map(h=><th key={h} className="px-5 py-3.5 text-left text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map(item=>(
                <tr key={item.id} className="border-b border-[rgba(196,149,74,0.05)] hover:bg-[rgba(196,149,74,0.03)] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img src={item.img} alt={item.name} className="w-10 h-10 object-cover bg-[#0c0a08] shrink-0" />
                      <div><div className="text-sm font-['Jost'] text-[#ede4d4]">{item.name}</div><div className="text-xs font-['Jost'] text-[#8a7d6a] font-light truncate max-w-xs">{item.desc}</div></div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className="text-[10px] font-['DM_Mono'] text-[#c4954a] border border-[rgba(196,149,74,0.2)] px-2 py-0.5">{item.cat}</span></td>
                  <td className="px-5 py-4 text-sm font-['DM_Mono'] text-[#c4954a]">${item.price}</td>
                  <td className="px-5 py-4">
                    <button onClick={()=>toggleAvailable(item.id)} className={`px-2.5 py-0.5 text-[10px] font-['DM_Mono'] border transition-all ${item.available?"bg-emerald-900/40 text-emerald-400 border-emerald-800":"bg-zinc-800 text-zinc-400 border-zinc-700"}`}>
                      {item.available?"Available":"Unavailable"}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button onClick={()=>{setFormItem({...item});setEditItem(item);}} className="w-7 h-7 border border-[rgba(196,149,74,0.2)] flex items-center justify-center text-[#8a7d6a] hover:text-[#c4954a] hover:border-[#c4954a] transition-all"><Edit2 size={11} /></button>
                      <button onClick={()=>deleteItem(item.id)} className="w-7 h-7 border border-[rgba(196,149,74,0.2)] flex items-center justify-center text-[#8a7d6a] hover:text-red-400 hover:border-red-800 transition-all"><Trash2 size={11} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── ADMIN: GUESTS ────────────────────────────

function AdminGuests({ guests, setGuests }: { guests: any[]; setGuests: (g: any[]) => void }) {
  const [search, setSearch] = useState("");
  const [viewGuest, setViewGuest] = useState<any>(null);
  const filtered = guests.filter(g=>g.name.toLowerCase().includes(search.toLowerCase())||g.email.toLowerCase().includes(search.toLowerCase()));
  const tierStyle = (t:string) => t==="Platinum"?"bg-purple-900/40 text-purple-300 border-purple-800":t==="Gold"?"bg-amber-900/40 text-amber-400 border-amber-800":"bg-zinc-800 text-zinc-400 border-zinc-700";

  return (
    <div className="p-8">
      {viewGuest && (
        <ModalWrapper title={viewGuest.name} onClose={()=>setViewGuest(null)} wide>
          <div className="space-y-5">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 bg-[rgba(196,149,74,0.12)] border border-[rgba(196,149,74,0.25)] flex items-center justify-center">
                <span className="font-['Fraunces'] text-xl text-[#c4954a]">{viewGuest.name.split(" ").map((n:string)=>n[0]).join("").slice(0,2)}</span>
              </div>
              <div>
                <h3 className="font-['Fraunces'] text-xl text-[#ede4d4]">{viewGuest.name}</h3>
                <span className={`inline-flex px-2.5 py-0.5 text-[10px] font-['DM_Mono'] border ${tierStyle(viewGuest.tier)}`}>{viewGuest.tier}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[["Email",viewGuest.email],["Phone",viewGuest.phone],["Nationality",viewGuest.nationality||"—"],["Total Stays",viewGuest.stays],["Total Spent","$"+viewGuest.total.toLocaleString()],["Last Stay",viewGuest.lastStay]].map(([l,v])=>(
                <div key={l} className="bg-[#0c0a08] border border-[rgba(196,149,74,0.1)] p-3"><p className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-1">{l}</p><p className="font-['Jost'] text-[#ede4d4]">{v}</p></div>
              ))}
            </div>
            {viewGuest.notes && <div className="bg-[#0c0a08] border border-[rgba(196,149,74,0.1)] p-3"><p className="text-[10px] font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-1">Notes</p><p className="font-['Jost'] text-[#ede4d4] text-sm">{viewGuest.notes}</p></div>}
            <div>
              <label className={LABEL}>Loyalty Tier</label>
              <div className="flex gap-2">
                {["Silver","Gold","Platinum"].map(t=>(
                  <button key={t} onClick={()=>{setGuests(guests.map(g=>g.id===viewGuest.id?{...g,tier:t}:g));setViewGuest({...viewGuest,tier:t});toast.success(`Tier updated to ${t}`);}} className={`px-4 py-2 text-xs font-['DM_Mono'] border transition-all ${viewGuest.tier===t?"bg-[#c4954a] text-[#0c0a08] border-[#c4954a]":"border-[rgba(196,149,74,0.2)] text-[#8a7d6a] hover:border-[#c4954a]"}`}>{t}</button>
                ))}
              </div>
            </div>
            <button onClick={()=>toast.success(`Email sent to ${viewGuest.email}`)} className={`w-full py-3 ${BTN_OUTLINE} text-sm`}><Mail size={13} className="inline mr-2" />Send Email</button>
          </div>
        </ModalWrapper>
      )}
      <div className="flex items-center justify-between mb-8">
        <div><h1 className="font-['Fraunces'] text-3xl text-[#ede4d4]">Guests</h1><p className="text-xs font-['DM_Mono'] text-[#8a7d6a] mt-1">{guests.length} registered guests</p></div>
        <button onClick={()=>toast.info("Guest import feature coming soon!")} className={`px-4 py-2.5 ${BTN_OUTLINE} flex items-center gap-2 text-sm`}><Download size={13} /> Export</button>
      </div>
      <div className="relative mb-6 max-w-xs"><input type="text" placeholder="Search guests..." value={search} onChange={e=>setSearch(e.target.value)} className={INPUT.replace("bg-[#0c0a08]","bg-[#161310]")+" pl-9"} /><Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]" /></div>
      <div className="bg-[#161310] border border-[rgba(196,149,74,0.12)]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-[rgba(196,149,74,0.1)]">{["Guest","Contact","Stays","Total Spent","Tier","Last Stay",""].map(h=><th key={h} className="px-5 py-3.5 text-left text-[10px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase whitespace-nowrap">{h}</th>)}</tr></thead>
            <tbody>
              {filtered.map(g=>(
                <tr key={g.id} className="border-b border-[rgba(196,149,74,0.05)] hover:bg-[rgba(196,149,74,0.03)] transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-[rgba(196,149,74,0.1)] border border-[rgba(196,149,74,0.2)] flex items-center justify-center shrink-0"><span className="text-[10px] font-['DM_Mono'] text-[#c4954a]">{g.name.split(" ").map((n:string)=>n[0]).join("").slice(0,2)}</span></div>
                      <div><div className="text-sm font-['Jost'] text-[#ede4d4]">{g.name}</div><div className="text-[10px] font-['DM_Mono'] text-[#8a7d6a]">{g.id}</div></div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><div className="text-xs font-['Jost'] text-[#8a7d6a]">{g.email}</div><div className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] mt-0.5">{g.phone}</div></td>
                  <td className="px-5 py-4 text-sm font-['DM_Mono'] text-[#ede4d4]">{g.stays}</td>
                  <td className="px-5 py-4 text-sm font-['DM_Mono'] text-[#c4954a]">${g.total.toLocaleString()}</td>
                  <td className="px-5 py-4"><span className={`inline-flex px-2.5 py-0.5 text-[10px] font-['DM_Mono'] border ${tierStyle(g.tier)}`}>{g.tier}</span></td>
                  <td className="px-5 py-4 text-xs font-['DM_Mono'] text-[#8a7d6a]">{g.lastStay}</td>
                  <td className="px-5 py-4"><button onClick={()=>setViewGuest(g)} className="w-7 h-7 border border-[rgba(196,149,74,0.2)] flex items-center justify-center text-[#8a7d6a] hover:text-[#c4954a] hover:border-[#c4954a] transition-all"><Eye size={11} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── ADMIN: SETTINGS ────────────────────────────

function AdminSettings() {
  const [hotel, setHotel] = useState({ name:"Cedar Court", address:"12 Cedar Court Lane, Mayfair", phone:"+44 20 7946 0312", email:"hello@cedarcourt.co.uk", checkIn:"14:00", checkOut:"12:00", currency:"GBP" });
  const [notifs, setNotifs] = useState({ newBooking:true, cancellation:true, checkin:true, lowOccupancy:false, weeklyReport:true });
  const [paymentKey, setPaymentKey] = useState("sk_test_••••••••••••••••");
  const set = (k:string)=>(e:React.ChangeEvent<HTMLInputElement>)=>setHotel(h=>({...h,[k]:e.target.value}));

  return (
    <div className="p-8">
      <div className="mb-8"><h1 className="font-['Fraunces'] text-3xl text-[#ede4d4]">Settings</h1><p className="text-xs font-['DM_Mono'] text-[#8a7d6a] mt-1">Hotel configuration &amp; preferences</p></div>
      <div className="max-w-3xl space-y-8">
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.12)] p-6">
          <h2 className="font-['Fraunces'] text-xl text-[#ede4d4] mb-5">Hotel Details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Hotel Name"><input value={hotel.name} onChange={set("name")} className={INPUT} /></FormField>
              <FormField label="Phone"><input value={hotel.phone} onChange={set("phone")} className={INPUT} /></FormField>
            </div>
            <FormField label="Address"><input value={hotel.address} onChange={set("address")} className={INPUT} /></FormField>
            <FormField label="Email"><input value={hotel.email} onChange={set("email")} className={INPUT} /></FormField>
            <div className="grid grid-cols-3 gap-4">
              <FormField label="Check-in Time"><input type="time" value={hotel.checkIn} onChange={set("checkIn")} className={INPUT+" [color-scheme:dark]"} /></FormField>
              <FormField label="Check-out Time"><input type="time" value={hotel.checkOut} onChange={set("checkOut")} className={INPUT+" [color-scheme:dark]"} /></FormField>
              <FormField label="Currency">
                <select value={hotel.currency} onChange={e=>setHotel(h=>({...h,currency:e.target.value}))} className={INPUT}>
                  {["GBP","USD","EUR","AED"].map(c=><option key={c} value={c} className="bg-[#161310]">{c}</option>)}
                </select>
              </FormField>
            </div>
          </div>
          <button onClick={()=>toast.success("Hotel details saved!")} className={`mt-5 px-6 py-3 ${BTN_PRIMARY}`}>Save Details</button>
        </div>
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.12)] p-6">
          <h2 className="font-['Fraunces'] text-xl text-[#ede4d4] mb-5">Notifications</h2>
          <div className="space-y-3">
            {([["newBooking","New booking received"],["cancellation","Booking cancellation"],["checkin","Guest check-in reminder"],["lowOccupancy","Low occupancy alert (below 60%)"],["weeklyReport","Weekly performance report"]] as const).map(([key,label])=>(
              <div key={key} className="flex items-center justify-between py-3 border-b border-[rgba(196,149,74,0.06)] last:border-b-0">
                <span className="text-sm font-['Jost'] text-[#ede4d4]">{label}</span>
                <button onClick={()=>setNotifs(n=>({...n,[key]:!n[key]}))} className={`w-12 h-6 rounded-full transition-all relative ${notifs[key]?"bg-[#c4954a]":"bg-[#2c2620]"}`}>
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow ${notifs[key]?"left-6":"left-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={()=>toast.success("Notification preferences saved!")} className={`mt-5 px-6 py-3 ${BTN_PRIMARY}`}>Save Preferences</button>
        </div>
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.12)] p-6">
          <h2 className="font-['Fraunces'] text-xl text-[#ede4d4] mb-2">Payment Gateway</h2>
          <p className="text-xs font-['DM_Mono'] text-[#8a7d6a] mb-5">Stripe API configuration</p>
          <FormField label="Secret Key">
            <div className="relative"><input type="password" value={paymentKey} onChange={e=>setPaymentKey(e.target.value)} className={INPUT+" pr-24"} /><span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-['DM_Mono'] text-emerald-400 border border-emerald-800 px-1.5 py-0.5">LIVE</span></div>
          </FormField>
          <FormField label="Webhook URL">
            <input value="https://cedarcourt.co.uk/api/webhooks/stripe" readOnly className={INPUT+" opacity-50 cursor-not-allowed"} />
          </FormField>
          <button onClick={()=>toast.success("Payment settings saved!")} className={`mt-5 px-6 py-3 ${BTN_PRIMARY}`}>Save Payment Settings</button>
        </div>
        <div className="bg-[#161310] border border-[rgba(196,149,74,0.12)] p-6">
          <h2 className="font-['Fraunces'] text-xl text-[#ede4d4] mb-5">Admin Users</h2>
          <div className="space-y-3 mb-5">
            {[{name:"Helena Voss",email:"admin@cedarcourt.co.uk",role:"Super Admin"},{name:"Thomas Ashford",email:"thomas@cedarcourt.co.uk",role:"Manager"},{name:"Maria Santos",email:"maria@cedarcourt.co.uk",role:"Front Desk"}].map(u=>(
              <div key={u.email} className="flex items-center justify-between py-3 border-b border-[rgba(196,149,74,0.06)] last:border-b-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[rgba(196,149,74,0.1)] border border-[rgba(196,149,74,0.2)] flex items-center justify-center"><span className="text-[10px] font-['DM_Mono'] text-[#c4954a]">{u.name.split(" ").map(n=>n[0]).join("")}</span></div>
                  <div><p className="text-sm font-['Jost'] text-[#ede4d4]">{u.name}</p><p className="text-xs font-['DM_Mono'] text-[#8a7d6a]">{u.email}</p></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-['DM_Mono'] text-[#c4954a] border border-[rgba(196,149,74,0.2)] px-2 py-0.5">{u.role}</span>
                  <button onClick={()=>toast.info(`Editing ${u.name}`)} className="text-[#8a7d6a] hover:text-[#c4954a] transition-colors"><Edit2 size={13} /></button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={()=>toast.info("Invite admin feature coming soon!")} className={`px-6 py-3 ${BTN_OUTLINE} text-sm`}><Plus size={13} className="inline mr-2" />Invite Admin User</button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────── ADMIN LAYOUT ────────────────────────────

function AdminLayout({ adminPage, setAdminPage, onLogout, bookings, setBookings, rooms, setRooms, menuItems, setMenuItems, guests, setGuests }: {
  adminPage: string; setAdminPage: (p: string) => void; onLogout: () => void;
  bookings: any[]; setBookings: (b: any[]) => void;
  rooms: any[]; setRooms: (r: any[]) => void;
  menuItems: any[]; setMenuItems: (m: any[]) => void;
  guests: any[]; setGuests: (g: any[]) => void;
}) {
  const navItems = [
    { id:"dashboard",label:"Dashboard",Icon:LayoutDashboard },
    { id:"bookings",label:"Bookings",Icon:Calendar },
    { id:"rooms",label:"Rooms",Icon:BedDouble },
    { id:"menu",label:"Menu",Icon:UtensilsCrossed },
    { id:"guests",label:"Guests",Icon:Users },
    { id:"settings",label:"Settings",Icon:Settings },
  ];
  return (
    <div className="min-h-screen bg-[#0c0a08] flex">
      <aside className="w-60 bg-[#0a0806] border-r border-[rgba(196,149,74,0.1)] flex flex-col shrink-0">
        <div className="p-5 border-b border-[rgba(196,149,74,0.1)]"><CedarLogo size="sm" /><div className="mt-2 text-[9px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase pl-10">Admin Portal</div></div>
        <nav className="flex-1 p-4 space-y-0.5">
          {navItems.map(({id,label,Icon})=>(
            <button key={id} onClick={()=>setAdminPage(id)} className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-['Jost'] transition-all ${adminPage===id?"bg-[rgba(196,149,74,0.12)] text-[#c4954a] border-l-2 border-[#c4954a] pl-[10px]":"text-[#8a7d6a] hover:text-[#ede4d4] hover:bg-[rgba(196,149,74,0.05)]"}`}>
              <Icon size={15} strokeWidth={1.5} />{label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-[rgba(196,149,74,0.1)]">
          <div className="flex items-center gap-3 px-2 py-2 mb-2">
            <div className="w-8 h-8 bg-[rgba(196,149,74,0.12)] border border-[rgba(196,149,74,0.25)] flex items-center justify-center shrink-0"><span className="text-[10px] font-['DM_Mono'] text-[#c4954a]">HV</span></div>
            <div><div className="text-sm font-['Jost'] text-[#ede4d4] leading-none">Helena Voss</div><div className="text-[10px] font-['DM_Mono'] text-[#8a7d6a] mt-0.5">General Manager</div></div>
          </div>
          <button onClick={onLogout} className="w-full flex items-center gap-2 px-2 py-2 text-sm font-['Jost'] text-[#8a7d6a] hover:text-red-400 transition-colors"><LogOut size={13} strokeWidth={1.5} /> Sign Out</button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto min-w-0">
        {adminPage==="dashboard" && <AdminDashboard bookings={bookings} />}
        {adminPage==="bookings" && <AdminBookings bookings={bookings} setBookings={setBookings} />}
        {adminPage==="rooms" && <AdminRooms rooms={rooms} setRooms={setRooms} />}
        {adminPage==="menu" && <AdminMenu menuItems={menuItems} setMenuItems={setMenuItems} />}
        {adminPage==="guests" && <AdminGuests guests={guests} setGuests={setGuests} />}
        {adminPage==="settings" && <AdminSettings />}
      </main>
    </div>
  );
}

// ─────────────────────────── MAIN APP ────────────────────────────

export default function App() {
  const [view, setView] = useState<"user"|"admin-login"|"admin">("user");
  const [page, setPage] = useState("home");
  const [adminPage, setAdminPage] = useState("dashboard");
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [authUser, setAuthUser] = useState<any>(null);
  const [authModal, setAuthModal] = useState<"none"|"login"|"register">("none");
  const [registeredUsers, setRegisteredUsers] = useState([
    { id:"u1",firstName:"Victoria",lastName:"Ashworth",email:"victoria@cedarcourt.co.uk",password:"guest123" }
  ]);
  const [checkout, setCheckout] = useState<{type:"none"|"restaurant"|"room";room?:any;checkIn?:string;checkOut?:string;guestCount?:number}>({ type:"none" });
  const [confirmation, setConfirmation] = useState<{type:"restaurant"|"room";ref:string;details?:any}|null>(null);

  const [bookings, setBookings] = useState([...DEFAULT_BOOKINGS]);
  const [rooms, setRooms] = useState([...DEFAULT_ROOMS]);
  const [menuItems, setMenuItems] = useState([...DEFAULT_MENU]);
  const [guests, setGuests] = useState([...DEFAULT_GUESTS]);

  const cartCount = cartItems.reduce((s,i) => s+i.qty, 0);
  const addToCart = (item:any) => setCartItems(prev => { const ex = prev.find(i=>i.id===item.id); return ex ? prev.map(i=>i.id===item.id?{...i,qty:i.qty+1}:i) : [...prev,{...item,qty:1}]; });
  const removeFromCart = (id:string) => setCartItems(prev=>prev.filter(i=>i.id!==id));
  const updateQty = (id:string, qty:number) => { if (qty<1) removeFromCart(id); else setCartItems(prev=>prev.map(i=>i.id===id?{...i,qty}:i)); };
  const clearCart = () => setCartItems([]);

  const navigateTo = (p:string) => { setPage(p); window.scrollTo({top:0,behavior:"smooth"}); };

  const handleBookNow = (room:any, checkIn:string, checkOut:string, guestCount:number) => {
    if (!authUser) { setAuthModal("login"); toast.info("Please sign in to book a room."); return; }
    setCheckout({ type:"room", room, checkIn, checkOut, guestCount });
  };

  const handleRestaurantCheckout = () => {
    if (!authUser) { setAuthModal("login"); toast.info("Please sign in to place an order."); return; }
    setCheckout({ type:"restaurant" });
  };

  const handleRoomComplete = (ref:string, bookingData:any) => {
    const newBooking = { id: ref, ...bookingData };
    setBookings(prev => [newBooking, ...prev]);
    if (bookingData.email) {
      const gExist = guests.find(g=>g.email===bookingData.email);
      if (!gExist) setGuests(prev=>[...prev,{id:genRef("G-"),name:bookingData.guest,email:bookingData.email,phone:"",stays:1,total:bookingData.total,tier:"Silver",lastStay:bookingData.checkIn,nationality:"",notes:""}]);
    }
    setCheckout({type:"none"});
    setConfirmation({type:"room",ref,details:{room:bookingData.room,checkIn:bookingData.checkIn,checkOut:bookingData.checkOut,total:bookingData.total}});
  };

  const handleRestaurantComplete = (ref:string) => {
    setCheckout({type:"none"});
    setConfirmation({type:"restaurant",ref});
    clearCart();
  };

  if (view==="admin-login") return <AdminLogin onLogin={()=>setView("admin")} onBack={()=>setView("user")} />;
  if (view==="admin") return (
    <AdminLayout
      adminPage={adminPage} setAdminPage={setAdminPage} onLogout={()=>setView("user")}
      bookings={bookings} setBookings={setBookings}
      rooms={rooms} setRooms={setRooms}
      menuItems={menuItems} setMenuItems={setMenuItems}
      guests={guests} setGuests={setGuests}
    />
  );

  if (checkout.type==="restaurant" && cartItems.length>0) return (
    <RestaurantCheckout
      items={cartItems} updateQty={updateQty} removeItem={removeFromCart}
      onComplete={handleRestaurantComplete} onBack={()=>setCheckout({type:"none"})} authUser={authUser}
    />
  );

  if (checkout.type==="room" && checkout.room) return (
    <RoomBookingCheckout
      room={checkout.room} checkIn={checkout.checkIn!} checkOut={checkout.checkOut!} guestCount={checkout.guestCount!}
      onComplete={handleRoomComplete} onBack={()=>setCheckout({type:"none"})} authUser={authUser}
    />
  );

  if (confirmation) return (
    <ConfirmationPage
      type={confirmation.type} reference={confirmation.ref}
      setPage={(p)=>{ setConfirmation(null); navigateTo(p); }}
      clearCart={clearCart} details={confirmation.details}
    />
  );

  return (
    <div className="min-h-screen bg-[#0c0a08] text-[#ede4d4]" style={{fontFamily:"Jost,sans-serif"}}>
      <Toaster position="bottom-right" toastOptions={{ style:{background:"#161310",border:"1px solid rgba(196,149,74,0.3)",color:"#ede4d4",fontFamily:"Jost,sans-serif",fontSize:"14px"} }} />
      {authModal!=="none" && (
        <AuthModal
          mode={authModal} setMode={setAuthModal}
          onClose={()=>setAuthModal("none")}
          onLogin={u=>{setAuthUser(u);setAuthModal("none");}}
          registeredUsers={registeredUsers} setRegisteredUsers={setRegisteredUsers}
        />
      )}
      <Header page={page} setPage={navigateTo} cartCount={cartCount} setCartOpen={setCartOpen} authUser={authUser} setAuthModal={setAuthModal} onLogout={()=>setAuthUser(null)} />
      <CartSlideout isOpen={cartOpen} setIsOpen={setCartOpen} items={cartItems} removeItem={removeFromCart} updateQty={updateQty} onCheckout={handleRestaurantCheckout} />
      <main>
        {page==="home" && <HomePage setPage={navigateTo} setSelectedRoom={setSelectedRoom} rooms={rooms} />}
        {page==="rooms" && <RoomsPage setPage={navigateTo} setSelectedRoom={setSelectedRoom} rooms={rooms} />}
        {page==="room-detail" && <RoomDetailPage room={selectedRoom} setPage={navigateTo} onBookNow={handleBookNow} />}
        {page==="menu" && <MenuPage addToCart={addToCart} cartItems={cartItems} updateQty={updateQty} menuItems={menuItems} />}
        {page==="gallery" && <GalleryPage />}
        {page==="about" && <AboutPage setPage={navigateTo} />}
        {page==="contact" && <ContactPage />}
        {(page==="profile"||page==="my-bookings") && <UserProfile authUser={authUser} bookings={bookings} setPage={navigateTo} />}
      </main>
      <Footer setPage={navigateTo} setView={v=>setView(v as any)} />
    </div>
  );
}

*/}





// change the rooms to apartments, each apartment has a sitting room, a master's room and two other rooms and each having it's own toilet, well furnished kitchen, balcony, tv, air conditioner, etc.  
// On the featured apartment section in the homepage will be displayed the sitting rooms so that when someone clicks on any of them, they will be navigated to the  apartment details page where other 
// sections of the apartment will be displayed instead of just one image and it's features and amenities just like u designed the first version and also there shoud be  a section where someone can add 
// review after checking out and also add orders page where the admin sees the list of orders made by users with their status and other actions for each order like the order id, customer's name, the 
// name of the menu ordered, amount, date, status and actions for viewing and deleting order, and then the reviews page where the admin sees the reviews made by customers and delete any offensive review 
// made by customer after checking out and please complete everything, make it responsive, add any other feature that makes it look modern and necessary and lastly don't change the design and the notification is not yet displaying anything fix it and also add map before the footer in the homepage or the contact page and also make the admin dashboard to be able to add apartment with sitting, and four other sections of the apartment pls make everything complete and don't add to much like the settings should just be a basic settings