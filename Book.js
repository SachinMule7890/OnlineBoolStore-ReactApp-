import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import { BASE_URL } from '../../Constants'

function CardsComp({ book }) {
  //let starIcon = require('../../img/' + book.imageFront)

  const [show, setShow] = useState(false)

  const [showreview, setShowreview] = useState(false)
  const [reviews, setReviews] = useState([])

  const updateShowReview = () => {
    getAllReview()
    setShowreview(true)
  }

  const getAllReview = () => {
    axios
      .get(`${BASE_URL}/users/review/${book.bookId}`)
      .then((res) => {
        setReviews(res.data)
      })
      .catch((err) => alert('Book is not added to cart. Try again...'))
  }

  const addReview = () => {}
  const showReview = () => {}

  //localstorage
  let loggedIn = false
  let isAdmin = false
  let idUser = localStorage.getItem('user_id')

  if (idUser) {
    loggedIn = true
  }

  if (localStorage.getItem('user_role') === 'admin') {
    isAdmin = true
  }

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const addToCart = (e, bookId) => {
    axios
      .post(`${BASE_URL}/users/cart/${idUser}/${bookId}`)
      .then((res) => alert('Book is Successfully added to cart'))
      .catch((err) => alert('Book is not added to cart. Try again...'))
    setShow(false)
  }

  return (
    <Card style={{ width: '15rem', textAlign: 'center' }}>
      <div style={{ textAlign: 'center', margin: '0.5rem' }}>
        <Card.Img
          variant='top'
          src={book.imageFront}
          style={{ width: '8rem' }}
        />
      </div>
      <Card.Body>
        <Card.Title>{book.bookName}</Card.Title>
        <Card.Text>Rs.{book.price}/-</Card.Text>

        <Button variant='primary' onClick={handleShow}>
          more info..
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
                  <td>Summary</td>
                  <td>{book.summery}</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='primary'
              onClick={() => {
                updateShowReview()
              }}
            >
              Show Reviews
            </Button>
            {loggedIn && !isAdmin && (
              <Button
                variant='primary'
                onClick={(e) => addToCart(e, book.bookId)}
              >
                + Add to cart
              </Button>
            )}
            {loggedIn && (
              <Button variant='primary' onClick={showReview}>
                Add Review
              </Button>
            )}
            <br />
            {showreview && (
              <div style={{ textAlign: 'center', margin: '0.5rem' }}>
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
      </Card.Body>
    </Card>
  )
}

export default CardsComp
