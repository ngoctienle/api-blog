export type RegisterBodyRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  role?: string
}
