import express from 'express';
import { body } from 'express-validator';
import { createArticle, deleteArticle, getArticleBySlug, listArticles, updateArticle } from '../controllers/articleController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';
import { sanitizeBody } from '../middleware/sanitizeMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

const articleValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('category').notEmpty().withMessage('Category is required'),
  body('content').notEmpty().withMessage('Content is required')
];

router.get('/', listArticles);
router.get('/:slug', getArticleBySlug);

router.post(
  '/',
  requireAdmin,
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'heroImage', maxCount: 1 }
  ]),
  sanitizeBody(['title', 'content', 'metaDescription']),
  articleValidation,
  createArticle
);

router.put(
  '/:id',
  requireAdmin,
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'heroImage', maxCount: 1 }
  ]),
  sanitizeBody(['title', 'content', 'metaDescription']),
  articleValidation,
  updateArticle
);

router.delete('/:id', requireAdmin, deleteArticle);

export default router;

