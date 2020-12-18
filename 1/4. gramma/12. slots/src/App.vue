<template>
  <Component>
    <template v-slot="slotProps"> ✔️ {{ slotProps.item }} </template>
  </Component>
</template>

<script>
import Component from './Component.vue'

export default {
  components: {
    Component,
  },
}
</script>
