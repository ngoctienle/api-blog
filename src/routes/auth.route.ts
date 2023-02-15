import { ExRouter } from '../configs/app.config'

import authorization from '../middlewares/auth.middlewares'

import AuthController from '../controllers/auth.controller'

/* Register API */
ExRouter.post('/register', authorization, AuthController.RegisterAction)

/* SignIn API */
ExRouter.post('/login', AuthController.LoginAction)

export default ExRouter
