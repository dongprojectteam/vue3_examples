<template>
  <MyButton sm>My Button</MyButton>
  <MyButton>My Button</MyButton>
  <MyButton lg background-white>My Button</MyButton>
  <MyButton sm pill text-red background-black>My Button</MyButton>
  <MyButton md pill text-green background-pink>My Button</MyButton>
  <MyButton lg pill @click.prevent.capture="onClick">My Button</MyButton>
  <br />
  <MyButton type="switch" background-blue text-white v-model:active="active"
    >SWITCH</MyButton
  >
</template>

<script>
import MyButton from './components/MyButton.vue'

export default {
  name: 'App',
  data() {
    return {
      active: false,
    }
  },
  watch: {
    active(new_val) {
      alert(new_val)
    }
  },
  methods: {
    onClick(evt) {
      alert('Clicked')
    },
  },
  components: {
    MyButton,
  },
}
</script>
