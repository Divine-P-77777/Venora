const { v2: cloudinary } = require("cloudinary");
const {
    CLOUDINARY_API_SECRET,
    CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME
} = require("../config/config.js");

// Initialize Cloudinary Configuration
cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
});

/**
 * Uploads a readable stream directly into Cloudinary (Zero-RAM buffer).
 * Pure storage service: completely decoupled from HTTP/Express frameworks.
 *
 * @param {import("stream").Readable} fileStream - Incoming readable stream
 * @param {Object} [options={}] - Cloudinary upload configuration
 * @returns {Promise<Object>} - Cloudinary upload result
 */
function uploadStreamToCloudinary(fileStream, options = {}) {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: options.folder || "VENORA/events",
                resource_type: options.resourceType || "auto",
                transformation: options.transformation || [{ quality: "auto", fetch_format: "auto" }],
                ...options
            },
            (error, result) => (error ? reject(error) : resolve(result))
        );

        fileStream.on("error", (err) => {
            uploadStream.destroy(err);
            reject(err);
        });

        fileStream.pipe(uploadStream);
    });
}

/**
 * Deletes an asset from Cloudinary by public ID.
 *
 * @param {string} publicId - Cloudinary public_id
 * @param {string} [resourceType="image"] - Cloudinary resource type
 * @returns {Promise<Object|null>}
 */
async function deleteMediaFromCloudinary(publicId, resourceType = "image") {
    if (!publicId) return null;
    return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
}

/**
 * Generates an on-the-fly optimized and transformed URL.
 *
 * @param {string} publicId - Cloudinary public_id
 * @param {Object} [transformations={}] - Cloudinary transformation options
 * @returns {string}
 */
function generateOptimizedUrl(publicId, transformations = {}) {
    return cloudinary.url(publicId, {
        fetch_format: "auto",
        quality: "auto",
        ...transformations
    });
}

module.exports = {
    cloudinary,
    uploadStreamToCloudinary,
    streamUploadToCloudinary: uploadStreamToCloudinary, // Alias for backward compatibility
    deleteMediaFromCloudinary,
    generateOptimizedUrl
};