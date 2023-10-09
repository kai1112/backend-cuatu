const User = require("../models/user.model");
const Role = require("../models/role.model");
const createLogger = require("../middleware/logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const create = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.json({ status: 404, message: "Email user is already!!!" });
    if (user && user.phone === req.body.phone)
      return res.json({ status: 404, message: "Phone user is already!!!" });
    let role = await Role.findOne({ name: "user" });
    const password = await bcrypt.hash(req.body.password, 10);

    console.log(req.body.dateOfBirth);

    let newUser = await User.create({
      username: req.body.username,
      password: password,
      name: req.body.name,
      dateOfBirth: req.body.dateOfBirth,
      email: req.body.email,
      role: role._id,
    });
    if (!newUser)
      return res.json({ status: 404, message: "Create new User failed!!!" });
    res.json({
      status: 200,
      message: "Register success!!!",
    });
  } catch (err) {
    createLogger.error(err);
  }
};

const view = async (req, res) => {
  try {
    let limit = req.params.limit;
    let skip = req.params.skip;
    if (!limit) {
      limit = 10;
    }
    if (skip) {
      skip = 0;
    }
    let listUser = await User.find()
      .select("name + avatar + role + email")
      .sort({ createdAt: "asc" })
      .skip(skip)
      .limit(limit);
    if (!listUser)
      return res.json({ status: 404, message: "User not found!!!" });
    return res.json({
      status: 200,
      message: "User successfully",
      data: listUser,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

const update = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.json({ status: 404, message: "User not found!!!" });
    if (req.body.name) user.name = req.body.name;
    if (req.body.email) {
      let EmailUser = await User.findOne({ email: req.body.email });
      if (!EmailUser) user.email = req.body.email;
      return res.json({ status: 404, message: "Email is already used!!!" });
    }
    if (req.file) user.avatar = req.file.path;
    let updateUser = await User.findOneAndUpdate(user);
    if (!updateUser)
      return res.json({ status: 404, message: "Update failed!" });
    return res.json({ status: 200, message: "Update successful!" });
  } catch (err) {
    createLogger.error(err);
  }
};

const remove = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.json({ status: 404, message: "User not found!!!" });
    user.status = 2;
    let updateUser = await User.findOneAndUpdate(user);
    if (!updateUser)
      return res.json({ status: 404, message: "Remove user failed!" });
    return res.json({ status: 404, message: "Remove user successfully!!!" });
  } catch (err) {
    createLogger.error(err);
  }
};
module.exports = { create, update, remove, view };
