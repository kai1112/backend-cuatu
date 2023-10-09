const mongoose = require("./dbConnection");

const OrderSchema = mongoose.Schema(
  {
    userId: String,
    status: { type: Number, enum: [1, 2], default: 1 }, // 1 là bình thường, 2 là bị xoá
    payment: { type: Number, enum: [1, 2], default: 1 }, //1 thanh toán thẻ, 2 là tiền mặt
    price: Number,
    type: { type: Number, enum: [1, 2], default: 1 }, // 1 là thanh toán thành công, 2 là thanh toán thất bại
  },
  { collection: "Order", timestamps: true }
);

const OrderModel = mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
