const mongoose = require("./dbConnection");

const UserSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    roleID: String,
    phone: Number,
    dateOfBirth: Date,
    status: { type: Number, enum: [1, 2], default: 1 }, // 1 là hoạt động, 2 là ban
    code: String,
    tokken: String,
    avatar: {
      type: String,
      default:
        "public/static/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg",
    },
  },
  { collection: "User", timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;
