const mongoose = require("./dbConnection");

const ProductSchema = mongoose.Schema(
  {
    name: String,
    brand: String,
    status: { type: Number, enum: [1, 2, 3], default: 1 }, // 1 là bình thường, 2 là bị xoá, 3 là hết hàng
    description: String,
    avatar: String,
    backgroud_avatar: String,
    price: Number,
    amount: Number,
    saleID: { type: String, ref: "Sale", default: null },
  },
  { collection: "Product", timestamps: true }
);

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
