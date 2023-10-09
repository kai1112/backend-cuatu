const Comment = require('../models/comment.model')
const createLogger = require("../middleware/logger")

const create = async (req, res) => { 
    try {
        if(!req.body.content) return res.json({status: 404, message: "content is required!!!"})
        if(!req.body.userID) return res.json({status: 404, message: "userID is required!!!"})
        if(!req.body.ProductID) return res.json({status: 404, message: "ProductID is required!!!"})
        let newComment = await Comment.create({
            name: req.body.content,
            userID: req.body.userID,
            ProductID: req.body.ProductID
        })
        if (!newComment) return res.json({ status: 404, message: "Create Comment failed!" })
         return res.json({status: 200, message: "Comment created successfully", data: newComment})
    } catch (err) { 
        createLogger.error(err)
    }
}

// const view = async (req, res) => { 
//     try {
//         let listView = await Comment.find({status: 1})
//         if (!listView) return res.json({ status: 404, message: "Comment not found" })
//         return res.json({ status: 200, message: "Find successful", data: listView })
//     } catch (err) {
//         createLogger.error(err)
//     }
// }

const update = async (req, res) => { 
    try {
        let Comment = await Comment.findById(req.params.id)
        if (!Comment) return res.json({ status: 202, message: "Comment is not found!!!" })
        if(req.body.content) Comment.content = req.body.content
        let updateComment = await Comment.findOneAndUpdate(Comment)
        if (!updateComment) return res.json({ status: 202, message: "Update Comment is failed!!!" })
        return res.json({ status: 200, message:"Update Comment is successfully", data: Comment })
    } catch (err) { 
        createLogger.error(err)
    }
}

const remove = async (req, res) => { 
    try {
        let Comment = await Comment.findOne({ id: req.body._id })
        if (!Comment) return res.json({ status: 202, message: "Comment is not found!!!" })
        Comment.status = 2
        let updateComment = await Comment.findOneAndUpdate(Comment)
        if (!updateComment) return res.json({ status: 202, message: "Remove Comment is failed!!!" })
        return res.json({ status: 200, message:"Remove Comment is successfully", data: Comment })
    } catch (err) { 
        createLogger.error(err)
    }
}



module.exports = {create, update, remove, view}