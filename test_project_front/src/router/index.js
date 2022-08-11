import { createRouter, createWebHashHistory } from "vue-router";

import HomePage from "@/pages/HomePage";
import CreateUserPage from "@/pages/CreateUserPage";
import CreateEventPage from "@/pages/CreateEventPage";
import UserInfoPage from "@/pages/UserInfoPage";

const routes = [
  { path: "/", component: HomePage, name: "homePage" },
  { path: "/createUser", component: CreateUserPage, name: "createUserPage" },
  {
    path: "/createEvent/:userId",
    component: CreateEventPage,
    name: "createEventPage",
  },
  { path: "/user/:id", component: UserInfoPage, name: "userInfoPage" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
