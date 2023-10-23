const router = require("express").Router();
const {
  create,
  view,
  update,
  remove,
  findProduct,
  viewDetailsProduct,
} = require("../controllers/product.controller");
const multer = require("multer");
const { checkRoleAdmin } = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const arr = file.originalname.split(".");
    const ext = arr[arr.length - 1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + `.${ext}`);
  },
});
const upload = multer({ storage: storage });

var cpUpload = upload.fields([
  { name: "avatar", maxCount: 1 },
  { name: "backgroud_avatar", maxCount: 5 },
]);

router.get("/", view);
router.get("/find", findProduct);
router.get("/:id", viewDetailsProduct);
router.post("/", checkRoleAdmin, cpUpload, create);
router.put("/update/:id", checkRoleAdmin, update);
router.delete("/remove/:id", checkRoleAdmin, remove);

module.exports = router;
