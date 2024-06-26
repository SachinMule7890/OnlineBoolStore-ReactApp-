import { Outlet } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'

const useAuth = () => {
  let localStorageObj = localStorage.getItem('user_role')
  const user = { loggedIn: localStorageObj === 'admin' ? true : false }
  return user && user.loggedIn
}

const AdminProtectedRoutes = () => {
  const isAuth = useAuth()
  return isAuth ? <Outlet /> : <NotFoundPage />
}

export default AdminProtectedRoutes
