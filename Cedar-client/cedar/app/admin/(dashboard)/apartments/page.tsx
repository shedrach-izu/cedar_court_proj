"use client";

import { useState } from "react";
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  BedDouble,
  Users,
  Maximize2,
  Eye,
  X,
  Search,
} from "lucide-react";
import { toast } from "react-hot-toast";

/* =========================================================
   TYPES
========================================================= */

type ApartmentStatus = "Available" | "Occupied" | "Maintenance";

type ApartmentSection = {
  name: string;
  image: string;
  desc: string;
};

type Apartment = {
  id: number;
  title: string;
  type: string;
  price: number;
  area: string;
  guests: number;
  view: string;
  status: ApartmentStatus;
  image: string;
  description: string;
  amenities: string[];
  rating: number;
  reviews: number;
  sections: ApartmentSection[];
};

/* =========================================================
   DEFAULT SECTIONS
========================================================= */

const createEmptySections = (): ApartmentSection[] => [
  {
    name: "Sitting Room",
    image: "",
    desc: "",
  },
  {
    name: "Master Bedroom",
    image: "",
    desc: "",
  },
  {
    name: "Bedroom 2",
    image: "",
    desc: "",
  },
  {
    name: "Bedroom 3",
    image: "",
    desc: "",
  },
  {
    name: "Kitchen",
    image: "",
    desc: "",
  },
  {
    name: "Balcony",
    image: "",
    desc: "",
  },
];

/* =========================================================
   MOCK APARTMENTS
========================================================= */

const INITIAL_APARTMENTS: Apartment[] = [
  {
    id: 1,
    title: "Presidential Suite",
    type: "Signature",
    price: 850000,
    area: "120 m²",
    guests: 3,
    view: "City View",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
    description:
      "An expansive luxury suite designed for guests who appreciate refined comfort, privacy and exceptional city views.",
    amenities: [
      "WiFi",
      "Air Conditioning",
      "King Bed",
      "Kitchen",
      "Smart TV",
      "Balcony",
    ],
    rating: 4.9,
    reviews: 18,
    sections: [
      {
        name: "Sitting Room",
        image:
          "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
        desc: "Elegant living space with premium furnishings.",
      },
      {
        name: "Master Bedroom",
        image:
          "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
        desc: "Spacious bedroom with a king-size bed.",
      },
      {
        name: "Bedroom 2",
        image:
          "https://images.unsplash.com/photo-1615874694520-474822394e73?auto=format&fit=crop&w=1200&q=80",
        desc: "Comfortable guest bedroom.",
      },
      {
        name: "Bedroom 3",
        image:
          "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80",
        desc: "Quiet bedroom suitable for additional guests.",
      },
      {
        name: "Kitchen",
        image:
          "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
        desc: "Fully equipped modern kitchen.",
      },
      {
        name: "Balcony",
        image:
          "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
        desc: "Private balcony overlooking the city.",
      },
    ],
  },
  {
    id: 2,
    title: "Executive Suite",
    type: "Executive",
    price: 550000,
    area: "85 m²",
    guests: 2,
    view: "Pool View",
    status: "Occupied",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
    description:
      "A sophisticated executive apartment combining contemporary design with a peaceful pool-facing setting.",
    amenities: [
      "WiFi",
      "Air Conditioning",
      "Queen Bed",
      "Kitchen",
      "Smart TV",
    ],
    rating: 4.7,
    reviews: 12,
    sections: createEmptySections(),
  },
  {
    id: 3,
    title: "Deluxe Apartment",
    type: "Premier",
    price: 400000,
    area: "72 m²",
    guests: 3,
    view: "Garden View",
    status: "Available",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
    description:
      "A warm and comfortable apartment offering generous living space and tranquil garden views.",
    amenities: [
      "WiFi",
      "Air Conditioning",
      "King Bed",
      "Kitchen",
    ],
    rating: 4.6,
    reviews: 9,
    sections: createEmptySections(),
  },
  {
    id: 4,
    title: "Classic Studio",
    type: "Classic",
    price: 250000,
    area: "48 m²",
    guests: 2,
    view: "Garden View",
    status: "Maintenance",
    image:
      "https://images.unsplash.com/photo-1617104678098-de229db51175?auto=format&fit=crop&w=1200&q=80",
    description:
      "A stylish compact studio designed for comfortable short and extended stays.",
    amenities: [
      "WiFi",
      "Air Conditioning",
      "Queen Bed",
      "Smart TV",
    ],
    rating: 4.5,
    reviews: 7,
    sections: createEmptySections(),
  },
];

/* =========================================================
   STATUS BADGE
========================================================= */

