const mongoose = require("./dbConnection");

const CommentSchema = mongoose.Schema(
  {
    content: String,
    userID: {
      type: String,
      ref: "User",
      required: true,
    },
    productID: {
      type: String,
      ref: "Product",
      required: true,
    },
    status: { type: Number, enum: [1, 2], default: 1 }, // 1 là bình thường, 2 là bị xoá
    reply: { type: String, default: "" },
  },
  { collection: "Comment", timestamps: true }
);

const CommentModel = mongoose.model("Comment", CommentSchema);

module.exports = CommentModel;
