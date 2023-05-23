export interface IServerConfigAdmin {
  email: string
  userName?: string
  firstName?: string
  lastName?: string
  password: string
}

export interface IServerConfig {
  port: number
  admin: IServerConfigAdmin
  productName: string
  frontendUrl: string
  backendUrl: string
  authOtpVerificationLink: string
  authLoginLink: string
}

export enum ServerConfigEnum {
  PORT = 'port',
  ADMIN = 'admin',
  PRODUCT_NAME = 'productName',
  FRONTEND_URL = 'frontendUrl',
  BACKEND_URL = 'backendUrl',
  AUTH_OTP_VERIFICATION_LINK = 'authOtpVerificationLink',
  AUTH_LOGIN_LINK = 'authLoginLink',
}
