export default function ({ $axios, store, app }) {
  $axios.interceptors.request.use(config => {
    return config
  })

  $axios.setBaseURL('https://608635cfd14a870017578de1.mockapi.io/api/v1/')
  $axios.onRequest(config => {
    const token = store.state.auth.token
    if (token) {
      config.headers.common.Authorization = `Bearer ${token}`
    }
  })
}
