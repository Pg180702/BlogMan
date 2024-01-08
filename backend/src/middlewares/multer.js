const multer = require("multer");
//read docs on multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    //try doing console log on file
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