function RoomStatusBadge({
  status,
}: {
  status: ApartmentStatus;
}) {
  const styles: Record<ApartmentStatus, string> = {
    Available:
      "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    Occupied:
      "text-blue-400 bg-blue-400/10 border-blue-400/20",
    Maintenance:
      "text-amber-400 bg-amber-400/10 border-amber-400/20",
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
      {status}
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
      <label className="block text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mb-2">
        {label}
      </label>

      {children}
    </div>
  );
}

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
   APARTMENT DETAILS MODAL
========================================================= */

function ApartmentDetailsModal({
  apartment,
  onClose,
}: {
  apartment: Apartment;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#161310] border border-[rgba(196,149,74,0.18)]">

        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#161310] border-b border-[rgba(196,149,74,0.1)] px-5 sm:px-6 py-4 flex items-center justify-between">

          <div>
            <p className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-[0.2em] mb-1">
              Apartment Details
            </p>

            <h2 className="font-['Fraunces'] text-xl text-[#ede4d4]">
              {apartment.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4] hover:bg-white/5"
          >
            <X size={17} />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-6">

          {/* Main Image */}
          <div className="relative">

            <img
              src={apartment.image}
              alt={apartment.title}
              className="w-full h-64 object-cover"
            />

            <div className="absolute top-3 right-3">
              <RoomStatusBadge status={apartment.status} />
            </div>

          </div>

          {/* Overview */}
          <div>

            <div className="flex items-center justify-between gap-4 mb-3">

              <div>
                <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest">
                  {apartment.type}
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

          {/* Details */}
          <div className="grid grid-cols-3 gap-3">

            <DetailBox
              icon={<Maximize2 size={14} />}
              label="Area"
              value={apartment.area}
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

          {/* Amenities */}
          <div>

            <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mb-3">
              Amenities
            </p>

            <div className="flex flex-wrap gap-2">

              {apartment.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="px-2.5 py-1.5 border border-[rgba(196,149,74,0.1)] bg-[#0c0a08] text-[10px] font-['DM_Mono'] text-[#8a7d6a]"
                >
                  {amenity}
                </span>
              ))}

            </div>
          </div>

          {/* Gallery */}
          <div>

            <div className="flex items-center justify-between mb-3">

              <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest">
                Apartment Sections
              </p>

              <span className="text-[9px] font-['DM_Mono'] text-[#8a7d6a]">
                {apartment.sections.filter((s) => s.image).length} images
              </span>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">

              {apartment.sections.map((section, index) => (
                section.image ? (
                  <div
                    key={`${section.name}-${index}`}
                    className="relative group"
                  >
                    <img
                      src={section.image}
                      alt={section.name}
                      className="w-full h-28 object-cover"
                    />

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                      <p className="text-[9px] font-['DM_Mono'] text-white uppercase tracking-wider">
                        {section.name}
                      </p>
                    </div>
                  </div>
                ) : null
              ))}

            </div>
          </div>

        </div>
      </div>
    </div>
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
   MAIN PAGE
========================================================= */

