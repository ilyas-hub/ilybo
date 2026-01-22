import { Router } from 'express'
import * as serviceController from './service.controller.js'
import { authMiddleware, adminMiddleware } from '../../middlewares/index.js'

const router = Router()

router.get('/', serviceController.getServices)
router.get('/:slug', serviceController.getService)

router.post(
  '/',
  authMiddleware,
  adminMiddleware,
  serviceController.createService
)

router.patch(
  '/:id',
  authMiddleware,
  adminMiddleware,
  serviceController.updateService
)

router.delete(
  '/:id',
  authMiddleware,
  adminMiddleware,
  serviceController.deleteService
)

export const serviceRoutes = router
