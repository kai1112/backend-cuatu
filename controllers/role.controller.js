const Role = require('../models/role.model')
const createLogger = require("../middleware/logger")

const create = async (req, res) => { 
    try {
        if(!req.body.name) return res.json({status: 404, message: "Name is required!!!"})
        let role = await Role.findOne({ name: req.body.name })
        if (role) return res.json({ status: 202, message: "Role already exists!!!" })
        let newRole = await Role.create({
            name: req.body.name,
        })
        if (!newRole) return res.json({ status: 404, message: "Create role failed!" })
         return res.json({status: 200, message: "Role created successfully", data: newRole})
    } catch (err) { 
        createLogger.error(err)
    }
}

const view = async (req, res) => { 
    try {
        let listView = await Role.find()
        if (!listView) return res.json({ status: 404, message: "Role not found" })
        return res.json({ status: 200, message: "Find successful", data: listView })
    } catch (err) {
        createLogger.error(err)
    }
}

const update = async (req, res) => { 
    try {
        console.log(req.params.id)
        let role = await Role.findById(req.params.id)
        if (!role) return res.json({ status: 202, message: "Role is not found!!!" })
        if(req.body.name) role.name = req.body.name
        if(req.body.status) role.status = req.body.status
        let updateRole = await Role.findOneAndUpdate(role)
        if (!updateRole) return res.json({ status: 202, message: "Update role is failed!!!" })
        return res.json({ status: 200, message:"Update role is successfully", data: role })
    } catch (err) { 
        createLogger.error(err)
    }
}

const remove = async (req, res) => { 
    try {
        let role = await Role.findOne({ id: req.body._id })
        if (!role) return res.json({ status: 202, message: "Role is not found!!!" })
        role.status = 2
        let updateRole = await Role.findOneAndUpdate(role)
        if (!updateRole) return res.json({ status: 202, message: "Remove role is failed!!!" })
        return res.json({ status: 200, message:"Remove role is successfully", data: role })
    } catch (err) { 
        createLogger.error(err)
    }
}
module.exports = {create, update, remove, view}