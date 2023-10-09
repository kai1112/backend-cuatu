const Brand = require('../models/brand.model')
const createLogger = require("../middleware/logger")

const create = async (req, res) => { 
    try {
        if(!req.body.name) return res.json({status: 404, message: "Name is required!!!"})
        let Brand = await Brand.findOne({ name: req.body.name })
        if (Brand) return res.json({ status: 202, message: "Brand already exists!!!" })
        let newBrand = await Brand.create({
            name: req.body.name,
        })
        if (!newBrand) return res.json({ status: 404, message: "Create Brand failed!" })
         return res.json({status: 200, message: "Brand created successfully", data: newBrand})
    } catch (err) { 
        createLogger.error(err)
    }
}

// user find brand dang hoat dong
const view = async (req, res) => { 
    try {
        let listView = await Brand.find({status: 1})
        if (!listView) return res.json({ status: 404, message: "Brand not found" })
        return res.json({ status: 200, message: "Find successful", data: listView })
    } catch (err) {
        createLogger.error(err)
    }
}

// user update product
const update = async (req, res) => { 
    try {
        let Brand = await Brand.findById(req.params.id)
        if (!Brand) return res.json({ status: 202, message: "Brand is not found!!!" })
        if(req.body.name) Brand.name = req.body.name
        let updateBrand = await Brand.findOneAndUpdate(Brand)
        if (!updateBrand) return res.json({ status: 202, message: "Update Brand is failed!!!" })
        return res.json({ status: 200, message:"Update Brand is successfully", data: Brand })
    } catch (err) { 
        createLogger.error(err)
    }
}


// xoa brand (chinh sua trang thai tu 1 thanh 2)
const remove = async (req, res) => { 
    try {
        let Brand = await Brand.findOne({ id: req.body._id })
        if (!Brand) return res.json({ status: 202, message: "Brand is not found!!!" })
        Brand.status = 2
        let updateBrand = await Brand.findOneAndUpdate(Brand)
        if (!updateBrand) return res.json({ status: 202, message: "Remove Brand is failed!!!" })
        return res.json({ status: 200, message:"Remove Brand is successfully", data: Brand })
    } catch (err) { 
        createLogger.error(err)
    }
}


module.exports = {create, update, remove, view}