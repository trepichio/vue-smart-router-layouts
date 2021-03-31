import { ChildrenByPath } from "@/common/types";
import { ComponentOptions } from "@vue/runtime-core";
import { RouteRecordRaw } from "vue-router";

const importAll = (r: __WebpackModuleApi.RequireContext): string[][] =>
  r.keys().map((key) => key.slice(2).replace(".vue", "").split("/"));

const pages = importAll(require.context("../views", true, /\.vue$/));

const generateRoute = (path: string[]) => {
  // Note: remove first element if route starts with index
  if (path[0].toLowerCase().startsWith("index") && path.length > 1) {
    path.shift();
  }

  // Note: handle root routes
  if (path.length === 1) {
    const shortcut = path[0].toLowerCase();
    return shortcut.startsWith("home") || shortcut.startsWith("index")
      ? ""
      : shortcut.startsWith("_") // Note: handle dynamic routes
      ? shortcut.replace("_", ":")
      : shortcut;
  }

  // Note: handle other routes
  const lastElement = path[path.length - 1];
  // Note: remove last element in array if it is index
  if (lastElement.toLowerCase().startsWith("index")) {
    path.pop();
  } else if (lastElement.startsWith("_")) {
    path[path.length - 1] = lastElement.replace("_", ":");
  }

  return path.map((p) => p.toLowerCase()).join("/");
};

const childrenFilter = (p: string) => ~p.indexOf("^");

const childrenByPath: ChildrenByPath = pages
  // Note: filter pages by children routes
  .filter((path) => path.some(childrenFilter))
  .map((path) => {
    // Note: copy path and remove special char ^
    const copy = [...path];
    copy[copy.length - 1] = copy[copy.length - 1].slice(1);
    // Note: generate key to identify parent
    const key = `/${generateRoute(copy.slice(0, copy.length - 1))}`;
    return {
      path,
      route: `/${generateRoute(copy)}`,
      key: key as unknown,
    };
  })
  .reduce((acc, current) => {
    // Note: generate list of nested routes where key is the parent path
    const key = current.key as string;
    delete current.key;
    if (acc[key]) {
      acc[key].push(current);
    } else {
      acc[key] = [current];
    }
    return acc;
  }, {} as ChildrenByPath);

const defaultLayout = "AppDefaultLayout";

export default pages
  // Note: remove nested routes from pages
  .filter((path) => !path.some(childrenFilter))
  .map(
    async (path: string[]): Promise<RouteRecordRaw> => {
      const { default: component } = await import(`../views/${path.join("/")}`);
      const { name, layout, middlewares }: ComponentOptions = component;
      const route = `/${generateRoute([...path])}`;

      let children: RouteRecordRaw[] = [];

      if (childrenByPath[route]) {
        const promises = childrenByPath[route].map(async ({ path, route }) => {
          const { default: childComponent } = await import(
            `../views/${path.join("/")}`
          );
          const {
            name: childName,
            layout: childLayout,
            middlewares: childMiddleware,
          } = childComponent;
          return {
            path: route,
            name: childName,
            component: childComponent,
            meta: {
              layout: childLayout || layout || defaultLayout,
              middlewares: childMiddleware || {},
            },
          };
        });
        children = await Promise.all(promises);
      }

      return {
        path: route,
        name,
        component,
        meta: {
          layout: layout || defaultLayout,
          middlewares: middlewares || {},
        },
        children,
      };
    }
  );
