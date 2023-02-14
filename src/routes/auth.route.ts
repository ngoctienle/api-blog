import { ExRouter } from '../configs/app.config'
import AuthController from '../controllers/auth.controller'
import authorization from '../middlewares/auth.middlewares'

/* Register API */
ExRouter.post('/register', authorization, AuthController.RegisterAction)

/* SignIn API */
ExRouter.post('/login', AuthController.LoginAction)

export default ExRouter
