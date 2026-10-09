// "use client";

// import {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// import {
//   Plus,
//   Trash2,
//   BedDouble,
//   Users,
//   Maximize2,
//   Eye,
//   Search,
//   X,
//   Upload,
//   Image as ImageIcon,
// } from "lucide-react";

// import { toast } from "react-hot-toast";

// import api from "@/lib/api";

// /* =========================================================
//    TYPES
// ========================================================= */

// type ApartmentStatus =
//   | "available"
//   | "booked"
//   | "maintenance";

// type GalleryImage = {
//   _id?: string;
//   url: string;
//   type: string;
//   alt?: string;
// };

// type ApartmentCategory = {
//   _id: string;
//   title: string;
// };

// type ApartmentAmenity = {
//   _id: string;
//   name: string;
//   isActive?: boolean;
// };

// type Apartment = {
//   _id: string;
//   title: string;
//   description: string;
//   gallery: GalleryImage[];
//   area: number;
//   guests: number;
//   view: string;
//   price: number;
//   status: ApartmentStatus;
//   reviewCount: number;
//   rating: number;
//   slug: string;
//   category: ApartmentCategory | null;
//   amenities: ApartmentAmenity[];
//   isFeatured: boolean;
// };

// type GalleryFormImage = {
//   id: string;
//   file: File;
//   preview: string;
//   type: string;
//   alt: string;
// };

// /* =========================================================
//    GALLERY TYPES
// ========================================================= */

// const GALLERY_TYPES = [
//   {
//     value: "living-room",
//     label: "Living Room",
//   },
//   {
//     value: "bedroom",
//     label: "Bedroom",
//   },
//   {
//     value: "kitchen",
//     label: "Kitchen",
//   },
//   {
//     value: "toilet",
//     label: "Toilet",
//   },
//   {
//     value: "balcony",
//     label: "Balcony",
//   },
//   {
//     value: "dining-room",
//     label: "Dining Room",
//   },
//   {
//     value: "exterior",
//     label: "Exterior",
//   },
//   {
//     value: "other",
//     label: "Other",
//   },
// ];

// /* =========================================================
//    INPUT STYLE
// ========================================================= */

// const INPUT = `
//   w-full
//   bg-[#0c0a08]
//   border
//   border-[rgba(196,149,74,0.12)]
//   text-[#ede4d4]
//   placeholder:text-[#8a7d6a]/50
//   px-3
//   py-2.5
//   text-sm
//   font-['Jost']
//   outline-none
//   focus:border-[rgba(196,149,74,0.45)]
//   transition-colors
// `;

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
//       <label className="block text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mb-2">
//         {label}
//       </label>

//       {children}
//     </div>
//   );
// }

// /* =========================================================
//    STATUS BADGE
// ========================================================= */

// function RoomStatusBadge({
//   status,
// }: {
//   status: ApartmentStatus;
// }) {
//   const styles: Record<ApartmentStatus, string> = {
//     available:
//       "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",

//     booked:
//       "text-blue-400 bg-blue-400/10 border-blue-400/20",

//     maintenance:
//       "text-amber-400 bg-amber-400/10 border-amber-400/20",
//   };

//   const labels: Record<ApartmentStatus, string> = {
//     available: "Available",
//     booked: "Booked",
//     maintenance: "Maintenance",
//   };

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
//         tracking-widest
//         whitespace-nowrap
//         ${styles[status]}
//       `}
//     >
//       {labels[status]}
//     </span>
//   );
// }

// /* =========================================================
//    MAIN IMAGE
// ========================================================= */

// function getMainImage(apartment: Apartment) {
//   return (
//     apartment.gallery?.find(
//       (image) => image.type === "living-room"
//     )?.url ||
//     apartment.gallery?.[0]?.url ||
//     "/images/apartment-placeholder.jpg"
//   );
// }

// /* =========================================================
//    DETAIL BOX
// ========================================================= */

// function DetailBox({
//   icon,
//   label,
//   value,
// }: {
//   icon: React.ReactNode;
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="bg-[#0c0a08] border border-[rgba(196,149,74,0.08)] p-3">
//       <div className="text-[#c4954a] mb-2">
//         {icon}
//       </div>

//       <p className="text-[8px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest">
//         {label}
//       </p>

//       <p className="text-xs font-['Jost'] text-[#ede4d4] mt-1">
//         {value}
//       </p>
//     </div>
//   );
// }

// /* =========================================================
//    APARTMENT DETAILS MODAL
// ========================================================= */

// function ApartmentDetailsModal({
//   apartment,
//   onClose,
// }: {
//   apartment: Apartment;
//   onClose: () => void;
// }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//       <div
//         className="absolute inset-0 bg-black/75 backdrop-blur-sm"
//         onClick={onClose}
//       />

//       <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#161310] border border-[rgba(196,149,74,0.18)]">

//         {/* HEADER */}

//         <div className="sticky top-0 z-10 bg-[#161310] border-b border-[rgba(196,149,74,0.1)] px-5 sm:px-6 py-4 flex items-center justify-between">

//           <div>
//             <p className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-[0.2em] mb-1">
//               Apartment Details
//             </p>

//             <h2 className="font-['Fraunces'] text-xl text-[#ede4d4]">
//               {apartment.title}
//             </h2>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4] hover:bg-white/5"
//           >
//             <X size={17} />
//           </button>

//         </div>

//         {/* BODY */}

//         <div className="p-5 sm:p-6 space-y-6">

//           {/* MAIN IMAGE */}

//           <div className="relative">

//             <img
//               src={getMainImage(apartment)}
//               alt={apartment.title}
//               className="w-full h-64 object-cover"
//             />

//             <div className="absolute top-3 right-3">
//               <RoomStatusBadge status={apartment.status} />
//             </div>

//           </div>

//           {/* OVERVIEW */}

//           <div>

//             <div className="flex items-center justify-between gap-4 mb-3">

//               <div>

//                 <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest">
//                   {apartment.category?.title ||
//                     "Uncategorized"}
//                 </p>

//                 <h3 className="font-['Fraunces'] text-xl text-[#ede4d4] mt-1">
//                   {apartment.title}
//                 </h3>

//               </div>

//               <div className="text-right">

//                 <p className="font-['Fraunces'] text-xl text-[#c4954a]">
//                   ₦{apartment.price.toLocaleString()}
//                 </p>

//                 <p className="text-[8px] font-['DM_Mono'] text-[#8a7d6a] uppercase">
//                   per night
//                 </p>

//               </div>

//             </div>

//             <p className="text-sm font-['Jost'] leading-relaxed text-[#8a7d6a]">
//               {apartment.description}
//             </p>

//           </div>

//           {/* DETAILS */}

//           <div className="grid grid-cols-3 gap-3">

//             <DetailBox
//               icon={<Maximize2 size={14} />}
//               label="Area"
//               value={`${apartment.area} m²`}
//             />

//             <DetailBox
//               icon={<Users size={14} />}
//               label="Guests"
//               value={`${apartment.guests} Guests`}
//             />

//             <DetailBox
//               icon={<Eye size={14} />}
//               label="View"
//               value={apartment.view}
//             />

//           </div>

//           {/* FEATURED */}

//           {apartment.isFeatured && (
//             <div className="border border-[#c4954a]/20 bg-[#c4954a]/5 px-4 py-3">

//               <p className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-widest">
//                 Featured Apartment
//               </p>

//               <p className="text-xs text-[#8a7d6a] mt-1">
//                 This apartment is currently
//                 featured on Cedar Court.
//               </p>

//             </div>
//           )}

//           {/* AMENITIES */}

//           <div>

//             <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mb-3">
//               Amenities
//             </p>

//             <div className="flex flex-wrap gap-2">

//               {apartment.amenities?.map(
//                 (amenity) => (
//                   <span
//                     key={amenity._id}
//                     className="px-2.5 py-1.5 border border-[rgba(196,149,74,0.1)] bg-[#0c0a08] text-[10px] font-['DM_Mono'] text-[#8a7d6a]"
//                   >
//                     {amenity.name}
//                   </span>
//                 )
//               )}

//             </div>

//           </div>

//           {/* GALLERY */}

//           <div>

//             <div className="flex items-center justify-between mb-3">

//               <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest">
//                 Apartment Gallery
//               </p>

//               <span className="text-[9px] font-['DM_Mono'] text-[#8a7d6a]">
//                 {apartment.gallery?.length || 0} images
//               </span>

//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">

//               {apartment.gallery?.map(
//                 (image, index) => (
//                   <div
//                     key={`${image.url}-${index}`}
//                     className="relative"
//                   >

//                     <img
//                       src={image.url}
//                       alt={
//                         image.alt ||
//                         apartment.title
//                       }
//                       className="w-full h-28 object-cover"
//                     />

//                     <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">

//                       <p className="text-[9px] font-['DM_Mono'] text-white uppercase tracking-wider">
//                         {image.type.replace(
//                           "-",
//                           " "
//                         )}
//                       </p>

//                     </div>

//                   </div>
//                 )
//               )}

//             </div>

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// /* =========================================================
//    MAIN ADMIN APARTMENTS PAGE
// ========================================================= */

// export default function AdminApartments() {

//   const [apartments, setApartments] =
//     useState<Apartment[]>([]);

//   const [loading, setLoading] =
//     useState(true);

//   const [search, setSearch] =
//     useState("");

//   const [viewApartment, setViewApartment] =
//     useState<Apartment | null>(null);

//   const [showForm, setShowForm] =
//     useState(false);

//   /* =======================================================
//      FETCH APARTMENTS
//   ======================================================= */

//   const fetchApartments = useCallback(
//     async () => {
//       try {
//         setLoading(true);

//         const response = await api.get(
//           "/apartment/all-apartments"
//         );

//         const apartmentsData =
//           response.data?.apartments;

//         if (Array.isArray(apartmentsData)) {
//           setApartments(apartmentsData);
//         } else {
//           setApartments([]);
//         }

//       } catch (error: any) {

//         console.error(
//           "FAILED TO FETCH APARTMENTS:",
//           error
//         );

//         console.error(
//           "Response:",
//           error?.response?.data
//         );

//         toast.error(
//           error?.response?.data?.message ||
//           "Failed to load apartments."
//         );

//       } finally {
//         setLoading(false);
//       }
//     },
//     []
//   );

//   useEffect(() => {
//     fetchApartments();
//   }, [fetchApartments]);

//   /* =======================================================
//      SEARCH
//   ======================================================= */

//   const filteredApartments = useMemo(() => {

//     const query =
//       search.toLowerCase().trim();

//     if (!query) {
//       return apartments;
//     }

//     return apartments.filter(
//       (apartment) => {

//         const title =
//           apartment.title
//             ?.toLowerCase() || "";

//         const category =
//           apartment.category?.title
//             ?.toLowerCase() || "";

//         const view =
//           apartment.view
//             ?.toLowerCase() || "";

//         return (
//           title.includes(query) ||
//           category.includes(query) ||
//           view.includes(query)
//         );
//       }
//     );

//   }, [apartments, search]);

//   /* =======================================================
//      STATUS

//      Your current backend does not have a status update
//      endpoint, so this remains UI-only for now.
//   ======================================================= */

//   const updateStatus = (
//     apartmentId: string,
//     status: ApartmentStatus
//   ) => {

//     setApartments((current) =>
//       current.map((apartment) =>
//         apartment._id === apartmentId
//           ? {
//               ...apartment,
//               status,
//             }
//           : apartment
//       )
//     );

//     setViewApartment((current) =>
//       current?._id === apartmentId
//         ? {
//             ...current,
//             status,
//           }
//         : current
//     );

//     toast.success(
//       "Apartment status updated."
//     );
//   };

//   /* =======================================================
//      DELETE

//      Your current backend does not have a delete endpoint,
//      so this remains UI-only for now.
//   ======================================================= */

//   const deleteApartment = (
//     apartment: Apartment
//   ) => {

//     const confirmed =
//       window.confirm(
//         `Remove "${apartment.title}" from the apartment list?`
//       );

//     if (!confirmed) return;

//     setApartments((current) =>
//       current.filter(
//         (item) =>
//           item._id !== apartment._id
//       )
//     );

//     if (
//       viewApartment?._id ===
//       apartment._id
//     ) {
//       setViewApartment(null);
//     }

//     toast.success(
//       "Apartment removed."
//     );
//   };

//   /* =======================================================
//      LOADING
//   ======================================================= */

//   if (loading) {
//     return (
//       <div className="space-y-6">

//         <div>

//           <div className="flex items-center gap-3 mb-2">

//             <div className="w-8 h-px bg-[#c4954a]" />

