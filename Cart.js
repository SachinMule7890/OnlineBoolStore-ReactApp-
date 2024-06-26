import React, { useEffect, useState } from 'react'
import NavbarCom from '../NavbarCom/NavbarCom'
import Table from 'react-bootstrap/Table'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { BASE_URL } from '../../Constants'
import { LinkContainer } from 'react-router-bootstrap'
import FooterComponent from "../FooterComponent";
import { useNavigate } from 'react-router-dom'


function Cart() {
  const [booksInCart, setBooksInCart] = useState([])
  const [orderPlaced, setOrderPlaced] = useState('')
  const cartItems = undefined;
  const navigate = useNavigate()
  let loggedIn = false
  let idUser = localStorage.getItem('user_id')
  if (idUser) {
    loggedIn = true
  }
  const getAllBooksInCart = () => {
    debugger
    axios
      .get(`${BASE_URL}/users/cart/${idUser}`)
      .then((data) => {setBooksInCart(data.data);
      //localStorage.setItem("cartItems",JSON.stringify(booksInCart))
    })
      .catch((err) => console.log(err))
  }

  const handleOrderNow = (e) => {
    axios
      .get(`${BASE_URL}/users/orders/${idUser}`)
      .then((data) => getAllBooksInCart())
      .catch((err) => console.log(err))
    //calling again cart api to get after order cart items if any
  }

  const handleAddQuantity = (cartItemId) => {
    axios
      .put(`${BASE_URL}/users/cart/addqty/${cartItemId}`,
        
      )
      .then((res) => {

        setBooksInCart(...booksInCart, res.data)
        window.location.reload()
        
      })
      .catch((err) => alert("Cart item quantity not added"));

  }


  const handleSubtractQuantity = (cartItemId) => {
    axios
      .put(`${BASE_URL}/users/cart/removeqty/${cartItemId}`,
        
      )
      .then((res) => {

        setBooksInCart(...booksInCart, res.data)
        window.location.reload()
        
      })
      .catch((err) => alert("Cart item quantity not removed"));

  }


  const removeItem = (cartItemId) =>{
    axios
      .delete(`${BASE_URL}/users/cart/removeitem/${cartItemId}`,
        
      )
      .then((res) => {

        setBooksInCart(...booksInCart, res.data)
        window.location.reload()
        
      })
      .catch((err) => alert("Cart item  not removed"));
  }



  const placeOrder = () => {
    debugger
    axios
    .post(`${BASE_URL}/users/orders/${idUser}`)
    .then((res) => {
      debugger
      console.log("Placed Order" + res)
      sessionStorage.setItem('orderId', res.data.orderId)

      setOrderPlaced(res.data);
      debugger
      // localStorage.setItem('orderId', orderPlaced.orderId)
      navigate('/user/ordernow')
    })
    .catch((err) => console.log("Order not placed"))
  }

  useEffect(() => {
    getAllBooksInCart()
  }, [])

  return (
    <div>
      <div><NavbarCom /></div>
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
                    <a href='/user/cart'>User</a>
                  </li>
                  <li className='breadcrumb-item active' aria-current='page'>
                    Cart 
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          
        </div>
      </section>
      
      <div>
        <h2 style={{ textAlign: 'center', margin: '1rem' }}>My Cart</h2>
      </div>
      <div>
        {booksInCart.length < 1 ? (
          
          <div
            style={{ display: 'flex', justifyContent: 'center', color: 'blue' }}
          >
            <h5>Cart is empty</h5>
          </div>
        ) : (
          <div> 
            <div style={{margin:"0px 50px 30px"}}>
            <Table bordered hover>
              <thead>
                <tr>
                  <th>Book Name</th>
                  <th>Book Quantity</th>
                  <th>Price Total</th>
                </tr>
              </thead>
              {booksInCart.map((book, index) => {
                
                return (
                  <tbody key={index}>
                    <tr>
                      <td>{book.bookName}</td>
                      <td
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div>{book.bookQty}</div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            width: '30%',
                          }}
                        >
                          <div style={{margin:"0px 5px "}}>
                            <Button
                              variant='outline-success'
                              onClick={() =>
                                handleAddQuantity(book.cartItemId)
                              }
                            >
                              + 
                            </Button>
                          </div>
                          <div style={{margin:"0px 5px "}}>
                            <Button
                              variant='outline-danger'
                              onClick={() =>
                                handleSubtractQuantity(book.cartItemId)
                              }
                            >
                              -
                            </Button>
                          </div>
                        </div>
                      </td>
                      <td>{book.totalCartItemPrice}</td>
                      <td>
                      <div>
                            <button
                              className="btn btn-danger btn-rounded"
                              onClick={() =>
                                removeItem(book.cartItemId)
                              }
                            >
                              Remove Item
                            </button>
                          </div>
                      </td>
                    </tr>
                  </tbody>
                )
              })}
            </Table>
            </div>
            <div style={{ textAlign: 'center' }}>
            <LinkContainer to="/user/orders">
                    <Button type='button' className='btn btn-warning btn-rounded' onClick={placeOrder}>
                       Order Now
                    </Button>
                    {/* <Button onClick={(e) => handleOrderNow(e)}>Order Now</Button> */}
            </LinkContainer>
                    </div>
            
             
           
          </div>
        )}
      </div>
      <div>
        <FooterComponent></FooterComponent>
      </div>
    </div>
  )
}

export default Cart
