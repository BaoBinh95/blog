export default ({ store, redirect }) => {
  const token = store.getters['auth/token']

  if (token) {
    return redirect('/')
  }

  return redirect('/auth/login')
}
