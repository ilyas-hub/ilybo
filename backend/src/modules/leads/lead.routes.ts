import { Router } from 'express'
import * as leadController from './lead.controller.js'
import { authMiddleware, adminMiddleware, validate } from '../../middlewares/index.js'
import { z } from 'zod'

const router = Router()

const createLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

router.post('/', validate(createLeadSchema), leadController.createLead)

router.get('/', authMiddleware, adminMiddleware, leadController.getLeads)
router.get('/stats', authMiddleware, adminMiddleware, leadController.getLeadStats)
router.get('/:id', authMiddleware, adminMiddleware, leadController.getLead)
router.patch('/:id', authMiddleware, adminMiddleware, leadController.updateLead)
router.delete('/:id', authMiddleware, adminMiddleware, leadController.deleteLead)

export const leadRoutes = router
