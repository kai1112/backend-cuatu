const Product = require("../models/product.model");
const Comment = require("../models/comment.model");
const createLogger = require("../middleware/logger");

const create = async (req, res) => {
  try {
    if (!req.body.name)
      return res.json({ status: 404, message: "Name is required!!!" });
    if (!req.body.description)
      return res.json({ status: 404, message: "description is required!!!" });
    if (!req.body.price)
      return res.json({ status: 404, message: "price is required!!!" });
    if (!req.body.amount)
      return res.json({ status: 404, message: "amount is required!!!" });
    if (!req.body.brand)
      return res.json({ status: 404, message: "brand is required!!!" });
    let Product = await Product.findOne({ name: req.body.name });
    if (Product)
      return res.json({ status: 202, message: "Product already exists!!!" });
    if (req.files["avatar"] == undefined) {
      res.json({
        message: "product need description avatar",
        status: 404,
      });
    }
    if (req.files["backgroud_avatar"] == undefined) {
      res.json({
        message: "product has no backgroud-avatar",
        status: 404,
      });
    }
    let img = [];
    for (let i = 0; i < req.files["backgroud_avatar"].length; i++) {
      img.push("/" + req.files["backgroud_avatar"][i].path);
    }
    let newProduct = await Product.create({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      amount: req.body.amount,
      brand: req.body.brand,
      avatar: "/" + req.files["avatar"][0].path,
      backgroud_avatar: JSON.stringify(img),
    });
    if (!newProduct)
      return res.json({ status: 404, message: "Create product failed!" });
    return res.json({
      status: 200,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

// view product
const view = async (req, res) => {
  try {
    if (req.params.status === null) req.params.status = 1;
    let listView = await Product.find({ status: req.query.status });
    if (!listView)
      return res.json({ status: 404, message: "Product not found" });
    return res.json({
      status: 200,
      message: "Find successful",
      data: listView,
    });
  } catch (err) {
    createLogger.error(err);
  }
};
// view details product
const viewDetailsProduct = async (req, res) => {
  try {
    let viewDetails = await Product.find({ id: req.params.id });
    if (!viewDetails)
      return res.json({ status: 404, message: "Product not found" });
    let Comments = await Comment.find({ productID: viewDetails.id });
    return res.json({
      status: 200,
      message: "Find successful",
      data: listView,
      Comments,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

// update product
const update = async (req, res) => {
  try {
    let Product = await Product.findById(req.params.id);
    if (!Product)
      return res.json({ status: 202, message: "Product is not found!!!" });
    if (req.body.name) Product.name = req.body.name;
    if (req.body.description) Product.description = req.body.description;
    if (req.body.brand) Product.brand = req.body.brand;
    if (req.body.price) Product.price = req.body.price;
    if (req.body.amount) Product.amount = req.body.amount;
    if (req.body.saleID) Product.saleID = req.body.saleID;
    if (req.files["avatar"]) Product.avatar = "/" + req.files["avatar"][0].path;
    if (Product.amount == 0) Product.status = 3;
    let updateProduct = await Product.findOneAndUpdate(Product);
    if (!updateProduct)
      return res.json({ status: 202, message: "Update Product is failed!!!" });
    return res.json({
      status: 200,
      message: "Update Product is successfully",
      data: Product,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

const findProduct = async (req, res) => {
  try {
    let product = Product.find({
      name: { $regex: req.query.name, $options: "i" },
    }).populate("brand");
    if (!product) {
      return res.json({ status: 404, message: "Product not found" });
    }
    return res.json({ status: 200, data: product });
  } catch (err) {
    createLogger.error(err);
  }
};

const remove = async (req, res) => {
  try {
    let Product = await Product.findOne({ id: req.body._id });
    if (!Product)
      return res.json({ status: 202, message: "Product is not found!!!" });
    Product.status = 2;
    let updateProduct = await Product.findOneAndUpdate(Product);
    if (!updateProduct)
      return res.json({ status: 202, message: "Remove Product is failed!!!" });
    return res.json({
      status: 200,
      message: "Remove Product is successfully",
      data: Product,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

module.exports = {
  create,
  update,
  remove,
  view,
  viewDetailsProduct,
  findProduct,
};
