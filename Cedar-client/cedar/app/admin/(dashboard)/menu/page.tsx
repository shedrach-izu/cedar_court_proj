// "use client";

// import { useEffect, useMemo, useState } from "react";
// import {
//   Plus,
//   Search,
//   Trash2,
//   Eye,
//   X,
//   UtensilsCrossed,
//   Loader2,
// } from "lucide-react";
// import { toast } from "react-hot-toast";
// import api from "@/lib/api";

// /* =========================================================
//    TYPES
// ========================================================= */

// interface MenuCategory {
//   _id: string;
//   title: string;
// }

// interface MenuImage {
//   url: string;
//   publicId: string;
//   alt?: string;
// }

// interface MenuItem {
//   _id: string;
//   title: string;
//   description: string;
//   category: MenuCategory;
//   price: number;
//   isAvailable: boolean;
//   image: MenuImage;
//   createdAt?: string;
//   updatedAt?: string;
// }

// /* =========================================================
//    STYLES
// ========================================================= */

// const INPUT = `
//   w-full
//   bg-[#0c0a08]
//   border
//   border-[rgba(196,149,74,0.15)]
//   px-3
//   py-2.5
//   text-sm
//   font-['Jost']
//   text-[#ede4d4]
//   outline-none
//   transition-colors
//   focus:border-[rgba(196,149,74,0.5)]
//   placeholder:text-[#8a7d6a]/50
// `;

// const LABEL = `
//   block
//   mb-2
//   text-[9px]
//   font-['DM_Mono']
//   text-[#8a7d6a]
//   tracking-[0.18em]
//   uppercase
// `;

// /* =========================================================
//    CATEGORY BADGE
// ========================================================= */

// function CategoryBadge({ category }: { category: string }) {
//   return (
//     <span
//       className="
//         inline-flex
//         px-2
//         py-1
//         border
//         border-[rgba(196,149,74,0.15)]
//         bg-[rgba(196,149,74,0.05)]
//         text-[8px]
//         font-['DM_Mono']
//         text-[#c4954a]
//         uppercase
//         tracking-wider
//       "
//     >
//       {category}
//     </span>
//   );
// }

// /* =========================================================
//    AVAILABILITY BADGE
// ========================================================= */

// function AvailabilityBadge({
//   available,
// }: {
//   available: boolean;
// }) {
//   return (
//     <span
//       className={`
//         inline-flex
//         px-2
//         py-1
//         border
//         text-[8px]
//         font-['DM_Mono']
//         uppercase
//         tracking-wider
//         ${
//           available
//             ? "text-emerald-400 border-emerald-400/20 bg-emerald-400/10"
//             : "text-red-400 border-red-400/20 bg-red-400/10"
//         }
//       `}
//     >
//       {available ? "Available" : "Unavailable"}
//     </span>
//   );
// }

// /* =========================================================
//    FORM FIELD
// ========================================================= */

// function FormField({
//   label,
//   children,
// }: {
//   label: string;
//   children: React.ReactNode;
// }) {
//   return (
//     <div>
//       <label className={LABEL}>{label}</label>
//       {children}
//     </div>
//   );
// }

// /* =========================================================
//    MENU DETAILS MODAL
// ========================================================= */

// function MenuDetailsModal({
//   item,
//   onClose,
// }: {
//   item: MenuItem;
//   onClose: () => void;
// }) {
//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-black/75 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div
//         className="
//           relative
//           w-full
//           max-w-2xl
//           max-h-[90vh]
//           overflow-y-auto
//           bg-[#161310]
//           border
//           border-[rgba(196,149,74,0.18)]
//         "
//       >
//         {/* Header */}
//         <div
//           className="
//             sticky
//             top-0
//             z-10
//             bg-[#161310]
//             border-b
//             border-[rgba(196,149,74,0.1)]
//             px-5
//             sm:px-6
//             py-4
//             flex
//             items-center
//             justify-between
//           "
//         >
//           <div>
//             <p
//               className="
//                 text-[9px]
//                 font-['DM_Mono']
//                 text-[#c4954a]
//                 uppercase
//                 tracking-[0.2em]
//                 mb-1
//               "
//             >
//               Menu Item
//             </p>

//             <h2 className="font-['Fraunces'] text-xl text-[#ede4d4]">
//               {item.title}
//             </h2>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="
//               w-8
//               h-8
//               flex
//               items-center
//               justify-center
//               text-[#8a7d6a]
//               hover:text-[#ede4d4]
//               transition-colors
//             "
//           >
//             <X size={17} />
//           </button>
//         </div>

//         {/* Content */}
//         <div className="p-5 sm:p-6 space-y-5">
//           {/* Image */}
//           <div className="relative">
//             {item.image?.url ? (
//               <img
//                 src={item.image.url}
//                 alt={item.image.alt || item.title}
//                 className="w-full h-64 object-cover"
//               />
//             ) : (
//               <div
//                 className="
//                   w-full
//                   h-64
//                   bg-[#0c0a08]
//                   flex
//                   items-center
//                   justify-center
//                 "
//               >
//                 <UtensilsCrossed
//                   size={32}
//                   className="text-[#8a7d6a]/40"
//                 />
//               </div>
//             )}

//             <div className="absolute top-3 left-3">
//               <CategoryBadge
//                 category={item.category?.title || "Unknown"}
//               />
//             </div>

//             <div className="absolute top-3 right-3">
//               <AvailabilityBadge available={item.isAvailable} />
//             </div>
//           </div>

//           {/* Title / Price */}
//           <div className="flex items-start justify-between gap-5">
//             <div>
//               <h3 className="font-['Fraunces'] text-2xl text-[#ede4d4]">
//                 {item.title}
//               </h3>

//               <p
//                 className="
//                   text-xs
//                   font-['DM_Mono']
//                   text-[#8a7d6a]
//                   uppercase
//                   tracking-widest
//                   mt-1
//                 "
//               >
//                 {item.category?.title || "Unknown"}
//               </p>
//             </div>

//             <div className="text-right shrink-0">
//               <p className="font-['Fraunces'] text-xl text-[#c4954a]">
//                 ₦{item.price.toLocaleString()}
//               </p>
//             </div>
//           </div>

//           {/* Description */}
//           <div>
//             <p
//               className="
//                 text-[9px]
//                 font-['DM_Mono']
//                 text-[#8a7d6a]
//                 uppercase
//                 tracking-widest
//                 mb-2
//               "
//             >
//               Description
//             </p>

//             <p
//               className="
//                 text-sm
//                 font-['Jost']
//                 leading-relaxed
//                 text-[#8a7d6a]
//               "
//             >
//               {item.description}
//             </p>
//           </div>

//           {/* ID */}
//           <div>
//             <p
//               className="
//                 text-[9px]
//                 font-['DM_Mono']
//                 text-[#8a7d6a]
//                 uppercase
//                 tracking-widest
//                 mb-2
//               "
//             >
//               Menu ID
//             </p>

//             <p className="text-xs font-['DM_Mono'] text-[#8a7d6a] break-all">
//               {item._id}
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    ADMIN MENU
// ========================================================= */

// export default function AdminMenu() {
//   /* =======================================================
//      STATE
//   ======================================================= */

//   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

//   const [loading, setLoading] = useState(true);

//   const [updatingId, setUpdatingId] = useState<string | null>(
//     null
//   );

//   const [deletingId, setDeletingId] = useState<string | null>(
//     null
//   );

//   const [addingItem, setAddingItem] = useState(false);

//   const [showForm, setShowForm] = useState(false);

//   const [viewItem, setViewItem] = useState<MenuItem | null>(
//     null
//   );

//   const [search, setSearch] = useState("");

//   const [categoryFilter, setCategoryFilter] = useState("All");

//   const [form, setForm] = useState({
//     title: "",
//     category: "",
//     description: "",
//     price: "",
//     image: null as File | null,
//   });

//   /* =======================================================
//      FETCH MENU ITEMS
//   ======================================================= */

//   useEffect(() => {
//     const fetchMenuItems = async () => {
//       try {
//         setLoading(true);

//         const response = await api.get("/menu/all-menu");

//         if (Array.isArray(response.data)) {
//           setMenuItems(response.data);
//         } else {
//           setMenuItems([]);
//         }
//       } catch (error: any) {
//         console.error("Failed to fetch menu:", error);

//         toast.error(
//           error?.response?.data?.message ||
//             "Failed to load menu items."
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMenuItems();
//   }, []);

//   /* =======================================================
//      GET UNIQUE CATEGORIES
//   ======================================================= */

