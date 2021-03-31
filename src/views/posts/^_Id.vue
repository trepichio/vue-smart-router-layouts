<template>
  <div>
    <h1>This is a page of the post with id {{ $route.params.id }}</h1>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PostDetails",

  data() {
    return {};
  },
});
</script>

<style lang="css" scoped></style>
