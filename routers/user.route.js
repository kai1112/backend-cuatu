const router = require("express").Router();

const {
  create,
  view,
  update,
  remove,
} = require("../controllers/user.controller");
const { checkRoleAdmin } = require("../middleware/auth");

router.get("/", view);
router.post("/",checkRoleAdmin, create);
router.put("/update/:id", update);
router.delete("/remove/:id", remove);

module.exports = router;
