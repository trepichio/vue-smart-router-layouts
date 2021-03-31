import {
  createRouter,
  createWebHistory,
  NavigationGuardNext,
  RouteLocationNormalized,
} from "vue-router";
import routes from "./routes";

export default Promise.all(routes).then((routes) => {
  const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
  });

  router.beforeEach((to, from, next) => {
    if (!to.meta.middlewares) {
      return next();
    }
    const middlewares = to.meta.middlewares as {
      [key: string]: <T extends RouteLocationNormalized>(
        t: T,
        f: T,
        n: NavigationGuardNext
      ) => void;
    };
    Object.keys(middlewares).forEach((middleware: string) => {
      middlewares[middleware](to, from, next);
    });
    return next();
  });

  return router;
});
