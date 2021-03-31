<template>
  <div>
    <h1>This is a list of users page</h1>
    <div id="nav">
      <router-link to="/users/profile">View User Profile</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Users",

  data() {
    return {};
  },
});
</script>

<style lang="css" scoped>
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
