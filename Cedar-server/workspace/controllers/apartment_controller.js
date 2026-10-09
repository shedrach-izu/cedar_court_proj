import ApartmentCategory from "../models/apartment_category_schema.js";
import cloudinary from "../config/cloudinary.js";
import Apartment from "../models/apartment_schema.js";
import ApartmentAmenity from "../models/apartment_amenity_schema.js";
import slugify from "slugify";




/**
 * @description create a new apartment
 * @route POST /api/apartment/create
 * @access Private
 */



export const createApartment = async (req, res) => {
    try{
        const { title, description, price, category, amenities, area, guests, view, isFeatured, status } = req.body;

        if(!title || !description || !price || !category || !amenities || !area || !guests || !view){
            return res.status(400).json({ message: "all fields required" })
        }

        console.log("CATEGORY RECEIVED:", category);

        const apartmentCategory = await ApartmentCategory.findById(category);

        console.log("CATEGORY FOUND:", apartmentCategory);

        if(!apartmentCategory){
            return res.status(404).json({ message: "Apartment category not found" })
        }

        if(!req.files || req.files.length === 0){
            return res.status(400).json({ message: "At least one image is required" });
        }

        let imageTypes = req.body.imageTypes || []
        let imageAlts = req.body.imageAlts || []

        if(!Array.isArray(imageTypes)){
            imageTypes = [imageTypes];
        }

        if(!Array.isArray(imageAlts)){
            imageAlts = [imageAlts];
        }

        if(imageTypes.length !== req.files.length){
            return res.status(400).json({ message: "Image types and alts must match the number of images" });
        }

        let gallery = [];

        for (let i = 0; i < req.files.length; i++) {
            const file = req.files[i];

            const result = await new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "cedar/apartments",
                        resource_type: "image"
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result);
                        }
                    }
                );

                stream.end(file.buffer);
            
            });
            gallery.push({
                url: result.secure_url,
                type: imageTypes[i],
                alt: imageAlts[i] || title
            });
        }

        let apartmentAmenities = amenities || [];

        if(!Array.isArray(apartmentAmenities)){
            apartmentAmenities = [apartmentAmenities];
        }

        if(apartmentAmenities.length > 0){
            const foundAmenities = await ApartmentAmenity.find({ _id: { $in: apartmentAmenities } });

            if(foundAmenities.length !== apartmentAmenities.length){
                return res.status(400).json({ message: "Some amenities not found" });
            }
        }

        let baseSlug = slugify(title, { lower: true, strict: true });

        let slug = baseSlug;
        let count = 1;

        while(await Apartment.findOne({ slug })){
            slug = `${baseSlug}-${count}`;
            count++;
        }

        const apartment = await Apartment.create({
            title: title.trim(),
            slug,
            description: description.trim(),
            price: Number(price),
            category,
            amenities: apartmentAmenities,
            gallery,
            area: Number(area),
            guests: Number(guests),
            view: view.trim(),
            isFeatured: isFeatured === undefined ? true : isFeatured === "true",
        });

        console.log("APARTMENT CREATED SUCCESSFULLY");

        res.status(201).json({
            message: "Apartment created successfully",
            apartment
        })
    }catch(error){
        console.log("Error creating apartment:", error);
        res.status(500).json({ message: error.message })
    }
}




/**
 * @description Get all apartments
 * @route GET /api/apartment/all-apartments
 * @access Public
 */



export const getAllApartments = async (req, res) => {
    try{
        const apartments = await Apartment.find().populate("category").populate("amenities");

        if(!apartments || apartments.length === 0){
            return res.status(404).json({ message: "No apartments found" });
        }

        res.status(200).json({ apartments });
    }catch(error){
        console.log("Error fetching apartments:", error);
        res.status(500).json({ message: error.message });
    }
}




/**
 * @description Get an apartment with by slug
 * @route GET /api/apartment/:slug
 * @access Public
 */



export const getApartmentBySlug = async (req, res) => {
    try{
        const { slug } = req.params;

        const apartment = await Apartment.findOne({ slug }).populate("category").populate("amenities");

        if(!apartment){
            return res.status(404).json({ message: "apartment not found" })
        }

        res.status(200).json(apartment)
    }catch(error){
        console.log("Error getting apartment by slug:", error);
        res.status(500).json({ message: error.message })
    }
}




/**
 * @description Get apartments by category ID
 * @route GET /api/apartment/:id
 * @access Public
 */



export const getApartmentsByCategoryId = async (req, res) => {
    try{
        const id = req.params;

        if(!id){
            return res.status(400).json({ message: "category ID required" })
        }

        const apartments = await Apartment.find({ category: id }).populate("category");

        if(!apartments || apartments.length === 0){
            return res.status(404).json({ message: "apartment not found" })
        }

        res.status(200).json(apartments)
    }catch(error){
        console.log("Error getting apartment by category:", error);
        res.status(500).json({ message: error.message })
    }
}




/**
 * @description Get all featured apartments
 * @route GET /api/apartment/featured
 * @access Public
 */



