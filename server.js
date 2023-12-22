// server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
const app = express();
const PORT = process.env.PORT || 5000;
const multer = require('multer'); // Import multer module


app.use(cors());

const imagesDirectory = path.join(__dirname, '/data'); // Replace 'your_photos_folder' with the actual folder name

app.use('/images', express.static(imagesDirectory));

const getImageDetails = async (imageId) => {
  // Implement logic to retrieve image details based on imageId
  // For simplicity, using dummy data
  return {
    id: imageId
  };
};

app.get('/api/images', async (_req, res) => {
  try {
    const imageFiles = await fs.readdir(imagesDirectory);
    const images = imageFiles.map((fileName, index) => ({
      id: index + 1,
      name: fileName,
    }));
    res.json(images);
  } catch (error) {
    console.error('Error reading image files:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/images/:id', async (req, res) => {
  const imageId = parseInt(req.params.id);
  try {
    const imageDetails = await getImageDetails(imageId);
    res.json(imageDetails);
  } catch (error) {
    console.error('Error fetching image details:', error);
    res.status(404).json({ message: 'Image not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