//             <span className="text-[9px] font-['DM_Mono'] text-[#c4954a] tracking-[0.2em] uppercase">
//               Property Management
//             </span>

//           </div>

//           <h2 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
//             Apartments
//           </h2>

//           <p className="text-xs font-['Jost'] text-[#8a7d6a] mt-1">
//             Manage Cedar Court apartments,
//             availability and details.
//           </p>

//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

//           {[1, 2, 3].map((item) => (
//             <div
//               key={item}
//               className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-hidden animate-pulse"
//             >

//               <div className="h-48 bg-[#211d18]" />

//               <div className="p-4 space-y-4">

//                 <div className="h-5 bg-[#211d18] w-2/3" />

//                 <div className="h-3 bg-[#211d18] w-1/3" />

//                 <div className="h-8 bg-[#211d18]" />

//               </div>

//             </div>
//           ))}

//         </div>

//       </div>
//     );
//   }

//   /* =======================================================
//      PAGE
//   ======================================================= */

//   return (
//     <div className="space-y-6">

//       {/* HEADER */}

//       <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">

//         <div>

//           <div className="flex items-center gap-3 mb-2">

//             <div className="w-8 h-px bg-[#c4954a]" />

//             <span className="text-[9px] font-['DM_Mono'] text-[#c4954a] tracking-[0.2em] uppercase">
//               Property Management
//             </span>

//           </div>

//           <h2 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
//             Apartments
//           </h2>

//           <p className="text-xs font-['Jost'] text-[#8a7d6a] mt-1">
//             Manage Cedar Court apartments,
//             availability and details.
//           </p>

//         </div>

//         <div className="flex w-full sm:w-auto items-center gap-2">

//           {/* SEARCH */}

//           <div className="relative flex-1 sm:w-56">

//             <Search
//               size={13}
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
//             />

//             <input
//               value={search}
//               onChange={(e) =>
//                 setSearch(e.target.value)
//               }
//               placeholder="Search apartments..."
//               className={`${INPUT} pl-9`}
//             />

//           </div>

//           {/* ADD */}

//           <button
//             type="button"
//             onClick={() =>
//               setShowForm(true)
//             }
//             className="
//               flex
//               items-center
//               gap-2
//               px-4
//               py-2.5
//               bg-[#c4954a]
//               text-[#0c0a08]
//               text-xs
//               font-['DM_Mono']
//               uppercase
//               tracking-wider
//               hover:bg-[#d2a45b]
//               transition-colors
//               whitespace-nowrap
//             "
//           >

//             <Plus size={14} />

//             <span>
//               Add Apartment
//             </span>

//           </button>

//         </div>

//       </div>

//       {/* APARTMENT GRID */}

//       {filteredApartments.length > 0 ? (

//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

//           {filteredApartments.map(
//             (apartment) => (

//               <div
//                 key={apartment._id}
//                 className="
//                   bg-[#161310]
//                   border
//                   border-[rgba(196,149,74,0.1)]
//                   overflow-hidden
//                   group
//                 "
//               >

//                 {/* IMAGE */}

//                 <div className="relative">

//                   <img
//                     src={getMainImage(
//                       apartment
//                     )}
//                     alt={apartment.title}
//                     className="
//                       w-full
//                       h-48
//                       object-cover
//                       transition-transform
//                       duration-500
//                       group-hover:scale-[1.02]
//                     "
//                   />

//                   <div className="absolute top-3 right-3">

//                     <RoomStatusBadge
//                       status={
//                         apartment.status
//                       }
//                     />

//                   </div>

//                   <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-2.5 py-1">

//                     <span className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-wider">
//                       {apartment.category?.title ||
//                         "Uncategorized"}
//                     </span>

//                   </div>

//                 </div>

//                 {/* CONTENT */}

//                 <div className="p-4">

//                   <div className="flex items-start justify-between gap-3 mb-3">

//                     <div>

//                       <h3 className="font-['Fraunces'] text-lg text-[#ede4d4]">
//                         {apartment.title}
//                       </h3>

//                       <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] mt-1 uppercase tracking-wider">
//                         {apartment.view}
//                       </p>

//                     </div>

//                     <div className="text-right shrink-0">

//                       <p className="font-['Fraunces'] text-base text-[#c4954a]">
//                         ₦
//                         {apartment.price.toLocaleString()}
//                       </p>

//                       <p className="text-[8px] font-['DM_Mono'] text-[#8a7d6a] uppercase">
//                         / night
//                       </p>

//                     </div>

//                   </div>

//                   {/* METADATA */}

//                   <div className="flex items-center gap-4 pb-3 mb-3 border-b border-[rgba(196,149,74,0.08)]">

//                     <div className="flex items-center gap-1.5 text-[#8a7d6a]">

//                       <Maximize2 size={12} />

//                       <span className="text-[9px] font-['DM_Mono']">
//                         {apartment.area} m²
//                       </span>

//                     </div>

//                     <div className="flex items-center gap-1.5 text-[#8a7d6a]">

//                       <Users size={12} />

//                       <span className="text-[9px] font-['DM_Mono']">
//                         {apartment.guests} guests
//                       </span>

//                     </div>

//                     <div className="flex items-center gap-1.5 text-[#8a7d6a]">

//                       <BedDouble size={12} />

//                       <span className="text-[9px] font-['DM_Mono']">
//                         {apartment.reviewCount} reviews
//                       </span>

//                     </div>

//                   </div>

//                   {/* ACTIONS */}

//                   <div className="flex gap-2">

//                     <select
//                       value={
//                         apartment.status
//                       }
//                       onChange={(e) =>
//                         updateStatus(
//                           apartment._id,
//                           e.target
//                             .value as ApartmentStatus
//                         )
//                       }
//                       className={`
//                         ${INPUT}
//                         text-xs
//                         py-2
//                         flex-1
//                       `}
//                     >

//                       <option value="available">
//                         Available
//                       </option>

//                       <option value="booked">
//                         Booked
//                       </option>

//                       <option value="maintenance">
//                         Maintenance
//                       </option>

//                     </select>

//                     <button
//                       type="button"
//                       onClick={() =>
//                         setViewApartment(
//                           apartment
//                         )
//                       }
//                       title="View apartment"
//                       className="
//                         px-3
//                         border
//                         border-[rgba(196,149,74,0.15)]
//                         text-[#8a7d6a]
//                         hover:text-[#c4954a]
//                         hover:border-[#c4954a]/40
//                         transition-colors
//                       "
//                     >
//                       <Eye size={14} />
//                     </button>

//                     <button
//                       type="button"
//                       onClick={() =>
//                         deleteApartment(
//                           apartment
//                         )
//                       }
//                       title="Delete apartment"
//                       className="
//                         px-3
//                         border
//                         border-red-900/40
//                         text-red-400/70
//                         hover:text-red-400
//                         hover:border-red-400/40
//                         transition-colors
//                       "
//                     >
//                       <Trash2 size={14} />
//                     </button>

//                   </div>

//                 </div>

//               </div>
//             )
//           )}

//         </div>

//       ) : (

//         <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] py-16 text-center">

//           <Search
//             size={24}
//             className="mx-auto text-[#8a7d6a]/50 mb-3"
//           />

//           <h3 className="font-['Fraunces'] text-lg text-[#ede4d4]">
//             {search
//               ? "No apartments found"
//               : "No apartments available"}
//           </h3>

//           <p className="text-xs font-['Jost'] text-[#8a7d6a] mt-1">
//             {search
//               ? "Try searching for another apartment or category."
//               : "Add your first Cedar Court apartment."}
//           </p>

//         </div>

//       )}

//       {/* DETAILS MODAL */}

//       {viewApartment && (
//         <ApartmentDetailsModal
//           apartment={viewApartment}
//           onClose={() =>
//             setViewApartment(null)
//           }
//         />
//       )}

//       {/* ADD MODAL */}

//       {showForm && (
//         <AddApartmentModal
//           onClose={() =>
//             setShowForm(false)
//           }
//           onCreated={fetchApartments}
//         />
//       )}

//     </div>
//   );
// }

// /* =========================================================
//    ADD APARTMENT MODAL
// ========================================================= */

// function AddApartmentModal({
//   onClose,
//   onCreated,
// }: {
//   onClose: () => void;
//   onCreated: () => Promise<void>;
// }) {

//   /* =======================================================
//      FORM STATE
//   ======================================================= */

//   const [form, setForm] = useState({
//     title: "",
//     category: "",
//     description: "",
//     price: "",
//     area: "",
//     guests: "2",
//     view: "",
//     status:
//       "available" as ApartmentStatus,
//     amenities: [] as string[],
//     isFeatured: true,
//   });

//   /* =======================================================
//      REAL CATEGORIES
//   ======================================================= */

//   const [categories, setCategories] =
//     useState<ApartmentCategory[]>([]);

//   const [categoriesLoading, setCategoriesLoading] =
//     useState(true);

//   /* =======================================================
//      REAL AMENITIES
//   ======================================================= */

//   const [amenities, setAmenities] =
//     useState<ApartmentAmenity[]>([]);

//   const [amenitiesLoading, setAmenitiesLoading] =
//     useState(true);

//   /* =======================================================
//      GALLERY
//   ======================================================= */

//   const [gallery, setGallery] =
//     useState<GalleryFormImage[]>([]);

//   const fileInputRef =
//     useRef<HTMLInputElement | null>(null);

//   /* =======================================================
//      SUBMIT
//   ======================================================= */

//   const [submitting, setSubmitting] =
//     useState(false);

//   /* =======================================================
//      FETCH CATEGORIES
//   ======================================================= */

//   useEffect(() => {

//     const fetchCategories =
//       async () => {

//         try {

//           setCategoriesLoading(true);

//           const response =
//             await api.get(
//               "/apartment-category/all-categories"
//             );

//           const data =
//             response.data?.categories;

//           if (Array.isArray(data)) {
//             setCategories(data);
//           } else {
//             setCategories([]);
//           }

//         } catch (error: any) {

//           console.error(
//             "FAILED TO FETCH CATEGORIES:",
//             error
//           );

//           toast.error(
//             error?.response?.data?.message ||
//             "Failed to load categories."
//           );

//         } finally {

//           setCategoriesLoading(false);

//         }
//       };

//     fetchCategories();

//   }, []);

//   /* =======================================================
//      FETCH AMENITIES
//   ======================================================= */

//   useEffect(() => {

//     const fetchAmenities =
//       async () => {

//         try {

//           setAmenitiesLoading(true);

//           const response =
//             await api.get(
//               "/apartment-amenity/all-amenities"
//             );

//           const data =
//             response.data?.amenities;

//           if (Array.isArray(data)) {
//             setAmenities(data);
//           } else {
//             setAmenities([]);
//           }

//         } catch (error: any) {

//           console.error(
//             "FAILED TO FETCH AMENITIES:",
//             error
//           );

//           toast.error(
//             error?.response?.data?.message ||
//             "Failed to load amenities."
//           );

//         } finally {

//           setAmenitiesLoading(false);

//         }
//       };

//     fetchAmenities();

//   }, []);

//   /* =======================================================
//      TOGGLE AMENITY
     
//      IMPORTANT:
//      We store the MongoDB _id,
//      not the amenity name.
//   ======================================================= */

//   const toggleAmenity = (
//     amenityId: string
//   ) => {

//     setForm((current) => ({

//       ...current,

//       amenities:
//         current.amenities.includes(
//           amenityId
//         )
//           ? current.amenities.filter(
//               (id) => id !== amenityId
//             )
//           : [
//               ...current.amenities,
//               amenityId,
//             ],

//     }));
//   };

//   /* =======================================================
//      ADD IMAGES
//   ======================================================= */

//   const handleImages = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {

//     const files =
//       Array.from(
//         e.target.files || []
//       );

//     if (!files.length) {
//       return;
//     }

//     /* MAX 10 */

//     if (
//       gallery.length + files.length >
//       10
//     ) {

//       toast.error(
//         "You can upload a maximum of 10 images."
//       );

//       e.target.value = "";
//       return;

//     }

//     /* VALIDATE FILES */

//     const validFiles: File[] = [];

//     for (const file of files) {

//       if (
//         !file.type.startsWith(
//           "image/"
//         )
//       ) {

//         toast.error(
//           `${file.name} is not an image.`
//         );

//         continue;
//       }

//       if (
//         file.size >
//         5 * 1024 * 1024
//       ) {

//         toast.error(
//           `${file.name} is larger than 5MB.`
//         );

//         continue;
//       }

//       validFiles.push(file);
//     }

//     /* ADD VALID FILES */

//     const newImages =
//       validFiles.map(
//         (file, index) => {

