import Profile from '/@components/Profile.vue'
import Application from '/@components/Application.vue'
import { defineComponent } from 'vue'

const NotFound = defineComponent({
  template: '<div>Not Found</div>',
})

const routes = [
  { path: '/', redirect: '/profile' },
  { path: '/profile', name: 'profile', component: Profile, alias: '/home' },
  { path: '/application', name: 'application', component: Application },
  { path: '/:catchAll(.*)+', component: NotFound },
]

export default routes
