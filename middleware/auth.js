const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const logger = require("./logger");
module.exports.checkRoleAdmin = async (req, res, next) => {
    try {
        if (req.user.role === 'admin') {
            next();
        } else {
            res.json({status: 404, message: 'Role not allowed!!!'})
        }
    } catch (err) {
        logger.error(error)
    }
}

module.exports.checkRoleUser = async (req, res, next) => {
    try {
        if (req.user.role === 'user') {
            next();
        } else {
            res.json({status: 404, message: 'Role not allowed!!!'})
        }
    } catch (err) {
        logger.error(error)
    }
}

module.exports.checkToken = async (req, res, next) => {
    let searchTokenUser
    try {
        let tokken = req.cookies.user
        searchTokenUser = await UserModel.findOne(
            { tokken: tokken }
        )
        if (searchTokenUser) {
            let id = jwt.verify(tokken, 'khai')
            if (id) {
                delete searchTokenUser._doc.token
                delete searchTokenUser._doc.password
                req.user = searchTokenUser
                next()
            }
        } else {
            return res.json({ status: 404, message:  "Token is not available!!!" })
        }
    } catch (error) {
        if (error.message == 'jwt expired') {
            res.json({status: 404,  message: 'JWT expired!!!!' })
        } else {
            logger.error(error)
        }
    }
}