//           const id =
//             `${Date.now()}-${index}-${file.name}`;

//           return {
//             id,
//             file,
//             preview:
//               URL.createObjectURL(
//                 file
//               ),
//             type:
//               gallery.length === 0 &&
//               index === 0
//                 ? "living-room"
//                 : "other",
//             alt: "",
//           };
//         }
//       );

//     setGallery((current) => [
//       ...current,
//       ...newImages,
//     ]);

//     e.target.value = "";

//   };

//   /* =======================================================
//      UPDATE IMAGE TYPE
//   ======================================================= */

//   const updateImageType = (
//     id: string,
//     type: string
//   ) => {

//     setGallery((current) =>
//       current.map((image) =>
//         image.id === id
//           ? {
//               ...image,
//               type,
//             }
//           : image
//       )
//     );
//   };

//   /* =======================================================
//      UPDATE IMAGE ALT
//   ======================================================= */

//   const updateImageAlt = (
//     id: string,
//     alt: string
//   ) => {

//     setGallery((current) =>
//       current.map((image) =>
//         image.id === id
//           ? {
//               ...image,
//               alt,
//             }
//           : image
//       )
//     );
//   };

//   /* =======================================================
//      REMOVE IMAGE
//   ======================================================= */

//   const removeImage = (
//     id: string
//   ) => {

//     setGallery((current) => {

//       const image =
//         current.find(
//           (item) =>
//             item.id === id
//         );

//       if (image) {
//         URL.revokeObjectURL(
//           image.preview
//         );
//       }

//       return current.filter(
//         (item) =>
//           item.id !== id
//       );

//     });

//   };

//   /* =======================================================
//      CLEANUP PREVIEW URLS
//   ======================================================= */

//   useEffect(() => {

//     return () => {

//       gallery.forEach(
//         (image) => {
//           URL.revokeObjectURL(
//             image.preview
//           );
//         }
//       );

//     };

//   }, []);

//   /* =======================================================
//      SUBMIT TO BACKEND
//   ======================================================= */

//   const handleSubmit = async (
//     e: React.FormEvent
//   ) => {

//     e.preventDefault();

//     /* ---------------------------------------------
//        CLIENT VALIDATION
//     --------------------------------------------- */

//     if (!form.category) {

//       toast.error(
//         "Please select an apartment category."
//       );

//       return;
//     }

//     if (
//       form.amenities.length === 0
//     ) {

//       toast.error(
//         "Please select at least one amenity."
//       );

//       return;
//     }

//     if (gallery.length === 0) {

//       toast.error(
//         "Please upload at least one apartment image."
//       );

//       return;
//     }

//     /* Every image needs a type */

//     const missingType =
//       gallery.some(
//         (image) =>
//           !image.type
//       );

//     if (missingType) {

//       toast.error(
//         "Please assign a type to every gallery image."
//       );

//       return;
//     }

//     try {

//       setSubmitting(true);

//       /* ---------------------------------------------
//          CREATE FORMDATA
//       --------------------------------------------- */

//       const formData =
//         new FormData();

//       /* BASIC FIELDS */

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
//         form.price
//       );

//       formData.append(
//         "category",
//         form.category
//       );

//       formData.append(
//         "area",
//         form.area
//       );

//       formData.append(
//         "guests",
//         form.guests
//       );

//       formData.append(
//         "view",
//         form.view.trim()
//       );

//       /* ---------------------------------------------
//          FEATURED

//          Your controller expects:

//          isFeatured === "true"
//       --------------------------------------------- */

//       formData.append(
//         "isFeatured",
//         String(form.isFeatured)
//       );

//       /* ---------------------------------------------
//          AMENITIES

//          IMPORTANT:
//          Send the MongoDB IDs.

//          The backend receives:

//          amenities: [
//            "id1",
//            "id2",
//            "id3"
//          ]
//       --------------------------------------------- */

//       form.amenities.forEach(
//         (amenityId) => {

//           formData.append(
//             "amenities",
//             amenityId
//           );

//         }
//       );

//       /* ---------------------------------------------
//          IMAGES

//          Backend:

//          upload.array("images", 10)
//       --------------------------------------------- */

//       gallery.forEach(
//         (image) => {

//           formData.append(
//             "images",
//             image.file
//           );

//         }
//       );

//       /* ---------------------------------------------
//          IMAGE TYPES

//          Must have the same number
//          of entries as images.
//       --------------------------------------------- */

//       gallery.forEach(
//         (image) => {

//           formData.append(
//             "imageTypes",
//             image.type
//           );

//         }
//       );

//       /* ---------------------------------------------
//          IMAGE ALTS
//       --------------------------------------------- */

//       gallery.forEach(
//         (image) => {

//           formData.append(
//             "imageAlts",
//             image.alt.trim() ||
//             form.title.trim()
//           );

//         }
//       );

//       /* ---------------------------------------------
//          SEND REQUEST
//       --------------------------------------------- */

//       const response =
//         await api.post(
//           "/apartment/create",
//           formData
//         );

//       console.log(
//         "CREATE APARTMENT RESPONSE:",
//         response.data
//       );

//       /* ---------------------------------------------
//          REFRESH APARTMENT LIST
//       --------------------------------------------- */

//       await onCreated();

//       toast.success(
//         response.data?.message ||
//         "Apartment created successfully."
//       );

//       /* ---------------------------------------------
//          CLOSE MODAL
//       --------------------------------------------- */

//       onClose();

//     } catch (error: any) {

//       console.error(
//         "CREATE APARTMENT FAILED:",
//         error
//       );

//       console.error(
//         "BACKEND RESPONSE:",
//         error?.response?.data
//       );

//       toast.error(
//         error?.response?.data?.message ||
//         "Failed to create apartment."
//       );

//     } finally {

//       setSubmitting(false);

//     }
//   };

//   /* =======================================================
//      MODAL
//   ======================================================= */

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

//       {/* OVERLAY */}

//       <div
//         className="absolute inset-0 bg-black/75 backdrop-blur-sm"
//         onClick={() => {
//           if (!submitting) {
//             onClose();
//           }
//         }}
//       />

//       {/* MODAL */}

//       <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#161310] border border-[rgba(196,149,74,0.18)]">

//         {/* HEADER */}

//         <div className="sticky top-0 z-20 bg-[#161310] border-b border-[rgba(196,149,74,0.1)] px-5 sm:px-6 py-4 flex items-center justify-between">

//           <div>

//             <p className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-[0.2em] mb-1">
//               Property Management
//             </p>

//             <h2 className="font-['Fraunces'] text-xl text-[#ede4d4]">
//               Add New Apartment
//             </h2>

//           </div>

//           <button
//             type="button"
//             disabled={submitting}
//             onClick={onClose}
//             className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4] hover:bg-white/5 disabled:opacity-40"
//           >
//             <X size={17} />
//           </button>

//         </div>

//         {/* FORM */}

//         <form
//           onSubmit={handleSubmit}
//           className="p-5 sm:p-6 space-y-7"
//         >

//           {/* =================================================
//               BASIC INFORMATION
//           ================================================= */}

//           <div>

//             <div className="flex items-center gap-3 mb-4">

//               <div className="w-6 h-px bg-[#c4954a]" />

//               <span className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-widest">
//                 Basic Information
//               </span>

//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

//               {/* TITLE */}

//               <FormField label="Apartment Name">

//                 <input
//                   required
//                   value={form.title}
//                   onChange={(e) =>
//                     setForm((current) => ({
//                       ...current,
//                       title:
//                         e.target.value,
//                     }))
//                   }
//                   className={INPUT}
//                   placeholder="Presidential Suite"
//                   disabled={submitting}
//                 />

//               </FormField>

//               {/* CATEGORY */}

//               <FormField label="Category">

//                 <select
//                   required
//                   value={form.category}
//                   onChange={(e) =>
//                     setForm((current) => ({
//                       ...current,
//                       category:
//                         e.target.value,
//                     }))
//                   }
//                   className={INPUT}
//                   disabled={
//                     submitting ||
//                     categoriesLoading
//                   }
//                 >

//                   <option value="">
//                     {categoriesLoading
//                       ? "Loading categories..."
//                       : "Select category"}
//                   </option>

//                   {categories.map(
//                     (category) => (
//                       <option
//                         key={category._id}
//                         value={category._id}
//                       >
//                         {category.title}
//                       </option>
//                     )
//                   )}

//                 </select>

//               </FormField>

//             </div>

//           </div>

//           {/* =================================================
//               PROPERTY DETAILS
//           ================================================= */}

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

//             <FormField label="Price / Night (₦)">

//               <input
//                 required
//                 type="number"
//                 min="1"
//                 value={form.price}
//                 onChange={(e) =>
//                   setForm((current) => ({
//                     ...current,
//                     price:
//                       e.target.value,
//                   }))
//                 }
//                 className={INPUT}
//                 placeholder="850000"
//                 disabled={submitting}
//               />

//             </FormField>

//             <FormField label="Area (m²)">

//               <input
//                 required
//                 type="number"
//                 min="1"
//                 value={form.area}
//                 onChange={(e) =>
//                   setForm((current) => ({
//                     ...current,
//                     area:
//                       e.target.value,
//                   }))
//                 }
//                 className={INPUT}
//                 placeholder="120"
//                 disabled={submitting}
//               />

//             </FormField>

//             <FormField label="Guest Capacity">

//               <input
//                 required
//                 type="number"
//                 min="1"
//                 max="20"
//                 value={form.guests}
//                 onChange={(e) =>
//                   setForm((current) => ({
//                     ...current,
//                     guests:
//                       e.target.value,
//                   }))
//                 }
//                 className={INPUT}
//                 disabled={submitting}
//               />

//             </FormField>

//           </div>

//           {/* =================================================
//               VIEW / STATUS / FEATURED
//           ================================================= */}

//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

//             {/* VIEW */}

//             <FormField label="View">

//               <input
//                 required
//                 value={form.view}
//                 onChange={(e) =>
//                   setForm((current) => ({
//                     ...current,
//                     view:
//                       e.target.value,
//                   }))
//                 }
//                 className={INPUT}
//                 placeholder="City View"
//                 disabled={submitting}
//               />

//             </FormField>

//             {/* STATUS */}

//             <FormField label="Status">

//               <select
//                 value={form.status}
//                 onChange={(e) =>
//                   setForm((current) => ({
//                     ...current,
//                     status:
//                       e.target.value as ApartmentStatus,
//                   }))
//                 }
//                 className={INPUT}
//                 disabled={submitting}
//               >

//                 <option value="available">
//                   Available
//                 </option>

//                 <option value="booked">
//                   Booked
//                 </option>

//                 <option value="maintenance">
//                   Maintenance
//                 </option>

//               </select>

//             </FormField>

//             {/* FEATURED */}

//             <FormField label="Featured">

//               <button
//                 type="button"
//                 disabled={submitting}
//                 onClick={() =>
//                   setForm((current) => ({
//                     ...current,
//                     isFeatured:
//                       !current.isFeatured,
//                   }))
//                 }
//                 className={`
//                   w-full
//                   h-[42px]
//                   border
//                   flex
//                   items-center
//                   justify-between
//                   px-3
//                   ${
//                     form.isFeatured
//                       ? "border-[#c4954a]/50 bg-[#c4954a]/10"
//                       : "border-[rgba(196,149,74,0.12)] bg-[#0c0a08]"
//                   }
//                 `}
//               >

//                 <span className="text-xs font-['Jost'] text-[#ede4d4]">
//                   Featured apartment
//                 </span>

//                 <span
//                   className={`
//                     w-8
//                     h-4
//                     rounded-full
//                     relative
//                     transition-colors
//                     ${
//                       form.isFeatured
//                         ? "bg-[#c4954a]"
//                         : "bg-[#3a342c]"
//                     }
//                   `}
//                 >

//                   <span
//                     className={`
//                       absolute
//                       top-0.5
//                       w-3
//                       h-3
//                       rounded-full
//                       bg-white
//                       transition-transform
//                       ${
//                         form.isFeatured
//                           ? "translate-x-4"
//                           : "translate-x-0.5"
//                       }
//                     `}
//                   />

//                 </span>

//               </button>

//             </FormField>

//           </div>

//           {/* =================================================
//               DESCRIPTION
//           ================================================= */}

//           <FormField label="Description">

//             <textarea
//               required
//               value={form.description}
//               onChange={(e) =>
//                 setForm((current) => ({
//                   ...current,
//                   description:
//                     e.target.value,
//                 }))
//               }
//               rows={4}
//               className={`${INPUT} resize-none`}
//               placeholder="Describe the apartment..."
//               disabled={submitting}
//             />

