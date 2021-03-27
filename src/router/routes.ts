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

export default pages.map(
  async (path: string[]): Promise<RouteRecordRaw> => {
    const { default: component } = await import(`../views/${path.join("/")}`);
    const { name }: { name: string } = component;

    const route = `/${generateRoute([...path])}`;
    return {
      path: route,
      name,
      component,
      meta: {
        layout: `AppLayout${name}`,
      },
    };
  }
);
