<template>
  <nav-bar />
  <div id="notification" />
  <router-view></router-view>
</template>

<script>
import NavBar from '/@components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
  },
}
</script>
