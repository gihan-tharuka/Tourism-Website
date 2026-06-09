const TOKEN_KEY = 'beyond_sea_admin_token'

export const getToken = () => {
  if (typeof window === 'undefined') {
    return null
  }

  return window.localStorage.getItem(TOKEN_KEY)
}

export const setToken = (token: string) => {
  window.localStorage.setItem(TOKEN_KEY, token)
}

export const removeToken = () => {
  window.localStorage.removeItem(TOKEN_KEY)
}

export const isAuthenticated = () => Boolean(getToken())
