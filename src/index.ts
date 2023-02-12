import { ExApp } from './configs/app.config'

import authRoute from './routes/auth.route'

/* ExpressApp */
ExApp.use('/api/auth', authRoute)
