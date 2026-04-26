export default defineNuxtRouteMiddleware((to) => {
  if (!process.client) {
    return
  }

  const { getToken } = useAdminSession()
  if (getToken()) {
    return
  }

  return navigateTo({
    path: '/admin/login',
    query: {
      redirect: to.fullPath,
    },
  })
})