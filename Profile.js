import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import NavbarCom from '../NavbarCom/NavbarCom'
import { BASE_URL } from '../../Constants'
import FooterComponent from '../FooterComponent'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'

function Profile() {
  const [profile, setProfile] = useState('')
  const [address, setAddress] = useState([])

  let isLoggedIn = false

  const user_id = localStorage.getItem('user_id')
  if (user_id != null) {
    isLoggedIn = true
  }
  const getProfile = () => {
    debugger
    axios
      .get(`${BASE_URL}/users/profile/${user_id}`)
      .then((res) => setProfile(res.data))
      .catch((err) => alert('Profile not found'))
  }

  useEffect(() => {
    getProfile()
    getAddress()
  }, [])
  console.log(profile)
  console.log(address)

  const getAddress = () => {
    debugger

    axios
      .get(`${BASE_URL}/users/addressbyuserid/${user_id}`)
      .then((res) => setAddress(res.data))
      .catch((err) => alert('Address not found'))
  }

  return (
    <div>
      <div>
        <NavbarCom />
      </div>
      <div>
        {/* <Modal>
          <Modal.Header>
            <Modal.Title>Profile</Modal.Title>
          </Modal.Header>

          <Modal.Body> */}

        <Table striped bordered hover style={{ marginTop: '100px' }}>
          <thead>Profile</thead>
          <tbody>
            <tr>
              <td>User Name</td>
              <td>{profile.userName}</td>
            </tr>
            <tr>
              <td>Mobile</td>
              <td>{profile.mobile}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{profile.email}</td>
            </tr>

            <tr>
              <td>Password</td>
              <td>{profile.mobile}</td>
            </tr>
          </tbody>
        </Table>
        {/* </Modal.Body>
        </Modal> */}
      </div>

      <FooterComponent></FooterComponent>
    </div>
  )
}

export default Profile
