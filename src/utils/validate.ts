import { cleanEnv } from 'envalid'
import { str, port } from 'envalid/dist/validators'

const envConfig = cleanEnv(process.env, {
  MONGODB_URL: str(),
  PORT: port()
})

export default envConfig
