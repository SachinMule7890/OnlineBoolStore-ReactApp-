import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { Table } from 'react-bootstrap'
import { BASE_URL } from '../../Constants'
import { Await } from 'react-router-dom'

function BookListComp({ order }) {
  const [orderList, setOrderList] = useState([])
  //console.log(order)

  const getOrderItemList = () => {
    //debugger
    // Await(() => {
    // console.log(order)
    axios
      .get(`${BASE_URL}/admin/orderitemlist/${order}`)
      .then((res) => {
        //console.log(res.data)
        setOrderList(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    // })
  }

  useEffect(() => {
    //console.log(order)
    getOrderItemList()
  }, [])
  return (
    <div>
      {orderList && (
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>BookName</th>
              <th>Book Price</th>
              <th>Ordered Quantity</th>
            </tr>
            {orderList.map((or, index) => {
              return (
                <tr key={index}>
                  <td>{or.book.bookName}</td>
                  <td width={'50'}>{or.book.price}</td>
                  <td width={'50'}>{or.orderBookQty}</td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )}
    </div>
  )
}

export default BookListComp
