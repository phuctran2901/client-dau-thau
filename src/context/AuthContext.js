import React from 'react'
export const ContextAuth = React.createContext()
export const AuthProvider = (props) => {
  const [isAuth, setIsAuth] = React.useState({
    user: null,
    isAuth: false
  })
  const value = [isAuth, setIsAuth]
  return <ContextAuth.Provider value={value} {...props} />
}
