const router = require("express").Router();
const {
  create,
  view,
  update,
  remove,
} = require("../controllers/sale.controller");
const { checkRoleAdmin } = require("../middleware/auth");

router.get("/", view);
router.post("/",checkRoleAdmin, create);
router.put("/update/:id",checkRoleAdmin, update);
router.delete("/remove/:id",checkRoleAdmin, remove);

module.exports = router;
