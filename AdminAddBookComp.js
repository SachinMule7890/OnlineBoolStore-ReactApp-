import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import axios from 'axios'
import { BASE_URL } from '../../Constants'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Button,
  Col,
  Form,
  Row,
  Table,
  Toast,
  ToastContainer,
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function AdminAddBookComp() {
  const [showUpdate, setShowUpdate] = useState(false)
  const handleClose = () => setShowUpdate(false)
  const handleShow = () => setShowUpdate(true)
  const [error, setError] = useState(false)
  const [show, setShow] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
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
    summery: '',
  })
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()

  function handleChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmit(e) {
    const form = e.currentTarget

    setValidated(true)
    e.preventDefault()
    if (form.checkValidity()) {
      axios
        .post(`${BASE_URL}/admin/books/`, {
          //bookId: inputs.bookId,
          //category: { categoryId: book.category.categoryId },
          bookName: inputs.bookName,
          authorName: inputs.authorName,
          edition: inputs.edition,
          pages: inputs.pages,
          publisher: inputs.publisher,
          availableQty: inputs.availableQty,
          price: inputs.price,
          language: inputs.language,
          imageFront: inputs.imageFront,
          //avgRating: book.avgRating,
          summery: inputs.summery,
        })
        //.then((response) => response.json())
        .then((data) => {
          // debugger
          //if (data.message === 'Successfully registered')
          //if (data.bookId === inputs.bookId) {
          setError(false)
          setShow(true)
          setShowUpdate(false)
          console.log('errrrr')
          setTimeout(() => {
            window.location.reload(true)
          }, 1200)
          // } else {
          //   console.log('else')
          //   setError(true)
          //   setErrorMessage(data.message)
          //   setInputs({
          //     ...inputs,
          //   })
          //setShow(true)
          //}
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }
  return (
    <div>
      <Button variant='info' onClick={handleShow}>
      
        Add New Book
      </Button>
      <Modal show={showUpdate} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Book Information</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            className='login-form mt-4'
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            {/* <Form.Group
              as={Row}
              className='mb-3'
              controlId='validationCustom02'
            >
              <Form.Label column sm='3'>
                Category Id
              </Form.Label>
              {book.category && (
                <Form.Label column sm='3'>
                  {book.category.categoryId}
                </Form.Label>
              )}
            </Form.Group> */}
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='validationCustom01'
            >
              <Form.Label column sm='3'>
                Book Name
              </Form.Label>
              <Col sm='9'>
                <Form.Control
                  type='text'
                  placeholder='bookName'
                  name='bookName'
                  value={inputs.bookName}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Please provide a bookname.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='validationCustom02'
            >
              <Form.Label column sm='3'>
                Author Name
              </Form.Label>
              <Col sm='9'>
                <Form.Control
                  type='text'
                  placeholder='authorName'
                  name='authorName'
                  value={inputs.authorName}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            {/* <Form.Group
              as={Row}
              className='mb-3'
              controlId='validationCustom02'
            >
              <Form.Label column sm='3'>
                Author Name
              </Form.Label>
              <Col sm='9'>
                <Form.Control
                  type='text'
                  placeholder={book.authorName}
                  name='authorName'
                  value={book.authorName}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group> */}
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='validationCustom02'
            >
              <Form.Label column sm='3'>
                Edition
              </Form.Label>
              <Col sm='9'>
                <Form.Control
                  type='text'
                  placeholder='edition'
                  name='edition'
                  value={inputs.edition}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='validationCustom02'
            >
              <Form.Label column sm='3'>
                Pages
              </Form.Label>
              <Col sm='9'>
                <Form.Control
                  type='number'
                  placeholder='pages'
                  name='pages'
                  value={inputs.pages}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='validationCustom02'
            >
              <Form.Label column sm='3'>
                Publisher
              </Form.Label>
              <Col sm='9'>
                <Form.Control
                  type='text'
                  placeholder='publisher'
                  name='publisher'
                  value={inputs.publisher}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='validationCustom02'
            >
              <Form.Label column sm='3'>
                Available Quantity
              </Form.Label>
              <Col sm='9'>
                <Form.Control
                  type='number'
                  placeholder='availableQty'
                  name='availableQty'
                  value={inputs.availableQty}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='validationCustom02'
            >
              <Form.Label column sm='3'>
                Language
              </Form.Label>
              <Col sm='9'>
                <Form.Control
                  type='text'
                  placeholder='language'
                  name='language'
                  value={inputs.language}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='validationCustom02'
            >
              <Form.Label column sm='3'>
                Price
              </Form.Label>
              <Col sm='9'>
                <Form.Control
                  type='number'
                  placeholder='price'
                  name='price'
                  value={inputs.price}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='validationCustom02'
            >
              <Form.Label column sm='3'>
                Image Link
              </Form.Label>
              <Col sm='9'>
                <Form.Control
                  type='text'
                  placeholder='imageFront'
                  name='imageFront'
                  value={inputs.imageFront}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='validationCustom02'
            >
              <Form.Label column sm='3'>
                Summery
              </Form.Label>
              <Col sm='9'>
                <Form.Control
                  type='text'
                  placeholder='Summery'
                  name='summery'
                  value={inputs.summery}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <div className='text-center'>
              <Button
                type='submit'
                variant='outline-danger'
                className='w-50 mt-3'
              >
                Add Book
              </Button>
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer className='p-3 top-0 end-0'>
        <Toast onClose={() => setShow(false)} show={show} delay={1000} autohide>
          {error ? (
            <>
              <Toast.Header>
                <img
                  src='holder.js/20x20?text=%20'
                  className='rounded me-2'
                  alt=''
                />
                <strong className='me-auto text-danger'>Error!</strong>
              </Toast.Header>
              <Toast.Body>{errorMessage}</Toast.Body>
            </>
          ) : (
            <>
              <Toast.Header>
                <img
                  src='holder.js/20x20?text=%20'
                  className='rounded me-2'
                  alt=''
                />
                <strong className='me-auto text-success'>Success!</strong>
              </Toast.Header>
              <Toast.Body>Successfully Added Book</Toast.Body>
            </>
          )}
        </Toast>
      </ToastContainer>
    </div>
  )
}

export default AdminAddBookComp
