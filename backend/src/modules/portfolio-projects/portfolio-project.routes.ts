import { Router } from 'express'
import * as portfolioProjectController from './portfolio-project.controller.js'
import { validate, authMiddleware, adminMiddleware } from '../../middlewares/index.js'
import { createPortfolioProjectSchema, updatePortfolioProjectSchema } from './portfolio-project.validation.js'

const router = Router()

// Public routes
router.get('/public', portfolioProjectController.getPublicProjects)
router.get('/public/:slug', portfolioProjectController.getPublicProjectBySlug)

// Admin routes
router.get(
  '/',
  authMiddleware,
  adminMiddleware,
  portfolioProjectController.getAllProjects
)

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  validate(createPortfolioProjectSchema),
  portfolioProjectController.createProject
)

router.patch(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validate(updatePortfolioProjectSchema),
  portfolioProjectController.updateProject
)

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  portfolioProjectController.deleteProject
)

router.patch(
  '/:id/toggle-publish',
  authMiddleware,
  adminMiddleware,
  portfolioProjectController.togglePublish
)

export const portfolioProjectRoutes = router
