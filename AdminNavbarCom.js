import React, { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router'



function AdminNavbarCom({ getSearchBooks, getBooksByCategory }) {
  const [searchInput, setSearchInput] = useState('')
  //dipak

  const navigate = useNavigate()

  let loggedIn = false
  let idUser = localStorage.getItem('user_id')
  if (idUser) {
    loggedIn = true
  }
  const handleSearch = (e) => {
    e.preventDefault()
    setSearchInput(e.target.value)
    getSearchBooks(e.target.value)
  }
  const homepage = () => {
    navigate('/admin/home')
  }

  const navigateToAllBooks = () => {
    navigate('/admin/books')
  }
  const handleCartShow = (value) => {
    if (value === 'users') {
      navigate('/admin/users')
    } else if (value === 'categories') {
      navigate('/admin/categories')
    } else if (value === 'profile') {
      navigate('/user/profile')
    } else {
      navigate('/')
    }
  }
  function handleLogout() {
    localStorage.removeItem('user_username')
    localStorage.removeItem('user_id')
    localStorage.removeItem('user_role')

    // if (props.setIsAdmin) {
    //   props.setIsAdmin(false)
    // }
    // setShow(true)
    // setTimeout(() => {
    // }, 3000)
    navigate('/')
  }

  return (
    <Navbar bg='primary' expand='lg' variant='dark' fixed='top'>
      <Container fluid>
        <Navbar.Brand onClick={homepage}>BookStore
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item active'>
              <a className='nav-link' href='/'>
                Home <span className='sr-only'>(current)</span>
              </a>
            </li>
          </ul>
        </div>
        <div style={{ paddingRight: 10 }}>
          <Button variant='secondary' onClick={navigateToAllBooks}>
            Show All Books
          </Button>{' '}
        </div>
        <Navbar.Collapse id='navbarScroll'>
          <Form className='d-flex'>
            <Form.Control
              onChange={(e) => handleSearch(e)}
              type='search'
              value={searchInput}
              placeholder='Search'
              className='me-2'
              aria-label='Search'
            />
          </Form>
          {loggedIn && (
            <Dropdown>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                {localStorage.getItem('user_username')}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleCartShow('profile')}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleCartShow('users')}>
                  Users
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleCartShow('categories')}>
                  Categories
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
          <div className='loginbtn' style={{ paddingLeft: '10px' }}>
            {!loggedIn ? (
              <LinkContainer to='/user/login'>
                <Button variant='success'>login</Button>
              </LinkContainer>
            ) : (
              <Button variant='danger' onClick={handleLogout}>
                logout
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}


export default AdminNavbarCom
