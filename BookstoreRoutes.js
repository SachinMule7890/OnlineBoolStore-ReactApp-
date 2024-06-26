import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import NotFoundPage from './pages/NotFoundPage'
import UserOrder from './pages/UserOrder'
import ProtectedRoutes from './ProtectedRoutes'
import AdminProtectedRoutes from './AdminProtectedRoutes'
import Cart from './Components/Cart/Cart'
import ProfileNew from './pages/ProfileNew'
import AdminHomePage from './pages/AdminHomePage'
import AdminUsersPage from './pages/AdminUsers'
import AdminBooksPage from './pages/AdminBooks'
import AdminCategoriesPage from './pages/AdminCategories'
import BookRequestsPage from './pages/BookRequestsPage'
import UserOrderNow from './pages/UserOrderNow'
import Address from './pages/Address'
import OrderAddress from './pages/OrderAddress'
import OrderDetails from './pages/OrderDetails'
import Checkout from './pages/Checkout'

import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
// import StorePage from '../pages/StorePage'
// import DetailsPage from '../pages/DetailsPage'
// import ProfilePage from '../pages/ProfilePage'
// import OrdersPage from '../pages/OrdersPage'
// import ProtectedRoutes from '../pages/ProtectedRoutes'

function BookstoreRoutes() {
  const location = useLocation()
  return (
    <Routes location={location} key={location.pathname}>
      <Route path='/AboutUs' element={<AboutUs />} />

      <Route path='/contactUs' element={<ContactUs />} />
      <Route path='/user/login' element={<LoginPage />} />
      <Route path='/user/register' element={<RegisterPage />} />
      <Route path='/user' element={<ProtectedRoutes />}>
        <Route path='/user/orders' element={<UserOrder />} />
        <Route path='/user/cart' element={<Cart />} />
        <Route path='/user/profile' element={<ProfileNew />} />
        <Route path='/user/bookrequests' element={<BookRequestsPage />} />
        <Route path='/user/ordernow' element={<UserOrderNow />} />

        <Route path='/user/orders' element={<UserOrder />} />

        <Route path='/user/cart' element={<Cart />} />

        <Route path='/user/profile' element={<ProfileNew />} />

        <Route path='/user/address' element={<Address />} />

        <Route path='/user/orderaddress' element={<OrderAddress />} />

        <Route path='/user/orderdetails' element={<OrderDetails />} />

        <Route path='/user/checkout' element={<Checkout />} />
      </Route>

      <Route path='/admin' element={<AdminProtectedRoutes />}>
        <Route path='/admin/home' element={<AdminHomePage />} />
        <Route path='/admin/users' element={<AdminUsersPage />} />
        <Route path='/admin/books' element={<AdminBooksPage />} />
        <Route path='/admin/categories' element={<AdminCategoriesPage />} />
      </Route>
      <Route path='/' element={<HomePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default BookstoreRoutes
