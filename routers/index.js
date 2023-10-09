const router = require("express").Router();

// using router role
const Role = require("./role.router");
router.use("/role", Role);

// using router User
const User = require("./user.route");
router.use("/user", User);


module.exports = router;
