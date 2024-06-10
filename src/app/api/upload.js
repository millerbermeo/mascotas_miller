// pages/api/upload.js
import { IncomingForm } from 'formidable';
import cloudinary from '../../lib/cloudinary';
import { promises as fs } from 'fs';


export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(500).json({ message: 'Error parsing the files' });
    }

    const file = files.file.filepath;

    try {
      const result = await cloudinary.uploader.upload(file, {
        folder: 'nextjs_uploads',
      });
      await fs.unlink(file); 
      return res.status(200).json({ url: result.secure_url });
    } catch (error) {
      return res.status(500).json({ message: 'Error uploading to Cloudinary' });
    }
  });
};

export default handler;
