<template>
  <ul style="list-style-type: none">
    <li v-for="(item, index) in items" :key="index">
      <slot :item="item"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      items: [1, 2, 3],
    }
  },
}
</script>
