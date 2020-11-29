import Home from '/@components/Home.vue'
import Profile from '/@components/Profile.vue'
import Application from '/@components/Application.vue'
import { defineComponent } from 'vue'

const NotFound = defineComponent({
  template: '<div>Not Found</div>',
})

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', name: 'home', component: Home },
  { path: '/profile', name: 'profile', component: Profile },
  { path: '/application', name: 'application', component: Application },
  { path: '/:catchAll(.*)+', component: NotFound },
]

export default routes