export const getFeaturedApartments = async (req, res) => {
    try {
        const featuredApartments = await Apartment.find({ isFeatured: true});

        if(!featuredApartments || featuredApartments.length === 0){
            return res.status(404).json({ message: "no featured apartment found" })
        }

        res.status(200).json(featuredApartments);
    } catch (error) {
        console.log("Error getting featured apartments:", error);
        res.status(500).json({ message: error.message })
    }
}



export const updateApartment = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            price,
            category,
            amenities,
            area,
            guests,
            view,
            status,
            isFeatured,
        } = req.body;

        const apartment = await Apartment.findById(id);

        if (!apartment) {
            return res.status(404).json({
                message: "Apartment not found",
            });
        }

        /* =========================================
           CATEGORY
        ========================================= */

        if (category !== undefined) {
            const existingCategory =
                await ApartmentCategory.findById(category);

            if (!existingCategory) {
                return res.status(404).json({
                    message: "Apartment category not found",
                });
            }

            apartment.category = category;
        }

        /* =========================================
           TITLE + SLUG
        ========================================= */

        if (title !== undefined) {
            const newTitle = title.trim();

            if (!newTitle) {
                return res.status(400).json({
                    message: "Apartment title is required",
                });
            }

            /*
             * Only create a new slug if the title changed.
             */

            if (newTitle !== apartment.title) {
                const baseSlug = slugify(newTitle, {
                    lower: true,
                    strict: true,
                });

                let slug = baseSlug;
                let count = 1;

                while (
                    await Apartment.findOne({
                        slug,
                        _id: { $ne: apartment._id },
                    })
                ) {
                    slug = `${baseSlug}-${count}`;
                    count++;
                }

                apartment.slug = slug;
            }

            apartment.title = newTitle;
        }

        /* =========================================
           DESCRIPTION
        ========================================= */

        if (description !== undefined) {
            apartment.description = description.trim();
        }

        /* =========================================
           PRICE
        ========================================= */

        if (price !== undefined) {
            const numericPrice = Number(price);

            if (Number.isNaN(numericPrice) || numericPrice <= 0) {
                return res.status(400).json({
                    message: "Price must be greater than 0",
                });
            }

            apartment.price = numericPrice;
        }

        /* =========================================
           AREA
        ========================================= */

        if (area !== undefined) {
            const numericArea = Number(area);

            if (Number.isNaN(numericArea) || numericArea <= 0) {
                return res.status(400).json({
                    message: "Area must be greater than 0",
                });
            }

            apartment.area = numericArea;
        }

        /* =========================================
           GUESTS
        ========================================= */

        if (guests !== undefined) {
            const numericGuests = Number(guests);

            if (
                Number.isNaN(numericGuests) ||
                numericGuests <= 0
            ) {
                return res.status(400).json({
                    message: "Guest capacity must be greater than 0",
                });
            }

            apartment.guests = numericGuests;
        }

        /* =========================================
           VIEW
        ========================================= */

        if (view !== undefined) {
            apartment.view = view.trim();
        }

        /* =========================================
           STATUS
        ========================================= */

        if (status !== undefined) {
            const validStatuses = [
                "available",
                "booked",
                "maintenance",
            ];

            if (!validStatuses.includes(status)) {
                return res.status(400).json({
                    message: "Invalid apartment status",
                });
            }

            apartment.status = status;
        }

        /* =========================================
           FEATURED
        ========================================= */

        if (isFeatured !== undefined) {
            apartment.isFeatured =
                isFeatured === true ||
                isFeatured === "true";
        }

        /* =========================================
           AMENITIES
        ========================================= */

        if (amenities !== undefined) {
            let apartmentAmenities = amenities;

            if (!Array.isArray(apartmentAmenities)) {
                apartmentAmenities = [apartmentAmenities];
            }

            const foundAmenities =
                await ApartmentAmenity.find({
                    _id: {
                        $in: apartmentAmenities,
                    },
                });

            if (
                foundAmenities.length !==
                apartmentAmenities.length
            ) {
                return res.status(400).json({
                    message: "Some amenities not found",
                });
            }

            apartment.amenities = apartmentAmenities;
        }

        /* =========================================
           SAVE
        ========================================= */

        await apartment.save();

        /* =========================================
           RETURN POPULATED APARTMENT
        ========================================= */

        const updatedApartment =
            await Apartment.findById(id)
                .populate("category")
                .populate("amenities");

        return res.status(200).json({
            message: "Apartment updated successfully",
            apartment: updatedApartment,
        });

    } catch (error) {
        console.log(
            "Error updating apartment:",
            error
        );

        return res.status(500).json({
            message: error.message,
        });
    }
};



export const deleteApartment = async (req, res) => {
    try {
        const { id } = req.params;

        const apartment = await Apartment.findById(id);

        if (!apartment) {
            return res.status(404).json({
                message: "Apartment not found",
            });
        }

        await Apartment.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Apartment deleted successfully",
        });

    } catch (error) {
        console.log(
            "Error deleting apartment:",
            error
        );

        return res.status(500).json({
            message: error.message,
        });
    }
};