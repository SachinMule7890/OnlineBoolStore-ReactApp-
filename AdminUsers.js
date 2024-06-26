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
import AdminUpdateUserComp from '../Components/AdminBook/AdminUpdateUserComp'
import AdminAddUserComp from '../Components/AdminBook/AdminAddUserComp'

function AdminUsers() {
  const [users, setUsers] = useState([])
  const [inputs, setInputs] = useState({
    userId: '',
    userName: '',
    email: '',
    mobile: '',
    role: '',
    status: '',
  })
  const [showUpdate, setShowUpdate] = useState(false)
  const [error, setError] = useState(false)
  const [show, setShow] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const handleClose = () => setShowUpdate(false)
  const handleShow = () => setShowUpdate(true)
  const navigate = useNavigate()

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
        .put(`${BASE_URL}/admin/users/${inputs.bookId}`)
        .then((response) => response.json())
        .then((data) => {
          // debugger
          //if (data.message === 'Successfully registered')
          if (data.userId === inputs.userId) {
            setError(false)
            setShow(true)
            setTimeout(() => {
              navigate('/admin/users')
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
  const getAllUsers = () => {
    axios
      .get(`${BASE_URL}/admin/users`)
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <div>
      <div>
        <AdminNavbarCom />
      </div>

      <div style={{ marginTop: 70 }}>
        <AdminAddUserComp></AdminAddUserComp>
        {isAdmin && (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {users.map((user, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>
                        <Button variant='link'>{user.userName}</Button>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.mobile}</td>
                      <td>{user.role}</td>
                      <td>{user.status}</td>
                      <td>
                        <AdminUpdateUserComp user={user}></AdminUpdateUserComp>
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

export default AdminUsers
