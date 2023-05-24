import { ConfigEnum, type IServerConfig } from '../../libs/types/src';
import { registerAs } from '@nestjs/config';

export default registerAs(
  ConfigEnum.SERVER,
  (): IServerConfig => ({
    port: parseInt(process.env.BACKEND_APP_PORT, 10) || 5500,
    productName: process.env.PRODUCT_NAME,
    frontendUrl: process.env.FRONTEND_URL,
    backendUrl: process.env.BACKEND_URL,
    authOtpVerificationLink: process.env.AUTH_OTP_VERIFICATION_LINK,
    authLoginLink: process.env.AUTH_LOGIN_LINK,
    admin: {
      userName: process.env.ADMIN_USERNAME || 'admin',
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      firstName: process.env.ADMIN_FIRST_NAME || 'Super',
      lastName: process.env.ADMIN_LAST_NAME || 'Admin',
      password: process.env.ADMIN_PASSWORD || 'adminPassword',
    },
  })
);
