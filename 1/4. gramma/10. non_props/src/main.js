import { createApp, ref } from 'vue'

const app = createApp({})
app.component('Component', {
  // setup함수의 context 인자에서 Non-Prop 속성 에 접근할 수 있다.
  setup(props, context) {
    const msg = context.attrs.msg
    return {
      msg,
    }
  },
  template: `
    <Component3></Component3>
    `,
})

app.component('Component2', {
  inheritAttrs: false,
  setup(props, context) {
    const msg = context.attrs.msg
    return {
      msg
    }
  },
  template: `
    <Component3></Component3>
  `,
})

app.component('Component3', {
  template: `
    <div>
      <p>@Component: {{ $attrs.msg }}</p>
    </div>
  `,
})

app.mount('#app')
