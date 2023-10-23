const router = require("express").Router();

// using router role
const Role = require("./role.route");
router.use("/role", Role);

// // using router User
const User = require("./user.route");
router.use("/user", User);

const Brand = require("./brand.route");
router.use("/brand", Brand);

const Comment = require("./comment.route");
router.use("/comment", Comment);

// const Order = require("./order.route");
// router.use("/order", Order);

const Product = require("./product.route");
router.use("/product", Product);

const Reply = require("./reply.route");
router.use("/reply", Reply);

// // const Role = require("./role.route");
// // router.use("/role", Role);

// const Sale = require("./sale.route");
// router.use("/sale", Sale);

const authRoute = require("./auth.route");
router.use("/auth", authRoute);

module.exports = router;
