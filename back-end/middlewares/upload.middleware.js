import multer from "multer";

let myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = "public/uploads";
    cb(null, path);
  },
  filename: (req, file, cb) => {
    let name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const imageFilter = (req, file, cb) => {
  let parts = file.originalname.split(".");
  let ext = parts.pop();
  let allowed = ["jpg", "jpeg", "png", "bmp", "tiff", "webp", "svz"];

  if (allowed.includes(ext.toLowerCase())) {
    cb(false, true);
  } else {
    cb(true, false);
  }
};
export const uploader = multer({
  storage: myStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
