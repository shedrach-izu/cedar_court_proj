"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Trash2,
  Eye,
  X,
  UtensilsCrossed,
} from "lucide-react";
import { toast } from "react-hot-toast";

/* =========================================================
   TYPES
========================================================= */

type MenuCategory =
  | "Breakfast"
  | "Lunch"
  | "Dinner"
  | "Drinks"
  | "Desserts";

interface MenuItem {
  id: number;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  image: string;
  available: boolean;
}

/* =========================================================
   CONSTANTS
========================================================= */

const categories: MenuCategory[] = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Drinks",
  "Desserts",
];

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
   MOCK MENU DATA
========================================================= */

const INITIAL_MENU: MenuItem[] = [
  {
    id: 1,
    name: "Cedar Breakfast",
    category: "Breakfast",
    description:
      "A refined breakfast selection featuring eggs, sausages, fresh bread, fruits and coffee.",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=1200&q=80",
    available: true,
  },
  {
    id: 2,
    name: "Jollof Rice & Grilled Chicken",
    category: "Lunch",
    description:
      "Fragrant Nigerian jollof rice served with perfectly grilled chicken and seasonal vegetables.",
    price: 9500,
    image:
      "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=1200&q=80",
    available: true,
  },
  {
    id: 3,
    name: "Pan-Seared Sea Bass",
    category: "Dinner",
    description:
      "Fresh sea bass pan-seared and served with seasonal vegetables and a delicate herb sauce.",
    price: 18000,
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=1200&q=80",
    available: true,
  },
  {
    id: 4,
    name: "Cedar Beef Steak",
    category: "Dinner",
    description:
      "Premium grilled beef steak served with roasted potatoes and house-made pepper sauce.",
    price: 24000,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
    available: true,
  },
  {
    id: 5,
    name: "Classic Chapman",
    category: "Drinks",
    description:
      "A refreshing Nigerian cocktail-style drink with citrus, grenadine and sparkling soda.",
    price: 4500,
    image:
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=1200&q=80",
    available: true,
  },
  {
    id: 6,
    name: "Chocolate Fondant",
    category: "Desserts",
    description:
      "Warm chocolate fondant with a soft centre served with vanilla ice cream.",
    price: 7000,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1200&q=80",
    available: false,
  },
];

/* =========================================================
   CATEGORY BADGE
========================================================= */

