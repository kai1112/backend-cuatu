const router = require("express").Router();
const {
  create,
  view,
  update,
  remove,
} = require("../controllers/role.controller");
const { checkRoleAdmin } = require("../middleware/auth");

router.get("/", checkRoleAdmin, view);
router.post("/", checkRoleAdmin, create);
router.put("/:id", checkRoleAdmin, update);
router.delete("/:id", checkRoleAdmin, remove);

module.exports = router;
