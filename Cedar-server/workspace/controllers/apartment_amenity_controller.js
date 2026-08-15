import ApartmentAmenity from "../models/apartment_amenity_schema.js";


/**
 * @description Create a new apartment amenity
 * @route POST /api/apartment-amenity/create
 * @access Private
 */



export const createApartmentAmenity = async (req, res) => {
    try {
        const { name } = req.body;

        if(!name){
            return res.status(400).json({ message: "Name required for amenity" })
        }

        const existingAmenity = await ApartmentAmenity.findOne({ name: name });

        if(existingAmenity){
            return res.status(409).json({ message: "Amenity with this name already exist" })
        }

        const amenity = await ApartmentAmenity.create({
            name: name.trim()
        });

        res.status(201).json({
            message: "Amenity created successfully",
            amenity
        });
    } catch (error) {
        console.log("Error creating apartment amenity:", error);
        res.status(500).json({ message: error.message })
    }
}




/**
 * @description Get all amenities
 * @route GET /api/apartment-amenity/all-amenities
 * @access Public
 */



export const getAllAmenities = async (req, res) => {
    try {
        const amenities = await ApartmentAmenity.find();

        if(!amenities || amenities.length === 0) {
            return res.status(404).json({ message: "No amenities found" });
        }

        res.status(200).json({ amenities });
    } catch (error) {
        console.log("Error fetching amenities:", error);
        res.status(500).json({ message: error.message });
    }
};