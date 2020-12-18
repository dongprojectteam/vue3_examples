<template>
  <p>{{ counter + counter2 }}</p>
  <button @click="counter++">클릭하면 숫자가 올라갑니다.</button>
  <button @click="onClick2">클릭하면 숫자가 올라갑니다.</button>
</template>

<script>
import { ref } from 'vue'

export default {
  data() {
    return {
      counter2: 0,
    }
  },
  setup() {
    let counter = ref(0)

    const onClick = (evt) => {
      if (evt) {
        evt.preventDefault()
        counter.value++
      }
    }
    return {
      counter,
      onClick,
    }
  },
  methods: {
    onClick2: function (evt) {
      if (evt) {
        evt.preventDefault()
      }
      this.counter2++
    },
  },
}
</script>
