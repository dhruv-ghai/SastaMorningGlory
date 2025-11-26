import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    article: { type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true },
    username: { type: String, required: true, trim: true },
    text: { type: String, required: true },
    approved: { type: Boolean, default: false }
  },
  { timestamps: true }
);

commentSchema.index({ article: 1, approved: 1, createdAt: -1 });

export const Comment = mongoose.model('Comment', commentSchema);

