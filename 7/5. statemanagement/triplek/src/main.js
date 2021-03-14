import { createApp } from 'vue'
import { router } from '/@router/router.js'
import App from '/@/App.vue'
import '/@/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.esm.min.js'

const app = createApp(App)
app.use(router)
app.mount('#app')
