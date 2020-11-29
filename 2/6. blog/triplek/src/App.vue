<template>
  <nav-bar />
  <div id="notification" />
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <router-view />
</template>

<script>
import NavBar from "/@components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>
