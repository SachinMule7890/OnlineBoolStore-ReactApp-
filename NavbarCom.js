import React, { useState, useEffect } from 'react'

import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { BASE_URL } from '../../Constants'

function NavbarCom({ getSearchBooks, getBooksByCategory }) {
  const [searchInput, setSearchInput] = useState('')
  
  const [category, setCategory] = useState([])

  const getAllCategory = () => {
    axios
      .get(`${BASE_URL}/users/categories`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    getAllCategory()
  }, [])

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
    navigate('/')
  }

  const handleCartShow = (value) => {
    if (value === 'cart') {
      navigate('/user/cart')
    } else if (value === 'orders') {
      navigate('/user/orders')
    } else if (value === 'bookrequests') {
      navigate('/user/bookrequests')
    } else if (value === 'profile') {
      navigate('/user/profile')
    } else if (value === 'address') {
      navigate('/user/address')
    } else {
      navigate('/')
    }
  }
  const handleCatShow = (value) => {
    getBooksByCategory(value)
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
    <Navbar bg='primary' expand='lg' variant='dark' fixed='top' >
      <Container fluid>
        <Navbar.Brand onClick={homepage}>BookStore</Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item active'>
              <a className='nav-link' href='/'>
                Home <span className='sr-only'>(current)</span>
              </a>
            </li>
            <li className='nav-item active'>
              <a className='nav-link' href='./AboutUs'>
                About Us <span className='sr-only'>(current)</span>
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='./ContactUs'>
                Contact Us
              </a>
            </li>
            <Dropdown>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                Category
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    handleCatShow('all')
                  }}
                  value={'all'}
                >
                  All
                </Dropdown.Item>
                {category.map((cat, index) => {
                  return (
                    <Dropdown.Item
                      key={index}
                      onClick={() => {
                        handleCatShow(cat.categoryId)
                      }}
                      value={cat.categoryId}
                    >
                      {cat.categoryName}
                    </Dropdown.Item>
                  )
                })}
              </Dropdown.Menu>
            </Dropdown>
          </ul>
        </div>

        <Navbar.Collapse id='navbarScroll'>
          {/* {loggedIn ? (
            <Nav
              className='me-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              dipak
            </Nav>
          ) : (
            <Nav
              className='me-auto my-2 my-lg-0'
              style={{ maxHeight: '100px' }}
              navbarScroll
            ></Nav>
          )} */}
          <Form className='d-flex'>
            <Form.Control
              onChange={(e) => handleSearch(e)}
              type='search'
              value={searchInput}
              placeholder='Search'
              className='me-2'
              aria-label='Search'
            />
            {/* <Button variant='outline-success' onClick={(e) => handleSearch(e)}>
              Search
            </Button> */}
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
                <Dropdown.Item onClick={() => handleCartShow('address')}>
                  My Addresses
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleCartShow('cart')}>
                  My Cart
                </Dropdown.Item>

                <Dropdown.Item onClick={() => handleCartShow('orders')}>
                  Orders
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleCartShow('bookrequests')}>
                  Book Request
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

export default NavbarCom
