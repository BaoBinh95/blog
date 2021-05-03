import Cookies from 'js-cookie'

export const state = () => ({
  token: null
})

export const getters = {
  token: state => state.token
}

export const mutations = {
  FETCH_USER_SUCCESS(state, data) {
    if (data) {
      state.token = data
      Cookies.set('token', data)
    }
  },
  FETCH_USER_FAILED(state) {
    state.token = null
    Cookies.remove('token')
  }
}

export const actions = {
  async authenticated({ commit }, data) {
    await commit('FETCH_USER_SUCCESS', data)
  }
}
