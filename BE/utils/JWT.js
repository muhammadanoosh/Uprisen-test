const { sign, verify } = require("jsonwebtoken");
require('dotenv').config();
const fs = require('fs');
const fsPromise = require('fs').promises;
const path = require('path');

const SECRET = process.env.JWT_SECRET || "123456789abcdefghi";

module.exports = {
    async generateToken(user_id) {
        const payload = {
            user: user_id
        }
        const token = sign(payload, SECRET, { expiresIn: "20d" });
        return token;
    },

    async validateToken(req, res, next) {

        try {
            const authHeader = req.header("Authorization");
            if (!authHeader) {
                return res.status(401).json("Authorization header missing");
            }
            const token = authHeader.split(' ')[1]; // Extract the token from the header
            const validToken = await verify(token, SECRET);
            if (!validToken) {
                return res.status(401).json("Token verification failed");
            }
            req.user = validToken.user;
            next();
        } catch (error) {
            return res.status(500).json("Internal Server Error: " + error.message);
        }
    },

    async base64ToPdf(file) {
        const splitPdf = file.split(",");
        const base64File = splitPdf[1];
        const buffer = Buffer.from(base64File, 'base64');
        const defaultExtension = 'pdf';

        const fileName = `pdf_file${Date.now()}.${defaultExtension}`;
        const filePath = path.join(__dirname, '../uploads', fileName);

        await fsPromise.writeFile(filePath, buffer);
        return filePath;
    },
}