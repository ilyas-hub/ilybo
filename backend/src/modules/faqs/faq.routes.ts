import { Router } from 'express'
import * as faqController from './faq.controller.js'
import { authMiddleware, adminMiddleware } from '../../middlewares/index.js'

const router = Router()

// Public route - get active FAQs
router.get('/', faqController.getActiveFAQs)

// Admin routes
router.get('/admin', authMiddleware, adminMiddleware, faqController.getAllFAQs)
router.post('/', authMiddleware, adminMiddleware, faqController.createFAQ)
router.patch('/:id', authMiddleware, adminMiddleware, faqController.updateFAQ)
router.delete('/:id', authMiddleware, adminMiddleware, faqController.deleteFAQ)

export const faqRoutes = router
