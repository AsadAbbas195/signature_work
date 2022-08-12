import axios from "axios";
import { Path, API_PATH } from "../../../config";
import router from "../../../router";
const userAuthentication = {
  state: {
    user: [],
    user_email: null,
    auth_data: {}
  },
  getters: {
    userData: state => {
      return state.user;
    },
    userEmail: state => {
      return state.user_email;
    },
    AuthData: state => {
      return state.auth_data;
    }
  },
  mutations: {
    setUserData: (state, user) => {
      state.user = [user.user, state.user];
    },
    setAuthData: (state, AuthData) => {
      state.auth_data = [AuthData, state.auth_data];
    },
    removeUserData: state => {
      state.user = null;
      router.push(Path.signIn);
    },
    setUserEmail: (state, email) => {
      state.user_email = null;
      state.user_email = [email, state.user_email];
    },
    removeUserEmail: state => {
      state.user_email = null;
      // router.push(Path.signIn);
    }
  },
  actions: {
    setUser: (context, user) => {
      user.errors = [];
      if (user.email && user.password) {
        user.loading = true;
        const data = {
          sign_in: {
            email: user.email,
            password: user.password
          }
        };
        axios.post(API_PATH.signIn, data).then(
          response => {
            user.loading = false;
            let auth = {
              google_scope: response.data.data.google_scope,
              google_client_id: response.data.data.google_client_id,
              google_api_key: response.data.data.google_api_key
            }
            context.commit("setAuthData", auth)
            context.commit("setUserData", response.data.data);
            router.push(Path.dashboard);
          },
          error => {
            user.loading = false;
            if (error.response && error.response.data && error.response.data.messages) {
              user.errors.push(error.response.data.messages);
            }
            else {
              console.log(error.message)
              user.errors.push(error.message)
            }
          }
        );
      } else {
        if (!user.email) {
          user.errors.push("Email is Required");
        }
        if (!user.password) {
          user.errors.push("Password is Required");
        }
      }
    },
    removeUser: context => {
      context.commit("removeUserData");
    },
    setEmail: (context, formData) => {
      formData.errors = [];
      if (formData.email && formData.secret_key) {
        formData.loading = true;
        const data = {
          email: formData.email,
          secret_key: formData.secret_key
        };
        axios.post(API_PATH.forgetPassword, data).then(
          response => {
            if (response.data.is_success) {
              formData.success = true;
              formData.loading = false;
              context.commit("setUserEmail", formData.secret_key);
              router.push(Path.resetPassword);
            }
          },
          error => {
            formData.loading = false;
            if (error.response && error.response.data && error.response.data.messages) {
              formData.errors.push(error.response.data.messages);
            }
            else {
              formData.errors.push(error.message)
            }
          }
        );
      }
      if (!formData.email) {
        formData.errors.push("Email is Missing");
      }
      if (!formData.secret_key) {
        formData.errors.push("Secret Key is Missing");
      }
    },
    updatePassword: (context, formData) => {
      formData.errors = [];
      if (formData.password && formData.password === formData.confirm_password) {
        formData.loading = true;
        const data = {
          secret_key: context.state.user_email[0],
          password: formData.password
        };
        axios.patch(API_PATH.updatePassword, data).then(
          response => {
            if (response.data.is_success) {
              formData.success = true;
              formData.loading = false;
              context.commit("removeUserEmail");
            }
          },
          error => {
            formData.loading = false;
            if (error.response && error.response.data && error.response.data.messages) {
              formData.errors.push(error.response.data.messages);
            }
            else {
              formData.errors.push(error.message)
            }
          }
        );
      }
      if (!formData.password) {
        formData.errors.push("Password is Missing");
      }
      if (!formData.confirm_password) {
        formData.errors.push("Confirm Password is Missing");
      } else if (formData.password !== formData.confirm_password) {
        formData.errors.push("Password Mismatch");
      }
    },
    requestKey: (context, formData) => {
      console.log("context::::", context);
      formData.errors = [];
      if (formData.email) {
        formData.loading = true;
        const API = `${API_PATH.requestSecretKey}${formData.email}`;
        axios.get(API).then(
          response => {
            if (response.data.is_success) {
              formData.success = true;
              formData.loading = false;
            }
          },
          error => {
            formData.loading = false;
            if (error.response && error.response.data && error.response.data.messages) {
              formData.errors.push(error.response.data.messages);
            }
            else {
              formData.errors.push(error.message)
            }
          }
        );
      }
      if (!formData.email) {
        formData.errors.push("Email is Missing");
      }
    }
  }
};

export default userAuthentication;
