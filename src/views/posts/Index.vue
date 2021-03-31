<template>
  <div>
    <h1>This is a list of posts page</h1>
    <div id="nav">
      <router-link to="/posts/create"> Create a new post</router-link>
    </div>
    <table id="posts-list">
      <thead>
        <td>Post ID</td>
        <td colspan="2">Actions</td>
      </thead>
      <tbody>
        <tr v-for="id in ids" :key="id">
          <td>{{ id }}</td>
          <td>
            <router-link :to="{ path: '/posts/' + id }">View </router-link>
          </td>
          <td>
            <router-link :to="{ path: '/posts/edit/' + id }">Edit</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <router-view />
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Posts",
  layout: "AppLayoutPosts",
  data() {
    return {
      ids: ["1", "2", "3", "abc", "41a5a31e-fc9c-595e-ac15-a8709b0f1982"],
    };
  },
});
</script>

<style lang="css" scoped>
#posts-list {
  margin: 1rem auto;
  border: solid 3px;
}

#posts-list thead {
  background-color: darkblue;
  color: #ffff;
}

#posts-list tr td {
  padding: 0 1rem;
}

#posts-list tr:nth-of-type(2n) {
  background-color: beige;
}

#posts-list tr:nth-of-type(2n + 1) {
  background-color: aqua;
}

#nav a.router-link-exact-active {
  text-decoration: none;
  cursor: copy;
}
</style>
