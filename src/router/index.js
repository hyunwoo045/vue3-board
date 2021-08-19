import { createRouter, createWebHashHistory } from "vue-router";
import Container from "./Container";
import Add from "./Add";

export default createRouter({
  history: createWebHashHistory(),

  routes: [
    {
      path: "/",
      component: Container,
    },
    {
      path: "/add",
      component: Add,
    },
  ],
});
