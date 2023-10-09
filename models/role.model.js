const mongoose = require("./dbConnection");

const RoleSchema = mongoose.Schema(
  {
    name: String,
    status: { type: Number, enum: [1, 2], default: 1 }, // 1 là hoạt động, 2 là ban
  },
  { collection: "Role", timestamps: true }
);

const RoleModel = mongoose.model('Role', RoleSchema);

module.exports  = RoleModel