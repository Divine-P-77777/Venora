const busboy = require("busboy");
const { uploadStreamToCloudinary } = require("../services/uploadmedia.service");

/**
 * Factory for Zero-RAM Multipart Streaming Upload Middleware.
 * Intercepts incoming multipart stream chunks via Busboy, pipes files directly
 * into Cloudinary storage, and attaches results to `req.files`, `req.file`, and `req.body`.
 *
 * @param {Object} [customOptions={}] - Configuration options for the upload route
 * @returns {import("express").RequestHandler}
 */



function createUploadStreamMiddleware(customOptions = {}) {
    return (req, res, next) => {
        const contentType = req.headers["content-type"] || "";
        if (!contentType.includes("multipart/form-data")) {
            return res.status(400).json({ error: "Content-Type must be multipart/form-data" });
        }

        const options = {
            folder: customOptions.folder || "VENORA/events",
            maxFileSize: customOptions.maxFileSize || 10 * 1024 * 1024, // 10MB default
            maxFiles: customOptions.maxFiles || 5,
            allowedMimeTypes: customOptions.allowedMimeTypes || [
                "image/jpeg",
                "image/png",
                "image/webp",
                "image/jpg",
                "image/gif"
            ],
            ...customOptions
        };

        let bb;
        try {
            bb = busboy({
                headers: req.headers,
                limits: { fileSize: options.maxFileSize, files: options.maxFiles }
            });
        } catch (err) {
            return res.status(400).json({ error: `Multipart parser initialization failed: ${err.message}` });
        }

        const uploadPromises = [];
        req.body = req.body || {};
        let hasError = false;

        const handleError = (status, message) => {
            if (hasError) return;
            hasError = true;
            req.unpipe(bb);
            return res.status(status).json({ error: message });
        };

        bb.on("field", (name, val) => {
            req.body[name] = val;
        });

        bb.on("file",
            (fieldName, fileStream, { filename, mimeType }) => {
                if (hasError) return fileStream.resume();

                if (!options.allowedMimeTypes.includes(mimeType)) {
                    fileStream.resume();
                    return handleError(400, `Unsupported file type '${mimeType}'. Allowed: ${options.allowedMimeTypes.join(", ")}`);
                }

                fileStream.on("limit", () => {
                    handleError(400, `File '${filename}' exceeds ${options.maxFileSize / (1024 * 1024)}MB size limit`);
                });

                const uploadPromise = uploadStreamToCloudinary(fileStream, { folder: options.folder })
                    .then((cldResult) => ({
                        fieldName,
                        filename,
                        mimeType,
                        url: cldResult.secure_url,
                        secure_url: cldResult.secure_url,
                        public_id: cldResult.public_id,
                        format: cldResult.format,
                        bytes: cldResult.bytes
                    }));

                uploadPromises.push(uploadPromise);
            });

        bb.on("error", (err) => handleError(500, `Upload stream error: ${err.message}`));

        bb.on("finish", async () => {
            if (hasError) return;

            if (uploadPromises.length === 0) {
                return res.status(400).json({ error: "No file was attached to the request" });
            }

            try {
                const files = await Promise.all(uploadPromises);
                req.files = files;
                req.file = files[0];
                next();
            } catch (err) {
                return res.status(500).json({ error: err.message || "Cloudinary streaming upload failed" });
            }
        });

        req.pipe(bb);
    };
}

module.exports = {
    createUploadStreamMiddleware
};
