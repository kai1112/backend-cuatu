const router = require("express").Router();
const { create, update, remove } = require("../controllers/reply.controller");
const { checkToken } = require("../middleware/auth");

// router.get("/", view)
router.post("/", checkToken, create);
router.put("/update/:id", checkToken, update);
router.delete("/remove/:id", checkToken, remove);

module.exports = router;
