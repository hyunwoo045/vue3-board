import { createRouter, createWebHashHistory } from "vue-router";
import Container from "./Container";
import Add from "./Add";
import Read from "./Read";

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
    {
      path: "/read",
      component: Read,
      name: "Read",
    },
  ],
});
