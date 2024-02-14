import { createWebHistory, createRouter } from "vue-router";

import HomePage from "./components/HomePage.vue";
import LoginPage from "./components/LoginPage.vue";
import RegisterPage from "./components/RegisterPage.vue";

// lazy-loaded
const ProfilePage = () => import("./components/ProfilePage.vue");
const PackagesListPage = () => import("./components/PackagesListPage.vue");
const PackagesViewPage = () => import("./components/PackagesViewPage.vue");
const PackagesCreatePage = () => import("./components/PackagesCreatePage.vue");
const PackagesEditPage = () => import("./components/PackagesEditPage.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/home",
    component: HomePage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/register",
    component: RegisterPage,
  },
  {
    path: "/packages",
    component: PackagesListPage,
  },
  {
    path: "/packages/:id",
    component: PackagesViewPage,
  },
  {
    path: "/packages/create",
    component: PackagesCreatePage,
  },
  {
    path: "/packages/:id/edit",
    component: PackagesEditPage,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: ProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
