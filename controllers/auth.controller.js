const UserModel = require("../models/user.mode");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// login
module.exports.login = async (req, res) => {
  try {
    const data = await UserModel.findOne({
      email: req.body.email,
    });
    if (data) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        data.password
      );
      if (checkPassword) {
        const UserID = data._id;
        const token = jwt.sign(`${UserID}`, "kai");
        await UserModel.updateOne({ _id: data._id }, { tokken: token });
        res.cookie("user", token, {
          expires: new Date(Date.now() + 60 * 60 * 24 * 60),
        });
        let user = await UserModel.findOne({ email: req.body.email }).populate(
          "roleID"
        );
        delete user.password;
        res.json({ data: user });
      } else {
        res.json({ message: " incorrect password" });
      }
    } else {
      res.json({ message: "login failed", status: 400, err: false });
    }
  } catch (err) {
    res.json({ status: 500, data: err });
  }
};

// register
module.exports.register = async (req, res) => {
  try {
    let user = await UserModel.findOne({ email: req.body.email });
    if (user) {
      res.json({
        status: 400,
        message: "Email already exists",
      });
    } else {
      // mã hoá password
      const password = await bcrypt.hash(req.body.password, 10);
      // create user
      let newUser = await UserModel.create({
        username: req.body.username,
        password: password,
        name: req.body.name,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        roleID: req.body.roleID,
      });
      res.json({
        message: "register success",
        status: 200,
        data: newUser,
      });
    }
  } catch (err) {
    res.json(err);
  }
};
