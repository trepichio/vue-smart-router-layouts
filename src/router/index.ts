import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

export default Promise.all(routes).then((routes) => {
  return createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });
});
