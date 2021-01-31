<template>
  <MyButton sm>My Button</MyButton>
  <MyButton>My Button</MyButton>
  <MyButton lg background-white>My Button</MyButton>
  <MyButton sm pill text-red background-black>My Button</MyButton>
  <MyButton md pill text-green background-pink>My Button</MyButton>
  <MyButton lg pill @click.prevent="onClick">My Button</MyButton>
</template>

<script>
import MyButton from './components/MyButton.vue'

export default {
  name: 'App',
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
