const multer = require("multer");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'category',
        allowedFormats: ["jpg", "png"],
        // format: async (req, file) => 'png', // supports promises as well
        // public_id: (req, file) => 'computed-filename-using-request',
    },
});

const upload = multer({storage : storage});

module.exports = upload;


