import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../Constants'

import BookComp from '../Components/BookComp/Book'
import FooterComponent from '../Components/FooterComponent'
import Corousel from '../Components/Corousel/Corousel'
import AdminNavbarCom from '../Components/NavbarCom/AdminNavbarCom'
import BookListComp from '../Components/AdminOrders/BookListComp'
import { Button, Table } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'

function AdminHomePage() {
  //debugger
  const [show, setShow] = useState(0)
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

  useEffect(() => {
    // getAllBooks()
    getAllOrders()
  }, [])

  const getAllOrders = () => {
    //debugger
    axios
      .get(`${BASE_URL}/admin/orders`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err))
  }

  const handleShowBooks = () => {
    navigate('/admin/showallbooks')
  }

  const updateDeliveryStatus = (e) => {
    debugger
    axios
      .put(`${BASE_URL}/admin/orderdelivered/${e}`)
      .then(() => {
        window.location.reload(true)
        //debugger
        // navigate('/admin')
      })
      .catch((err) => console.log(err))
  }
  // useEffect(() => {
  //   getAllOrders()
  //   console.log(orders)
  // }, [])

  return (
    <div>
      <div>
        <AdminNavbarCom />
      </div>
      <div style={{ marginTop: 70 }}>
        <Button variant='danger' onClick={handleShowBooks}>
          Show Books
        </Button>
      </div>

      <div style={{ marginTop: 10 }}>
        {true ? (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Order Date</th>
                  <th>Delivery Date</th>
                  <th>Delivery Address</th>
                  <th>Item Details</th>
                  <th>Total Amount</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              {orders.map((order, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>{order.appUser.userName}</td>
                      <td>{order.orderDate}</td>
                      <td>{order.deliveryDate}</td>
                      <td>
                        {order.customerAddress && (
                          <div>
                            <label>{order.customerAddress.plotNo},</label>
                            <label>{order.customerAddress.street},</label>
                            <label>{order.customerAddress.city},</label>
                            <label>{order.customerAddress.state},</label>
                            <label>{order.customerAddress.pincode},</label>
                            <label>{order.customerAddress.country}</label>
                          </div>
                        )}
                      </td>
                      <td>
                        <BookListComp order={order.orderId}></BookListComp>
                      </td>

                      <td>{order.totalOrderAmount}</td>

                      <td>
                        {
                          //console.log(order)
                          order.orderStatus ? (
                            <div>Delivered</div>
                          ) : (
                            <div>
                              <div>
                                <label>Not delivered</label>
                                <br />
                                <Button
                                  variant='success'
                                  value={order.orderId}
                                  onClick={() => {
                                    updateDeliveryStatus(order.orderId)
                                  }}
                                >
                                  Update To Delivered
                                </Button>
                              </div>
                            </div>
                          )
                        }
                      </td>
                    </tr>
                  </tbody>
                )
              })}
            </Table>
          </div>
        ) : (
          <div style={{ display: 'grid', placeContent: 'center' }}>
            <h4>No orders</h4>
          </div>
        )}
      </div>
      <div className='profile-footer'>
        <FooterComponent></FooterComponent>
      </div>
    </div>
  )
}

export default AdminHomePage
