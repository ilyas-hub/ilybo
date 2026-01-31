import { Router } from 'express'
import * as pageController from './page.controller.js'
import { validate, authMiddleware, adminMiddleware } from '../../middlewares/index.js'
import { createPageSchema, updatePageSchema } from './page.validation.js'

const router = Router()

// Public route - get published page by slug
router.get('/public/:slug', pageController.getPageBySlug)

// Admin routes
router.get('/', authMiddleware, adminMiddleware, pageController.getPages)
router.get('/:id', authMiddleware, adminMiddleware, pageController.getPage)
router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  validate(createPageSchema),
  pageController.createPage
)
router.patch(
  '/:id',
  authMiddleware,
  adminMiddleware,
  validate(updatePageSchema),
  pageController.updatePage
)
router.delete('/:id', authMiddleware, adminMiddleware, pageController.deletePage)
router.post('/:id/publish', authMiddleware, adminMiddleware, pageController.publishPage)
router.get('/:id/versions', authMiddleware, adminMiddleware, pageController.getVersionHistory)
router.post(
  '/:id/revert/:version',
  authMiddleware,
  adminMiddleware,
  pageController.revertToVersion
)

export const pageRoutes = router
