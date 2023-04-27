import logo from './logo.svg'
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate
} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import { PrivateRoute } from './routes/privateRoute'
import { lazy, useContext, useEffect } from 'react'
import { ContextAuth } from './context/AuthContext'
import SearchPage from './pages/SearchPage'
import HomePage from './pages/HomePage'
import UsersPage from './pages/UsersPage'
import { Avatar, Button, Layout } from 'antd'
import Header, { HeaderCustom } from './components/Header'
import ProfilePage from './pages/ProfilePage'

function App() {
  const [isAuth, setIsAuth] = useContext(ContextAuth)
  const getUser = () => {
    const userInfo = localStorage.getItem('userInfo')

    if (userInfo) {
      setIsAuth(JSON.parse(userInfo))
    }
  }

  useEffect(() => {
    getUser()
  }, [])

  return (
    <Router>
      <Layout style={{ height: '100vh' }}>
        {isAuth.isAuth && <HeaderCustom />}
        <Routes>
          <Route element={<LoginPage />} path={'/login'} key='/login' />
          <Route element={<PrivateRoute />} path='/search'>
            <Route element={<SearchPage />} path={'/search'} />
          </Route>
          <Route element={<PrivateRoute />} path='/'>
            <Route element={<HomePage />} path={'/'} />
          </Route>
          <Route element={<PrivateRoute />} path='/users'>
            <Route element={<UsersPage />} path={'/users'} />
          </Route>
          <Route element={<PrivateRoute />} path='/profile'>
            <Route element={<ProfilePage />} path={'/profile'} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
