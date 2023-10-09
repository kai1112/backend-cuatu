const router = require("express").Router()
const {create,view, update, remove} = require("../controllers/role.controller")

router.get("/", view)
router.post("/", create)
router.put("/update/:id", update)
router.delete("/remove/:id", remove)

module.exports = router;