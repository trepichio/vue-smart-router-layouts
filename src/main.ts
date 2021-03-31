import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import AppLayout from "./layouts/AppLayout.vue";

const init = async () => {
  const module = await import("./router");
  const router = await module.default;

  createApp(App)
    .use(store)
    .use(router)
    .component("AppLayout", AppLayout)
    .mount("#app");
};

init();
