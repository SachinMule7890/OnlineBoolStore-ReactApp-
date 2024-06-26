import React, { useEffect, useState } from 'react'
import NavbarCom from '../Components/NavbarCom/NavbarCom'
import axios from 'axios'
import { BASE_URL } from '../Constants'
import FooterComponent from '../Components/FooterComponent'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { useNavigate } from 'react-router-dom'
import '../css/Modal.css'
function Checkout() {
  const [order, setOrder] = useState({})
  const [showOrder, setShowOrder] = useState(false)

  const handleCloseOrder = () => {
    setShowOrder(false)
    navigate('/user/orders')
  }

  let loggedIn = false
  let idUser = localStorage.getItem('user_id')
  if (idUser) {
    loggedIn = true
  }

  const navigate = useNavigate()

  const getOrderPlaced = () => {
    //debugger
    const orderId = sessionStorage.getItem('orderId')
    axios
      .get(`${BASE_URL}/users/orders/${orderId}`)
      .then((res) => {
        //debugger
        console.log(' Order' + res.data)
        setOrder(res.data)
      })
      .catch((err) => console.log('Order not fetched'))
  }

  const proceedToPayment = () => {
    debugger
    const orderId = sessionStorage.getItem('orderId')
    axios
      .get(`${BASE_URL}/users/orders/checkout/${orderId}`)
      .then((res) => {
        //debugger
        console.log('checkout' + res)
        // alert("Payment Successful. Order placed successfully")
        setShowOrder(true)
      })
      .catch((err) => console.log('Payment failed'))
  }

  useEffect(() => {
    getOrderPlaced()
  }, [])

  return (
    <div>
      <div>
        <NavbarCom />
      </div>

      <section style={{ backgroundColor: '#eee' }}>
        <div className='container py-5'>
          <div className='row'>
            <div className='col'>
              <nav
                aria-label='breadcrumb'
                className='bg-light rounded-3 p-3 mb-4'
              >
                <ol className='breadcrumb mb-0'>
                  <li className='breadcrumb-item'>
                    <a href='/'>Home</a>
                  </li>
                  <li className='breadcrumb-item'>
                    <a href='/user/profile'>User</a>
                  </li>
                  <li className='breadcrumb-item active' aria-current='page'>
                    Checkout
                  </li>
                  {/* <li>
                    <div style={{ textAlign: "center", marginLeft: "100px" }}>
                      <Button
                        type="button"
                        className="btn btn-warning btn-rounded"
                        // onClick={navigateToCheckout}
                      >
                        Proceed to checkout
                      </Button>
                    </div>
                  </li> */}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div style={{ textAlign: 'center', margin: '100px' }}>
          <Button
            type='button'
            className='btn btn-warning btn-rounded'
            onClick={proceedToPayment}
          >
            Click to pay Rs {order.totalOrderAmount}/-
          </Button>
          <Modal
            dialogClassName='my-modal'
            show={showOrder}
            onHide={handleCloseOrder}
          >
            <Modal.Header closeButton>
              <Modal.Title> Order Details</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <h2 style={{ textAlign: 'center' }}>Payment Successful!</h2>
              <hr></hr>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <th colSpan={4}>Item Details</th>
                    <th>Total Amount (Rs)</th>
                    <th>Order Date</th>
                    <th>Delivery Date</th>
                    <th>Order Status</th>
                  </tr>

                  <tr>
                    <td colSpan={4}>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Book Name</th>
                            <th>Price (Rs)</th>
                            <th>Ordered Quantity</th>
                            <th>Total Item Price (Rs)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.orderItemList &&
                            order.orderItemList.map((item, index) => {
                              debugger
                              return (
                                <tr key={index}>
                                  <td>{item.book.bookName}</td>
                                  <td>{item.book.price}</td>
                                  <td>{item.orderBookQty}</td>
                                  <td>{item.orderBookQty * item.book.price}</td>
                                </tr>
                              )
                            })}
                        </tbody>
                      </Table>
                    </td>
                    <td>{order.totalOrderAmount}/-</td>
                    <td>{order.orderDate}</td>
                    <td>{order.deliveryDate}</td>

                    <td>Order Placed</td>
                  </tr>
                </tbody>
              </Table>
            </Modal.Body>
            <Modal.Footer>
              <h4 style={{ color: 'blue' }}>Thank You for ordering! 😊</h4>
            </Modal.Footer>
          </Modal>
        </div>
      </section>

      <div>
        <FooterComponent></FooterComponent>
      </div>
    </div>
  )
}
export default Checkout
