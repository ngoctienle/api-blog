import { ExRouter } from '../configs/app.config'
import { RegisterController } from '../controllers/auth.controller'

/* Register API */
ExRouter.post('/register', RegisterController)

/* SignIn API */
/* ExRouter.post('/login', LoginController) */

export default ExRouter