//   const categories = useMemo(() => {
//     const categoryMap = new Map<string, MenuCategory>();

//     menuItems.forEach((item) => {
//       if (item.category?._id) {
//         categoryMap.set(item.category._id, item.category);
//       }
//     });

//     return Array.from(categoryMap.values());
//   }, [menuItems]);

//   /* =======================================================
//      INPUT CHANGE
//   ======================================================= */

//   const handleInputChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;

//     setForm((current) => ({
//       ...current,
//       [name]: value,
//     }));
//   };

//   /* =======================================================
//      IMAGE CHANGE
//   ======================================================= */

//   const handleImageChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = e.target.files?.[0] || null;

//     setForm((current) => ({
//       ...current,
//       image: file,
//     }));
//   };

//   /* =======================================================
//      ADD MENU ITEM
//   ======================================================= */

//   const handleAdd = async (e: React.FormEvent) => {
//     e.preventDefault();

//     /* ---------------------------------------------
//        VALIDATION
//     --------------------------------------------- */

//     if (!form.title.trim()) {
//       toast.error("Please enter the menu item name.");
//       return;
//     }

//     if (!form.category) {
//       toast.error("Please select a category.");
//       return;
//     }

//     if (!form.price || Number(form.price) <= 0) {
//       toast.error("Please enter a valid price.");
//       return;
//     }

//     if (!form.description.trim()) {
//       toast.error("Please enter a description.");
//       return;
//     }

//     if (!form.image) {
//       toast.error("Please select an image.");
//       return;
//     }

//     /* ---------------------------------------------
//        CREATE FORMDATA
//     --------------------------------------------- */

//     try {
//       setAddingItem(true);

//       const formData = new FormData();

//       formData.append(
//         "title",
//         form.title.trim()
//       );

//       formData.append(
//         "description",
//         form.description.trim()
//       );

//       formData.append(
//         "price",
//         String(Number(form.price))
//       );

//       formData.append(
//         "category",
//         form.category
//       );

//       formData.append(
//         "image",
//         form.image
//       );

//       /* ---------------------------------------------
//          API REQUEST
//       --------------------------------------------- */

//       const response = await api.post(
//         "/menu/create",
//         formData
//       );

//       const newItem = response.data?.menu;

//       if (!newItem) {
//         throw new Error(
//           "Menu item was not returned by the server."
//         );
//       }

//       /*
//         Because your backend now returns:

//         category: {
//           _id,
//           title
//         }

//         after populate(), we can directly use
//         newItem here.
//       */

//       setMenuItems((current) => [
//         newItem,
//         ...current,
//       ]);

//       /* ---------------------------------------------
//          RESET FORM
//       --------------------------------------------- */

//       setForm({
//         title: "",
//         category: "",
//         description: "",
//         price: "",
//         image: null,
//       });

//       setShowForm(false);

//       toast.success(
//         "Menu item added successfully."
//       );
//     } catch (error: any) {
//       console.error(
//         "Failed to add menu item:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to add menu item."
//       );
//     } finally {
//       setAddingItem(false);
//     }
//   };

//   /* =======================================================
//      TOGGLE AVAILABILITY
//   ======================================================= */

//   const toggleAvailability = async (
//     id: string
//   ) => {
//     try {
//       setUpdatingId(id);

//       const response = await api.patch(
//         `/menu/${id}/availability`
//       );

//       const updatedMenu =
//         response.data?.menu;

//       if (!updatedMenu) {
//         throw new Error(
//           "Updated menu item was not returned."
//         );
//       }

//       /* Update table */
//       setMenuItems((current) =>
//         current.map((item) =>
//           item._id === id
//             ? updatedMenu
//             : item
//         )
//       );

//       /* Update details modal if open */
//       setViewItem((current) =>
//         current?._id === id
//           ? updatedMenu
//           : current
//       );

//       toast.success(
//         updatedMenu.isAvailable
//           ? "Item is now available."
//           : "Item is now unavailable."
//       );
//     } catch (error: any) {
//       console.error(
//         "Failed to update availability:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to update availability."
//       );
//     } finally {
//       setUpdatingId(null);
//     }
//   };

//   /* =======================================================
//      DELETE MENU ITEM
//   ======================================================= */

//   const deleteItem = async (
//     id: string
//   ) => {
//     const item = menuItems.find(
//       (menuItem) => menuItem._id === id
//     );

//     if (!item) return;

//     const confirmed = window.confirm(
//       `Remove "${item.title}" from the menu?`
//     );

//     if (!confirmed) return;

//     try {
//       setDeletingId(id);

//       await api.delete(
//         `/menu/${id}`
//       );

//       setMenuItems((current) =>
//         current.filter(
//           (menuItem) =>
//             menuItem._id !== id
//         )
//       );

//       if (viewItem?._id === id) {
//         setViewItem(null);
//       }

//       toast.success(
//         "Menu item removed."
//       );
//     } catch (error: any) {
//       console.error(
//         "Failed to delete menu item:",
//         error
//       );

//       toast.error(
//         error?.response?.data?.message ||
//           "Failed to delete menu item."
//       );
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   /* =======================================================
//      FILTER MENU
//   ======================================================= */

//   const filteredItems = useMemo(() => {
//     const query = search
//       .toLowerCase()
//       .trim();

//     return menuItems.filter((item) => {
//       const matchesSearch =
//         item.title
//           .toLowerCase()
//           .includes(query) ||
//         item.description
//           .toLowerCase()
//           .includes(query);

//       const matchesCategory =
//         categoryFilter === "All" ||
//         item.category?.title ===
//           categoryFilter;

//       return (
//         matchesSearch &&
//         matchesCategory
//       );
//     });
//   }, [
//     menuItems,
//     search,
//     categoryFilter,
//   ]);

//   /* =======================================================
//      STATISTICS
//   ======================================================= */

//   const availableCount =
//     menuItems.filter(
//       (item) => item.isAvailable
//     ).length;

//   const unavailableCount =
//     menuItems.filter(
//       (item) => !item.isAvailable
//     ).length;

//   /* =======================================================
//      RENDER
//   ======================================================= */

//   return (
//     <div className="space-y-6">

//       {/* =================================================
//           HEADER
//       ================================================= */}

