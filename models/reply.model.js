const mongoose = require("./dbConnection");

const ReplySchema = mongoose.Schema(
  {
    content: String,
    userID: String,
    CommentID: String,
    status: { type: Number, enum: [1, 2], default: 1 }, // 1 là bình thường, 2 là bị xoá
  },
  { collection: "Reply", timestamps: true }
);

const ReplyModel = mongoose.model("Reply", ReplySchema);

module.exports = ReplyModel;
