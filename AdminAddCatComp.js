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

function AdminAddCatComp() {
  const [showUpdate, setShowUpdate] = useState(false)
  const handleClose = () => setShowUpdate(false)
  const handleShow = () => setShowUpdate(true)
  const [error, setError] = useState(false)
  const [show, setShow] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [inputs, setInputs] = useState({
    categoryName: '',
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
        .post(`${BASE_URL}/admin/categories/`, {
          categoryName: inputs.categoryName,
        })
        //.then((response) => response.json())
        .then((data) => {
          setError(false)
          setShow(true)
          setShowUpdate(false)
          setTimeout(() => {
            window.location.reload(true)
          }, 1200)
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }
  return (
    <div>
      <Button variant='info' onClick={handleShow}>
        Add New Category
      </Button>
      <Modal show={showUpdate} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Information</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            className='login-form mt-4'
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='validationCustom01'
            >
              <Form.Label column sm='3'>
                Category Name
              </Form.Label>
              <Col sm='9'>
                <Form.Control
                  type='text'
                  placeholder='categoryName'
                  name='categoryName'
                  value={inputs.categoryName}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Please provide a Category Name.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <div className='text-center'>
              <Button
                type='submit'
                variant='outline-danger'
                className='w-50 mt-3'
              >
                Add Category
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
              <Toast.Body>Successfully Added Category</Toast.Body>
            </>
          )}
        </Toast>
      </ToastContainer>
    </div>
  )
}

export default AdminAddCatComp