function CategoryBadge({
  category,
}: {
  category: MenuCategory;
}) {
  return (
    <span className="inline-flex px-2 py-1 border border-[rgba(196,149,74,0.15)] bg-[rgba(196,149,74,0.05)] text-[8px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-wider">
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
}: {
  item: MenuItem;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#161310] border border-[rgba(196,149,74,0.18)]">

        {/* Header */}
        <div className="sticky top-0 z-10 bg-[#161310] border-b border-[rgba(196,149,74,0.1)] px-5 sm:px-6 py-4 flex items-center justify-between">

          <div>
            <p className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-[0.2em] mb-1">
              Menu Item
            </p>

            <h2 className="font-['Fraunces'] text-xl text-[#ede4d4]">
              {item.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-[#8a7d6a] hover:text-[#ede4d4] transition-colors"
          >
            <X size={17} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-5">

          {/* Image */}
          <div className="relative">

            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-64 object-cover"
              />
            ) : (
              <div className="w-full h-64 bg-[#0c0a08] flex items-center justify-center">
                <UtensilsCrossed
                  size={32}
                  className="text-[#8a7d6a]/40"
                />
              </div>
            )}

            <div className="absolute top-3 left-3">
              <CategoryBadge category={item.category} />
            </div>

            <div className="absolute top-3 right-3">
              <AvailabilityBadge available={item.available} />
            </div>
          </div>

          {/* Name / Price */}
          <div className="flex items-start justify-between gap-5">

            <div>
              <h3 className="font-['Fraunces'] text-2xl text-[#ede4d4]">
                {item.name}
              </h3>

              <p className="text-xs font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mt-1">
                {item.category}
              </p>
            </div>

            <div className="text-right shrink-0">

              <p className="font-['Fraunces'] text-xl text-[#c4954a]">
                ₦{item.price.toLocaleString()}
              </p>

            </div>

          </div>

          {/* Description */}
          <div>
            <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] uppercase tracking-widest mb-2">
              Description
            </p>

            <p className="text-sm font-['Jost'] leading-relaxed text-[#8a7d6a]">
              {item.description}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function AdminMenu() {

  const [menuItems, setMenuItems] =
    useState<MenuItem[]>(INITIAL_MENU);

  const [showForm, setShowForm] =
    useState(false);

  const [viewItem, setViewItem] =
    useState<MenuItem | null>(null);

  const [search, setSearch] =
    useState("");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [form, setForm] = useState({
    name: "",
    category: "Breakfast" as MenuCategory,
    description: "",
    price: "",
    image: "",
    available: true,
  });

  /* =======================================================
     FORM HANDLER
  ======================================================= */

  const setField =
    (key: string) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement |
        HTMLTextAreaElement |
        HTMLSelectElement
      >
    ) => {
      setForm((current) => ({
        ...current,
        [key]: e.target.value,
      }));
    };

  /* =======================================================
     ADD MENU ITEM
  ======================================================= */

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Please enter the menu item name.");
      return;
    }

    if (!form.price || Number(form.price) <= 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    if (!form.description.trim()) {
      toast.error("Please enter a description.");
      return;
    }

    const newItem: MenuItem = {
      id: Date.now(),
      name: form.name.trim(),
      category: form.category,
      description: form.description.trim(),
      price: Number(form.price),
      image: form.image.trim(),
      available: form.available,
    };

    setMenuItems((current) => [
      ...current,
      newItem,
    ]);

    setShowForm(false);

    setForm({
      name: "",
      category: "Breakfast",
      description: "",
      price: "",
      image: "",
      available: true,
    });

    toast.success("Menu item added!");
  };

  /* =======================================================
     TOGGLE AVAILABILITY
  ======================================================= */

  const toggleAvailability = (id: number) => {
    setMenuItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              available: !item.available,
            }
          : item
      )
    );
  };

  /* =======================================================
     DELETE
  ======================================================= */

  const deleteItem = (id: number) => {
    const item = menuItems.find(
      (menuItem) => menuItem.id === id
    );

    if (!item) return;

    const confirmed = window.confirm(
      `Remove "${item.name}" from the menu?`
    );

    if (!confirmed) return;

    setMenuItems((current) =>
      current.filter((menuItem) => menuItem.id !== id)
    );

    if (viewItem?.id === id) {
      setViewItem(null);
    }

    toast.success("Menu item removed.");
  };

  /* =======================================================
     FILTER
  ======================================================= */

  const filteredItems = menuItems.filter((item) => {

    const query = search.toLowerCase().trim();

    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);

    const matchesCategory =
      categoryFilter === "All" ||
      item.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  /* =======================================================
     STATISTICS
  ======================================================= */

  const availableCount =
    menuItems.filter((item) => item.available).length;

  const unavailableCount =
    menuItems.filter((item) => !item.available).length;

  return (
    <div className="space-y-6">

      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">

        <div>

          <div className="flex items-center gap-3 mb-2">

            <div className="w-7 h-px bg-[#c4954a]" />

            <span className="text-[9px] font-['DM_Mono'] text-[#c4954a] tracking-[0.2em] uppercase">
              Restaurant Management
            </span>

          </div>

          <h2 className="font-['Fraunces'] text-2xl sm:text-3xl text-[#ede4d4]">
            Menu Items
          </h2>

          <p className="text-sm font-['Jost'] text-[#8a7d6a] mt-1">
            Manage dishes, prices and menu availability.
          </p>

        </div>

        <button
          type="button"
          onClick={() => setShowForm(true)}
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

      {/* ===================================================
          STATS
      =================================================== */}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-4">

          <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
            Total Items
          </p>

          <p className="font-['Fraunces'] text-2xl text-[#ede4d4] mt-2">
            {menuItems.length}
          </p>

        </div>

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-4">

          <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
            Available
          </p>

          <p className="font-['Fraunces'] text-2xl text-emerald-400 mt-2">
            {availableCount}
          </p>

        </div>

        <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] p-4">

          <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] tracking-widest uppercase">
            Unavailable
          </p>

          <p className="font-['Fraunces'] text-2xl text-red-400 mt-2">
            {unavailableCount}
          </p>

        </div>

      </div>

      {/* ===================================================
          SEARCH + FILTER
      =================================================== */}

      <div className="flex flex-col sm:flex-row gap-3">

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
            onChange={(e) => setSearch(e.target.value)}
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
              key={category}
              value={category}
            >
              {category}
            </option>
          ))}
        </select>

      </div>

      {/* ===================================================
          MENU TABLE
      =================================================== */}

      <div className="bg-[#161310] border border-[rgba(196,149,74,0.1)] overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-xs font-['DM_Mono']">

            <thead>

              <tr className="border-b border-[rgba(196,149,74,0.1)]">

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

              {filteredItems.map((item) => (

                <tr
                  key={item.id}
                  className="
                    border-b
                    border-[rgba(196,149,74,0.06)]
                    hover:bg-[rgba(196,149,74,0.03)]
                    transition-colors
                  "
                >

                  {/* ITEM */}

                  <td className="py-3.5 px-4">

                    <div className="flex items-center gap-3">

                      {/* Thumbnail */}

                      <div className="w-11 h-11 shrink-0 overflow-hidden bg-[#0c0a08]">

                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <UtensilsCrossed
                              size={14}
                              className="text-[#8a7d6a]/50"
                            />
                          </div>
                        )}

                      </div>

                      <div>

                        <p className="text-[#ede4d4] font-['Jost'] text-sm">
                          {item.name}
                        </p>

                        <p className="text-[9px] text-[#8a7d6a] mt-1 max-w-[260px] truncate">
                          {item.description}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* CATEGORY */}

                  <td className="py-3.5 px-4">
                    <CategoryBadge
                      category={item.category}
                    />
                  </td>

                  {/* PRICE */}

                  <td className="py-3.5 px-4 text-[#c4954a] whitespace-nowrap">
                    ₦{item.price.toLocaleString()}
                  </td>

                  {/* AVAILABLE */}

                  <td className="py-3.5 px-4">

                    <button
                      type="button"
                      onClick={() =>
                        toggleAvailability(item.id)
                      }
                      className="
                        hover:opacity-80
                        transition-opacity
                      "
                    >
                      <AvailabilityBadge
                        available={item.available}
                      />
                    </button>

                  </td>

                  {/* ACTIONS */}

                  <td className="py-3.5 px-4">

                    <div className="flex items-center gap-3">

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
                        <Eye size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          deleteItem(item.id)
                        }
                        title="Delete item"
                        className="
                          text-[#8a7d6a]
                          hover:text-red-400
                          transition-colors
                        "
                      >
                        <Trash2 size={14} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* EMPTY STATE */}

        {filteredItems.length === 0 && (

          <div className="py-16 text-center">

            <div className="w-10 h-10 mx-auto mb-4 border border-[rgba(196,149,74,0.15)] flex items-center justify-center">

              <Search
                size={15}
                className="text-[#8a7d6a]"
              />

            </div>

            <p className="font-['Fraunces'] text-lg text-[#ede4d4]">
              No menu items found
            </p>

            <p className="text-sm font-['Jost'] text-[#8a7d6a] mt-1">
              Try changing your search or category filter.
            </p>

          </div>

        )}

      </div>

      {/* ===================================================
          ADD MENU ITEM MODAL
      =================================================== */}

      {showForm && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">

          {/* Overlay */}

          <div
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setShowForm(false)}
          />

          {/* Modal */}

          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#161310] border border-[rgba(196,149,74,0.18)]">

            {/* Header */}

            <div className="sticky top-0 z-10 bg-[#161310] border-b border-[rgba(196,149,74,0.1)] px-5 sm:px-6 py-4 flex items-center justify-between">

              <div>

                <p className="text-[9px] font-['DM_Mono'] text-[#c4954a] uppercase tracking-[0.2em] mb-1">
                  Restaurant Management
                </p>

                <h2 className="font-['Fraunces'] text-xl text-[#ede4d4]">
                  Add Menu Item
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
              className="p-5 sm:p-6 space-y-4"
            >

              {/* Name */}

              <FormField label="Item Name">

                <input
                  required
                  value={form.name}
                  onChange={setField("name")}
                  className={INPUT}
                  placeholder="Pan-Seared Sea Bass"
                />

              </FormField>

              {/* Category + Price */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                <FormField label="Category">

                  <select
                    required
                    value={form.category}
                    onChange={setField("category")}
                    className={INPUT}
                  >

                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}

                  </select>

                </FormField>

                <FormField label="Price (₦)">

                  <input
                    required
                    type="number"
                    min="1"
                    value={form.price}
                    onChange={setField("price")}
                    className={INPUT}
                    placeholder="18000"
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
                  placeholder="Describe the dish..."
                />

              </FormField>

              {/* Image */}

              <FormField label="Image URL">

                <input
                  value={form.image}
                  onChange={setField("image")}
                  className={INPUT}
                  placeholder="https://images.unsplash.com/..."
                />

              </FormField>

              {/* Availability */}

              <div className="flex items-center justify-between border border-[rgba(196,149,74,0.1)] bg-[#0c0a08] px-4 py-3">

                <div>

                  <p className="text-sm font-['Jost'] text-[#ede4d4]">
                    Available for ordering
                  </p>

                  <p className="text-[9px] font-['DM_Mono'] text-[#8a7d6a] mt-1">
                    Customers can order this item.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setForm((current) => ({
                      ...current,
                      available:
                        !current.available,
                    }))
                  }
                  className={`
                    relative
                    w-10
                    h-5
                    transition-colors
                    ${
                      form.available
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
                        form.available
                          ? "translate-x-5"
                          : "translate-x-0.5"
                      }
                    `}
                  />

                </button>

              </div>

              {/* Buttons */}

              <div className="flex gap-3 pt-2">

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
                  Add Item
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* ===================================================
          DETAILS MODAL
      =================================================== */}

      {viewItem && (
        <MenuDetailsModal
          item={viewItem}
          onClose={() => setViewItem(null)}
        />
      )}

    </div>
  );
}