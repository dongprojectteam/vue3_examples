import { createApp } from 'vue'

const exMixin = {
  data() {
    return {
      total: 5,
      data: [1, 2, 3, 4, 5],
    }
  },
}

const app = createApp({
  mixins: [exMixin],
  data() {
    return {
      total: 10,
    }
  },
  template: `
        <p>Total : {{ total }}</p>
    `,
})

app.mount('#app')
