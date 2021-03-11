<template>
  <NavBarName />
  <Profile />
</template>

<script>
import NavBarName from '/@components/NavBar.vue'
import Profile from '/@components/Profile.vue'

export default {
  name: 'App',
  components: {
    NavBarName,
    Profile,
  },
}
</script>
