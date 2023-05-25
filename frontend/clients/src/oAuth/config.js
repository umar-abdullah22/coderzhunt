const BASE_URL = process.env.REACT_APP_BASE_API_URL ?? 'https://coderzhunt-backend-zizle.vercel.app/api';

const APIS = {
    CHECK_EMAILS: `${BASE_URL}/auth/users`,
    CHECK_USER: `${BASE_URL}/customer/email`,
};
export default APIS;