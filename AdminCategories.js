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
import AdminUpdateCatComp from '../Components/AdminBook/AdminUpdateCatComp'
import AdminAddCatComp from '../Components/AdminBook/AdminAddCatComp'

function AdminCategories() {
  const [categories, satCategories] = useState([])

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

  const getAllCategories = () => {
    axios
      .get(`${BASE_URL}/admin/categories`)
      .then((data) => satCategories(data.data))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getAllCategories()
  }, [])

  return (
    <div>
      <div>
        <AdminNavbarCom />
      </div>

      <div style={{ marginTop: 70 }}>
        <AdminAddCatComp></AdminAddCatComp>
        {isAdmin && (
          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Category Id</th>
                  <th>Category Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              {categories.map((cat, index) => {
                return (
                  <tbody key={index}>
                    <tr>
                      <td>{cat.categoryId}</td>
                      <td>{cat.categoryName}</td>
                      <td>
                        <AdminUpdateCatComp cat={cat}></AdminUpdateCatComp>
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

export default AdminCategories
