export const applications = {
  namespaced: true,
  state: () => ({
    applications: [],
  }),
  getters: {
    applications_count: (state) => {
      return state.applications.length
    },
    applications: (state) => (filter = null) => {
      if (filter) {
        return state.applications.filter((i) => i.name == filter)
      }
      return state.applications
    },
  },
  mutations: {
    SET_DATA(state, data) {
      state.applications = data
    },
  },
  actions: {
    setApplications: ({ commit }, data) => {
      if (data.length > 0) {
        commit('SET_DATA', data)
      }
    },
  },
}
