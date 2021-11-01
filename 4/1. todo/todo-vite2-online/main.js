import { createApp } from 'vue'
import App from '@todo/App.vue'
import '@todo/index.css'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.esm.min.js'

const app = createApp(App)
const offset = (new Date().getTimezoneOffset())
const today = new Date((new Date() - (offset*60*1000))).toISOString().split('T')[0]
app.provide('today', today)
app.mount('#todoapp')
