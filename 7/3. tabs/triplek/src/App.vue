<template>
  <toast />
  <nav-bar />
  <div id="notification" />
  <!-- eslint-disable-next-line vue/no-multiple-template-root -->
  <router-view />
</template>

<script>
import NavBar from '/@components/NavBar.vue'
import Toast from '/@components/Toast.vue'
import { ref, provide } from 'vue'

export default {
  name: 'App',
  setup() {
    const toast = ref('')
    provide('toast', toast)
  },
  components: {
    NavBar,
    Toast,
  },
}
</script>
