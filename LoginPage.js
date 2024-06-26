import Container from 'react-bootstrap/esm/Container'
import Form from 'react-bootstrap/Form'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import InputGroup from 'react-bootstrap/InputGroup'
import FooterComponent from '../Components/FooterComponent'
import { FaUser } from 'react-icons/fa'
import { FaUnlock } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/esm/Button'
import { useState } from 'react'
import '../css/LoginPage.css'
import { BASE_URL } from '../Constants'

function LoginPage() {
  const [inputs, setInputs] = useState({ email: '', password: '' })
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const [validated, setValidated] = useState(false)
  const navigate = useNavigate()

  let loggedIn = false

  if (localStorage.getItem('user_id')) {
    loggedIn = true
  }

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
      fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: inputs.email,
          password: inputs.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          //console.log(data)
          if (data.message === undefined) {
            setError(false)
            localStorage.setItem('user_username', data.userName)
            localStorage.setItem('user_id', data.userId)
            localStorage.setItem('user_role', data.role)
            setShow(true)
            if (data.role === 'admin') {
              //setTimeout(() => {
              navigate('/admin/home')
              //}, 1000)
            } else {
              setTimeout(() => {
                navigate('/')
              }, 1000)
            }
          } else {
            setError(true)
            setInputs({ ...inputs, password: '' })
            localStorage.removeItem('user_username')
            localStorage.removeItem('user_id')
            localStorage.removeItem('user_role')
            setShow(true)
          }
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  }

  return (
    <>
      <>
        <Container className='container d-flex justify-content-center flex-column align-items-center mt-5 pt-5'>
          {loggedIn ? (
            <>
              <h3 className='main-title'>You are logged in.</h3>
              <Button variant='outline-danger'>Go to Home page</Button>
            </>
          ) : (
            <>
              <h1 className='main-title'>Login to your account</h1>
              <Form
                className='login-form mt-4'
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
              >
                <InputGroup className='mb-3'>
                  <InputGroup.Text>
                    <FaUser />
                  </InputGroup.Text>
                  <Form.Control
                    type='text'
                    name='email'
                    value={inputs.email}
                    onChange={handleChange}
                    placeholder='Email'
                    aria-label='Email'
                    aria-describedby='basic-addon1'
                    pattern='^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please provide a valid email address.
                  </Form.Control.Feedback>
                </InputGroup>
                <InputGroup className='mb-3'>
                  <InputGroup.Text>
                    <FaUnlock />
                  </InputGroup.Text>
                  <Form.Control
                    type='password'
                    name='password'
                    value={inputs.password}
                    onChange={handleChange}
                    placeholder='Password'
                    aria-label='Password'
                    aria-describedby='basic-addon1'
                    required
                  />
                  <Form.Control.Feedback type='invalid'>
                    Please provide a password.
                  </Form.Control.Feedback>
                </InputGroup>
                <div className='text-center'>
                  <Button
                    type='submit'
                    variant='outline-danger'
                    className='w-100 mt-3'
                  >
                    Login
                  </Button>
                  <Form.Text>
                    You don't have an account?{' '}
                    <LinkContainer
                      to='/user/register'
                      className='register-link text-danger'
                    >
                      <Button variant='link'>Register</Button>
                    </LinkContainer>
                  </Form.Text>
                </div>
              </Form>
            </>
          )}
        </Container>
        {/* <div className='login-footer'>
          <FooterComponent />
        </div> */}
      </>
      <ToastContainer className='p-3 top-0 end-0'>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
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
              <Toast.Body>
                The email or the password are incorrect! Please try again.
              </Toast.Body>
            </>
          ) : (
            <Toast.Body>Successfully logged in!</Toast.Body>
          )}
        </Toast>
      </ToastContainer>
    </>
  )
}

export default LoginPage
