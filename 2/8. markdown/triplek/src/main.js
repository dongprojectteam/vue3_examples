import { createApp } from 'vue'
import { store } from '/@store/index.js'
import { router } from '/@router/router.js'
import App from '/@/App.vue'
import '/@/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.esm.min.js'

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')