//           </FormField>

//           {/* =================================================
//               AMENITIES
//           ================================================= */}

//           <div>

//             <div className="flex items-center justify-between mb-3">

//               <div>

//                 <label className="block text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-widest">
//                   Amenities
//                 </label>

//                 <p className="text-[10px] font-['Jost'] text-[#8a7d6a] mt-1">
//                   Select the amenities available
//                   in this apartment.
//                 </p>

//               </div>

//               <span className="text-[9px] font-['DM_Mono'] text-[#8a7d6a]">
//                 {form.amenities.length} selected
//               </span>

//             </div>

//             {amenitiesLoading ? (

//               <div className="border border-[rgba(196,149,74,0.1)] bg-[#0c0a08] p-5">

//                 <p className="text-xs font-['Jost'] text-[#8a7d6a]">
//                   Loading amenities...
//                 </p>

//               </div>

//             ) : amenities.length === 0 ? (

//               <div className="border border-red-900/30 bg-red-950/10 p-5">

//                 <p className="text-xs font-['Jost'] text-red-400">
//                   No apartment amenities found.
//                 </p>

//               </div>

//             ) : (

//               <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">

//                 {amenities.map(
//                   (amenity) => {

//                     const selected =
//                       form.amenities.includes(
//                         amenity._id
//                       );

//                     return (
//                       <button
//                         key={amenity._id}
//                         type="button"
//                         disabled={submitting}
//                         onClick={() =>
//                           toggleAmenity(
//                             amenity._id
//                           )
//                         }
//                         className={`
//                           flex
//                           items-center
//                           gap-2
//                           p-3
//                           border
//                           text-left
//                           transition-colors
//                           ${
//                             selected
//                               ? "border-[#c4954a]/50 bg-[#c4954a]/10 text-[#ede4d4]"
//                               : "border-[rgba(196,149,74,0.1)] bg-[#0c0a08] text-[#8a7d6a] hover:border-[#c4954a]/30"
//                           }
//                         `}
//                       >

//                         <span
//                           className={`
//                             w-4
//                             h-4
//                             border
//                             flex
//                             items-center
//                             justify-center
//                             shrink-0
//                             ${
//                               selected
//                                 ? "border-[#c4954a] bg-[#c4954a] text-[#0c0a08]"
//                                 : "border-[#8a7d6a]/40"
//                             }
//                           `}
//                         >

//                           {selected && (
//                             <span className="text-[10px]">
//                               ✓
//                             </span>
//                           )}

//                         </span>

//                         <span className="text-[10px] font-['Jost']">
//                           {amenity.name}
//                         </span>

//                       </button>
//                     );
//                   }
//                 )}

//               </div>

//             )}

//           </div>

//           {/* =================================================
//               GALLERY
//           ================================================= */}

//           <div className="border-t border-[rgba(196,149,74,0.1)] pt-6">

//             <div className="mb-4">

//               <label className="block text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-widest">
//                 Apartment Gallery
//               </label>

//               <p className="text-[10px] font-['Jost'] text-[#8a7d6a] mt-1">
//                 Upload photos and assign each
//                 image a type.
//               </p>

//             </div>

//             {/* UPLOAD AREA */}

//             <div
//               className="
//                 relative
//                 border
//                 border-dashed
//                 border-[rgba(196,149,74,0.2)]
//                 bg-[#0c0a08]
//                 p-8
//                 text-center
//                 cursor-pointer
//                 hover:border-[#c4954a]/40
//                 transition-colors
//               "
//               onClick={() =>
//                 fileInputRef.current?.click()
//               }
//             >

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/jpeg,image/png,image/webp"
//                 multiple
//                 onChange={handleImages}
//                 className="hidden"
//                 disabled={
//                   submitting ||
//                   gallery.length >= 10
//                 }
//               />

//               <Upload
//                 size={26}
//                 className="mx-auto text-[#c4954a] mb-3"
//               />

//               <p className="text-xs font-['Jost'] text-[#ede4d4]">
//                 Select apartment images
//               </p>

//               <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-wider mt-2">
//                 JPG, PNG or WEBP · MAX 5MB EACH · MAX 10
//               </p>

//               <p className="text-[9px] font-['DM_Mono'] text-[#c4954a] mt-2">
//                 {gallery.length}/10 images selected
//               </p>

//             </div>

//             {/* SELECTED IMAGES */}

//             {gallery.length > 0 && (

//               <div className="mt-4 space-y-3">

//                 {gallery.map(
//                   (image, index) => (

//                     <div
//                       key={image.id}
//                       className="
//                         border
//                         border-[rgba(196,149,74,0.1)]
//                         bg-[#0c0a08]
//                         p-3
//                       "
//                     >

//                       <div className="flex flex-col sm:flex-row gap-3">

//                         {/* PREVIEW */}

//                         <div className="relative shrink-0">

//                           <img
//                             src={image.preview}
//                             alt={
//                               image.alt ||
//                               `Apartment image ${index + 1}`
//                             }
//                             className="w-full sm:w-28 h-24 object-cover"
//                           />

//                           <div className="absolute top-1 left-1 bg-black/75 px-1.5 py-1">

//                             <span className="text-[8px] font-['DM_Mono'] text-[#c4954a]">
//                               {index + 1}
//                             </span>

//                           </div>

//                         </div>

//                         {/* IMAGE CONTROLS */}

//                         <div className="flex-1 space-y-3">

//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

//                             {/* TYPE */}

//                             <FormField label="Image Type">

//                               <select
//                                 value={
//                                   image.type
//                                 }
//                                 onChange={(e) =>
//                                   updateImageType(
//                                     image.id,
//                                     e.target.value
//                                   )
//                                 }
//                                 className={INPUT}
//                                 disabled={
//                                   submitting
//                                 }
//                               >

//                                 {GALLERY_TYPES.map(
//                                   (type) => (
//                                     <option
//                                       key={
//                                         type.value
//                                       }
//                                       value={
//                                         type.value
//                                       }
//                                     >
//                                       {type.label}
//                                     </option>
//                                   )
//                                 )}

//                               </select>

//                             </FormField>

//                             {/* ALT */}

//                             <FormField label="Image Alt">

//                               <input
//                                 value={
//                                   image.alt
//                                 }
//                                 onChange={(e) =>
//                                   updateImageAlt(
//                                     image.id,
//                                     e.target.value
//                                   )
//                                 }
//                                 className={INPUT}
//                                 placeholder={
//                                   form.title ||
//                                   "Apartment image"
//                                 }
//                                 disabled={
//                                   submitting
//                                 }
//                               />

//                             </FormField>

//                           </div>

//                           <div className="flex items-center justify-between">

//                             <div className="flex items-center gap-2 text-[#8a7d6a]">

//                               <ImageIcon
//                                 size={13}
//                               />

//                               <span className="text-[9px] font-['DM_Mono'] truncate max-w-[220px]">
//                                 {image.file.name}
//                               </span>

//                             </div>

//                             <button
//                               type="button"
//                               disabled={
//                                 submitting
//                               }
//                               onClick={() =>
//                                 removeImage(
//                                   image.id
//                                 )
//                               }
//                               className="
//                                 flex
//                                 items-center
//                                 gap-1.5
//                                 text-[9px]
//                                 font-['DM_Mono']
//                                 uppercase
//                                 text-red-400/70
//                                 hover:text-red-400
//                               "
//                             >

//                               <Trash2
//                                 size={12}
//                               />

//                               Remove

//                             </button>

//                           </div>

//                         </div>

//                       </div>

//                     </div>
//                   )
//                 )}

//               </div>

//             )}

//           </div>

//           {/* =================================================
//               BUTTONS
//           ================================================= */}

//           <div className="flex flex-col sm:flex-row gap-3 pt-2">

//             <button
//               type="button"
//               disabled={submitting}
//               onClick={onClose}
//               className="
//                 flex-1
//                 py-3
//                 border
//                 border-[rgba(196,149,74,0.2)]
//                 text-[#8a7d6a]
//                 text-xs
//                 font-['DM_Mono']
//                 uppercase
//                 tracking-widest
//                 hover:text-[#ede4d4]
//                 hover:border-[rgba(196,149,74,0.4)]
//                 transition-colors
//                 disabled:opacity-40
//               "
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               disabled={
//                 submitting ||
//                 categoriesLoading ||
//                 amenitiesLoading
//               }
//               className="
//                 flex-1
//                 py-3
//                 bg-[#c4954a]
//                 text-[#0c0a08]
//                 text-xs
//                 font-['DM_Mono']
//                 uppercase
//                 tracking-widest
//                 hover:bg-[#d2a45b]
//                 transition-colors
//                 disabled:opacity-50
//                 disabled:cursor-not-allowed
//               "
//             >

//               {submitting
//                 ? "Creating Apartment..."
//                 : "Add Apartment"}

//             </button>

//           </div>

//         </form>

//       </div>

//     </div>
//   );
// }
















"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Plus,
  Trash2,
  BedDouble,
  Users,
  Maximize2,
  Eye,
  Search,
  X,
  Upload,
  Image as ImageIcon,
  Pencil,
} from "lucide-react";

import { toast } from "react-hot-toast";

import api from "@/lib/api";

/* =========================================================
   TYPES
========================================================= */

type ApartmentStatus =
  | "available"
  | "booked"
  | "maintenance";

type GalleryImage = {
  _id?: string;
  url: string;
  type: string;
  alt?: string;
};

type ApartmentCategory = {
  _id: string;
  title: string;
};

type ApartmentAmenity = {
  _id: string;
  name: string;
  isActive?: boolean;
};

type Apartment = {
  _id: string;
  title: string;
  description: string;
  gallery: GalleryImage[];
  area: number;
  guests: number;
  view: string;
  price: number;
  status: ApartmentStatus;
  reviewCount: number;
  rating: number;
  slug: string;
  category: ApartmentCategory | null;
  amenities: ApartmentAmenity[];
  isFeatured: boolean;
};

type GalleryFormImage = {
  id: string;
  file: File;
  preview: string;
  type: string;
  alt: string;
};

/* =========================================================
   GALLERY TYPES
========================================================= */

const GALLERY_TYPES = [
  {
    value: "living-room",
    label: "Living Room",
  },
  {
    value: "bedroom",
    label: "Bedroom",
  },
  {
    value: "kitchen",
    label: "Kitchen",
  },
  {
    value: "toilet",
    label: "Toilet",
  },
  {
    value: "balcony",
    label: "Balcony",
  },
  {
    value: "dining-room",
    label: "Dining Room",
  },
  {
    value: "exterior",
    label: "Exterior",
  },
  {
    value: "other",
    label: "Other",
  },
];

/* =========================================================
   INPUT STYLE
========================================================= */

