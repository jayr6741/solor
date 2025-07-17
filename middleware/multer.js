const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");

const imagePath = "./uploads/images";
const videoPath = "./uploads/videos";

[imagePath, videoPath].forEach((folder) => {
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
});

const isImage = (mimetype) => mimetype.startsWith("image/");
const isVideo = (mimetype) =>
  ["video/mp4", "video/webm", "video/ogg", "video/x-matroska"].includes(mimetype);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (isImage(file.mimetype)) cb(null, imagePath);
    else if (isVideo(file.mimetype)) cb(null, videoPath);
    else cb(new Error("Unsupported file type"), false);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext);
    const safeName = base.replace(/[^a-zA-Z0-9-_]/g, "_");
    const unique = Date.now();
    cb(null, `${safeName}${ext}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (isImage(file.mimetype) || isVideo(file.mimetype)) cb(null, true);
  else cb(new Error("Only image and video files are allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
});

const convertToWebp = async (req, res, next) => {
  if (!req.file || !isImage(req.file.mimetype)) return next();

  const originalPath = path.join(imagePath, req.file.filename);
  const webpFilename = req.file.filename.replace(/\.\w+$/, "") + ".webp";
  const webpPath = path.join(imagePath, webpFilename);

  try {
    await sharp(originalPath)
      .webp({ quality: 80 })
      .toFile(webpPath);

    await fs.promises.unlink(originalPath);

    req.file.filename = webpFilename;
    req.file.path = webpPath;
    req.file.mimetype = "image/webp";
    req.file.url = `${req.protocol}://${req.get("host")}/uploads/images/${webpFilename}`;

    next();
  } catch (err) {
    console.error("WebP conversion failed:", err);
    return res.status(500).json({ message: "Image conversion failed" });
  }
};

module.exports = {
  upload,
  convertToWebp,
};