export default function AdminApartments() {

  const [apartments, setApartments] =
    useState<Apartment[]>(INITIAL_APARTMENTS);

  const [showForm, setShowForm] = useState(false);

  const [viewApartment, setViewApartment] =
    useState<Apartment | null>(null);

  const [search, setSearch] = useState("");

  const [form, setForm] = useState({
    title: "",
    type: "Classic",
    price: "",
    area: "",
    guests: 2,
    view: "",
    status: "Available" as ApartmentStatus,
    image: "",
    description: "",
    amenities: "",
    sections: createEmptySections(),
  });

  /* =======================================================
     FORM HANDLERS
  ======================================================= */

  const setField =
    (key: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setForm((current) => ({
        ...current,
        [key]: e.target.value,
      }));
    };

  const setSectionField = (
    index: number,
    key: "image" | "desc"
  ) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {

    setForm((current) => {

      const sections = [...current.sections];

      sections[index] = {
        ...sections[index],
        [key]: e.target.value,
      };

      return {
        ...current,
        sections,
      };
    });
  };

  /* =======================================================
     ADD APARTMENT
  ======================================================= */

  const handleAdd = (e: React.FormEvent) => {

    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Please enter an apartment name.");
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    const mainImage =
      form.sections[0].image.trim() || form.image.trim();

    if (!mainImage) {
      toast.error("Please provide an apartment image.");
      return;
    }

    const newApartment: Apartment = {
      id: Date.now(),

      title: form.title.trim(),

      type: form.type,

      price: Number(form.price),

      area: form.area.trim(),

      guests: Number(form.guests),

      view: form.view.trim(),

      status: form.status,

      image: mainImage,

      description: form.description.trim(),

      amenities: form.amenities
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),

      rating: 0,

      reviews: 0,

      sections: form.sections,
    };

    setApartments((current) => [
      ...current,
      newApartment,
    ]);

    setShowForm(false);

    setForm({
      title: "",
      type: "Classic",
      price: "",
      area: "",
      guests: 2,
      view: "",
      status: "Available",
      image: "",
      description: "",
      amenities: "",
      sections: createEmptySections(),
    });

    toast.success("Apartment added!");
  };

  /* =======================================================
     UPDATE STATUS
  ======================================================= */

  const updateStatus = (
    id: number,
    status: ApartmentStatus
  ) => {

    setApartments((current) =>
      current.map((apartment) =>
        apartment.id === id
          ? {
              ...apartment,
              status,
            }
          : apartment
      )
    );

    setViewApartment((current) =>
      current?.id === id
        ? {
            ...current,
            status,
          }
        : current
    );

    toast.success("Apartment status updated.");
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const deleteApartment = (id: number) => {

    const apartment = apartments.find(
      (item) => item.id === id
    );

    if (!apartment) return;

    const confirmed = window.confirm(
      `Remove "${apartment.title}" from the apartment list?`
    );

    if (!confirmed) return;

    setApartments((current) =>
      current.filter((item) => item.id !== id)
    );

    if (viewApartment?.id === id) {
      setViewApartment(null);
    }

    toast.success("Apartment removed.");
  };

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredApartments = apartments.filter(
    (apartment) => {

      const query = search.toLowerCase().trim();

      if (!query) return true;

      return (
        apartment.title.toLowerCase().includes(query) ||
        apartment.type.toLowerCase().includes(query) ||
        apartment.view.toLowerCase().includes(query)
      );
    }
  );

  return (
    <div className="space-y-6">

      {/* =====================================================
          HEADER
      ===================================================== */}

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
            Manage Cedar Court apartments, availability and details.
          </p>

        </div>

        <div className="flex w-full sm:w-auto items-center gap-2">

          {/* Search */}

          <div className="relative flex-1 sm:w-56">

            <Search
              size={13}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a7d6a]"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search apartments..."
              className={`${INPUT} pl-9`}
            />

          </div>

          {/* Add */}

          <button
            type="button"
            onClick={() => setShowForm(true)}
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

            <span className="hidden sm:inline">
              Add Apartment
            </span>
          </button>

        </div>
      </div>

      {/* =====================================================
          APARTMENT GRID
      ===================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

        {filteredApartments.map((apartment) => (

          <div
            key={apartment.id}
            className="
              bg-[#161310]
              border
              border-[rgba(196,149,74,0.1)]
              overflow-hidden
              group
            "
          >

            {/* Image */}

            <div className="relative">

              <img
                src={apartment.image}
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
                <RoomStatusBadge status={apartment.status} />
              </div>

              <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm px-2.5 py-1">
                <span className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-wider">
                  {apartment.type}
                </span>
              </div>

            </div>

            {/* Content */}

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
                    ₦{apartment.price.toLocaleString()}
                  </p>

                  <p className="text-[8px] font-['DM_Mono'] text-[#8a7d6a] uppercase">
                    / night
                  </p>

                </div>

              </div>

              {/* Meta */}

              <div className="flex items-center gap-4 pb-3 mb-3 border-b border-[rgba(196,149,74,0.08)]">

                <div className="flex items-center gap-1.5 text-[#8a7d6a]">
                  <Maximize2 size={12} />

                  <span className="text-[9px] font-['DM_Mono']">
                    {apartment.area}
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
                    {apartment.reviews} reviews
                  </span>
                </div>

              </div>

              {/* Actions */}

              <div className="flex gap-2">

                <select
                  value={apartment.status}
                  onChange={(e) =>
                    updateStatus(
                      apartment.id,
                      e.target.value as ApartmentStatus
                    )
                  }
                  className={`
                    ${INPUT}
                    text-xs
                    py-2
                    flex-1
                  `}
                >
                  {[
                    "Available",
                    "Occupied",
                    "Maintenance",
                  ].map((status) => (
                    <option
                      key={status}
                      value={status}
                    >
                      {status}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() =>
                    setViewApartment(apartment)
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

                <button
                  type="button"
                  onClick={() =>
                    deleteApartment(apartment.id)
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

        ))}

      </div>

      {/* =====================================================
          EMPTY SEARCH STATE
      ===================================================== */}

      {filteredApartments.length === 0 && (

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] py-16 text-center">

          <Search
            size={24}
            className="mx-auto text-[#8a7d6a]/50 mb-3"
          />

          <h3 className="font-['Fraunces'] text-lg text-[#ede4d4]">
            No apartments found
          </h3>

          <p className="text-xs font-['Jost'] text-[#8a7d6a] mt-1">
            Try searching for another apartment or type.
          </p>

        </div>
      )}

      {/* =====================================================
          ADD APARTMENT MODAL
      ===================================================== */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* Overlay */}

          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          />

          {/* Modal */}

          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#161310] border border-[rgba(196,149,74,0.18)]">

            {/* Header */}

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
                onClick={() => setShowForm(false)}
                className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4]"
              >
                <X size={17} />
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={handleAdd}
              className="p-5 sm:p-6 space-y-6"
            >

              {/* Basic Information */}

              <div>

                <div className="flex items-center gap-3 mb-4">

                  <div className="w-6 h-px bg-[#c4954a]" />

                  <span className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-widest">
                    Basic Information
                  </span>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <FormField label="Apartment Name">
                    <input
                      required
                      value={form.title}
                      onChange={setField("title")}
                      className={INPUT}
                      placeholder="The Premier Apartment"
                    />
                  </FormField>

                  <FormField label="Type">
                    <select
                      value={form.type}
                      onChange={setField("type")}
                      className={INPUT}
                    >
                      {[
                        "Classic",
                        "Premier",
                        "Signature",
                        "Executive",
                        "Garden",
                        "Penthouse",
                      ].map((type) => (
                        <option
                          key={type}
                          value={type}
                        >
                          {type}
                        </option>
                      ))}
                    </select>
                  </FormField>

                </div>

              </div>

              {/* Property Details */}

              <div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                  <FormField label="Price / Night (₦)">
                    <input
                      required
                      type="number"
                      min="1"
                      value={form.price}
                      onChange={setField("price")}
                      className={INPUT}
                      placeholder="350000"
                    />
                  </FormField>

                  <FormField label="Area">
                    <input
                      value={form.area}
                      onChange={setField("area")}
                      className={INPUT}
                      placeholder="120 m²"
                    />
                  </FormField>

                  <FormField label="Guest Capacity">
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={form.guests}
                      onChange={setField("guests")}
                      className={INPUT}
                    />
                  </FormField>

                </div>

              </div>

              {/* View / Status / Image */}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                <FormField label="View">
                  <input
                    value={form.view}
                    onChange={setField("view")}
                    className={INPUT}
                    placeholder="Pool View"
                  />
                </FormField>

                <FormField label="Status">
                  <select
                    value={form.status}
                    onChange={setField("status")}
                    className={INPUT}
                  >
                    {[
                      "Available",
                      "Occupied",
                      "Maintenance",
                    ].map((status) => (
                      <option
                        key={status}
                        value={status}
                      >
                        {status}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Main Image URL">
                  <input
                    value={form.image}
                    onChange={setField("image")}
                    className={INPUT}
                    placeholder="https://..."
                  />
                </FormField>

              </div>

              {/* Description */}

              <FormField label="Description">
                <textarea
                  required
                  value={form.description}
                  onChange={setField("description")}
                  rows={3}
                  className={`${INPUT} resize-none`}
                  placeholder="Describe the apartment..."
                />
              </FormField>

              {/* Amenities */}

              <FormField label="Amenities — comma separated">
                <input
                  value={form.amenities}
                  onChange={setField("amenities")}
                  className={INPUT}
                  placeholder="WiFi, AC, Kitchen, Balcony..."
                />
              </FormField>

              {/* Apartment Sections */}

              <div className="border-t border-[rgba(196,149,74,0.1)] pt-5">

                <div className="flex items-center justify-between mb-4">

                  <div>

                    <label className="block text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-widest">
                      Apartment Sections
                    </label>

                    <p className="text-[10px] font-['Jost'] text-[#8a7d6a] mt-1">
                      Add images and descriptions for each area.
                    </p>

                  </div>

                  <ImageIcon
                    size={16}
                    className="text-[#c4954a]"
                  />

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {form.sections.map(
                    (section, index) => (

                      <div
                        key={section.name}
                        className="bg-[#0c0a08] border border-[rgba(196,149,74,0.1)] p-4"
                      >

                        <p className="text-xs font-['DM_Mono'] text-[#c4954a] tracking-widest uppercase mb-3">
                          {section.name}
                        </p>

                        <div className="space-y-3">

                          <FormField label="Image URL">
                            <input
                              value={section.image}
                              onChange={setSectionField(
                                index,
                                "image"
                              )}
                              className={INPUT}
                              placeholder="https://..."
                            />
                          </FormField>

                          <FormField label="Description">
                            <textarea
                              value={section.desc}
                              onChange={setSectionField(
                                index,
                                "desc"
                              )}
                              rows={2}
                              className={`${INPUT} resize-none`}
                              placeholder={`Describe the ${section.name.toLowerCase()}...`}
                            />
                          </FormField>

                        </div>

                      </div>

                    )
                  )}

                </div>

              </div>

              {/* Buttons */}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
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
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
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
                  "
                >
                  Add Apartment
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =====================================================
          DETAILS MODAL
      ===================================================== */}

      {viewApartment && (
        <ApartmentDetailsModal
          apartment={viewApartment}
          onClose={() => setViewApartment(null)}
        />
      )}

    </div>
  );
}