//       <div
//         className="
//           flex
//           flex-col
//           lg:flex-row
//           lg:items-end
//           lg:justify-between
//           gap-4
//         "
//       >
//         <div>
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-7 h-px bg-[#c4954a]" />

//             <span
//               className="
//                 text-[9px]
//                 font-['DM_Mono']
//                 text-[#c4954a]
//                 tracking-[0.2em]
//                 uppercase
//               "
//             >
//               Restaurant Management
//             </span>
//           </div>

//           <h2
//             className="
//               font-['Fraunces']
//               text-2xl
//               sm:text-3xl
//               text-[#ede4d4]
//             "
//           >
//             Menu Items
//           </h2>

//           <p
//             className="
//               text-sm
//               font-['Jost']
//               text-[#8a7d6a]
//               mt-1
//             "
//           >
//             Manage dishes, prices and menu
//             availability.
//           </p>
//         </div>

//         <button
//           type="button"
//           onClick={() => setShowForm(true)}
//           className="
//             w-full
//             sm:w-auto
//             flex
//             items-center
//             justify-center
//             gap-2
//             px-4
//             py-2.5
//             bg-[#c4954a]
//             text-[#0c0a08]
//             text-xs
//             font-['DM_Mono']
//             uppercase
//             tracking-wider
//             hover:bg-[#d2a45b]
//             transition-colors
//           "
//         >
//           <Plus size={14} />
//           Add Item
//         </button>
//       </div>

//       {/* =================================================
//           STATS
//       ================================================= */}

//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

//         {/* Total */}
//         <div
//           className="
//             bg-[#161310]
//             border
//             border-[rgba(196,149,74,0.1)]
//             p-4
//           "
//         >
//           <p
//             className="
//               text-[9px]
//               font-['DM_Mono']
//               text-[#8a7d6a]
//               tracking-widest
//               uppercase
//             "
//           >
//             Total Items
//           </p>

//           <p
//             className="
//               font-['Fraunces']
//               text-2xl
//               text-[#ede4d4]
//               mt-2
//             "
//           >
//             {menuItems.length}
//           </p>
//         </div>

//         {/* Available */}
//         <div
//           className="
//             bg-[#161310]
//             border
//             border-[rgba(196,149,74,0.1)]
//             p-4
//           "
//         >
//           <p
//             className="
//               text-[9px]
//               font-['DM_Mono']
//               text-[#8a7d6a]
//               tracking-widest
//               uppercase
//             "
//           >
//             Available
//           </p>

//           <p
//             className="
//               font-['Fraunces']
//               text-2xl
//               text-emerald-400
//               mt-2
//             "
//           >
//             {availableCount}
//           </p>
//         </div>

//         {/* Unavailable */}
//         <div
//           className="
//             bg-[#161310]
//             border
//             border-[rgba(196,149,74,0.1)]
//             p-4
//           "
//         >
//           <p
//             className="
//               text-[9px]
//               font-['DM_Mono']
//               text-[#8a7d6a]
//               tracking-widest
//               uppercase
//             "
//           >
//             Unavailable
//           </p>

//           <p
//             className="
//               font-['Fraunces']
//               text-2xl
//               text-red-400
//               mt-2
//             "
//           >
//             {unavailableCount}
//           </p>
//         </div>
//       </div>

//       {/* =================================================
//           SEARCH + FILTER
//       ================================================= */}

//       <div className="flex flex-col sm:flex-row gap-3">

//         {/* Search */}
//         <div className="relative flex-1">
//           <Search
//             size={14}
//             className="
//               absolute
//               left-3
//               top-1/2
//               -translate-y-1/2
//               text-[#8a7d6a]
//             "
//           />

//           <input
//             value={search}
//             onChange={(e) =>
//               setSearch(e.target.value)
//             }
//             placeholder="Search menu items..."
//             className={`${INPUT} pl-9`}
//           />
//         </div>

//         {/* Category filter */}
//         <select
//           value={categoryFilter}
//           onChange={(e) =>
//             setCategoryFilter(e.target.value)
//           }
//           className={`${INPUT} sm:w-44`}
//         >
//           <option value="All">
//             All Categories
//           </option>

//           {categories.map((category) => (
//             <option
//               key={category._id}
//               value={category.title}
//             >
//               {category.title}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* =================================================
//           TABLE
//       ================================================= */}

//       <div
//         className="
//           bg-[#161310]
//           border
//           border-[rgba(196,149,74,0.1)]
//           overflow-hidden
//         "
//       >
//         <div className="overflow-x-auto">

//           <table
//             className="
//               w-full
//               text-xs
//               font-['DM_Mono']
//             "
//           >

//             {/* Header */}
//             <thead>
//               <tr
//                 className="
//                   border-b
//                   border-[rgba(196,149,74,0.1)]
//                 "
//               >
//                 {[
//                   "Item",
//                   "Category",
//                   "Price",
//                   "Available",
//                   "Actions",
//                 ].map((heading) => (
//                   <th
//                     key={heading}
//                     className="
//                       text-left
//                       py-3
//                       px-4
//                       text-[#8a7d6a]
//                       tracking-widest
//                       uppercase
//                       font-normal
//                       whitespace-nowrap
//                     "
//                   >
//                     {heading}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             {/* Body */}
//             <tbody>

//               {/* Loading */}
//               {loading ? (
//                 <tr>
//                   <td
//                     colSpan={5}
//                     className="py-20"
//                   >
//                     <div
//                       className="
//                         flex
//                         flex-col
//                         items-center
//                         justify-center
//                       "
//                     >
//                       <Loader2
//                         size={22}
//                         className="
//                           text-[#c4954a]
//                           animate-spin
//                         "
//                       />

//                       <p
//                         className="
//                           text-xs
//                           font-['Jost']
//                           text-[#8a7d6a]
//                           mt-3
//                         "
//                       >
//                         Loading menu items...
//                       </p>
//                     </div>
//                   </td>
//                 </tr>
//               ) : (
//                 filteredItems.map((item) => (
//                   <tr
//                     key={item._id}
//                     className="
//                       border-b
//                       border-[rgba(196,149,74,0.06)]
//                       hover:bg-[rgba(196,149,74,0.03)]
//                       transition-colors
//                     "
//                   >

//                     {/* Item */}
//                     <td className="py-3.5 px-4">
//                       <div className="flex items-center gap-3">

//                         <div
//                           className="
//                             w-11
//                             h-11
//                             shrink-0
//                             overflow-hidden
//                             bg-[#0c0a08]
//                           "
//                         >
//                           {item.image?.url ? (
//                             <img
//                               src={item.image.url}
//                               alt={
//                                 item.image.alt ||
//                                 item.title
//                               }
//                               className="
//                                 w-full
//                                 h-full
//                                 object-cover
//                               "
//                             />
//                           ) : (
//                             <div
//                               className="
//                                 w-full
//                                 h-full
//                                 flex
//                                 items-center
//                                 justify-center
//                               "
//                             >
//                               <UtensilsCrossed
//                                 size={14}
//                                 className="
//                                   text-[#8a7d6a]/50
//                                 "
//                               />
//                             </div>
//                           )}
//                         </div>

//                         <div>
//                           <p
//                             className="
//                               text-[#ede4d4]
//                               font-['Jost']
//                               text-sm
//                             "
//                           >
//                             {item.title}
//                           </p>

//                           <p
//                             className="
//                               text-[9px]
//                               text-[#8a7d6a]
//                               mt-1
//                               max-w-[260px]
//                               truncate
//                             "
//                           >
//                             {item.description}
//                           </p>
//                         </div>
//                       </div>
//                     </td>

//                     {/* Category */}
//                     <td className="py-3.5 px-4">
//                       <CategoryBadge
//                         category={
//                           item.category?.title ||
//                           "Unknown"
//                         }
//                       />
//                     </td>

//                     {/* Price */}
//                     <td
//                       className="
//                         py-3.5
//                         px-4
//                         text-[#c4954a]
//                         whitespace-nowrap
//                       "
//                     >
//                       ₦{item.price.toLocaleString()}
//                     </td>

//                     {/* Availability */}
//                     <td className="py-3.5 px-4">

//                       <div className="flex items-center">

//                         <button
//                           type="button"
//                           disabled={
//                             updatingId === item._id
//                           }
//                           onClick={() =>
//                             toggleAvailability(
//                               item._id
//                             )
//                           }
//                           title={
//                             item.isAvailable
//                               ? "Make unavailable"
//                               : "Make available"
//                           }
//                           className={`
//                             relative
//                             w-10
//                             h-5
//                             transition-colors
//                             disabled:opacity-50
//                             disabled:cursor-not-allowed
//                             ${
//                               item.isAvailable
//                                 ? "bg-[#c4954a]"
//                                 : "bg-[#3a342d]"
//                             }
//                           `}
//                         >
//                           <span
//                             className={`
//                               absolute
//                               top-0.5
//                               w-4
//                               h-4
//                               bg-[#ede4d4]
//                               transition-transform
//                               ${
//                                 item.isAvailable
//                                   ? "translate-x-5"
//                                   : "translate-x-0.5"
//                               }
//                             `}
//                           />

//                           {updatingId ===
//                             item._id && (
//                             <span
//                               className="
//                                 absolute
//                                 inset-0
//                                 flex
//                                 items-center
//                                 justify-center
//                               "
//                             >
//                               <Loader2
//                                 size={10}
//                                 className="
//                                   text-[#0c0a08]
//                                   animate-spin
//                                 "
//                               />
//                             </span>
//                           )}
//                         </button>

//                         <span
//                           className={`
//                             ml-2
//                             text-[8px]
//                             font-['DM_Mono']
//                             uppercase
//                             tracking-wider
//                             ${
//                               item.isAvailable
//                                 ? "text-emerald-400"
//                                 : "text-red-400"
//                             }
//                           `}
//                         >
//                           {item.isAvailable
//                             ? "Available"
//                             : "Unavailable"}
//                         </span>
//                       </div>
//                     </td>

//                     {/* Actions */}
//                     <td className="py-3.5 px-4">
//                       <div className="flex items-center gap-3">

//                         {/* View */}
//                         <button
//                           type="button"
//                           onClick={() =>
//                             setViewItem(item)
//                           }
//                           title="View item"
//                           className="
//                             text-[#8a7d6a]
//                             hover:text-[#c4954a]
//                             transition-colors
//                           "
//                         >
//                           <Eye size={14} />
//                         </button>

//                         {/* Delete */}
//                         <button
//                           type="button"
//                           disabled={
//                             deletingId === item._id
//                           }
//                           onClick={() =>
//                             deleteItem(item._id)
//                           }
//                           title="Delete item"
//                           className="
//                             text-[#8a7d6a]
//                             hover:text-red-400
//                             transition-colors
//                             disabled:opacity-50
//                           "
//                         >
//                           {deletingId ===
//                           item._id ? (
//                             <Loader2
//                               size={14}
//                               className="animate-spin"
//                             />
//                           ) : (
//                             <Trash2 size={14} />
//                           )}
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Empty */}
//         {!loading &&
//           filteredItems.length === 0 && (
//             <div className="py-16 text-center">

