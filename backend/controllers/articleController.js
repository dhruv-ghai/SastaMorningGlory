import slugify from 'slugify';
import { validationResult } from 'express-validator';
import { Article } from '../models/Article.js';

export const listArticles = async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  const query = {};
  if (category) query.category = category;

  const [data, total] = await Promise.all([
    Article.find(query)
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit)),
    Article.countDocuments(query)
  ]);

  res.json({ data, total, page: Number(page), limit: Number(limit) });
};

export const getArticleBySlug = async (req, res) => {
  const { slug } = req.params;
  let article = await Article.findOne({ slug });
  if (!article && slug.match(/^[0-9a-fA-F]{24}$/)) {
    article = await Article.findById(slug);
  }
  if (!article) return res.status(404).json({ message: 'Article not found' });
  res.json(article);
};

export const createArticle = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const body = { ...req.body };
  if (!body.slug) {
    body.slug = slugify(body.title, { lower: true, strict: true });
  }

  if (req.files?.thumbnail?.[0]) {
    body.thumbnailUrl = `/uploads/${req.files.thumbnail[0].filename}`;
  }
  if (req.files?.heroImage?.[0]) {
    body.heroImageUrl = `/uploads/${req.files.heroImage[0].filename}`;
  }

  const article = await Article.create(body);
  res.status(201).json(article);
};

export const updateArticle = async (req, res) => {
  const { id } = req.params;
  const body = { ...req.body };

  if (body.title && !body.slug) {
    body.slug = slugify(body.title, { lower: true, strict: true });
  }

  if (req.files?.thumbnail?.[0]) {
    body.thumbnailUrl = `/uploads/${req.files.thumbnail[0].filename}`;
  }
  if (req.files?.heroImage?.[0]) {
    body.heroImageUrl = `/uploads/${req.files.heroImage[0].filename}`;
  }

  const article = await Article.findByIdAndUpdate(id, body, { new: true });
  if (!article) return res.status(404).json({ message: 'Article not found' });
  res.json(article);
};

export const deleteArticle = async (req, res) => {
  const { id } = req.params;
  const article = await Article.findByIdAndDelete(id);
  if (!article) return res.status(404).json({ message: 'Article not found' });
  res.status(204).end();
};

