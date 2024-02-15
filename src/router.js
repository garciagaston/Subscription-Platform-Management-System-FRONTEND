import { createWebHistory, createRouter } from "vue-router";

import HomePage from "./components/HomePage.vue";
import LoginPage from "./components/LoginPage.vue";
import RegisterPage from "./components/RegisterPage.vue";

// lazy-loaded
const ProfilePage = () => import("./components/ProfilePage.vue");

//packages
const PackagesListPage = () => import("./components/PackagesListPage.vue");
const PackagesViewPage = () => import("./components/PackagesViewPage.vue");
const PackagesCreatePage = () => import("./components/PackagesCreatePage.vue");
const PackagesEditPage = () => import("./components/PackagesEditPage.vue");

//channels
const ChannelsListPage = () => import("./components/ChannelsListPage.vue");
const ChannelsViewPage = () => import("./components/ChannelsViewPage.vue");
const ChannelsCreatePage = () => import("./components/ChannelsCreatePage.vue");
const ChannelsEditPage = () => import("./components/ChannelsEditPage.vue");

//subscriptions
const SubscriptionsListPage = () =>
  import("./components/SubscriptionsListPage.vue");
const SubscriptionsViewPage = () =>
  import("./components/SubscriptionsViewPage.vue");
const SubscriptionsCreatePage = () =>
  import("./components/SubscriptionsCreatePage.vue");
const SubscriptionsEditPage = () =>
  import("./components/SubscriptionsEditPage.vue");

//users
const UsersListPage = () => import("./components/UsersListPage.vue");
const UsersViewPage = () => import("./components/UsersViewPage.vue");
const UsersCreatePage = () => import("./components/UsersCreatePage.vue");
const UsersEditPage = () => import("./components/UsersEditPage.vue");

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
  // packages
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
  // channels
  {
    path: "/channels",
    component: ChannelsListPage,
  },
  {
    path: "/channels/:id",
    component: ChannelsViewPage,
  },
  {
    path: "/channels/create",
    component: ChannelsCreatePage,
  },
  {
    path: "/channels/:id/edit",
    component: ChannelsEditPage,
  },
  // subscriptions
  {
    path: "/subscriptions",
    component: SubscriptionsListPage,
  },
  {
    path: "/subscriptions/:id",
    component: SubscriptionsViewPage,
  },
  {
    path: "/subscriptions/create",
    component: SubscriptionsCreatePage,
  },
  {
    path: "/subscriptions/:id/edit",
    component: SubscriptionsEditPage,
  },
  // users
  {
    path: "/users",
    component: UsersListPage,
  },
  {
    path: "/users/:id",
    component: UsersViewPage,
  },
  {
    path: "/users/create",
    component: UsersCreatePage,
  },
  {
    path: "/users/:id/edit",
    component: UsersEditPage,
  },
  // profiles
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
