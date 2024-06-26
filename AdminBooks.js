import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../Constants'
import FooterComponent from '../Components/FooterComponent'
import ToastContainer from 'react-bootstrap/ToastContainer'
import AdminNavbarCom from '../Components/NavbarCom/AdminNavbarCom'
import { LinkContainer } from 'react-router-bootstrap'
import Modal from 'react-bootstrap/Modal'
import { Button, Col, Form, Row, Table, Toast } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import AdminBookComp from '../Components/AdminBook/AdminBookComp'
import AdminAddBookComp from '../Components/AdminBook/AdminAddBookComp'

function AdminBooks() {
  const [books, setBooks] = useState([])
  const [inputs, setInputs] = useState({
    bookId: '',
    bookName: '',
    authorName: '',
    edition: '',
    pages: '',
    publisher: '',
    availableQty: '',
    price: '',
    language: '',
    imageFront: '',
  })
  const [showUpdate, setShowUpdate] = useState(false)
  const [error, setError] = useState(false)
  const [show, setShow] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const handleClose = () => {
    setShow(false)
    setShowreview(false)
  }

  const showbookinfo = (e) => {
    e.preventDefault()
    setShow(true)
  }
  const handleShow = () => setShowUpdate(true)
  const navigate = useNavigate()
  const [showreview, setShowreview] = useState(false)
  const [reviews, setReviews] = useState([])

  const updateShowReview = (bookId) => {
    getAllReview(bookId)
    setShowreview(true)
  }

  const getAllReview = (bookId) => {
    axios
      .get(`${BASE_URL}/users/review/${bookId}`)
      .then((res) => {
        setReviews(res.data)
      })
      .catch((err) => alert('Book is not added to cart. Try again...'))
  }

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

  function handleChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e) {
    const form = e.currentTarget

    //setValidated(true)
    e.preventDefault()
    if (form.checkValidity()) {
      axios
        .put(`${BASE_URL}/admin/books/${inputs.bookId}`)
        .then((response) => response.json())
        .then((data) => {
          // debugger
          //if (data.message === 'Successfully registered')
          if (data.bookId === inputs.bookId) {
            setError(false)
            setShow(true)
            setTimeout(() => {
              navigate('/admin/books')
            })
          } else {
            setError(true)
            setErrorMessage(data.message)
            setInputs({
              ...inputs,
            })
            setShow(true)
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }
  const getAllBooks = () => {
    axios
      .get(`${BASE_URL}/admin/books`)
      .then((data) => setBooks(data.data))
      .catch((err) => console.log(err))
  }

  const getSearchBooks = (searched) => {
    if (searched === '') {
      axios
        .get(`${BASE_URL}/admin/books`)
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
    getAllBooks()
    //getAllOrders()
  }, [])

  return (
    <div>
      <div>
        <AdminNavbarCom />
      </div>

      <div style={{ marginTop: 70 }}>
        <AdminAddBookComp></AdminAddBookComp>
        {isAdmin && (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Book Name</th>
                  <th>Author Name</th>
                  <th>Publlisher</th>
                  <th>Available Quantity</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {books.map((book, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>
                        <Button
                          variant='link'
                          onClick={(e) => {
                            showbookinfo(e)
                          }}
                        >
                          {book.bookName}
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Book Information</Modal.Title>
                          </Modal.Header>
                          <div style={{ textAlign: 'center' }}>
                            <img src={book.imageFront} crossOrigin='*' />
                          </div>
                          <Modal.Body>
                            <Table striped bordered hover>
                              <tbody>
                                <tr>
                                  <td>Book Name</td>
                                  <td>{book.bookName}</td>
                                </tr>
                                <tr>
                                  <td>Author Name</td>
                                  <td>{book.authorName}</td>
                                </tr>
                                <tr>
                                  <td>Edition</td>
                                  <td>{book.edition}</td>
                                </tr>
                                <tr>
                                  <td>Pages</td>
                                  <td>{book.pages}</td>
                                </tr>
                                <tr>
                                  <td>Publisher</td>
                                  <td>{book.publisher}</td>
                                </tr>
                                <tr>
                                  <td>Available Quantity</td>
                                  <td>{book.availableQty}</td>
                                </tr>
                                <tr>
                                  <td>Price</td>
                                  <td>{book.price}</td>
                                </tr>
                                <tr>
                                  <td>Average Rating</td>
                                  <td>{book.avgRating}</td>
                                </tr>
                                <tr>
                                  <td>Language</td>
                                  <td>{book.language}</td>
                                </tr>
                                <tr>
                                  <td>Summery</td>
                                  <td>{book.summery}</td>
                                </tr>
                              </tbody>
                            </Table>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button
                              variant='primary'
                              onClick={() => {
                                updateShowReview(book.bookId)
                              }}
                            >
                              Show Reviews
                            </Button>
                            <br />
                            {showreview && (
                              <div
                                style={{
                                  textAlign: 'center',
                                  margin: '0.5rem',
                                }}
                              >
                                <Table striped bordered hover>
                                  <thead>
                                    <tr>
                                      <td>User Name</td>
                                      <td>Review</td>
                                      <td>Rating</td>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {reviews &&
                                      reviews.map((review, index) => {
                                        return (
                                          <tr>
                                            <td>{review.appUser.userName}</td>
                                            <td>{review.review}</td>
                                            <td>{review.rating}</td>
                                          </tr>
                                        )
                                      })}
                                  </tbody>
                                </Table>
                              </div>
                            )}
                          </Modal.Footer>
                        </Modal>
                      </td>
                      <td>{book.authorName}</td>
                      <td>{book.publisher}</td>
                      <td>{book.availableQty}</td>
                      <td>{book.price}</td>
                      <td>
                        <AdminBookComp book={book}></AdminBookComp>
                      </td>
                    </tr>
                  </tbody>
                )
              })}
            </Table>
          </div>
        )}
      </div>

      <div className='profile-footer'>
        <FooterComponent></FooterComponent>
      </div>
    </div>
  )
}

export default AdminBooks
