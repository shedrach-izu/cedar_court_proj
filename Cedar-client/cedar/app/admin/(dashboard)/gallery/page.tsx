"use client";

import { useEffect, useState } from "react";
import {
  Images,
  Plus,
  Trash2,
  X,
  Upload,
  Loader2,
} from "lucide-react";
import { toast } from "react-hot-toast";

import api from "@/lib/api";

type GalleryCategory = {
  _id: string;
  title: string;
};

type GalleryImage = {
  _id: string;

  image: {
    url: string;
    alt?: string;
    publicId?: string;
  };

  category: GalleryCategory | string | null;

  createdAt?: string;
  updatedAt?: string;
};

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<
    GalleryImage[]
  >([]);

  const [categories, setCategories] = useState<
    GalleryCategory[]
  >([]);

  const [activeCategory, setActiveCategory] =
    useState("all");

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [selectedCategory, setSelectedCategory] =
    useState("");

  const [loading, setLoading] = useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  /* =====================================================
     FETCH GALLERY IMAGES
  ===================================================== */

  const fetchGalleries = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/gallery/galleries"
      );

      setGalleries(response.data || []);
    } catch (error: any) {
      console.error(
        "Error fetching galleries:",
        error
      );

      // No gallery images yet
      if (error.response?.status === 404) {
        setGalleries([]);
        return;
      }

      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  };

  /* =====================================================
     FETCH GALLERY CATEGORIES
  ===================================================== */

  const fetchCategories = async () => {
    try {
      const response = await api.get(
        "/gallery-category/all-categories"
      );

      /*
        Supports responses such as:

        [
          {
            _id: "...",
            title: "Rooms & Apartments"
          }
        ]

        OR

        {
          categories: [...]
        }

        OR

        {
          data: [...]
        }
      */

      const categoryData =
        response.data?.categories ||
        response.data?.data ||
        response.data ||
        [];

      setCategories(categoryData);
    } catch (error) {
      console.error(
        "Error fetching gallery categories:",
        error
      );

      toast.error(
        "Failed to load gallery categories"
      );
    }
  };

  /* =====================================================
     INITIAL LOAD
  ===================================================== */

  useEffect(() => {
    fetchGalleries();
    fetchCategories();
  }, []);

  /* =====================================================
     FILTER GALLERY
  ===================================================== */

  const filteredGalleries =
    activeCategory === "all"
      ? galleries
      : galleries.filter((gallery) => {
          if (!gallery.category) {
            return false;
          }

          /*
            In case category is returned
            as just an ObjectId string.
          */

          if (
            typeof gallery.category === "string"
          ) {
            return (
              gallery.category ===
              activeCategory
            );
          }

          /*
            Normal populated category.
          */

          return (
            gallery.category._id ===
            activeCategory
          );
        });

  /* =====================================================
     UPLOAD IMAGE
  ===================================================== */

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select an image");
      return;
    }

    if (!selectedCategory) {
      toast.error("Please select a category");
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();

      formData.append(
        "image",
        selectedFile
      );

      formData.append(
        "categoryId",
        selectedCategory
      );

      await api.post(
        "/gallery/create",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(
        "Image uploaded successfully"
      );

      setSelectedFile(null);
      setSelectedCategory("");
      setShowAddModal(false);

      await fetchGalleries();
    } catch (error: any) {
      console.error(
        "Error uploading gallery image:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to upload image"
      );
    } finally {
      setUploading(false);
    }
  };

  /* =====================================================
     DELETE IMAGE
  ===================================================== */

  const handleDelete = async (
    id: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this image?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await api.delete(
        `/gallery/${id}`
      );

      setGalleries((prev) =>
        prev.filter(
          (gallery) =>
            gallery._id !== id
        )
      );

      toast.success(
        "Image deleted successfully"
      );
    } catch (error: any) {
      console.error(
        "Error deleting gallery image:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete image"
      );
    } finally {
      setDeletingId(null);
    }
  };

  /* =====================================================
     CLOSE MODAL
  ===================================================== */

  const closeModal = () => {
    if (uploading) {
      return;
    }

    setShowAddModal(false);
    setSelectedFile(null);
    setSelectedCategory("");
  };

  return (
    <div className="space-y-7">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="
        flex
        flex-col
        sm:flex-row
        sm:items-start
        sm:justify-between
        gap-5
      ">

        {/* PAGE TITLE */}

        <div>

          <div className="
            flex
            items-center
            gap-2
            mb-2
          ">

            <Images
              size={15}
              className="text-[#c4954a]"
            />

            <span className="
              text-[9px]
              uppercase
              tracking-[0.2em]
              font-['DM_Mono']
              text-[#8a7d6a]
            ">
              Media Management
            </span>

          </div>


          <h1 className="
            font-['Fraunces']
            text-2xl
            text-[#ede4d4]
          ">
            Gallery
          </h1>


          <p className="
            mt-1
            text-sm
            text-[#8a7d6a]
            font-['Jost']
          ">
            Manage the images displayed
            across Cedar Court.
          </p>

        </div>


        {/* ADD IMAGE */}

        <button
          type="button"
          onClick={() =>
            setShowAddModal(true)
          }
          className="
            self-start
            flex
            items-center
            gap-2
            px-4
            py-2.5
            bg-[#c4954a]
            text-[#0c0a08]
            text-xs
            font-['Jost']
            font-medium
            hover:bg-[#d4a65a]
            transition-colors
          "
        >

          <Plus size={15} />

          Add Image

        </button>

      </div>


      {/* =================================================
          CATEGORY FILTERS

          ONE HORIZONTAL ROW
      ================================================= */}

      <div className="
        flex
        flex-nowrap
        items-center
        gap-2
        overflow-x-auto
        pb-2
        scrollbar-none
      ">

        {/* ALL */}

        <button
          type="button"
          onClick={() =>
            setActiveCategory("all")
          }
          className={`
            shrink-0
            whitespace-nowrap
            px-4
            py-2
            border
            text-[10px]
            uppercase
            tracking-[0.12em]
            font-['DM_Mono']
            transition-colors

            ${
              activeCategory === "all"
                ? `
                  bg-[#c4954a]
                  border-[#c4954a]
                  text-[#0c0a08]
                `
                : `
                  border-[#3b3226]
                  text-[#8a7d6a]
                  hover:text-[#ede4d4]
                  hover:border-[#5a4b38]
                `
            }
          `}
        >
          All
        </button>


        {/* CATEGORY BUTTONS */}

        {categories.map(
          (category) => (

            <button
              key={category._id}
              type="button"
              onClick={() =>
                setActiveCategory(
                  category._id
                )
              }
              className={`
                shrink-0
                whitespace-nowrap
                px-4
                py-2
                border
                text-[10px]
                uppercase
                tracking-[0.12em]
                font-['DM_Mono']
                transition-colors

                ${
                  activeCategory ===
                  category._id
                    ? `
                      bg-[#c4954a]
                      border-[#c4954a]
                      text-[#0c0a08]
                    `
                    : `
                      border-[#3b3226]
                      text-[#8a7d6a]
                      hover:text-[#ede4d4]
                      hover:border-[#5a4b38]
                    `
                }
              `}
            >
              {category.title}
            </button>

          )
        )}

      </div>


      {/* =================================================
          GALLERY
      ================================================= */}

      {loading ? (

        /* LOADING */

        <div className="
          min-h-[400px]
          flex
          items-center
          justify-center
        ">

          <Loader2
            size={24}
            className="
              animate-spin
              text-[#c4954a]
            "
          />

        </div>

      ) : filteredGalleries.length === 0 ? (

        /* =================================================
           EMPTY STATE
        ================================================= */

        <div className="
          min-h-[350px]
          border
          border-dashed
          border-[#3b3226]
          flex
          flex-col
          items-center
          justify-center
          text-center
          px-5
        ">

          <Images
            size={30}
            className="
              text-[#8a7d6a]
              mb-4
            "
          />

          <h3 className="
            font-['Fraunces']
            text-lg
            text-[#ede4d4]
          ">
            No images found
          </h3>

          <p className="
            text-sm
            text-[#8a7d6a]
            mt-1
          ">
            There are no images in
            this category yet.
          </p>


          <button
            type="button"
            onClick={() =>
              setShowAddModal(true)
            }
            className="
              mt-5
              flex
              items-center
              gap-2
              px-4
              py-2
              border
              border-[#c4954a]
              text-[#c4954a]
              text-xs
              font-['Jost']
              hover:bg-[#c4954a]/10
              transition-colors
            "
          >

            <Plus size={14} />

            Add Image

          </button>

        </div>

      ) : (

        /* =================================================
           GALLERY GRID

           1 COLUMN  → MOBILE
           2 COLUMNS → TABLET
           3 COLUMNS → DESKTOP
        ================================================= */

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
        ">

          {filteredGalleries.map(
            (gallery) => (

              <div
                key={gallery._id}
                className="
                  group
                  relative
                  aspect-[4/3]
                  overflow-hidden
                  bg-[#161310]
                  border
                  border-[#2d2923]
                "
              >

                {/* IMAGE */}

                <img
                  src={
                    gallery.image.url
                  }
                  alt={
                    gallery.image.alt ||
                    "Cedar Court gallery image"
                  }
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-[1.04]
                  "
                />


                {/* HOVER OVERLAY */}

                <div className="
                  absolute
                  inset-0
                  bg-black/40
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                " />


                {/* CATEGORY LABEL */}

                <div className="
                  absolute
                  left-3
                  bottom-3
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                ">

                  <span className="
                    text-[9px]
                    uppercase
                    tracking-[0.15em]
                    font-['DM_Mono']
                    text-[#ede4d4]
                  ">

                    {
                      typeof gallery.category ===
                        "object" &&
                      gallery.category
                        ? gallery.category.title
                        : ""
                    }

                  </span>

                </div>


                {/* DELETE BUTTON */}

                <button
                  type="button"
                  onClick={() =>
                    handleDelete(
                      gallery._id
                    )
                  }
                  disabled={
                    deletingId ===
                    gallery._id
                  }
                  aria-label="Delete image"
                  className="
                    absolute
                    top-3
                    right-3
                    w-9
                    h-9
                    flex
                    items-center
                    justify-center
                    bg-black/75
                    border
                    border-white/10
                    text-red-300
                    opacity-0
                    group-hover:opacity-100
                    hover:bg-red-500/20
                    hover:border-red-400/30
                    hover:text-red-200
                    transition-all
                  "
                >

                  {deletingId ===
                  gallery._id ? (

                    <Loader2
                      size={15}
                      className="
                        animate-spin
                      "
                    />

                  ) : (

                    <Trash2
                      size={15}
                    />

                  )}

                </button>

              </div>

            )
          )}

        </div>

      )}


      {/* =================================================
          ADD IMAGE MODAL
      ================================================= */}

      {showAddModal && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-black/75
            flex
            items-center
            justify-center
            p-4
          "
          onMouseDown={(e) => {

            if (
              e.target ===
              e.currentTarget
            ) {
              closeModal();
            }

          }}
        >

          <div className="
            w-full
            max-w-lg
            bg-[#11100e]
            border
            border-[#3b3226]
            shadow-2xl
          ">

            {/* =================================================
                MODAL HEADER
            ================================================= */}

            <div className="
              flex
              items-center
              justify-between
              px-5
              py-4
              border-b
              border-[#2d2923]
            ">

              <div>

                <h2 className="
                  font-['Fraunces']
                  text-lg
                  text-[#ede4d4]
                ">
                  Add Gallery Image
                </h2>

                <p className="
                  text-xs
                  text-[#8a7d6a]
                  mt-1
                ">
                  Upload an image to
                  Cedar Court.
                </p>

              </div>


              <button
                type="button"
                onClick={closeModal}
                className="
                  w-8
                  h-8
                  flex
                  items-center
                  justify-center
                  text-[#8a7d6a]
                  hover:text-[#ede4d4]
                  hover:bg-white/5
                  transition-colors
                "
              >

                <X size={18} />

              </button>

            </div>


            {/* =================================================
                MODAL BODY
            ================================================= */}

            <div className="
              p-5
              space-y-5
            ">

              {/* CATEGORY */}

              <div>

                <label className="
                  block
                  mb-2
                  text-[9px]
                  uppercase
                  tracking-[0.15em]
                  font-['DM_Mono']
                  text-[#8a7d6a]
                ">
                  Category
                </label>


                <select
                  value={
                    selectedCategory
                  }
                  onChange={(e) =>
                    setSelectedCategory(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-11
                    px-3
                    bg-[#0c0a08]
                    border
                    border-[#3b3226]
                    text-[#ede4d4]
                    text-sm
                    font-['Jost']
                    outline-none
                    focus:border-[#c4954a]
                  "
                >

                  <option value="">
                    Select category
                  </option>


                  {categories.map(
                    (category) => (

                      <option
                        key={
                          category._id
                        }
                        value={
                          category._id
                        }
                      >
                        {category.title}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* IMAGE */}

              <div>

                <label className="
                  block
                  mb-2
                  text-[9px]
                  uppercase
                  tracking-[0.15em]
                  font-['DM_Mono']
                  text-[#8a7d6a]
                ">
                  Image
                </label>


                <label className="
                  block
                  cursor-pointer
                  border
                  border-dashed
                  border-[#3b3226]
                  hover:border-[#c4954a]
                  transition-colors
                ">

                  <input
                    type="file"
                    accept="
                      image/png,
                      image/jpeg,
                      image/webp
                    "
                    className="hidden"
                    onChange={(e) =>
                      setSelectedFile(
                        e.target.files?.[0] ||
                        null
                      )
                    }
                  />


                  <div className="
                    min-h-[180px]
                    flex
                    flex-col
                    items-center
                    justify-center
                    px-5
                    text-center
                  ">

                    <Upload
                      size={25}
                      className="
                        text-[#c4954a]
                        mb-3
                      "
                    />


                    {selectedFile ? (

                      <>
                        <p className="
                          text-sm
                          text-[#ede4d4]
                          max-w-full
                          truncate
                        ">
                          {
                            selectedFile.name
                          }
                        </p>

                        <p className="
                          text-xs
                          text-[#8a7d6a]
                          mt-1
                        ">
                          Click to choose
                          another image
                        </p>
                      </>

                    ) : (

                      <>
                        <p className="
                          text-sm
                          text-[#ede4d4]
                        ">
                          Choose an image
                        </p>

                        <p className="
                          text-xs
                          text-[#8a7d6a]
                          mt-1
                        ">
                          PNG, JPG or WEBP
                          · Max 5MB
                        </p>
                      </>

                    )}

                  </div>

                </label>

              </div>

            </div>


            {/* =================================================
                MODAL FOOTER
            ================================================= */}

            <div className="
              px-5
              py-4
              border-t
              border-[#2d2923]
              flex
              justify-end
              gap-3
            ">

              {/* CANCEL */}

              <button
                type="button"
                onClick={closeModal}
                disabled={uploading}
                className="
                  px-4
                  py-2.5
                  border
                  border-[#3b3226]
                  text-[#8a7d6a]
                  text-xs
                  font-['Jost']
                  hover:text-[#ede4d4]
                  transition-colors
                  disabled:opacity-50
                "
              >
                Cancel
              </button>


              {/* UPLOAD */}

              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="
                  px-5
                  py-2.5
                  bg-[#c4954a]
                  text-[#0c0a08]
                  text-xs
                  font-medium
                  font-['Jost']
                  disabled:opacity-50
                  flex
                  items-center
                  gap-2
                  hover:bg-[#d4a65a]
                  transition-colors
                "
              >

                {uploading ? (

                  <>
                    <Loader2
                      size={14}
                      className="
                        animate-spin
                      "
                    />

                    Uploading...
                  </>

                ) : (

                  <>
                    <Upload
                      size={14}
                    />

                    Upload Image
                  </>

                )}

              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}