//               <div
//                 className="
//                   w-10
//                   h-10
//                   mx-auto
//                   mb-4
//                   border
//                   border-[rgba(196,149,74,0.15)]
//                   flex
//                   items-center
//                   justify-center
//                 "
//               >
//                 <Search
//                   size={15}
//                   className="text-[#8a7d6a]"
//                 />
//               </div>

//               <p
//                 className="
//                   font-['Fraunces']
//                   text-lg
//                   text-[#ede4d4]
//                 "
//               >
//                 No menu items found
//               </p>

//               <p
//                 className="
//                   text-sm
//                   font-['Jost']
//                   text-[#8a7d6a]
//                   mt-1
//                 "
//               >
//                 Try changing your search or
//                 category filter.
//               </p>
//             </div>
//           )}
//       </div>

//       {/* =================================================
//           ADD MENU ITEM MODAL
//       ================================================= */}

//       {showForm && (
//         <div
//           className="
//             fixed
//             inset-0
//             z-[100]
//             flex
//             items-center
//             justify-center
//             p-4
//           "
//         >

//           {/* Overlay */}
//           <div
//             className="
//               absolute
//               inset-0
//               bg-black/75
//               backdrop-blur-sm
//             "
//             onClick={() => {
//               if (!addingItem) {
//                 setShowForm(false);
//               }
//             }}
//           />

//           {/* Modal */}
//           <div
//             className="
//               relative
//               w-full
//               max-w-xl
//               max-h-[90vh]
//               overflow-y-auto
//               bg-[#161310]
//               border
//               border-[rgba(196,149,74,0.18)]
//             "
//           >

//             {/* Modal Header */}
//             <div
//               className="
//                 sticky
//                 top-0
//                 z-10
//                 bg-[#161310]
//                 border-b
//                 border-[rgba(196,149,74,0.1)]
//                 px-5
//                 sm:px-6
//                 py-4
//                 flex
//                 items-center
//                 justify-between
//               "
//             >
//               <div>
//                 <p
//                   className="
//                     text-[9px]
//                     font-['DM_Mono']
//                     text-[#c4954a]
//                     uppercase
//                     tracking-[0.2em]
//                     mb-1
//                   "
//                 >
//                   Restaurant Management
//                 </p>

//                 <h2
//                   className="
//                     font-['Fraunces']
//                     text-xl
//                     text-[#ede4d4]
//                   "
//                 >
//                   Add Menu Item
//                 </h2>
//               </div>

//               <button
//                 type="button"
//                 disabled={addingItem}
//                 onClick={() =>
//                   setShowForm(false)
//                 }
//                 className="
//                   w-8
//                   h-8
//                   flex
//                   items-center
//                   justify-center
//                   text-[#8a7d6a]
//                   hover:text-[#ede4d4]
//                   disabled:opacity-50
//                 "
//               >
//                 <X size={17} />
//               </button>
//             </div>

//             {/* Form */}
//             <form
//               onSubmit={handleAdd}
//               className="
//                 p-5
//                 sm:p-6
//                 space-y-4
//               "
//             >

//               {/* Item name */}
//               <FormField label="Item Name">
//                 <input
//                   required
//                   name="title"
//                   value={form.title}
//                   onChange={
//                     handleInputChange
//                   }
//                   className={INPUT}
//                   placeholder="Pan-Seared Sea Bass"
//                 />
//               </FormField>

//               {/* Category + Price */}
//               <div
//                 className="
//                   grid
//                   grid-cols-1
//                   sm:grid-cols-2
//                   gap-4
//                 "
//               >

//                 {/* Category */}
//                 <FormField label="Category">
//                   <select
//                     required
//                     name="category"
//                     value={form.category}
//                     onChange={
//                       handleInputChange
//                     }
//                     className={INPUT}
//                   >
//                     <option value="">
//                       Select category
//                     </option>

//                     {categories.map(
//                       (category) => (
//                         <option
//                           key={category._id}
//                           value={category._id}
//                         >
//                           {category.title}
//                         </option>
//                       )
//                     )}
//                   </select>
//                 </FormField>

//                 {/* Price */}
//                 <FormField label="Price (₦)">
//                   <input
//                     required
//                     name="price"
//                     type="number"
//                     min="1"
//                     value={form.price}
//                     onChange={
//                       handleInputChange
//                     }
//                     className={INPUT}
//                     placeholder="18000"
//                   />
//                 </FormField>
//               </div>

//               {/* Description */}
//               <FormField label="Description">
//                 <textarea
//                   required
//                   name="description"
//                   value={form.description}
//                   onChange={
//                     handleInputChange
//                   }
//                   rows={3}
//                   className={`
//                     ${INPUT}
//                     resize-none
//                   `}
//                   placeholder="Describe the dish..."
//                 />
//               </FormField>

//               {/* Image */}
//               <FormField label="Menu Image">
//                 <input
//                   required
//                   type="file"
//                   accept="image/*"
//                   onChange={
//                     handleImageChange
//                   }
//                   className="
//                     w-full
//                     bg-[#0c0a08]
//                     border
//                     border-[rgba(196,149,74,0.15)]
//                     px-3
//                     py-2.5
//                     text-sm
//                     font-['Jost']
//                     text-[#8a7d6a]
//                     outline-none

//                     file:mr-4
//                     file:border-0
//                     file:bg-[#c4954a]
//                     file:px-3
//                     file:py-1.5
//                     file:text-xs
//                     file:font-['DM_Mono']
//                     file:uppercase
//                     file:text-[#0c0a08]

//                     hover:file:bg-[#d2a45b]
//                   "
//                 />

//                 {form.image && (
//                   <p
//                     className="
//                       text-[9px]
//                       font-['DM_Mono']
//                       text-[#8a7d6a]
//                       mt-2
//                     "
//                   >
//                     Selected:{" "}
//                     {form.image.name}
//                   </p>
//                 )}
//               </FormField>

//               {/* Buttons */}
//               <div
//                 className="
//                   flex
//                   gap-3
//                   pt-2
//                 "
//               >
//                 <button
//                   type="button"
//                   disabled={addingItem}
//                   onClick={() =>
//                     setShowForm(false)
//                   }
//                   className="
//                     flex-1
//                     py-3
//                     border
//                     border-[rgba(196,149,74,0.2)]
//                     text-[#8a7d6a]
//                     text-xs
//                     font-['DM_Mono']
//                     uppercase
//                     tracking-widest
//                     hover:text-[#ede4d4]
//                     transition-colors
//                     disabled:opacity-50
//                   "
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   type="submit"
//                   disabled={addingItem}
//                   className="
//                     flex-1
//                     py-3
//                     bg-[#c4954a]
//                     text-[#0c0a08]
//                     text-xs
//                     font-['DM_Mono']
//                     uppercase
//                     tracking-widest
//                     hover:bg-[#d2a45b]
//                     transition-colors
//                     disabled:opacity-60
//                     disabled:cursor-not-allowed
//                     flex
//                     items-center
//                     justify-center
//                     gap-2
//                   "
//                 >
//                   {addingItem ? (
//                     <>
//                       <Loader2
//                         size={14}
//                         className="animate-spin"
//                       />
//                       Adding...
//                     </>
//                   ) : (
//                     "Add Item"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* =================================================
//           DETAILS MODAL
//       ================================================= */}

//       {viewItem && (
//         <MenuDetailsModal
//           item={viewItem}
//           onClose={() =>
//             setViewItem(null)
//           }
//         />
//       )}
//     </div>
//   );
// }










"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Trash2,
  Eye,
  X,
  UtensilsCrossed,
  Loader2,
  Pencil,
} from "lucide-react";
import { toast } from "react-hot-toast";
import api from "@/lib/api";

interface MenuCategory {
  _id: string;
  title: string;
}

interface MenuImage {
  url: string;
  publicId: string;
  alt?: string;
}

interface MenuItem {
  _id: string;
  title: string;
  description: string;
  category: MenuCategory;
  price: number;
  isAvailable: boolean;
  image: MenuImage;
  createdAt?: string;
  updatedAt?: string;
}

interface MenuForm {
  title: string;
  category: string;
  description: string;
  price: string;
  image: File | null;
}

const INPUT = `
  w-full
  bg-[#0c0a08]
  border
  border-[rgba(196,149,74,0.15)]
  px-3
  py-2.5
  text-sm
  font-['Jost']
  text-[#ede4d4]
  outline-none
  transition-colors
  focus:border-[rgba(196,149,74,0.5)]
  placeholder:text-[#8a7d6a]/50
`;

