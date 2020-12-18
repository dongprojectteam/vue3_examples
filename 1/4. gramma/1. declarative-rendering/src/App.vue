<template>
  <div id="date">
    {{ date }}
  </div>
  <div id="date2">
    {{ date2 }}
  </div>
</template>

<script>
export default {
  // Composition API
  setup() {
    const date = Date().toString()
    return {
      date,
    }
  },

  // Option API
  data() {
    return {
      date2: Date().toString(),
    }
  },
}
</script>
