<template>
  <div style="width: 200px">
    <ol>
      <li v-for="item in items">{{ item }}</li>
    </ol>
  </div>
</template>

<script>
import { reactive } from 'vue'

export default {
  // Composition API
  setup() {
    const items = reactive({ 1: '1번 객체', 2: '2번 객체', 3: '3번 객체' })
    return {
      items,
    }
  },
}
</script>
