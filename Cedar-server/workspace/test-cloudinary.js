// import fs from "fs";
// import cloudinary from "./config/cloudinary.js"

// const filePath = "./living-room1.jpg";

// const result = await new Promise((resolve, reject) => {
//     const stream = cloudinary.uploader.upload_stream(
//         {
//             folder: "cedar/test",
//             resource_type: "image"
//         },
//         (error, result) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 resolve(result);
//             }
//         }
//     );

//     fs.createReadStream(filePath).pipe(stream);
// });

// console.log("UPLOAD SUCCESS:");
// console.log(result.secure_url);


import cloudinary from "./config/cloudinary.js";

console.log("Cloud name:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API key:", process.env.CLOUDINARY_API_KEY);
console.log(
    "API secret exists:",
    !!process.env.CLOUDINARY_API_SECRET
);

try {
    const result = await cloudinary.uploader.upload(
        "./living-room1.jpg",
        {
            folder: "cedar/test"
        }
    );

    console.log("UPLOAD SUCCESS");
    console.log(result.secure_url);

} catch (error) {
    console.log("UPLOAD FAILED");
    console.log("Message:", error.message);
    console.log("HTTP code:", error.http_code);
    console.log("Name:", error.name);
    console.log("Full error:", error);
}