const Sale = require('../models/sale.model')
const createLogger = require("../middleware/logger")

const create = async (req, res) => { 
    try {
        if(!req.body.name) return res.json({status: 404, message: "Name is required!!!"})
        if(!req.body.startDate) return res.json({status: 404, message: "start date is required!!!"})
        if(!req.body.endDate) return res.json({status: 404, message: "end date is required!!!"})
        let Sale = await Sale.findOne({ name: req.body.name })
        if (Sale) return res.json({ status: 202, message: "Sale already exists!!!" })
        let newSale = await Sale.create({
            name: req.body.name,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        })
        if (!newSale) return res.json({ status: 404, message: "Create Sale failed!" })
         return res.json({status: 200, message: "Sale created successfully", data: newSale})
    } catch (err) { 
        createLogger.error(err)
    }
}

const view = async (req, res) => { 
    try {
        let listView = await Sale.find({status: 1})
        if (!listView) return res.json({ status: 404, message: "Sale not found" })
        return res.json({ status: 200, message: "Find successful", data: listView })
    } catch (err) {
        createLogger.error(err)
    }
}

const update = async (req, res) => { 
    try {
        let Sale = await Sale.findById(req.params.id)
        if (!Sale) return res.json({ status: 202, message: "Sale is not found!!!" })
        if(req.body.startDate) Sale.startDate = req.body.startDate
        if(req.body.endDate) Sale.endDate = req.body.endDate
        let updateSale = await Sale.findOneAndUpdate(Sale)
        if (!updateSale) return res.json({ status: 202, message: "Update Sale is failed!!!" })
        return res.json({ status: 200, message:"Update Sale is successfully", data: Sale })
    } catch (err) { 
        createLogger.error(err)
    }
}

const remove = async (req, res) => { 
    try {
        let Sale = await Sale.findOne({ id: req.body._id })
        if (!Sale) return res.json({ status: 202, message: "Sale is not found!!!" })
        Sale.status = 2
        let updateSale = await Sale.findOneAndUpdate(Sale)
        if (!updateSale) return res.json({ status: 202, message: "Remove Sale is failed!!!" })
        return res.json({ status: 200, message:"Remove Sale is successfully", data: Sale })
    } catch (err) { 
        createLogger.error(err)
    }
}



module.exports = {create, update, remove, view}