const LABEL = `
  block
  mb-2
  text-[9px]
  font-['DM_Mono']
  text-[#8a7d6a]
  tracking-[0.18em]
  uppercase
`;


/* =========================================================
   CATEGORY BADGE
========================================================= */

function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className="
        inline-flex
        px-2
        py-1
        border
        border-[rgba(196,149,74,0.15)]
        bg-[rgba(196,149,74,0.05)]
        text-[8px]
        font-['DM_Mono']
        text-[#c4954a]
        uppercase
        tracking-wider
      "
    >
      {category}
    </span>
  );
}


/* =========================================================
   AVAILABILITY BADGE
========================================================= */

function AvailabilityBadge({
  available,
}: {
  available: boolean;
}) {
  return (
    <span
      className={`
        inline-flex
        px-2
        py-1
        border
        text-[8px]
        font-['DM_Mono']
        uppercase
        tracking-wider
        ${
          available
            ? "text-emerald-400 border-emerald-400/20 bg-emerald-400/10"
            : "text-red-400 border-red-400/20 bg-red-400/10"
        }
      `}
    >
      {available ? "Available" : "Unavailable"}
    </span>
  );
}


/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={LABEL}>{label}</label>
      {children}
    </div>
  );
}


/* =========================================================
   MENU DETAILS MODAL
========================================================= */

