import express from 'express';
import { 
  submitContact, 
  getContacts, 
  getContact, 
  deleteContact, 
  markAsRead 
} from '../controllers/contactController.js';
import { validateContactForm } from '../middlewares/validateRequest.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// POST /api/contact - Submit contact form (PUBLIC)
router.post('/', validateContactForm, submitContact);

// GET /api/contact/admin/all - Get all contacts (ADMIN ONLY)
router.get('/admin/all', authenticateToken, getContacts);

// GET /api/contact/:id - Get single contact (ADMIN ONLY)
router.get('/:id', authenticateToken, getContact);

// DELETE /api/contact/:id - Delete contact (ADMIN ONLY)
router.delete('/:id', authenticateToken, deleteContact);

// PATCH /api/contact/:id/read - Mark as read (ADMIN ONLY)
router.patch('/:id/read', authenticateToken, markAsRead);

export default router;
