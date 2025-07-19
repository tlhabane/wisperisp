export const DEV_API_URL = "http://localhost/wisperisp/backend";
export const API_URL = "https://dev.kreativware.co.za/api";
export const MODE = process.env.NODE_ENV || 'development';
export const BASE_URL = MODE === 'development' ? DEV_API_URL : API_URL;
