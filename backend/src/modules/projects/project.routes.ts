import { Router } from 'express'
import * as projectController from './project.controller.js'
import { validate, authMiddleware, adminMiddleware } from '../../middlewares/index.js'
import {
  createProjectSchema,
  updateProjectSchema,
  createFromLeadSchema,
} from './project.validation.js'

const router = Router()

// All project routes require admin auth
router.use(authMiddleware, adminMiddleware)

router.get('/', projectController.getProjects)
router.get('/stats', projectController.getProjectStats)
router.get('/:id', projectController.getProject)
router.post('/', validate(createProjectSchema), projectController.createProject)
router.post(
  '/from-lead/:leadId',
  validate(createFromLeadSchema),
  projectController.createFromLead
)
router.patch('/:id', validate(updateProjectSchema), projectController.updateProject)
router.delete('/:id', projectController.deleteProject)

export const projectRoutes = router
