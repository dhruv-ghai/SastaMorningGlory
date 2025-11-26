import express from 'express';
import { body } from 'express-validator';
import {
  approveComment,
  createComment,
  deleteComment,
  listApprovedComments,
  listPendingComments
} from '../controllers/commentController.js';
import { requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router.get('/public/:articleId', listApprovedComments);

router.get('/pending', requireAdmin, listPendingComments);

router.post(
  '/:articleId',
  body('username').trim().isLength({ min: 2 }).withMessage('Username required'),
  body('text').trim().isLength({ min: 5 }).withMessage('Comment too short'),
  createComment
);
router.patch('/:id/approve', requireAdmin, approveComment);
router.delete('/:id', requireAdmin, deleteComment);

export default router;

