import Vue from "vue";
import VueRouter from "vue-router";
import SignIn from "@/views/SignIn";
import ForgetPassword from "@/views/ForgetPassword";
import ResetPassword from "@/views/ResetPassword";
import Dashboard from "@/views/Dashboard";
import RequestSecretKey from "@/views/RequestSecretKey";
import { Path } from "../config";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: Path.signIn,
    name: "SignIn",
    component: SignIn,
    beforeEnter(to, from, next) {
      if (store.state.userAuthentication.user && store.state.userAuthentication.user.length > 0) {
        next(Path.dashboard);
      } else {
        next();
      }
    }
  },
  {
    path: Path.dashboard,
    name: "Dashboard",
    component: Dashboard,
    beforeEnter(to, from, next) {
      if (
        store.state.userAuthentication.user &&
        store.state.userAuthentication.user.length > 0 &&
        store.state.userAuthentication.user[0].id
      ) {
        next();
      } else {
        next(Path.signIn);
      }
    }
  },
  {
    path: Path.forgetPassword,
    name: "ForgetPassword",
    component: ForgetPassword,
    beforeEnter(to, from, next) {
      if (store.state.userAuthentication.user && store.state.userAuthentication.user.length > 0) {
        next(Path.dashboard);
      } else {
        next();
      }
    }
  },
  {
    path: Path.requestSecret,
    name: "RequestSecretKey",
    component: RequestSecretKey,
    beforeEnter(to, from, next) {
      if (store.state.userAuthentication.user && store.state.userAuthentication.user.length > 0) {
        next(Path.dashboard);
      } else {
        next();
      }
    }
  },
  {
    path: Path.resetPassword,
    name: "ResetPassword",
    component: ResetPassword,
    beforeEnter(to, from, next) {
      if (store.state.userAuthentication.user && store.state.userAuthentication.user.length > 0) {
        next(Path.dashboard);
      } else if (store.state.userAuthentication.user_email === null) {
        next(Path.forgetPassword);
      } else {
        next();
      }
    }
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   route level code-splitting
  //   this generates a separate chunk (about.[hash].js) for this route
  //   which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
