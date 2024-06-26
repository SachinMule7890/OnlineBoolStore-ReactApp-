import { Outlet } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'

const useAuth = () => {
  let localStorageObj = localStorage.getItem('user_role')
  const user = { loggedIn: localStorageObj === 'user' ? true : false }
  return user && user.loggedIn
}

const ProtectedRoutes = () => {
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <NotFoundPage />
}

export default ProtectedRoutes