function MenuDetailsModal({
  item,
  onClose,
  onEdit,
}: {
  item: MenuItem;
  onClose: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        className="
          relative
          w-full
          max-w-2xl
          max-h-[90vh]
          overflow-y-auto
          bg-[#161310]
          border
          border-[rgba(196,149,74,0.18)]
        "
      >

        {/* Header */}

        <div
          className="
            sticky
            top-0
            z-10
            bg-[#161310]
            border-b
            border-[rgba(196,149,74,0.1)]
            px-5
            sm:px-6
            py-4
            flex
            items-center
            justify-between
          "
        >
          <div>
            <p
              className="
                text-[9px]
                font-['DM_Mono']
                text-[#c4954a]
                uppercase
                tracking-[0.2em]
                mb-1
              "
            >
              Menu Item
            </p>

            <h2
              className="
                font-['Fraunces']
                text-xl
                text-[#ede4d4]
              "
            >
              {item.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              w-8
              h-8
              flex
              items-center
              justify-center
              text-[#8a7d6a]
              hover:text-[#ede4d4]
              transition-colors
            "
          >
            <X size={17} />
          </button>
        </div>


        <div className="p-5 sm:p-6 space-y-5">

          {/* Image */}

          <div className="relative">

            {item.image?.url ? (
              <img
                src={item.image.url}
                alt={item.image.alt || item.title}
                className="
                  w-full
                  h-64
                  object-cover
                "
              />
            ) : (
              <div
                className="
                  w-full
                  h-64
                  bg-[#0c0a08]
                  flex
                  items-center
                  justify-center
                "
              >
                <UtensilsCrossed
                  size={32}
                  className="text-[#8a7d6a]/40"
                />
              </div>
            )}

            <div className="absolute top-3 left-3">
              <CategoryBadge
                category={item.category?.title || "Unknown"}
              />
            </div>

            <div className="absolute top-3 right-3">
              <AvailabilityBadge
                available={item.isAvailable}
              />
            </div>

          </div>


          {/* Name + Price */}

          <div
            className="
              flex
              items-start
              justify-between
              gap-5
            "
          >
            <div>
              <h3
                className="
                  font-['Fraunces']
                  text-2xl
                  text-[#ede4d4]
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  text-xs
                  font-['DM_Mono']
                  text-[#8a7d6a]
                  uppercase
                  tracking-widest
                  mt-1
                "
              >
                {item.category?.title || "Unknown"}
              </p>
            </div>

            <div className="text-right shrink-0">

              <p
                className="
                  font-['Fraunces']
                  text-xl
                  text-[#c4954a]
                "
              >
                ₦{item.price.toLocaleString()}
              </p>

            </div>
          </div>


          {/* Description */}

          <div>

            <p
              className="
                text-[9px]
                font-['DM_Mono']
                text-[#8a7d6a]
                uppercase
                tracking-widest
                mb-2
              "
            >
              Description
            </p>

            <p
              className="
                text-sm
                font-['Jost']
                leading-relaxed
                text-[#8a7d6a]
              "
            >
              {item.description}
            </p>

          </div>


          {/* Edit */}

          <button
            type="button"
            onClick={onEdit}
            className="
              w-full
              flex
              items-center
              justify-center
              gap-2
              py-3
              bg-[#c4954a]
              text-[#0c0a08]
              text-xs
              font-['DM_Mono']
              uppercase
              tracking-widest
              hover:bg-[#d2a45b]
              transition-colors
            "
          >
            <Pencil size={14} />
            Edit Menu Item
          </button>

        </div>
      </div>
    </div>
  );
}


/* =========================================================
   MENU FORM MODAL
========================================================= */

function MenuFormModal({
  mode,
  form,
  categories,
  submitting,
  onClose,
  onChange,
  onImageChange,
  onSubmit,
}: {
  mode: "add" | "edit";
  form: MenuForm;
  categories: MenuCategory[];
  submitting: boolean;
  onClose: () => void;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  onImageChange: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">

      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={() => {
          if (!submitting) onClose();
        }}
      />

      <div
        className="
          relative
          w-full
          max-w-xl
          max-h-[90vh]
          overflow-y-auto
          bg-[#161310]
          border
          border-[rgba(196,149,74,0.18)]
        "
      >

        {/* Header */}

        <div
          className="
            sticky
            top-0
            z-10
            bg-[#161310]
            border-b
            border-[rgba(196,149,74,0.1)]
            px-5
            sm:px-6
            py-4
            flex
            items-center
            justify-between
          "
        >

          <div>

            <p
              className="
                text-[9px]
                font-['DM_Mono']
                text-[#c4954a]
                uppercase
                tracking-[0.2em]
                mb-1
              "
            >
              Restaurant Management
            </p>

            <h2
              className="
                font-['Fraunces']
                text-xl
                text-[#ede4d4]
              "
            >
              {mode === "add"
                ? "Add Menu Item"
                : "Update Menu Item"}
            </h2>

          </div>

          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            className="
              w-8
              h-8
              flex
              items-center
              justify-center
              text-[#8a7d6a]
              hover:text-[#ede4d4]
              disabled:opacity-50
            "
          >
            <X size={17} />
          </button>

        </div>


        {/* Form */}

        <form
          onSubmit={onSubmit}
          className="p-5 sm:p-6 space-y-4"
        >

          {/* Title */}

          <FormField label="Item Name">

            <input
              required
              name="title"
              value={form.title}
              onChange={onChange}
              className={INPUT}
              placeholder="Pan-Seared Sea Bass"
            />

          </FormField>


          {/* Category + Price */}

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-4
            "
          >

            <FormField label="Category">

              <select
                required
                name="category"
                value={form.category}
                onChange={onChange}
                className={INPUT}
              >

                <option value="">
                  Select category
                </option>

                {categories.map((category) => (
                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.title}
                  </option>
                ))}

              </select>

            </FormField>


            <FormField label="Price (₦)">

              <input
                required
                name="price"
                type="number"
                min="1"
                value={form.price}
                onChange={onChange}
                className={INPUT}
                placeholder="18000"
              />

            </FormField>

          </div>


          {/* Description */}

          <FormField label="Description">

            <textarea
              required
              name="description"
              value={form.description}
              onChange={onChange}
              rows={4}
              className={`${INPUT} resize-none`}
              placeholder="Describe the dish..."
            />

          </FormField>


          {/* Image */}

          <FormField
            label={
              mode === "add"
                ? "Menu Image"
                : "Replace Image (Optional)"
            }
          >

            <input
              required={mode === "add"}
              type="file"
              accept="image/*"
              onChange={onImageChange}
              className="
                w-full
                bg-[#0c0a08]
                border
                border-[rgba(196,149,74,0.15)]
                px-3
                py-2.5
                text-sm
                font-['Jost']
                text-[#8a7d6a]
                outline-none
                file:mr-4
                file:border-0
                file:bg-[#c4954a]
                file:px-3
                file:py-1.5
                file:text-xs
                file:font-['DM_Mono']
                file:uppercase
                file:text-[#0c0a08]
                hover:file:bg-[#d2a45b]
              "
            />

            {form.image && (
              <p
                className="
                  text-[9px]
                  font-['DM_Mono']
                  text-[#8a7d6a]
                  mt-2
                "
              >
                Selected: {form.image.name}
              </p>
            )}

            {mode === "edit" && (
              <p
                className="
                  text-[9px]
                  font-['DM_Mono']
                  text-[#8a7d6a]/70
                  mt-2
                "
              >
                Leave empty to keep the current image.
              </p>
            )}

          </FormField>


          {/* Buttons */}

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              disabled={submitting}
              onClick={onClose}
              className="
                flex-1
                py-3
                border
                border-[rgba(196,149,74,0.2)]
                text-[#8a7d6a]
                text-xs
                font-['DM_Mono']
                uppercase
                tracking-widest
                hover:text-[#ede4d4]
                transition-colors
                disabled:opacity-50
              "
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={submitting}
              className="
                flex-1
                py-3
                bg-[#c4954a]
                text-[#0c0a08]
                text-xs
                font-['DM_Mono']
                uppercase
                tracking-widest
                hover:bg-[#d2a45b]
                transition-colors
                disabled:opacity-60
                disabled:cursor-not-allowed
                flex
                items-center
                justify-center
                gap-2
              "
            >

              {submitting ? (
                <>
                  <Loader2
                    size={14}
                    className="animate-spin"
                  />

                  {mode === "add"
                    ? "Adding..."
                    : "Updating..."}
                </>
              ) : (
                mode === "add"
                  ? "Add Item"
                  : "Save Changes"
              )}

            </button>

          </div>

        </form>

      </div>
    </div>
  );
}


/* =========================================================
   MAIN ADMIN MENU
========================================================= */

export default function AdminMenu() {

  const [menuItems, setMenuItems] =
    useState<MenuItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [updatingId, setUpdatingId] =
    useState<string | null>(null);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  const [submitting, setSubmitting] =
    useState(false);

  const [showForm, setShowForm] =
    useState(false);

  const [formMode, setFormMode] =
    useState<"add" | "edit">("add");

  const [editingItem, setEditingItem] =
    useState<MenuItem | null>(null);

  const [viewItem, setViewItem] =
    useState<MenuItem | null>(null);

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [form, setForm] = useState<MenuForm>({
    title: "",
    category: "",
    description: "",
    price: "",
    image: null,
  });


  /* =========================================================
     FETCH MENU
  ========================================================= */

  const fetchMenuItems = async () => {
    try {

      setLoading(true);

      const response =
        await api.get("/menu/all-menu");

      if (Array.isArray(response.data)) {
        setMenuItems(response.data);
      } else {
        setMenuItems([]);
      }

    } catch (error: any) {

      console.error(
        "Failed to fetch menu:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to load menu items."
      );

    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchMenuItems();
  }, []);


  /* =========================================================
     GET UNIQUE CATEGORIES
  ========================================================= */

  const categories = useMemo(() => {

    const categoryMap =
      new Map<string, MenuCategory>();

    menuItems.forEach((item) => {

      if (item.category?._id) {
        categoryMap.set(
          item.category._id,
          item.category
        );
      }

    });

    return Array.from(categoryMap.values());

  }, [menuItems]);


  /* =========================================================
     INPUT CHANGE
  ========================================================= */

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLTextAreaElement |
      HTMLSelectElement
    >
  ) => {

    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

  };


  /* =========================================================
     IMAGE CHANGE
  ========================================================= */

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      e.target.files?.[0] || null;

    setForm((current) => ({
      ...current,
      image: file,
    }));

  };


  /* =========================================================
     OPEN ADD FORM
  ========================================================= */

  const openAddForm = () => {

    setFormMode("add");

    setEditingItem(null);

    setForm({
      title: "",
      category: "",
      description: "",
      price: "",
      image: null,
    });

    setShowForm(true);
  };


  /* =========================================================
     OPEN EDIT FORM
  ========================================================= */

  const openEditForm = (item: MenuItem) => {

    setFormMode("edit");

    setEditingItem(item);

    setForm({
      title: item.title,
      category: item.category?._id || "",
      description: item.description,
      price: String(item.price),
      image: null,
    });

    setViewItem(null);

    setShowForm(true);
  };


  /* =========================================================
     CLOSE FORM
  ========================================================= */

  const closeForm = () => {

    if (submitting) return;

    setShowForm(false);

    setEditingItem(null);

  };


  /* =========================================================
     ADD / UPDATE MENU
  ========================================================= */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (!form.title.trim()) {
      toast.error(
        "Please enter the menu item name."
      );
      return;
    }

    if (!form.category) {
      toast.error(
        "Please select a category."
      );
      return;
    }

    if (
      !form.price ||
      Number(form.price) <= 0
    ) {
      toast.error(
        "Please enter a valid price."
      );
      return;
    }

    if (!form.description.trim()) {
      toast.error(
        "Please enter a description."
      );
      return;
    }

    if (
      formMode === "add" &&
      !form.image
    ) {
      toast.error(
        "Please select an image."
      );
      return;
    }


    try {

      setSubmitting(true);

      const formData = new FormData();

      formData.append(
        "title",
        form.title.trim()
      );

      formData.append(
        "description",
        form.description.trim()
      );

      formData.append(
        "price",
        String(Number(form.price))
      );

      formData.append(
        "category",
        form.category
      );


      if (form.image) {
        formData.append(
          "image",
          form.image
        );
      }


      /* =====================================================
         CREATE
      ===================================================== */

      if (formMode === "add") {

        const response =
          await api.post(
            "/menu/create",
            formData
          );

        const newItem =
          response.data?.menu;

        if (!newItem) {
          throw new Error(
            "Menu item was not returned by the server."
          );
        }

        setMenuItems((current) => [
          newItem,
          ...current,
        ]);

        toast.success(
          "Menu item added successfully."
        );

      }


      /* =====================================================
         UPDATE
      ===================================================== */

      else {

        if (!editingItem) {
          throw new Error(
            "No menu item selected for editing."
          );
        }

        /*
        Send the update to the backend.
        */

        const response =
          await api.patch(
            `/menu/${editingItem._id}`,
            formData
          );

        const updatedMenu =
          response.data?.menu;

        if (!updatedMenu) {
          throw new Error(
            "Updated menu item was not returned by the server."
          );
        }


        /*
        Replace the old item with
        the backend response.
        */

        setMenuItems((current) =>
          current.map((item) =>
            item._id === editingItem._id
              ? updatedMenu
              : item
          )
        );


        /*
        If details modal is open,
        update it as well.
        */

        setViewItem((current) =>
          current?._id === editingItem._id
            ? updatedMenu
            : current
        );

        toast.success(
          "Menu item updated successfully."
        );

      }


      setShowForm(false);

      setEditingItem(null);

      setForm({
        title: "",
        category: "",
        description: "",
        price: "",
        image: null,
      });

    } catch (error: any) {

      console.error(
        "Failed to save menu item:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to save menu item."
      );

    } finally {

      setSubmitting(false);

    }
  };


  /* =========================================================
     TOGGLE AVAILABILITY
  ========================================================= */

  const toggleAvailability = async (
    id: string
  ) => {

    try {

      setUpdatingId(id);

      const response =
        await api.patch(
          `/menu/${id}/availability`
        );

      const updatedMenu =
        response.data?.menu;

      if (!updatedMenu) {
        throw new Error(
          "Updated menu item was not returned."
        );
      }


      setMenuItems((current) =>
        current.map((item) =>
          item._id === id
            ? updatedMenu
            : item
        )
      );


      setViewItem((current) =>
        current?._id === id
          ? updatedMenu
          : current
      );


      toast.success(
        updatedMenu.isAvailable
          ? "Item is now available."
          : "Item is now unavailable."
      );

    } catch (error: any) {

      console.error(
        "Failed to update availability:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to update availability."
      );

    } finally {

      setUpdatingId(null);

    }
  };


  /* =========================================================
     DELETE
  ========================================================= */

  const deleteItem = async (
    id: string
  ) => {

    const item =
      menuItems.find(
        (menuItem) =>
          menuItem._id === id
      );

    if (!item) return;


    const confirmed =
      window.confirm(
        `Remove "${item.title}" from the menu?`
      );

    if (!confirmed) return;


    try {

      setDeletingId(id);

      await api.delete(
        `/menu/${id}`
      );


      setMenuItems((current) =>
        current.filter(
          (menuItem) =>
            menuItem._id !== id
        )
      );


      if (
        viewItem?._id === id
      ) {
        setViewItem(null);
      }


      toast.success(
        "Menu item removed."
      );

    } catch (error: any) {

      console.error(
        "Failed to delete menu item:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to delete menu item."
      );

    } finally {

      setDeletingId(null);

    }
  };


  /* =========================================================
     FILTER
  ========================================================= */

  const filteredItems =
    menuItems.filter((item) => {

      const query =
        search.toLowerCase().trim();

      const matchesSearch =
        item.title
          .toLowerCase()
          .includes(query) ||
        item.description
          .toLowerCase()
          .includes(query);

      const matchesCategory =
        categoryFilter === "All" ||
        item.category?.title ===
          categoryFilter;

      return (
        matchesSearch &&
        matchesCategory
      );
    });


  const availableCount =
    menuItems.filter(
      (item) => item.isAvailable
    ).length;


  const unavailableCount =
    menuItems.filter(
      (item) => !item.isAvailable
    ).length;


  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="space-y-6">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          lg:flex-row
          lg:items-end
          lg:justify-between
          gap-4
        "
      >

        <div>

          <div
            className="
              flex
              items-center
              gap-3
              mb-2
            "
          >

            <div
              className="
                w-7
                h-px
                bg-[#c4954a]
              "
            />

            <span
              className="
                text-[9px]
                font-['DM_Mono']
                text-[#c4954a]
                tracking-[0.2em]
                uppercase
              "
            >
              Restaurant Management
            </span>

          </div>


          <h2
            className="
              font-['Fraunces']
              text-2xl
              sm:text-3xl
              text-[#ede4d4]
            "
          >
            Menu Items
          </h2>


          <p
            className="
              text-sm
              font-['Jost']
              text-[#8a7d6a]
              mt-1
            "
          >
            Manage dishes, prices and menu
            availability.
          </p>

        </div>


        <button
          type="button"
          onClick={openAddForm}
          className="
            w-full
            sm:w-auto
            flex
            items-center
            justify-center
            gap-2
            px-4
            py-2.5
            bg-[#c4954a]
            text-[#0c0a08]
            text-xs
            font-['DM_Mono']
            uppercase
            tracking-wider
            hover:bg-[#d2a45b]
            transition-colors
          "
        >
          <Plus size={14} />
          Add Item
        </button>

      </div>


      {/* =====================================================
          STATS
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-2
          sm:grid-cols-3
          gap-3
        "
      >

        <div
          className="
            bg-[#161310]
            border
            border-[rgba(196,149,74,0.1)]
            p-4
          "
        >

          <p
            className="
              text-[9px]
              font-['DM_Mono']
              text-[#8a7d6a]
              tracking-widest
              uppercase
            "
          >
            Total Items
          </p>

          <p
            className="
              font-['Fraunces']
              text-2xl
              text-[#ede4d4]
              mt-2
            "
          >
            {menuItems.length}
          </p>

        </div>


        <div
          className="
            bg-[#161310]
            border
            border-[rgba(196,149,74,0.1)]
            p-4
          "
        >

          <p
            className="
              text-[9px]
              font-['DM_Mono']
              text-[#8a7d6a]
              tracking-widest
              uppercase
            "
          >
            Available
          </p>

          <p
            className="
              font-['Fraunces']
              text-2xl
              text-emerald-400
              mt-2
            "
          >
            {availableCount}
          </p>

        </div>


        <div
          className="
            bg-[#161310]
            border
            border-[rgba(196,149,74,0.1)]
            p-4
            col-span-2
            sm:col-span-1
          "
        >

          <p
            className="
              text-[9px]
              font-['DM_Mono']
              text-[#8a7d6a]
              tracking-widest
              uppercase
            "
          >
            Unavailable
          </p>

          <p
            className="
              font-['Fraunces']
              text-2xl
              text-red-400
              mt-2
            "
          >
            {unavailableCount}
          </p>

        </div>

      </div>


      {/* =====================================================
          SEARCH + FILTER
      ===================================================== */}

      <div
        className="
          flex
          flex-col
          sm:flex-row
          gap-3
        "
      >

        <div className="relative flex-1">

          <Search
            size={14}
            className="
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-[#8a7d6a]
            "
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search menu items..."
            className={`${INPUT} pl-9`}
          />

        </div>


        <select
          value={categoryFilter}
          onChange={(e) =>
            setCategoryFilter(e.target.value)
          }
          className={`${INPUT} sm:w-44`}
        >

          <option value="All">
            All Categories
          </option>

          {categories.map((category) => (
            <option
              key={category._id}
              value={category.title}
            >
              {category.title}
            </option>
          ))}

        </select>

      </div>


      {/* =====================================================
          TABLE
      ===================================================== */}

      <div
        className="
          bg-[#161310]
          border
          border-[rgba(196,149,74,0.1)]
          overflow-hidden
        "
      >

        <div className="overflow-x-auto">

          <table
            className="
              w-full
              text-xs
              font-['DM_Mono']
            "
          >

            <thead>

              <tr
                className="
                  border-b
                  border-[rgba(196,149,74,0.1)]
                "
              >

                {[
                  "Item",
                  "Category",
                  "Price",
                  "Available",
                  "Actions",
                ].map((heading) => (

                  <th
                    key={heading}
                    className="
                      text-left
                      py-3
                      px-4
                      text-[#8a7d6a]
                      tracking-widest
                      uppercase
                      font-normal
                      whitespace-nowrap
                    "
                  >
                    {heading}
                  </th>

                ))}

              </tr>

            </thead>


            <tbody>

              {loading ? (

                <tr>

                  <td
                    colSpan={5}
                    className="py-20"
                  >

                    <div
                      className="
                        flex
                        flex-col
                        items-center
                        justify-center
                      "
                    >

                      <Loader2
                        size={22}
                        className="
                          text-[#c4954a]
                          animate-spin
                        "
                      />

                      <p
                        className="
                          text-xs
                          font-['Jost']
                          text-[#8a7d6a]
                          mt-3
                        "
                      >
                        Loading menu items...
                      </p>

                    </div>

                  </td>

                </tr>

              ) : (

                filteredItems.map((item) => (

                  <tr
                    key={item._id}
                    className="
                      border-b
                      border-[rgba(196,149,74,0.06)]
                      hover:bg-[rgba(196,149,74,0.03)]
                      transition-colors
                    "
                  >

                    {/* ITEM */}

                    <td
                      className="
                        py-3.5
                        px-4
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        <div
                          className="
                            w-11
                            h-11
                            shrink-0
                            overflow-hidden
                            bg-[#0c0a08]
                          "
                        >

                          {item.image?.url ? (

                            <img
                              src={item.image.url}
                              alt={
                                item.image.alt ||
                                item.title
                              }
                              className="
                                w-full
                                h-full
                                object-cover
                              "
                            />

                          ) : (

                            <div
                              className="
                                w-full
                                h-full
                                flex
                                items-center
                                justify-center
                              "
                            >

                              <UtensilsCrossed
                                size={14}
                                className="
                                  text-[#8a7d6a]/50
                                "
                              />

                            </div>

                          )}

                        </div>


                        <div>

                          <p
                            className="
                              text-[#ede4d4]
                              font-['Jost']
                              text-sm
                            "
                          >
                            {item.title}
                          </p>

                          <p
                            className="
                              text-[9px]
                              text-[#8a7d6a]
                              mt-1
                              max-w-[260px]
                              truncate
                            "
                          >
                            {item.description}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* CATEGORY */}

                    <td
                      className="
                        py-3.5
                        px-4
                      "
                    >

                      <CategoryBadge
                        category={
                          item.category?.title ||
                          "Unknown"
                        }
                      />

                    </td>


                    {/* PRICE */}

                    <td
                      className="
                        py-3.5
                        px-4
                        text-[#c4954a]
                        whitespace-nowrap
                      "
                    >
                      ₦{item.price.toLocaleString()}
                    </td>


                    {/* AVAILABILITY */}

                    <td
                      className="
                        py-3.5
                        px-4
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                        "
                      >

                        <button
                          type="button"
                          disabled={
                            updatingId ===
                            item._id
                          }
                          onClick={() =>
                            toggleAvailability(
                              item._id
                            )
                          }
                          title={
                            item.isAvailable
                              ? "Make unavailable"
                              : "Make available"
                          }
                          className={`
                            relative
                            w-10
                            h-5
                            transition-colors
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                            ${
                              item.isAvailable
                                ? "bg-[#c4954a]"
                                : "bg-[#3a342d]"
                            }
                          `}
                        >

                          <span
                            className={`
                              absolute
                              top-0.5
                              w-4
                              h-4
                              bg-[#ede4d4]
                              transition-transform
                              ${
                                item.isAvailable
                                  ? "translate-x-5"
                                  : "translate-x-0.5"
                              }
                            `}
                          />

                          {updatingId ===
                            item._id && (
                            <span
                              className="
                                absolute
                                inset-0
                                flex
                                items-center
                                justify-center
                              "
                            >
                              <Loader2
                                size={10}
                                className="
                                  text-[#0c0a08]
                                  animate-spin
                                "
                              />
                            </span>
                          )}

                        </button>


                        <span
                          className={`
                            ml-2
                            text-[8px]
                            font-['DM_Mono']
                            uppercase
                            tracking-wider
                            ${
                              item.isAvailable
                                ? "text-emerald-400"
                                : "text-red-400"
                            }
                          `}
                        >
                          {item.isAvailable
                            ? "Available"
                            : "Unavailable"}
                        </span>

                      </div>

                    </td>


                    {/* ACTIONS */}

                    <td
                      className="
                        py-3.5
                        px-4
                      "
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-3
                        "
                      >

                        {/* VIEW */}

                        <button
                          type="button"
                          onClick={() =>
                            setViewItem(item)
                          }
                          title="View item"
                          className="
                            text-[#8a7d6a]
                            hover:text-[#c4954a]
                            transition-colors
                          "
                        >
                          <Eye size={15} />
                        </button>


                        {/* EDIT */}

                        <button
                          type="button"
                          onClick={() =>
                            openEditForm(item)
                          }
                          title="Edit item"
                          className="
                            text-[#8a7d6a]
                            hover:text-[#c4954a]
                            transition-colors
                          "
                        >
                          <Pencil size={15} />
                        </button>


                        {/* DELETE */}

                        <button
                          type="button"
                          disabled={
                            deletingId ===
                            item._id
                          }
                          onClick={() =>
                            deleteItem(
                              item._id
                            )
                          }
                          title="Delete item"
                          className="
                            text-[#8a7d6a]
                            hover:text-red-400
                            transition-colors
                            disabled:opacity-50
                          "
                        >

                          {deletingId ===
                          item._id ? (
                            <Loader2
                              size={15}
                              className="animate-spin"
                            />
                          ) : (
                            <Trash2
                              size={15}
                            />
                          )}

                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>


        {/* EMPTY */}

        {!loading &&
          filteredItems.length === 0 && (

            <div
              className="
                py-16
                text-center
              "
            >

              <div
                className="
                  w-10
                  h-10
                  mx-auto
                  mb-4
                  border
                  border-[rgba(196,149,74,0.15)]
                  flex
                  items-center
                  justify-center
                "
              >

                <Search
                  size={15}
                  className="text-[#8a7d6a]"
                />

              </div>

              <p
                className="
                  font-['Fraunces']
                  text-lg
                  text-[#ede4d4]
                "
              >
                No menu items found
              </p>

              <p
                className="
                  text-sm
                  font-['Jost']
                  text-[#8a7d6a]
                  mt-1
                "
              >
                Try changing your search or
                category filter.
              </p>

            </div>

          )}

      </div>


      {/* =====================================================
          MOBILE ACTION BAR
          
          This is important because the table can be
          difficult to use on small screens.
      ===================================================== */}

      {!loading && filteredItems.length > 0 && (

        <div className="md:hidden space-y-3">

          {filteredItems.map((item) => (

            <div
              key={`mobile-${item._id}`}
              className="
                bg-[#161310]
                border
                border-[rgba(196,149,74,0.1)]
                p-4
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                {/* Image */}

                <div
                  className="
                    w-14
                    h-14
                    shrink-0
                    overflow-hidden
                    bg-[#0c0a08]
                  "
                >

                  {item.image?.url ? (

                    <img
                      src={item.image.url}
                      alt={
                        item.image.alt ||
                        item.title
                      }
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />

                  ) : (

                    <div
                      className="
                        w-full
                        h-full
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <UtensilsCrossed
                        size={16}
                        className="
                          text-[#8a7d6a]/50
                        "
                      />
                    </div>

                  )}

                </div>


                {/* Information */}

                <div className="min-w-0 flex-1">

                  <p
                    className="
                      text-sm
                      font-['Jost']
                      text-[#ede4d4]
                      truncate
                    "
                  >
                    {item.title}
                  </p>

                  <p
                    className="
                      text-[9px]
                      font-['DM_Mono']
                      text-[#c4954a]
                      uppercase
                      tracking-wider
                      mt-1
                    "
                  >
                    {item.category?.title ||
                      "Unknown"}
                  </p>

                  <p
                    className="
                      text-sm
                      font-['Fraunces']
                      text-[#c4954a]
                      mt-1
                    "
                  >
                    ₦{item.price.toLocaleString()}
                  </p>

                </div>

              </div>


              {/* Mobile actions */}

              <div
                className="
                  mt-4
                  pt-3
                  border-t
                  border-[rgba(196,149,74,0.08)]
                  grid
                  grid-cols-4
                  gap-2
                "
              >

                {/* VIEW */}

                <button
                  type="button"
                  onClick={() =>
                    setViewItem(item)
                  }
                  className="
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    py-2
                    border
                    border-[rgba(196,149,74,0.12)]
                    text-[#8a7d6a]
                    hover:text-[#c4954a]
                    hover:border-[rgba(196,149,74,0.3)]
                  "
                >

                  <Eye size={14} />

                  <span
                    className="
                      text-[8px]
                      font-['DM_Mono']
                      uppercase
                    "
                  >
                    View
                  </span>

                </button>


                {/* EDIT */}

                <button
                  type="button"
                  onClick={() =>
                    openEditForm(item)
                  }
                  className="
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    py-2
                    border
                    border-[rgba(196,149,74,0.12)]
                    text-[#8a7d6a]
                    hover:text-[#c4954a]
                    hover:border-[rgba(196,149,74,0.3)]
                  "
                >

                  <Pencil size={14} />

                  <span
                    className="
                      text-[8px]
                      font-['DM_Mono']
                      uppercase
                    "
                  >
                    Edit
                  </span>

                </button>


                {/* AVAILABILITY */}

                <button
                  type="button"
                  disabled={
                    updatingId ===
                    item._id
                  }
                  onClick={() =>
                    toggleAvailability(
                      item._id
                    )
                  }
                  className="
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    py-2
                    border
                    border-[rgba(196,149,74,0.12)]
                    text-[#8a7d6a]
                    hover:text-[#c4954a]
                    disabled:opacity-50
                  "
                >

                  {updatingId ===
                  item._id ? (
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />
                  ) : (
                    <span
                      className={`
                        w-2
                        h-2
                        rounded-full
                        ${
                          item.isAvailable
                            ? "bg-emerald-400"
                            : "bg-red-400"
                        }
                      `}
                    />
                  )}

                  <span
                    className="
                      text-[8px]
                      font-['DM_Mono']
                      uppercase
                    "
                  >
                    {item.isAvailable
                      ? "On"
                      : "Off"}
                  </span>

                </button>


                {/* DELETE */}

                <button
                  type="button"
                  disabled={
                    deletingId ===
                    item._id
                  }
                  onClick={() =>
                    deleteItem(
                      item._id
                    )
                  }
                  className="
                    flex
                    items-center
                    justify-center
                    gap-1.5
                    py-2
                    border
                    border-red-400/10
                    text-[#8a7d6a]
                    hover:text-red-400
                    hover:border-red-400/20
                    disabled:opacity-50
                  "
                >

                  {deletingId ===
                  item._id ? (
                    <Loader2
                      size={14}
                      className="animate-spin"
                    />
                  ) : (
                    <Trash2
                      size={14}
                    />
                  )}

                  <span
                    className="
                      text-[8px]
                      font-['DM_Mono']
                      uppercase
                    "
                  >
                    Delete
                  </span>

                </button>

              </div>

            </div>

          ))}

        </div>

      )}


      {/* =====================================================
          ADD / EDIT MODAL
      ===================================================== */}

      {showForm && (

        <MenuFormModal
          mode={formMode}
          form={form}
          categories={categories}
          submitting={submitting}
          onClose={closeForm}
          onChange={handleInputChange}
          onImageChange={handleImageChange}
          onSubmit={handleSubmit}
        />

      )}


      {/* =====================================================
          DETAILS MODAL
      ===================================================== */}

      {viewItem && (

        <MenuDetailsModal
          item={viewItem}
          onClose={() =>
            setViewItem(null)
          }
          onEdit={() =>
            openEditForm(viewItem)
          }
        />

      )}

    </div>
  );
}