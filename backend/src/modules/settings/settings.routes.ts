import { Router } from 'express'
import * as settingsController from './settings.controller.js'
import { validate, authMiddleware, adminMiddleware } from '../../middlewares/index.js'
import { updateSettingsSchema } from './settings.validation.js'

const router = Router()

// Public route - get settings
router.get('/', settingsController.getSettings)

// Admin route - update settings
router.patch(
  '/',
  authMiddleware,
  adminMiddleware,
  validate(updateSettingsSchema),
  settingsController.updateSettings
)

export const settingsRoutes = router
