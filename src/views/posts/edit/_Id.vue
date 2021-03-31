<template>
  <div>
    <h1>This is a page to edit post with id {{ $route.params.id }}</h1>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PostEdit",
  layout: "AppLayoutPosts",
  data() {
    return {};
  },
});
</script>

<style lang="css" scoped></style>
