import { Router } from 'express'
import * as testimonialController from './testimonial.controller.js'
import { authMiddleware, adminMiddleware } from '../../middlewares/index.js'

const router = Router()

// Public route - get active testimonials
router.get('/', testimonialController.getActiveTestimonials)

// Admin routes
router.get('/admin', authMiddleware, adminMiddleware, testimonialController.getAllTestimonials)
router.post('/', authMiddleware, adminMiddleware, testimonialController.createTestimonial)
router.patch('/:id', authMiddleware, adminMiddleware, testimonialController.updateTestimonial)
router.delete('/:id', authMiddleware, adminMiddleware, testimonialController.deleteTestimonial)

export const testimonialRoutes = router
