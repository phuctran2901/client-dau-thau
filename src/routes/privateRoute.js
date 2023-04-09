// import React, { ReactNode, useContext } from 'react'
// import { Navigate, Route, useLocation } from 'react-router-dom'
// import { ContextAuth } from '../context/AuthContext'

// const PrivateRoute = ({ children }) => {
//   const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
//   const location = useLocation()
//   if (!userInfo.isAuth) {
//     return <Navigate to='/login' state={{ path: location.pathname }} replace />
//   }
//   return <div>{children}</div>
// }

// export default PrivateRoute

import React from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'
export function PrivateRoute({
  component: Component,
  layout: Layout,
  ...rest
}) {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}')
  return userInfo?.isAuth ? <Outlet /> : <Navigate to='/login' />
}
