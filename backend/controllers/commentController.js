import { validationResult } from 'express-validator';
import { Comment } from '../models/Comment.js';

export const createComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { articleId } = req.params;
  const comment = await Comment.create({
    article: articleId,
    username: req.body.username,
    text: req.body.text
  });

  res.status(202).json({ message: 'Comment submitted for review', commentId: comment.id });
};

export const listApprovedComments = async (req, res) => {
  const { articleId } = req.params;
  const comments = await Comment.find({ article: articleId, approved: true }).sort({ createdAt: -1 });
  res.json(comments);
};

export const listPendingComments = async (req, res) => {
  const comments = await Comment.find({ approved: false }).populate('article', 'title slug');
  res.json(comments);
};

export const approveComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndUpdate(id, { approved: true }, { new: true });
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  res.json(comment);
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndDelete(id);
  if (!comment) return res.status(404).json({ message: 'Comment not found' });
  res.status(204).end();
};

