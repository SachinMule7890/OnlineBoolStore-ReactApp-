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

function AdminUpdateUserComp({ user }) {
  const [showUpdate, setShowUpdate] = useState(false)
  const handleClose = () => setShowUpdate(false)
  const handleShow = () => setShowUpdate(true)
  const [error, setError] = useState(false)
  const [show, setShow] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [inputs, setInputs] = useState({
    userId: user.userId,
    userName: user.userName,
    email: user.email,
    mobile: user.mobile,
    role: user.role,
    status: user.status,
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
        .put(`${BASE_URL}/admin/users/${inputs.userId}`, {
          userId: inputs.userId,
          userName: inputs.userName,
          password: user.password,
          email: inputs.email,
          mobile: inputs.mobile,
          role: inputs.role,
          status: inputs.status,
        })
        //.then((response) => response.json())
        .then((data) => {
          setError(false)
          setShow(true)
          setShowUpdate(false)
          console.log('errrrr')
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
        Update
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
              controlId='validationCustom02'
            >
              <Form.Label column sm='3'>
                user Id
              </Form.Label>
              <Form.Label column sm='3'>
                {user.userId}
              </Form.Label>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='validationCustom01'
            >
              <Form.Label column sm='3'>
                user Name
              </Form.Label>
              <Col sm='9'>
                <Form.Control
                  type='text'
                  placeholder={user.userName}
                  name='userName'
                  value={inputs.userName}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Please provide a userName.
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className='mb-3'
              controlId='validationCustom02'
            >
              <Form.Label column sm='3'>
                Email Id
              </Form.Label>
              <Col sm='9'>
                <Form.Control
                  type='text'
                  placeholder={user.email}
                  name='email'
                  value={inputs.email}
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
                Mobile
              </Form.Label>
              <Col sm='9'>
                <Form.Control
                  type='text'
                  placeholder={user.mobile}
                  name='mobile'
                  value={inputs.mobile}
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
                Role
              </Form.Label>
              <Col sm='9'>
                <Form.Control
                  type='text'
                  placeholder={user.role}
                  name='role'
                  value={inputs.role}
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
                Status
              </Form.Label>
              <Col sm='9'>
                <Form.Control
                  type='text'
                  placeholder={user.status}
                  name='status'
                  value={inputs.status}
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
                Upadate
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
              <Toast.Body>Successfully updated User</Toast.Body>
            </>
          )}
        </Toast>
      </ToastContainer>
    </div>
  )
}

export default AdminUpdateUserComp
