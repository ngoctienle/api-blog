export type RegisterBodyRequest = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

export type LoginBodyRequest = {
  email: string
  password: string
}
