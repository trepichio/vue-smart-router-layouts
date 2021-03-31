<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, markRaw } from "vue";
import AppLayoutDefault from "./AppLayoutDefault.vue";

export default defineComponent({
  name: "AppLayout",

  data: () => ({
    layout: markRaw(AppLayoutDefault),
  }),
  watch: {
    $route: {
      immediate: true,
      async handler(route) {
        try {
          const component = await import(`@/layouts/${route.meta.layout}.vue`);
          this.layout = markRaw(component?.default || AppLayoutDefault);
        } catch (e) {
          this.layout = markRaw(AppLayoutDefault);
        }
      },
    },
  },
});
</script>

<style lang="css" scoped></style>
