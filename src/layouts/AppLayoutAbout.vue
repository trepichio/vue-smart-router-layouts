<template>
  <div>
    <header class="header"></header>
    <AppLayoutLinks />
    <slot />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import AppLayoutLinks from "@/layouts/AppLayoutLinks";

export default defineComponent({
  name: "AppLayoutAbout",
  components: {
    AppLayoutLinks,
  },
});
</script>

<style lang="css" scoped>
.header {
  height: 5rem;
  background-color: blue;
}
</style>
