export const admin = (req, res, next) => {
    try {
        const user = req.user;
        if(!user){
            return res.status(401).json({ message: "Unauthorized" });
        }

        if(user.role !== "admin"){
            return res.status(403).json({ message: "Forbidden: Admins only" });
        }

        next();
    } catch (error) {
        console.log("Error in admin middleware:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}