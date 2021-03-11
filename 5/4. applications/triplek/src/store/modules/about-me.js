export const about_me = {
  namespaced: true,
  state: () => ({
    name: null,
    email: null,
    resume: [],
  }),
  getters: {
    user_data: (state) => {
      return {
        name: state.name,
        email: state.email,
        resume: state.resume,
      }
    },
  },
  mutations: {
    SET_DATA(state, data) {
      state[data.key] = data.value
    },
  },
  actions: {
    setAboutMeData: ({ commit, state }, data) => {
      Object.keys(data).forEach((key) => {
        if (Object.keys(state).find((skey) => skey === key)) {
          commit('SET_DATA', { key: key, value: data[key] })
        }
      })
    },
  },
}
