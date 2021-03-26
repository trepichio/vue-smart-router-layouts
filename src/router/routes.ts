import { RouteRecordRaw } from "vue-router";

const importAll = (r: __WebpackModuleApi.RequireContext): string[][] =>
  r.keys().map((key) => key.slice(2).replace(".vue", "").split("/"));

const pages = importAll(require.context("../views", true, /\.vue$/));

const generateRoute = (path: string[]) => {
  const shortcut = path[0].toLowerCase();

  return shortcut.startsWith("home")
    ? "/"
    : path.map((p) => p.toLowerCase()).join("/");
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