const INPUT = `
  w-full
  bg-[#0c0a08]
  border
  border-[rgba(196,149,74,0.12)]
  text-[#ede4d4]
  placeholder:text-[#8a7d6a]/50
  px-3
  py-2.5
  text-sm
  font-['Jost']
  outline-none
  focus:border-[rgba(196,149,74,0.45)]
  transition-colors
`;

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
      <label className="block text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mb-2">
        {label}
      </label>

      {children}
    </div>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function RoomStatusBadge({
  status,
}: {
  status: ApartmentStatus;
}) {
  const styles: Record<ApartmentStatus, string> = {
    available:
      "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",

    booked:
      "text-blue-400 bg-blue-400/10 border-blue-400/20",

    maintenance:
      "text-amber-400 bg-amber-400/10 border-amber-400/20",
  };

  const labels: Record<ApartmentStatus, string> = {
    available: "Available",
    booked: "Booked",
    maintenance: "Maintenance",
  };

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
        tracking-widest
        whitespace-nowrap
        ${styles[status]}
      `}
    >
      {labels[status]}
    </span>
  );
}

/* =========================================================
   MAIN IMAGE
========================================================= */

function getMainImage(apartment: Apartment) {
  return (
    apartment.gallery?.find(
      (image) => image.type === "living-room"
    )?.url ||
    apartment.gallery?.[0]?.url ||
    "/images/apartment-placeholder.jpg"
  );
}

/* =========================================================
   DETAIL BOX
========================================================= */

function DetailBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-[#0c0a08] border border-[rgba(196,149,74,0.08)] p-3">
      <div className="text-[#c4954a] mb-2">
        {icon}
      </div>

      <p className="text-[8px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest">
        {label}
      </p>

      <p className="text-xs font-['Jost'] text-[#ede4d4] mt-1">
        {value}
      </p>
    </div>
  );
}

/* =========================================================
   APARTMENT DETAILS MODAL
========================================================= */

function ApartmentDetailsModal({
  apartment,
  onClose,
  onEdit,
}: {
  apartment: Apartment;
  onClose: () => void;
  onEdit: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#161310] border border-[rgba(196,149,74,0.18)]">

        {/* HEADER */}

        <div className="sticky top-0 z-10 bg-[#161310] border-b border-[rgba(196,149,74,0.1)] px-5 sm:px-6 py-4 flex items-center justify-between">

          <div>
            <p className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-[0.2em] mb-1">
              Apartment Details
            </p>

            <h2 className="font-['Fraunces'] text-xl text-[#ede4d4]">
              {apartment.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">

            {/* EDIT */}

            <button
              type="button"
              onClick={onEdit}
              className="
                h-8
                px-3
                flex
                items-center
                gap-2
                border
                border-[#c4954a]/20
                text-[#c4954a]
                hover:bg-[#c4954a]/10
                transition-colors
                text-[9px]
                font-['DM_Mono']
                uppercase
                tracking-wider
              "
            >
              <Pencil size={13} />
              Edit
            </button>

            {/* CLOSE */}

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4] hover:bg-white/5"
            >
              <X size={17} />
            </button>

          </div>

        </div>

        {/* BODY */}

        <div className="p-5 sm:p-6 space-y-6">

          {/* MAIN IMAGE */}

          <div className="relative">

            <img
              src={getMainImage(apartment)}
              alt={apartment.title}
              className="w-full h-64 object-cover"
            />

            <div className="absolute top-3 right-3">
              <RoomStatusBadge status={apartment.status} />
            </div>

          </div>

          {/* OVERVIEW */}

          <div>

            <div className="flex items-center justify-between gap-4 mb-3">

              <div>

                <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest">
                  {apartment.category?.title ||
                    "Uncategorized"}
                </p>

                <h3 className="font-['Fraunces'] text-xl text-[#ede4d4] mt-1">
                  {apartment.title}
                </h3>

              </div>

              <div className="text-right">

                <p className="font-['Fraunces'] text-xl text-[#c4954a]">
                  ₦{apartment.price.toLocaleString()}
                </p>

                <p className="text-[8px] font-['DM_Mono'] text-[#8a7d6a] uppercase">
                  per night
                </p>

              </div>

            </div>

            <p className="text-sm font-['Jost'] leading-relaxed text-[#8a7d6a]">
              {apartment.description}
            </p>

          </div>

          {/* DETAILS */}

          <div className="grid grid-cols-3 gap-3">

            <DetailBox
              icon={<Maximize2 size={14} />}
              label="Area"
              value={`${apartment.area} m²`}
            />

            <DetailBox
              icon={<Users size={14} />}
              label="Guests"
              value={`${apartment.guests} Guests`}
            />

            <DetailBox
              icon={<Eye size={14} />}
              label="View"
              value={apartment.view}
            />

          </div>

          {/* FEATURED */}

          {apartment.isFeatured && (
            <div className="border border-[#c4954a]/20 bg-[#c4954a]/5 px-4 py-3">

              <p className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-widest">
                Featured Apartment
              </p>

              <p className="text-xs text-[#8a7d6a] mt-1">
                This apartment is currently
                featured on Cedar Court.
              </p>

            </div>
          )}

          {/* AMENITIES */}

          <div>

            <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mb-3">
              Amenities
            </p>

            <div className="flex flex-wrap gap-2">

              {apartment.amenities?.length > 0 ? (
                apartment.amenities.map(
                  (amenity) => (
                    <span
                      key={amenity._id}
                      className="px-2.5 py-1.5 border border-[rgba(196,149,74,0.1)] bg-[#0c0a08] text-[10px] font-['DM_Mono'] text-[#8a7d6a]"
                    >
                      {amenity.name}
                    </span>
                  )
                )
              ) : (
                <span className="text-xs text-[#8a7d6a]">
                  No amenities assigned.
                </span>
              )}

            </div>

          </div>

          {/* GALLERY */}

          <div>

            <div className="flex items-center justify-between mb-3">

              <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest">
                Apartment Gallery
              </p>

              <span className="text-[9px] font-['DM_Mono'] text-[#8a7d6a]">
                {apartment.gallery?.length || 0} images
              </span>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">

              {apartment.gallery?.map(
                (image, index) => (
                  <div
                    key={`${image.url}-${index}`}
                    className="relative"
                  >

                    <img
                      src={image.url}
                      alt={
                        image.alt ||
                        apartment.title
                      }
                      className="w-full h-28 object-cover"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">

                      <p className="text-[9px] font-['DM_Mono'] text-white uppercase tracking-wider">
                        {image.type.replace(
                          "-",
                          " "
                        )}
                      </p>

                    </div>

                  </div>
                )
              )}

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN ADMIN APARTMENTS PAGE
========================================================= */

export default function AdminApartments() {

  const [apartments, setApartments] =
    useState<Apartment[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [viewApartment, setViewApartment] =
    useState<Apartment | null>(null);

  const [editApartment, setEditApartment] =
    useState<Apartment | null>(null);

  const [showForm, setShowForm] =
    useState(false);

  /* =======================================================
     FETCH APARTMENTS
  ======================================================= */

  const fetchApartments = useCallback(
    async () => {
      try {
        setLoading(true);

        const response = await api.get(
          "/apartment/all-apartments"
        );

        const apartmentsData =
          response.data?.apartments;

        if (Array.isArray(apartmentsData)) {
          setApartments(apartmentsData);
        } else {
          setApartments([]);
        }

      } catch (error: any) {

        console.error(
          "FAILED TO FETCH APARTMENTS:",
          error
        );

        console.error(
          "Response:",
          error?.response?.data
        );

        /*
          If there are no apartments and your
          backend returns 404, we treat that
          as an empty list.
        */

        if (error?.response?.status === 404) {
          setApartments([]);
        } else {
          toast.error(
            error?.response?.data?.message ||
            "Failed to load apartments."
          );
        }

      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchApartments();
  }, [fetchApartments]);

  /* =======================================================
     SEARCH
  ======================================================= */

  const filteredApartments = useMemo(() => {

    const query =
      search.toLowerCase().trim();

    if (!query) {
      return apartments;
    }

    return apartments.filter(
      (apartment) => {

        const title =
          apartment.title
            ?.toLowerCase() || "";

        const category =
          apartment.category?.title
            ?.toLowerCase() || "";

        const view =
          apartment.view
            ?.toLowerCase() || "";

        return (
          title.includes(query) ||
          category.includes(query) ||
          view.includes(query)
        );
      }
    );

  }, [apartments, search]);

  /* =======================================================
     STATUS UPDATE
  ======================================================= */

  const updateStatus = async (
    apartmentId: string,
    status: ApartmentStatus
  ) => {

    try {

      const response =
        await api.patch(
          `/apartment/${apartmentId}`,
          {
            status,
          }
        );

      const updatedApartment =
        response.data?.apartment;

      if (!updatedApartment) {
        throw new Error(
          "Updated apartment was not returned by the server."
        );
      }

      setApartments((current) =>
        current.map((apartment) =>
          apartment._id === apartmentId
            ? updatedApartment
            : apartment
        )
      );

      setViewApartment((current) =>
        current?._id === apartmentId
          ? updatedApartment
          : current
      );

      setEditApartment((current) =>
        current?._id === apartmentId
          ? updatedApartment
          : current
      );

      toast.success(
        response.data?.message ||
        "Apartment status updated."
      );

    } catch (error: any) {

      console.error(
        "UPDATE APARTMENT STATUS FAILED:",
        error
      );

      console.error(
        "BACKEND RESPONSE:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to update apartment status."
      );

    }
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const deleteApartment = async (
    apartment: Apartment
  ) => {

    const confirmed =
      window.confirm(
        `Remove "${apartment.title}" from the apartment list?`
      );

    if (!confirmed) return;

    try {

      await api.delete(
        `/apartment/${apartment._id}`
      );

      setApartments((current) =>
        current.filter(
          (item) =>
            item._id !== apartment._id
        )
      );

      if (
        viewApartment?._id ===
        apartment._id
      ) {
        setViewApartment(null);
      }

      if (
        editApartment?._id ===
        apartment._id
      ) {
        setEditApartment(null);
      }

      toast.success(
        "Apartment deleted successfully."
      );

    } catch (error: any) {

      console.error(
        "DELETE APARTMENT FAILED:",
        error
      );

      console.error(
        "BACKEND RESPONSE:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to delete apartment."
      );

    }
  };

  /* =======================================================
     LOADING
  ======================================================= */

  if (loading) {
    return (
      <div className="space-y-6">

        <div>

          <div className="flex items-center gap-3 mb-2">

            <div className="w-8 h-px bg-[#c4954a]" />

            <span className="text-[9px] font-['DM_Mono'] text-[#c4954a] tracking-[0.2em] uppercase">
              Property Management
            </span>

          </div>

          <h2 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
            Apartments
          </h2>

          <p className="text-xs font-['Jost'] text-[#8a7d6a] mt-1">
            Manage Cedar Court apartments,
            availability and details.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-hidden animate-pulse"
            >

              <div className="h-48 bg-[#211d18]" />

              <div className="p-4 space-y-4">

                <div className="h-5 bg-[#211d18] w-2/3" />

                <div className="h-3 bg-[#211d18] w-1/3" />

                <div className="h-8 bg-[#211d18]" />

              </div>

            </div>
          ))}

        </div>

      </div>
    );
  }

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">

        <div>

          <div className="flex items-center gap-3 mb-2">

            <div className="w-8 h-px bg-[#c4954a]" />

            <span className="text-[9px] font-['DM_Mono'] text-[#c4954a] tracking-[0.2em] uppercase">
              Property Management
            </span>

          </div>

          <h2 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
            Apartments
          </h2>

          <p className="text-xs font-['Jost'] text-[#8a7d6a] mt-1">
            Manage Cedar Court apartments,
            availability and details.
          </p>

        </div>

        <div className="flex w-full sm:w-auto items-center gap-2">

          {/* SEARCH */}

          <div className="relative flex-1 sm:w-56">

            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search apartments..."
              className={`${INPUT} pl-9`}
            />

          </div>

          {/* ADD */}

          <button
            type="button"
            onClick={() =>
              setShowForm(true)
            }
            className="
              flex
              items-center
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
              whitespace-nowrap
            "
          >

            <Plus size={14} />

            <span>
              Add Apartment
            </span>

          </button>

        </div>

      </div>

      {/* APARTMENT GRID */}

      {filteredApartments.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

          {filteredApartments.map(
            (apartment) => (

              <div
                key={apartment._id}
                className="
                  bg-[#161310]
                  border
                  border-[rgba(196,149,74,0.1)]
                  overflow-hidden
                  group
                "
              >

                {/* IMAGE */}

                <div className="relative">

                  <img
                    src={getMainImage(
                      apartment
                    )}
                    alt={apartment.title}
                    className="
                      w-full
                      h-48
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-[1.02]
                    "
                  />

                  <div className="absolute top-3 right-3">

                    <RoomStatusBadge
                      status={
                        apartment.status
                      }
                    />

                  </div>

                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-2.5 py-1">

                    <span className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-wider">
                      {apartment.category?.title ||
                        "Uncategorized"}
                    </span>

                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-4">

                  <div className="flex items-start justify-between gap-3 mb-3">

                    <div>

                      <h3 className="font-['Fraunces'] text-lg text-[#ede4d4]">
                        {apartment.title}
                      </h3>

                      <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] mt-1 uppercase tracking-wider">
                        {apartment.view}
                      </p>

                    </div>

                    <div className="text-right shrink-0">

                      <p className="font-['Fraunces'] text-base text-[#c4954a]">
                        ₦
                        {apartment.price.toLocaleString()}
                      </p>

                      <p className="text-[8px] font-['DM_Mono'] text-[#8a7d6a] uppercase">
                        / night
                      </p>

                    </div>

                  </div>

                  {/* METADATA */}

                  <div className="flex items-center gap-4 pb-3 mb-3 border-b border-[rgba(196,149,74,0.08)]">

                    <div className="flex items-center gap-1.5 text-[#8a7d6a]">

                      <Maximize2 size={12} />

                      <span className="text-[9px] font-['DM_Mono']">
                        {apartment.area} m²
                      </span>

                    </div>

                    <div className="flex items-center gap-1.5 text-[#8a7d6a]">

                      <Users size={12} />

                      <span className="text-[9px] font-['DM_Mono']">
                        {apartment.guests} guests
                      </span>

                    </div>

                    <div className="flex items-center gap-1.5 text-[#8a7d6a]">

                      <BedDouble size={12} />

                      <span className="text-[9px] font-['DM_Mono']">
                        {apartment.reviewCount} reviews
                      </span>

                    </div>

                  </div>

                  {/* ACTIONS */}

                  <div className="flex gap-2">

                    {/* STATUS */}

                    <select
                      value={
                        apartment.status
                      }
                      onChange={(e) =>
                        updateStatus(
                          apartment._id,
                          e.target
                            .value as ApartmentStatus
                        )
                      }
                      className={`
                        ${INPUT}
                        text-xs
                        py-2
                        flex-1
                      `}
                    >

                      <option value="available">
                        Available
                      </option>

                      <option value="booked">
                        Booked
                      </option>

                      <option value="maintenance">
                        Maintenance
                      </option>

                    </select>

                    {/* VIEW */}

                    <button
                      type="button"
                      onClick={() =>
                        setViewApartment(
                          apartment
                        )
                      }
                      title="View apartment"
                      className="
                        px-3
                        border
                        border-[rgba(196,149,74,0.15)]
                        text-[#8a7d6a]
                        hover:text-[#c4954a]
                        hover:border-[#c4954a]/40
                        transition-colors
                      "
                    >
                      <Eye size={14} />
                    </button>

                    {/* EDIT */}

                    <button
                      type="button"
                      onClick={() =>
                        setEditApartment(
                          apartment
                        )
                      }
                      title="Edit apartment"
                      className="
                        px-3
                        border
                        border-[rgba(196,149,74,0.15)]
                        text-[#8a7d6a]
                        hover:text-[#c4954a]
                        hover:border-[#c4954a]/40
                        transition-colors
                      "
                    >
                      <Pencil size={14} />
                    </button>

                    {/* DELETE */}

                    <button
                      type="button"
                      onClick={() =>
                        deleteApartment(
                          apartment
                        )
                      }
                      title="Delete apartment"
                      className="
                        px-3
                        border
                        border-red-900/40
                        text-red-400/70
                        hover:text-red-400
                        hover:border-red-400/40
                        transition-colors
                      "
                    >
                      <Trash2 size={14} />
                    </button>

                  </div>

                </div>

              </div>
            )
          )}

        </div>

      ) : (

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] py-16 text-center">

          <Search
            size={24}
            className="mx-auto text-[#8a7d6a]/50 mb-3"
          />

          <h3 className="font-['Fraunces'] text-lg text-[#ede4d4]">
            {search
              ? "No apartments found"
              : "No apartments available"}
          </h3>

          <p className="text-xs font-['Jost'] text-[#8a7d6a] mt-1">
            {search
              ? "Try searching for another apartment or category."
              : "Add your first Cedar Court apartment."}
          </p>

        </div>

      )}

      {/* =====================================================
          DETAILS MODAL
      ===================================================== */}

      {viewApartment && (
        <ApartmentDetailsModal
          apartment={viewApartment}
          onClose={() =>
            setViewApartment(null)
          }
          onEdit={() => {
            setEditApartment(viewApartment);
            setViewApartment(null);
          }}
        />
      )}

      {/* =====================================================
          ADD MODAL
      ===================================================== */}

      {showForm && (
        <AddApartmentModal
          onClose={() =>
            setShowForm(false)
          }
          onCreated={fetchApartments}
        />
      )}

      {/* =====================================================
          EDIT MODAL
      ===================================================== */}

      {editApartment && (
        <EditApartmentModal
          apartment={editApartment}
          onClose={() =>
            setEditApartment(null)
          }
          onUpdated={async (updatedApartment) => {

            setApartments((current) =>
              current.map((apartment) =>
                apartment._id ===
                updatedApartment._id
                  ? updatedApartment
                  : apartment
              )
            );

            setEditApartment(
              updatedApartment
            );

            /*
              Keep the edit modal open after saving.
              If you prefer it to close automatically,
              replace the line above with:

              setEditApartment(null);
            */
          }}
        />
      )}

    </div>
  );
}

/* =========================================================
   EDIT APARTMENT MODAL
========================================================= */

function EditApartmentModal({
  apartment,
  onClose,
  onUpdated,
}: {
  apartment: Apartment;
  onClose: () => void;
  onUpdated: (
    apartment: Apartment
  ) => Promise<void> | void;
}) {

  /* =======================================================
     FORM
  ======================================================= */

  const [form, setForm] = useState({
    title: apartment.title || "",
    category: apartment.category?._id || "",
    description: apartment.description || "",
    price: String(apartment.price ?? ""),
    area: String(apartment.area ?? ""),
    guests: String(apartment.guests ?? ""),
    view: apartment.view || "",
    status:
      apartment.status || "available",
    amenities:
      apartment.amenities?.map(
        (amenity) => amenity._id
      ) || [],
    isFeatured:
      apartment.isFeatured ?? true,
  });

  /* =======================================================
     DATA
  ======================================================= */

  const [categories, setCategories] =
    useState<ApartmentCategory[]>([]);

  const [amenities, setAmenities] =
    useState<ApartmentAmenity[]>([]);

  const [categoriesLoading, setCategoriesLoading] =
    useState(true);

  const [amenitiesLoading, setAmenitiesLoading] =
    useState(true);

  const [submitting, setSubmitting] =
    useState(false);

  /* =======================================================
     FETCH CATEGORIES
  ======================================================= */

  useEffect(() => {

    const fetchCategories =
      async () => {

        try {

          setCategoriesLoading(true);

          const response =
            await api.get(
              "/apartment-category/all-categories"
            );

          const data =
            response.data?.categories;

          if (Array.isArray(data)) {
            setCategories(data);
          } else {
            setCategories([]);
          }

        } catch (error: any) {

          console.error(
            "FAILED TO FETCH CATEGORIES:",
            error
          );

          toast.error(
            error?.response?.data?.message ||
            "Failed to load categories."
          );

        } finally {

          setCategoriesLoading(false);

        }
      };

    fetchCategories();

  }, []);

  /* =======================================================
     FETCH AMENITIES
  ======================================================= */

  useEffect(() => {

    const fetchAmenities =
      async () => {

        try {

          setAmenitiesLoading(true);

          const response =
            await api.get(
              "/apartment-amenity/all-amenities"
            );

          const data =
            response.data?.amenities;

          if (Array.isArray(data)) {
            setAmenities(data);
          } else {
            setAmenities([]);
          }

        } catch (error: any) {

          console.error(
            "FAILED TO FETCH AMENITIES:",
            error
          );

          toast.error(
            error?.response?.data?.message ||
            "Failed to load amenities."
          );

        } finally {

          setAmenitiesLoading(false);

        }
      };

    fetchAmenities();

  }, []);

  /* =======================================================
     TOGGLE AMENITY
  ======================================================= */

  const toggleAmenity = (
    amenityId: string
  ) => {

    setForm((current) => ({

      ...current,

      amenities:
        current.amenities.includes(
          amenityId
        )
          ? current.amenities.filter(
              (id) => id !== amenityId
            )
          : [
              ...current.amenities,
              amenityId,
            ],

    }));
  };

  /* =======================================================
     SUBMIT UPDATE
  ======================================================= */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    /* ---------------------------------------------
       VALIDATION
    --------------------------------------------- */

    if (!form.title.trim()) {

      toast.error(
        "Apartment title is required."
      );

      return;
    }

    if (!form.category) {

      toast.error(
        "Please select an apartment category."
      );

      return;
    }

    if (form.amenities.length === 0) {

      toast.error(
        "Please select at least one amenity."
      );

      return;
    }

    if (
      !form.price ||
      Number(form.price) <= 0
    ) {

      toast.error(
        "Price must be greater than 0."
      );

      return;
    }

    if (
      !form.area ||
      Number(form.area) <= 0
    ) {

      toast.error(
        "Area must be greater than 0."
      );

      return;
    }

    if (
      !form.guests ||
      Number(form.guests) <= 0
    ) {

      toast.error(
        "Guest capacity must be greater than 0."
      );

      return;
    }

    try {

      setSubmitting(true);

      /* ---------------------------------------------
         SEND JSON

         We are not changing gallery images here,
         so we don't need FormData.
      --------------------------------------------- */

      const response =
        await api.patch(
          `/apartment/${apartment._id}`,
          {
            title:
              form.title.trim(),

            description:
              form.description.trim(),

            price:
              Number(form.price),

            category:
              form.category,

            amenities:
              form.amenities,

            area:
              Number(form.area),

            guests:
              Number(form.guests),

            view:
              form.view.trim(),

            status:
              form.status,

            isFeatured:
              form.isFeatured,
          }
        );

      const updatedApartment =
        response.data?.apartment;

      if (!updatedApartment) {

        throw new Error(
          "Updated apartment was not returned by the server."
        );

      }

      await onUpdated(
        updatedApartment
      );

      toast.success(
        response.data?.message ||
        "Apartment updated successfully."
      );

      onClose();

    } catch (error: any) {

      console.error(
        "UPDATE APARTMENT FAILED:",
        error
      );

      console.error(
        "BACKEND RESPONSE:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to update apartment."
      );

    } finally {

      setSubmitting(false);

    }
  };

  /* =======================================================
     MODAL
  ======================================================= */

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">

      {/* OVERLAY */}

      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => {
          if (!submitting) {
            onClose();
          }
        }}
      />

      {/* MODAL */}

      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#161310] border border-[rgba(196,149,74,0.18)]">

        {/* HEADER */}

        <div className="sticky top-0 z-20 bg-[#161310] border-b border-[rgba(196,149,74,0.1)] px-5 sm:px-6 py-4 flex items-center justify-between">

          <div>

            <p className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-[0.2em] mb-1">
              Property Management
            </p>

            <h2 className="font-['Fraunces'] text-xl text-[#ede4d4]">
              Edit Apartment
            </h2>

          </div>

          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4] hover:bg-white/5 disabled:opacity-40"
          >
            <X size={17} />
          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-6 space-y-7"
        >

          {/* =================================================
              BASIC INFORMATION
          ================================================= */}

          <div>

            <div className="flex items-center gap-3 mb-4">

              <div className="w-6 h-px bg-[#c4954a]" />

              <span className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-widest">
                Basic Information
              </span>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* TITLE */}

              <FormField label="Apartment Name">

                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      title:
                        e.target.value,
                    }))
                  }
                  className={INPUT}
                  placeholder="Presidential Suite"
                  disabled={submitting}
                />

              </FormField>

              {/* CATEGORY */}

              <FormField label="Category">

                <select
                  required
                  value={form.category}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      category:
                        e.target.value,
                    }))
                  }
                  className={INPUT}
                  disabled={
                    submitting ||
                    categoriesLoading
                  }
                >

                  <option value="">
                    {categoriesLoading
                      ? "Loading categories..."
                      : "Select category"}
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={category._id}
                        value={category._id}
                      >
                        {category.title}
                      </option>
                    )
                  )}

                </select>

              </FormField>

            </div>

          </div>

          {/* =================================================
              PROPERTY DETAILS
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* PRICE */}

            <FormField label="Price / Night (₦)">

              <input
                required
                type="number"
                min="1"
                value={form.price}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    price:
                      e.target.value,
                  }))
                }
                className={INPUT}
                placeholder="850000"
                disabled={submitting}
              />

            </FormField>

            {/* AREA */}

            <FormField label="Area (m²)">

              <input
                required
                type="number"
                min="1"
                value={form.area}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    area:
                      e.target.value,
                  }))
                }
                className={INPUT}
                placeholder="120"
                disabled={submitting}
              />

            </FormField>

            {/* GUESTS */}

            <FormField label="Guest Capacity">

              <input
                required
                type="number"
                min="1"
                max="20"
                value={form.guests}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    guests:
                      e.target.value,
                  }))
                }
                className={INPUT}
                placeholder="3"
                disabled={submitting}
              />

            </FormField>

          </div>

          {/* =================================================
              VIEW / STATUS / FEATURED
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* VIEW */}

            <FormField label="View">

              <input
                required
                value={form.view}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    view:
                      e.target.value,
                  }))
                }
                className={INPUT}
                placeholder="City View"
                disabled={submitting}
              />

            </FormField>

            {/* STATUS */}

            <FormField label="Status">

              <select
                value={form.status}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    status:
                      e.target.value as ApartmentStatus,
                  }))
                }
                className={INPUT}
                disabled={submitting}
              >

                <option value="available">
                  Available
                </option>

                <option value="booked">
                  Booked
                </option>

                <option value="maintenance">
                  Maintenance
                </option>

              </select>

            </FormField>

            {/* FEATURED */}

            <FormField label="Featured">

              <button
                type="button"
                disabled={submitting}
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    isFeatured:
                      !current.isFeatured,
                  }))
                }
                className={`
                  w-full
                  h-[42px]
                  border
                  flex
                  items-center
                  justify-between
                  px-3
                  ${
                    form.isFeatured
                      ? "border-[#c4954a]/50 bg-[#c4954a]/10"
                      : "border-[rgba(196,149,74,0.12)] bg-[#0c0a08]"
                  }
                `}
              >

                <span className="text-xs font-['Jost'] text-[#ede4d4]">
                  Featured apartment
                </span>

                <span
                  className={`
                    w-8
                    h-4
                    rounded-full
                    relative
                    transition-colors
                    ${
                      form.isFeatured
                        ? "bg-[#c4954a]"
                        : "bg-[#3a342c]"
                    }
                  `}
                >

                  <span
                    className={`
                      absolute
                      top-0.5
                      w-3
                      h-3
                      rounded-full
                      bg-white
                      transition-transform
                      ${
                        form.isFeatured
                          ? "translate-x-4"
                          : "translate-x-0.5"
                      }
                    `}
                  />

                </span>

              </button>

            </FormField>

          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <FormField label="Description">

            <textarea
              required
              value={form.description}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  description:
                    e.target.value,
                }))
              }
              rows={5}
              className={`${INPUT} resize-none`}
              placeholder="Describe the apartment..."
              disabled={submitting}
            />

          </FormField>

          {/* =================================================
              AMENITIES
          ================================================= */}

          <div>

            <div className="flex items-center justify-between mb-3">

              <div>

                <label className="block text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-widest">
                  Amenities
                </label>

                <p className="text-[10px] font-['Jost'] text-[#8a7d6a] mt-1">
                  Select the amenities available
                  in this apartment.
                </p>

              </div>

              <span className="text-[9px] font-['DM_Mono'] text-[#8a7d6a]">
                {form.amenities.length} selected
              </span>

            </div>

            {amenitiesLoading ? (

              <div className="border border-[rgba(196,149,74,0.1)] bg-[#0c0a08] p-5">

                <p className="text-xs font-['Jost'] text-[#8a7d6a]">
                  Loading amenities...
                </p>

              </div>

            ) : amenities.length === 0 ? (

              <div className="border border-red-900/30 bg-red-950/10 p-5">

                <p className="text-xs font-['Jost'] text-red-400">
                  No apartment amenities found.
                </p>

              </div>

            ) : (

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">

                {amenities.map(
                  (amenity) => {

                    const selected =
                      form.amenities.includes(
                        amenity._id
                      );

                    return (
                      <button
                        key={amenity._id}
                        type="button"
                        disabled={submitting}
                        onClick={() =>
                          toggleAmenity(
                            amenity._id
                          )
                        }
                        className={`
                          flex
                          items-center
                          gap-2
                          p-3
                          border
                          text-left
                          transition-colors
                          ${
                            selected
                              ? "border-[#c4954a]/50 bg-[#c4954a]/10 text-[#ede4d4]"
                              : "border-[rgba(196,149,74,0.1)] bg-[#0c0a08] text-[#8a7d6a] hover:border-[#c4954a]/30"
                          }
                        `}
                      >

                        <span
                          className={`
                            w-4
                            h-4
                            border
                            flex
                            items-center
                            justify-center
                            shrink-0
                            ${
                              selected
                                ? "border-[#c4954a] bg-[#c4954a] text-[#0c0a08]"
                                : "border-[#8a7d6a]/40"
                            }
                          `}
                        >

                          {selected && (
                            <span className="text-[10px]">
                              ✓
                            </span>
                          )}

                        </span>

                        <span className="text-[10px] font-['Jost']">
                          {amenity.name}
                        </span>

                      </button>
                    );
                  }
                )}

              </div>

            )}

          </div>

          {/* =================================================
              CURRENT GALLERY
          ================================================= */}

          <div className="border-t border-[rgba(196,149,74,0.1)] pt-6">

            <div className="flex items-center justify-between mb-4">

              <div>

                <label className="block text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-widest">
                  Apartment Gallery
                </label>

                <p className="text-[10px] font-['Jost'] text-[#8a7d6a] mt-1">
                  Current apartment images.
                  Gallery replacement can be added
                  separately.
                </p>

              </div>

              <span className="text-[9px] font-['DM_Mono'] text-[#8a7d6a]">
                {apartment.gallery?.length || 0} images
              </span>

            </div>

            {apartment.gallery?.length > 0 ? (

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">

                {apartment.gallery.map(
                  (image, index) => (

                    <div
                      key={`${image.url}-${index}`}
                      className="relative border border-[rgba(196,149,74,0.1)] bg-[#0c0a08] overflow-hidden"
                    >

                      <img
                        src={image.url}
                        alt={
                          image.alt ||
                          apartment.title
                        }
                        className="w-full h-28 object-cover"
                      />

                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-2">

                        <p className="text-[8px] font-['DM_Mono'] text-white uppercase tracking-wider">
                          {image.type.replace(
                            "-",
                            " "
                          )}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            ) : (

              <div className="border border-[rgba(196,149,74,0.1)] bg-[#0c0a08] p-5 text-center">

                <ImageIcon
                  size={22}
                  className="mx-auto text-[#8a7d6a]/50 mb-2"
                />

                <p className="text-xs text-[#8a7d6a]">
                  No gallery images found.
                </p>

              </div>

            )}

          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">

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
                hover:border-[rgba(196,149,74,0.4)]
                transition-colors
                disabled:opacity-40
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                submitting ||
                categoriesLoading ||
                amenitiesLoading
              }
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
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >

              {submitting
                ? "Saving Changes..."
                : "Save Changes"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

/* =========================================================
   ADD APARTMENT MODAL
========================================================= */

function AddApartmentModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => Promise<void>;
}) {

  /* =======================================================
     FORM STATE
  ======================================================= */

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
    area: "",
    guests: "2",
    view: "",
    status:
      "available" as ApartmentStatus,
    amenities: [] as string[],
    isFeatured: true,
  });

  /* =======================================================
     REAL CATEGORIES
  ======================================================= */

  const [categories, setCategories] =
    useState<ApartmentCategory[]>([]);

  const [categoriesLoading, setCategoriesLoading] =
    useState(true);

  /* =======================================================
     REAL AMENITIES
  ======================================================= */

  const [amenities, setAmenities] =
    useState<ApartmentAmenity[]>([]);

  const [amenitiesLoading, setAmenitiesLoading] =
    useState(true);

  /* =======================================================
     GALLERY
  ======================================================= */

  const [gallery, setGallery] =
    useState<GalleryFormImage[]>([]);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  /* =======================================================
     SUBMITTING
  ======================================================= */

  const [submitting, setSubmitting] =
    useState(false);

  /* =======================================================
     FETCH CATEGORIES
  ======================================================= */

  useEffect(() => {

    const fetchCategories =
      async () => {

        try {

          setCategoriesLoading(true);

          const response =
            await api.get(
              "/apartment-category/all-categories"
            );

          const data =
            response.data?.categories;

          if (Array.isArray(data)) {
            setCategories(data);
          } else {
            setCategories([]);
          }

        } catch (error: any) {

          console.error(
            "FAILED TO FETCH CATEGORIES:",
            error
          );

          toast.error(
            error?.response?.data?.message ||
            "Failed to load categories."
          );

        } finally {

          setCategoriesLoading(false);

        }
      };

    fetchCategories();

  }, []);

  /* =======================================================
     FETCH AMENITIES
  ======================================================= */

  useEffect(() => {

    const fetchAmenities =
      async () => {

        try {

          setAmenitiesLoading(true);

          const response =
            await api.get(
              "/apartment-amenity/all-amenities"
            );

          const data =
            response.data?.amenities;

          if (Array.isArray(data)) {
            setAmenities(data);
          } else {
            setAmenities([]);
          }

        } catch (error: any) {

          console.error(
            "FAILED TO FETCH AMENITIES:",
            error
          );

          toast.error(
            error?.response?.data?.message ||
            "Failed to load amenities."
          );

        } finally {

          setAmenitiesLoading(false);

        }
      };

    fetchAmenities();

  }, []);

  /* =======================================================
     TOGGLE AMENITY
  ======================================================= */

  const toggleAmenity = (
    amenityId: string
  ) => {

    setForm((current) => ({

      ...current,

      amenities:
        current.amenities.includes(
          amenityId
        )
          ? current.amenities.filter(
              (id) => id !== amenityId
            )
          : [
              ...current.amenities,
              amenityId,
            ],

    }));
  };

  /* =======================================================
     ADD IMAGES
  ======================================================= */

  const handleImages = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const files =
      Array.from(
        e.target.files || []
      );

    if (!files.length) {
      return;
    }

    /* MAX 10 */

    if (
      gallery.length + files.length >
      10
    ) {

      toast.error(
        "You can upload a maximum of 10 images."
      );

      e.target.value = "";
      return;

    }

    /* VALIDATE */

    const validFiles: File[] = [];

    for (const file of files) {

      if (
        !file.type.startsWith(
          "image/"
        )
      ) {

        toast.error(
          `${file.name} is not an image.`
        );

        continue;
      }

      if (
        file.size >
        5 * 1024 * 1024
      ) {

        toast.error(
          `${file.name} is larger than 5MB.`
        );

        continue;
      }

      validFiles.push(file);
    }

    /* ADD */

    const newImages =
      validFiles.map(
        (file, index) => {

          const id =
            `${Date.now()}-${index}-${file.name}`;

          return {
            id,
            file,
            preview:
              URL.createObjectURL(
                file
              ),
            type:
              gallery.length === 0 &&
              index === 0
                ? "living-room"
                : "other",
            alt: "",
          };
        }
      );

    setGallery((current) => [
      ...current,
      ...newImages,
    ]);

    e.target.value = "";
  };

  /* =======================================================
     UPDATE IMAGE TYPE
  ======================================================= */

  const updateImageType = (
    id: string,
    type: string
  ) => {

    setGallery((current) =>
      current.map((image) =>
        image.id === id
          ? {
              ...image,
              type,
            }
          : image
      )
    );
  };

  /* =======================================================
     UPDATE IMAGE ALT
  ======================================================= */

  const updateImageAlt = (
    id: string,
    alt: string
  ) => {

    setGallery((current) =>
      current.map((image) =>
        image.id === id
          ? {
              ...image,
              alt,
            }
          : image
      )
    );
  };

  /* =======================================================
     REMOVE IMAGE
  ======================================================= */

  const removeImage = (
    id: string
  ) => {

    setGallery((current) => {

      const image =
        current.find(
          (item) =>
            item.id === id
        );

      if (image) {
        URL.revokeObjectURL(
          image.preview
        );
      }

      return current.filter(
        (item) =>
          item.id !== id
      );

    });
  };

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {

    return () => {

      gallery.forEach(
        (image) => {
          URL.revokeObjectURL(
            image.preview
          );
        }
      );

    };

  }, []);

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    /* VALIDATION */

    if (!form.title.trim()) {

      toast.error(
        "Apartment title is required."
      );

      return;
    }

    if (!form.category) {

      toast.error(
        "Please select an apartment category."
      );

      return;
    }

    if (
      form.amenities.length === 0
    ) {

      toast.error(
        "Please select at least one amenity."
      );

      return;
    }

    if (gallery.length === 0) {

      toast.error(
        "Please upload at least one apartment image."
      );

      return;
    }

    if (
      !form.price ||
      Number(form.price) <= 0
    ) {

      toast.error(
        "Price must be greater than 0."
      );

      return;
    }

    if (
      !form.area ||
      Number(form.area) <= 0
    ) {

      toast.error(
        "Area must be greater than 0."
      );

      return;
    }

    if (
      !form.guests ||
      Number(form.guests) <= 0
    ) {

      toast.error(
        "Guest capacity must be greater than 0."
      );

      return;
    }

    try {

      setSubmitting(true);

      const formData =
        new FormData();

      /* BASIC */

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
        form.price
      );

      formData.append(
        "category",
        form.category
      );

      formData.append(
        "area",
        form.area
      );

      formData.append(
        "guests",
        form.guests
      );

      formData.append(
        "view",
        form.view.trim()
      );

      /* STATUS */

      formData.append(
        "status",
        form.status
      );

      /* FEATURED */

      formData.append(
        "isFeatured",
        String(form.isFeatured)
      );

      /* AMENITIES */

      form.amenities.forEach(
        (amenityId) => {

          formData.append(
            "amenities",
            amenityId
          );

        }
      );

      /* IMAGES */

      gallery.forEach(
        (image) => {

          formData.append(
            "images",
            image.file
          );

        }
      );

      /* TYPES */

      gallery.forEach(
        (image) => {

          formData.append(
            "imageTypes",
            image.type
          );

        }
      );

      /* ALTS */

      gallery.forEach(
        (image) => {

          formData.append(
            "imageAlts",
            image.alt.trim() ||
            form.title.trim()
          );

        }
      );

      /* SEND */

      const response =
        await api.post(
          "/apartment/create",
          formData
        );

      console.log(
        "CREATE APARTMENT RESPONSE:",
        response.data
      );

      await onCreated();

      toast.success(
        response.data?.message ||
        "Apartment created successfully."
      );

      onClose();

    } catch (error: any) {

      console.error(
        "CREATE APARTMENT FAILED:",
        error
      );

      console.error(
        "BACKEND RESPONSE:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
        "Failed to create apartment."
      );

    } finally {

      setSubmitting(false);

    }
  };

  /* =======================================================
     MODAL
  ======================================================= */

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* OVERLAY */}

      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={() => {
          if (!submitting) {
            onClose();
          }
        }}
      />

      {/* MODAL */}

      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#161310] border border-[rgba(196,149,74,0.18)]">

        {/* HEADER */}

        <div className="sticky top-0 z-20 bg-[#161310] border-b border-[rgba(196,149,74,0.1)] px-5 sm:px-6 py-4 flex items-center justify-between">

          <div>

            <p className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-[0.2em] mb-1">
              Property Management
            </p>

            <h2 className="font-['Fraunces'] text-xl text-[#ede4d4]">
              Add New Apartment
            </h2>

          </div>

          <button
            type="button"
            disabled={submitting}
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4] hover:bg-white/5 disabled:opacity-40"
          >
            <X size={17} />
          </button>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="p-5 sm:p-6 space-y-7"
        >

          {/* =================================================
              BASIC INFORMATION
          ================================================= */}

          <div>

            <div className="flex items-center gap-3 mb-4">

              <div className="w-6 h-px bg-[#c4954a]" />

              <span className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-widest">
                Basic Information
              </span>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

              {/* TITLE */}

              <FormField label="Apartment Name">

                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      title:
                        e.target.value,
                    }))
                  }
                  className={INPUT}
                  placeholder="Presidential Suite"
                  disabled={submitting}
                />

              </FormField>

              {/* CATEGORY */}

              <FormField label="Category">

                <select
                  required
                  value={form.category}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      category:
                        e.target.value,
                    }))
                  }
                  className={INPUT}
                  disabled={
                    submitting ||
                    categoriesLoading
                  }
                >

                  <option value="">
                    {categoriesLoading
                      ? "Loading categories..."
                      : "Select category"}
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={category._id}
                        value={category._id}
                      >
                        {category.title}
                      </option>
                    )
                  )}

                </select>

              </FormField>

            </div>

          </div>

          {/* =================================================
              PROPERTY DETAILS
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <FormField label="Price / Night (₦)">

              <input
                required
                type="number"
                min="1"
                value={form.price}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    price:
                      e.target.value,
                  }))
                }
                className={INPUT}
                placeholder="850000"
                disabled={submitting}
              />

            </FormField>

            <FormField label="Area (m²)">

              <input
                required
                type="number"
                min="1"
                value={form.area}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    area:
                      e.target.value,
                  }))
                }
                className={INPUT}
                placeholder="120"
                disabled={submitting}
              />

            </FormField>

            <FormField label="Guest Capacity">

              <input
                required
                type="number"
                min="1"
                max="20"
                value={form.guests}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    guests:
                      e.target.value,
                  }))
                }
                className={INPUT}
                placeholder="3"
                disabled={submitting}
              />

            </FormField>

          </div>

          {/* =================================================
              VIEW / STATUS / FEATURED
          ================================================= */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            {/* VIEW */}

            <FormField label="View">

              <input
                required
                value={form.view}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    view:
                      e.target.value,
                  }))
                }
                className={INPUT}
                placeholder="City View"
                disabled={submitting}
              />

            </FormField>

            {/* STATUS */}

            <FormField label="Status">

              <select
                value={form.status}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    status:
                      e.target.value as ApartmentStatus,
                  }))
                }
                className={INPUT}
                disabled={submitting}
              >

                <option value="available">
                  Available
                </option>

                <option value="booked">
                  Booked
                </option>

                <option value="maintenance">
                  Maintenance
                </option>

              </select>

            </FormField>

            {/* FEATURED */}

            <FormField label="Featured">

              <button
                type="button"
                disabled={submitting}
                onClick={() =>
                  setForm((current) => ({
                    ...current,
                    isFeatured:
                      !current.isFeatured,
                  }))
                }
                className={`
                  w-full
                  h-[42px]
                  border
                  flex
                  items-center
                  justify-between
                  px-3
                  ${
                    form.isFeatured
                      ? "border-[#c4954a]/50 bg-[#c4954a]/10"
                      : "border-[rgba(196,149,74,0.12)] bg-[#0c0a08]"
                  }
                `}
              >

                <span className="text-xs font-['Jost'] text-[#ede4d4]">
                  Featured apartment
                </span>

                <span
                  className={`
                    w-8
                    h-4
                    rounded-full
                    relative
                    transition-colors
                    ${
                      form.isFeatured
                        ? "bg-[#c4954a]"
                        : "bg-[#3a342c]"
                    }
                  `}
                >

                  <span
                    className={`
                      absolute
                      top-0.5
                      w-3
                      h-3
                      rounded-full
                      bg-white
                      transition-transform
                      ${
                        form.isFeatured
                          ? "translate-x-4"
                          : "translate-x-0.5"
                      }
                    `}
                  />

                </span>

              </button>

            </FormField>

          </div>

          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <FormField label="Description">

            <textarea
              required
              value={form.description}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  description:
                    e.target.value,
                }))
              }
              rows={4}
              className={`${INPUT} resize-none`}
              placeholder="Describe the apartment..."
              disabled={submitting}
            />

          </FormField>

          {/* =================================================
              AMENITIES
          ================================================= */}

          <div>

            <div className="flex items-center justify-between mb-3">

              <div>

                <label className="block text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-widest">
                  Amenities
                </label>

                <p className="text-[10px] font-['Jost'] text-[#8a7d6a] mt-1">
                  Select the amenities available
                  in this apartment.
                </p>

              </div>

              <span className="text-[9px] font-['DM_Mono'] text-[#8a7d6a]">
                {form.amenities.length} selected
              </span>

            </div>

            {amenitiesLoading ? (

              <div className="border border-[rgba(196,149,74,0.1)] bg-[#0c0a08] p-5">

                <p className="text-xs font-['Jost'] text-[#8a7d6a]">
                  Loading amenities...
                </p>

              </div>

            ) : amenities.length === 0 ? (

              <div className="border border-red-900/30 bg-red-950/10 p-5">

                <p className="text-xs font-['Jost'] text-red-400">
                  No apartment amenities found.
                </p>

              </div>

            ) : (

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">

                {amenities.map(
                  (amenity) => {

                    const selected =
                      form.amenities.includes(
                        amenity._id
                      );

                    return (
                      <button
                        key={amenity._id}
                        type="button"
                        disabled={submitting}
                        onClick={() =>
                          toggleAmenity(
                            amenity._id
                          )
                        }
                        className={`
                          flex
                          items-center
                          gap-2
                          p-3
                          border
                          text-left
                          transition-colors
                          ${
                            selected
                              ? "border-[#c4954a]/50 bg-[#c4954a]/10 text-[#ede4d4]"
                              : "border-[rgba(196,149,74,0.1)] bg-[#0c0a08] text-[#8a7d6a] hover:border-[#c4954a]/30"
                          }
                        `}
                      >

                        <span
                          className={`
                            w-4
                            h-4
                            border
                            flex
                            items-center
                            justify-center
                            shrink-0
                            ${
                              selected
                                ? "border-[#c4954a] bg-[#c4954a] text-[#0c0a08]"
                                : "border-[#8a7d6a]/40"
                            }
                          `}
                        >

                          {selected && (
                            <span className="text-[10px]">
                              ✓
                            </span>
                          )}

                        </span>

                        <span className="text-[10px] font-['Jost']">
                          {amenity.name}
                        </span>

                      </button>
                    );
                  }
                )}

              </div>

            )}

          </div>

          {/* =================================================
              GALLERY
          ================================================= */}

          <div className="border-t border-[rgba(196,149,74,0.1)] pt-6">

            <div className="mb-4">

              <label className="block text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-widest">
                Apartment Gallery
              </label>

              <p className="text-[10px] font-['Jost'] text-[#8a7d6a] mt-1">
                Upload photos and assign each
                image a type.
              </p>

            </div>

            {/* UPLOAD AREA */}

            <div
              className="
                relative
                border
                border-dashed
                border-[rgba(196,149,74,0.2)]
                bg-[#0c0a08]
                p-8
                text-center
                cursor-pointer
                hover:border-[#c4954a]/40
                transition-colors
              "
              onClick={() =>
                fileInputRef.current?.click()
              }
            >

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleImages}
                className="hidden"
                disabled={
                  submitting ||
                  gallery.length >= 10
                }
              />

              <Upload
                size={26}
                className="mx-auto text-[#c4954a] mb-3"
              />

              <p className="text-xs font-['Jost'] text-[#ede4d4]">
                Select apartment images
              </p>

              <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-wider mt-2">
                JPG, PNG or WEBP · MAX 5MB EACH · MAX 10
              </p>

              <p className="text-[9px] font-['DM_Mono'] text-[#c4954a] mt-2">
                {gallery.length}/10 images selected
              </p>

            </div>

            {/* SELECTED IMAGES */}

            {gallery.length > 0 && (

              <div className="mt-4 space-y-3">

                {gallery.map(
                  (image, index) => (

                    <div
                      key={image.id}
                      className="
                        border
                        border-[rgba(196,149,74,0.1)]
                        bg-[#0c0a08]
                        p-3
                      "
                    >

                      <div className="flex flex-col sm:flex-row gap-3">

                        {/* PREVIEW */}

                        <div className="relative shrink-0">

                          <img
                            src={image.preview}
                            alt={
                              image.alt ||
                              `Apartment image ${index + 1}`
                            }
                            className="w-full sm:w-28 h-24 object-cover"
                          />

                          <div className="absolute top-1 left-1 bg-black/75 px-1.5 py-1">

                            <span className="text-[8px] font-['DM_Mono'] text-[#c4954a]">
                              {index + 1}
                            </span>

                          </div>

                        </div>

                        {/* CONTROLS */}

                        <div className="flex-1 space-y-3">

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                            <FormField label="Image Type">

                              <select
                                value={
                                  image.type
                                }
                                onChange={(e) =>
                                  updateImageType(
                                    image.id,
                                    e.target.value
                                  )
                                }
                                className={INPUT}
                                disabled={
                                  submitting
                                }
                              >

                                {GALLERY_TYPES.map(
                                  (type) => (
                                    <option
                                      key={
                                        type.value
                                      }
                                      value={
                                        type.value
                                      }
                                    >
                                      {type.label}
                                    </option>
                                  )
                                )}

                              </select>

                            </FormField>

                            <FormField label="Image Alt">

                              <input
                                value={
                                  image.alt
                                }
                                onChange={(e) =>
                                  updateImageAlt(
                                    image.id,
                                    e.target.value
                                  )
                                }
                                className={INPUT}
                                placeholder={
                                  form.title ||
                                  "Apartment image"
                                }
                                disabled={
                                  submitting
                                }
                              />

                            </FormField>

                          </div>

                          <div className="flex items-center justify-between">

                            <div className="flex items-center gap-2 text-[#8a7d6a]">

                              <ImageIcon
                                size={13}
                              />

                              <span className="text-[9px] font-['DM_Mono'] truncate max-w-[220px]">
                                {image.file.name}
                              </span>

                            </div>

                            <button
                              type="button"
                              disabled={
                                submitting
                              }
                              onClick={() =>
                                removeImage(
                                  image.id
                                )
                              }
                              className="
                                flex
                                items-center
                                gap-1.5
                                text-[9px]
                                font-['DM_Mono']
                                uppercase
                                text-red-400/70
                                hover:text-red-400
                              "
                            >

                              <Trash2
                                size={12}
                              />

                              Remove

                            </button>

                          </div>

                        </div>

                      </div>

                    </div>
                  )
                )}

              </div>

            )}

          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">

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
                hover:border-[rgba(196,149,74,0.4)]
                transition-colors
                disabled:opacity-40
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                submitting ||
                categoriesLoading ||
                amenitiesLoading
              }
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
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >

              {submitting
                ? "Creating Apartment..."
                : "Add Apartment"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}