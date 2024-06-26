import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../Constants'

import BookComp from '../Components/BookComp/Book'
import FooterComponent from '../Components/FooterComponent'
import Corousel from '../Components/Corousel/Corousel'
import NavbarCom from '../Components/NavbarCom/NavbarCom'
import OrderComp from '../Components/AdminOrders/OrderComp'
import { useNavigate } from 'react-router-dom'

function HomePage() {
  //debugger
  const [books, setBooks] = useState([])
  const [orders, setOrders] = useState([])
  const navigate = useNavigate()

  let loggedIn = false
  let isAdmin = false
  let userId = localStorage.getItem('user_id')
  if (userId) {
    loggedIn = true
  }
  if (localStorage.getItem('user_role') === 'admin') {
    //debugger
    isAdmin = true
  }

  const getAllBooks = () => {
    axios
      .get(`${BASE_URL}/users/books`)
      .then((data) => {
        console.log(data);
        setBooks(data.data)})
      .catch((err) => console.log(err))
  }

  const getSearchBooks = (searched) => {
    if (searched === '') {
      axios
        .get(`${BASE_URL}/users/books`)
        .then((data) => setBooks(data.data))
        .catch((err) => console.log(err))
    } else {
      axios
        .get(`${BASE_URL}/users/booksbybookname/${searched}`)
        .then((res) => setBooks(res.data))
        .catch((err) => console.log(err))
    }
  }

  const getBooksByCategory = (cat) => {
    if (cat === 'all') {
      axios
        .get(`${BASE_URL}/users/books`)
        .then((data) => setBooks(data.data))
        .catch((err) => console.log(err))
    } else {
      axios
        .get(`${BASE_URL}/users/bookbycategories/${cat}`)
        .then((res) => setBooks(res.data))
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    if (localStorage.getItem('user_role') === 'admin') {
      navigate('/admin/home')
    }
    getAllBooks()
    //getAllOrders()
  }, [])

  const getAllOrders = () => {
    //debugger
    axios
      .get(`${BASE_URL}/admin/orders}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err))
  }

  // useEffect(() => {
  //   getAllOrders()
  //   console.log(orders)
  // }, [])

  return (
    <div>
      <div>
        <NavbarCom
          getSearchBooks={getSearchBooks}
          getBooksByCategory={getBooksByCategory}
        />
      </div>
      <div style={{ marginTop: 50 }}>
        {/* {isAdmin ? (
          <OrderComp orders={orders}></OrderComp>
        ) : ( */}
        <div>
          <div>
            <Corousel style={{ height: 200 }} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {books.map((book, index) => {
              return (
                <div style={{ margin: '3rem' }} key={index}>
                  <BookComp book={book} />
                </div>
              )
            })}
          </div>
        </div>
        {/* )} */}
      </div>
      <div className='profile-footer'>
        <FooterComponent></FooterComponent>
      </div>
    </div>
  )
}

export default HomePage
