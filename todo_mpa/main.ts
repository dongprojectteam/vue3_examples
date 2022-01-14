import { createApp } from 'vue'
import App from '@todo/App.vue'
import '@todo/index.css'


import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

const app = createApp(App)
const offset: number = (new Date().getTimezoneOffset())
const today: string = new Date(((new Date()).getTime() - (offset * 60 * 1000))).toISOString().split('T')[0]
app.provide('today', today)
app.mount('#todoapp')
