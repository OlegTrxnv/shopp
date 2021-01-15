import path from "path";
import { Router } from "express";
import multer from "multer";

const router = Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // null for message in case upload fails, use "uploads" folder in root
    cb(null, "uploads");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  // RegExp testing
  const filetypes = /jpg|jpeg|png/;
  const extnameIsValid = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetypeIsValid = filetypes.test(file.mimetype);

  if (extnameIsValid && mimetypeIsValid) {
    return cb(null, true);
  } else {
    cb("Images only!");
  }
}

// FormData append field name is "image"
router.post(
  "/",
  multer({ storage, fileFilter }).single("image"),
  (req, res) => {
    const imageUrlFromPath = "/" + req.file.path.replace(/\\/g, "/");
    res.send(imageUrlFromPath);
  }
);

export default router;
