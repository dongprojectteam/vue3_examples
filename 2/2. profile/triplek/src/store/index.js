import { createStore } from 'vuex'
import { about_me } from './modules/about-me'

export const store = createStore({
  modules: {
    about_me: about_me,
  },
})
