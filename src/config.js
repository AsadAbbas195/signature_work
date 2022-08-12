const Path = {
  signIn: "/",
  dashboard: "/app/dashboard",
  forgetPassword: "/app/forget-password",
  resetPassword: "/app/reset-password",
  requestSecret: "/app/request-secret"
};
var api = process.env.NODE_ENV === "production" ?
  "" :
  "";

const APP_SETTINGS = {
  API: {
    URL: api
  }
};
const StrictMode = process.env.NODE_ENV === "production" ? false : true;
const API_PATH = {
  signIn: `${APP_SETTINGS.API.URL}/users/sign_in`,
  logout: `${APP_SETTINGS.API.URL}/users`,
  requestSignature: `${APP_SETTINGS.API.URL}/signature_managers`,
  getUserDetail: `${APP_SETTINGS.API.URL}/signature_managers/`,
  forgetPassword: `${APP_SETTINGS.API.URL}/user/forget_password`,
  updatePassword: `${APP_SETTINGS.API.URL}/user/password_update`,
  requestSecretKey: `${APP_SETTINGS.API.URL}/email_secret_key?email=`,
  updateGoogleAut: `${APP_SETTINGS.API.URL}/google_authentications`,
  revokeGoogleAut: `${APP_SETTINGS.API.URL}/google_revoke_auth`,
};
export { Path, APP_SETTINGS, API_PATH, StrictMode };
