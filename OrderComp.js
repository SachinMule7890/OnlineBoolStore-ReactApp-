import React, { useEffect, useState } from 'react'
import NavbarCom from '../NavbarCom/NavbarCom'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import { BASE_URL } from '../../Constants'

function OrderComp({ orders }) {
  //const [orders, setOrders] = useState([])
  let loggedIn = false
  let idUser = localStorage.getItem('user_id')
  if (idUser) {
    loggedIn = true
  }
  // const getAllOrders = () => {
  debugger
  //   axios
  //     .get(`${BASE_URL}/admin/orders}`)
  //     .then((res) => setOrders(res.data))
  //     .catch((err) => console.log(err))
  // }

  // useEffect(() => {
  //   getAllOrders()
  //   console.log(orders)
  // }, [])

  return (
    <div>
      {true ? (
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Order Date</th>
                <th>Delivery Date</th>
              </tr>
            </thead>
            {orders.orderItemList &&
              orders.map((order, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>{order.appUser.userName}</td>
                      <td>{order.book.authorName}</td>
                      <td>{order.book.price}</td>
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
  )
}

export default OrderComp
