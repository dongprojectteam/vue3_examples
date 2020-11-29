import { createApp } from 'vue'
import { store } from '/@store/index.js'
import App from '/@/App.vue'
import '/@/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.esm.min.js'

const app = createApp(App)
app.use(store).mount('#app')
