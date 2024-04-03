const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require('cors');
const app = express();

// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.post("/upload", (req, res) => {
  const imageDataURL = req.body.image;

  const base64Data = imageDataURL.replace(/^data:image\/jpeg;base64,/, "");
console.log(base64Data);
  const filename = `image_${Date.now()}.jpeg`;

  const imagePath = path.join('S:', 'use camara with angular', 'uploads',filename);

  fs.writeFile(imagePath, base64Data, "base64", (err) => {
    if (err) {
      console.error("Error saving image:", err);
      return res.status(500).json({ error: "Failed to save image" });
    }
    console.log("Image saved successfully");
    res.json({ success: true });
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
