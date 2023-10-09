const mongoose = require("./dbConnection");

const SaleSchema = mongoose.Schema(
  {
    name: String,
    startDate: Number,
    endDate: Number,
    price: Number,
    type: { type: Number, enum: [1, 2], default: 1 }, // 1 là tiền, 2 là %
    status: { type: Number, enum: [1, 2], default: 1 }, // 1 là cong thời gian, 2 là hết hạn
  },
  { collection: "Sale", timestamps: true }
);

const SaleModel = mongoose.model("Sale", SaleSchema);

module.exports = SaleModel;
