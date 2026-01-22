import { Router } from 'express'
import * as userController from './user.controller.js'
import { authMiddleware, adminMiddleware } from '../../middlewares/index.js'

const router = Router()

router.use(authMiddleware)
router.use(adminMiddleware)

router.get('/', userController.getUsers)
router.get('/:id', userController.getUser)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export const userRoutes = router
