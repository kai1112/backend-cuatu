const Reply = require("../models/reply.model");
const Comment = require("../models/comment.model");
const createLogger = require("../middleware/logger");

const create = async (req, res) => {
  try {
    if (!req.body.content)
      return res.json({ status: 404, message: "content is required!!!" });
    if (!req.body.userID)
      return res.json({ status: 404, message: "userID is required!!!" });
    if (!req.body.CommentID)
      return res.json({ status: 404, message: "CommentID is required!!!" });
    let newReply = await Reply.create({
      name: req.body.content,
      userID: req.body.userID,
      CommentID: req.body.CommentID,
    });
    if (!newReply)
      return res.json({ status: 404, message: "Create Reply failed!" });
    let commentUpdate = Comment.findOne({ id: newReply.CommentID });
    commentUpdate.Reply = JSON.parse(commentUpdate.Reply).push(newReply);
    Comment.update(commentUpdate);
    return res.json({
      status: 200,
      message: "Reply created successfully",
      data: newReply,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

// const view = async (req, res) => {
//     try {
//         let listView = await Reply.find({status: 1})
//         if (!listView) return res.json({ status: 404, message: "Reply not found" })
//         return res.json({ status: 200, message: "Find successful", data: listView })
//     } catch (err) {
//         createLogger.error(err)
//     }
// }

const update = async (req, res) => {
  try {
    let Reply = await Reply.findById(req.params.id);
    if (!Reply)
      return res.json({ status: 202, message: "Reply is not found!!!" });
    if (req.body.content) Reply.content = req.body.content;
    let updateReply = await Reply.findOneAndUpdate(Reply);
    if (!updateReply)
      return res.json({ status: 202, message: "Update Reply is failed!!!" });
    let commentUpdate = Comment.findOne({ id: updateReply.CommentID });
    for (let i = 0; i < JSON.parse(commentUpdate.Reply).length; i++) {
      if (updateReply.id === JSON.parse(commentUpdate.Reply)[i].id) {
        JSON.parse(commentUpdate.Reply)[i].content = updateReply.content;
        JSON.parse(commentUpdate.Reply)[i].updatedAt = updateReply.updatedAt;
      }
    }
    Comment.update(commentUpdate);
    return res.json({
      status: 200,
      message: "Update Reply is successfully",
      data: Reply,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

const remove = async (req, res) => {
  try {
    let Reply = await Reply.findOne({ id: req.body._id });
    if (!Reply)
      return res.json({ status: 202, message: "Reply is not found!!!" });
    Reply.status = 2;
    let updateReply = await Reply.findOneAndUpdate(Reply);
    if (!updateReply)
      return res.json({ status: 202, message: "Remove Reply is failed!!!" });
    let commentUpdate = Comment.findOne({ id: updateReply.CommentID });
    for (let i = 0; i < JSON.parse(commentUpdate.Reply).length; i++) {
      if (updateReply.id === JSON.parse(commentUpdate.Reply)[i].id) {
        JSON.parse(commentUpdate.Reply)[i].splice(i, 1);
      }
    }
    Comment.update(commentUpdate);
    return res.json({
      status: 200,
      message: "Remove Reply is successfully",
      data: Reply,
    });
  } catch (err) {
    createLogger.error(err);
  }
};

module.exports = { create, update, remove };
