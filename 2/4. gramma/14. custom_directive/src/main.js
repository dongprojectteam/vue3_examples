import { createApp, defineComponent } from 'vue'

const app = createApp({
  template: `
       <div style="height:1000px">
        <p v-notification:top="100">고정 자리에 표시하기</p>
       </div>
    `,
})

app.directive('notification', (el, binding, vnode, prevNode) => {
  el.style.position = 'fixed'
  el.style[binding.arg || 'top'] = binding.value + 'px'
})

app.mount('#app')
