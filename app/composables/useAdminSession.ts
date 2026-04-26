const ADMIN_TOKEN_KEY = 'registrationAdmin.token'

export const useAdminSession = () => {
  const getToken = () => {
    if (!process.client) {
      return ''
    }

    try {
      return sessionStorage.getItem(ADMIN_TOKEN_KEY) || localStorage.getItem(ADMIN_TOKEN_KEY) || ''
    } catch {
      return ''
    }
  }

  const setToken = (token: string, remember = false) => {
    if (!process.client) {
      return
    }

    try {
      sessionStorage.setItem(ADMIN_TOKEN_KEY, token)
      if (remember) {
        localStorage.setItem(ADMIN_TOKEN_KEY, token)
      } else {
        localStorage.removeItem(ADMIN_TOKEN_KEY)
      }
    } catch {
      // Ignore storage access errors.
    }
  }

  const clearToken = () => {
    if (!process.client) {
      return
    }

    try {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY)
      localStorage.removeItem(ADMIN_TOKEN_KEY)
    } catch {
      // Ignore storage access errors.
    }
  }

  const buildAuthHeaders = (): Record<string, string> => {
    const token = getToken()
    if (!token) {
      return {}
    }

    return {
      Authorization: `Bearer ${token}`,
    }
  }

  return {
    getToken,
    setToken,
    clearToken,
    buildAuthHeaders,
  }
}