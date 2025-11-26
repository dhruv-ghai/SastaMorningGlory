import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    thumbnailUrl: String,
    heroImageUrl: String,
    category: {
      type: String,
      enum: ['National', 'International', 'Jammu & Kashmir', 'Politics', 'Business', 'Technology', 'Entertainment', 'Sports'],
      required: true
    },
    author: { type: String, default: 'Sasta Morning Glory Desk' },
    content: { type: String, required: true },
    keywords: [{ type: String }],
    metaDescription: { type: String },
    tags: [{ type: String }],
    videoUrl: { type: String },
    youtubeId: { type: String },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    publishedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

articleSchema.index({ slug: 1 });
articleSchema.index({ category: 1, publishedAt: -1 });

export const Article = mongoose.model('Article', articleSchema);

