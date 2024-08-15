import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

// Set up multer storage
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

// Multer middleware
const uploadMiddleware = upload.single('file');

export const config = {
  api: {
    bodyParser: false, // Disable body parsing, so multer can handle it
  },
};

// Custom handler to use multer with Next.js API routes
const customHandler = (req, res) => {
  uploadMiddleware(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: `File upload error: ${err.message}` });
    }

    res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
  });
};

export default customHandler;
