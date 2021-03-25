<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppLayoutDefault from "./AppLayoutDefault.vue";

export default defineComponent({
  name: "AppLayout",

  data: () => ({
    layout: AppLayoutDefault,
  }),
  watch: {
    $route: {
      immediate: true,
      async handler(route) {
        try {
          const component = await import(`@/layouts/${route.meta.layout}.vue`);
          this.layout = component?.default || AppLayoutDefault;
        } catch (e) {
          this.layout = AppLayoutDefault;
        }
      },
    },
  },
});
</script>

<style lang="css" scoped></style>
