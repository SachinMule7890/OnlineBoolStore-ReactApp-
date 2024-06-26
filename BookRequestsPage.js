import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../Constants'
import NavbarCom from '../Components/NavbarCom/NavbarCom'
import FooterComponent from '../Components/FooterComponent'
import { Table } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { Modal } from 'react-bootstrap'

function BookRequestsPage() {
  const [allBookRequests, setallBookRequests] = useState([])
  const [bookRequest, setbookRequest] = useState({
    bookName: '',
    authorName: '',
    edition: '',
    publisher: '',
    language: '',
    requestDate: '',
    requestStatus: '',
  })

  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)

  let isLoggedIn = false
  const user_id = localStorage.getItem('user_id')
  if (user_id != null) {
    isLoggedIn = true
  }

  useEffect(() => {
    getAllBookRequests()
  }, [])

  //Get All Book Requests
  const getAllBookRequests = () => {
    //debugger;
    axios
      .get(`${BASE_URL}/users/bookrequests/${user_id}`)
      .then((res) => setallBookRequests(res.data))
      .catch((err) => console.log(err))
  }

  var handleChangeBookRequest = (e) => {
    setbookRequest({ ...bookRequest, [e.target.name]: e.target.value })
  }

  const handleSubmitBookRequest = (e) => {
    if (user_id !== null) {
      //debugger
      axios
        .post(`${BASE_URL}/users/bookrequests/${user_id}`, bookRequest)
        .then((res) => {
          setbookRequest(res.data)
          allBookRequests.push(bookRequest)
          setallBookRequests(allBookRequests)
        })
        .catch((err) => alert('Book Request Failed!!!'))
    }
    handleClose()
  }

  return (
    <div>
      <div>
        <NavbarCom />
      </div>

      <section style={{ backgroundColor: '#eee' }}>
        <div className='container py-5'>
          <div className='row'>
            <div className='col'>
              <nav
                aria-label='breadcrumb'
                className='bg-light rounded-3 p-3 mb-4'
              >
                <ol className='breadcrumb mb-0'>
                  <li className='breadcrumb-item'>
                    <a href='#'>Home</a>
                  </li>
                  <li className='breadcrumb-item'>
                    <a href='#'>User</a>
                  </li>
                  <li className='breadcrumb-item active' aria-current='page'>
                    Book Requests
                  </li>
                  <li style={{ marginLeft: '900px' }}>
                    <button
                      type='button'
                      className='btn btn-info btn-rounded'
                      onClick={handleShow}
                    >
                      Add Book Request
                    </button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title> Book Request</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <Table striped bordered hover>
                          <tbody>
                            <tr>
                              <td> Book Name</td>
                              <td>
                                <input
                                  type='text'
                                  name='bookName'
                                  value={bookRequest.bookName}
                                  onChange={handleChangeBookRequest}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>Author Name</td>
                              <td>
                                <input
                                  type='text'
                                  name='authorName'
                                  value={bookRequest.authorName}
                                  onChange={handleChangeBookRequest}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>Edition</td>
                              <td>
                                <input
                                  type='text'
                                  name='edition'
                                  value={bookRequest.edition}
                                  onChange={handleChangeBookRequest}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>Publisher</td>
                              <td>
                                <input
                                  type='text'
                                  name='publisher'
                                  value={bookRequest.publisher}
                                  onChange={handleChangeBookRequest}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>Language</td>
                              <td>
                                <input
                                  type='text'
                                  name='language'
                                  value={bookRequest.language}
                                  onChange={handleChangeBookRequest}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>Request Date</td>
                              <td>
                                <input
                                  type='text'
                                  name='requestDate'
                                  value={bookRequest.requestDate}
                                  onChange={handleChangeBookRequest}
                                />
                              </td>
                            </tr>
                            {/* <tr>
                                <td>Request Status</td>
                                <td><input type="text" name="requestStatus" value={bookRequest.requestStatus} onChange={handleChangeBookRequest}/></td>
                              </tr> */}
                          </tbody>
                        </Table>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          variant='secondary'
                          onClick={handleSubmitBookRequest}
                        >
                          Book Request
                        </Button>
                        {/* {() => change("action", "delete")} */}
                      </Modal.Footer>
                    </Modal>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <div style={{ margin: '100px' }}>
        <div>
          <h2 style={{ textAlign: 'center', margin: '1rem' }}>
            My Book Requests
          </h2>
        </div>

        <div>
          {allBookRequests.length < 1 ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                color: 'blue',
              }}
            >
              <h5>Nothing in your Book Requests</h5>
            </div>
          ) : (
            <div>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th>Book Name</th>
                    <th>Author Name</th>
                    <th>Edition</th>
                    <th>Publisher</th>
                    <th>Language</th>
                    <th>Request Date</th>
                  </tr>
                </thead>
                {allBookRequests.map((bookRequest, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{bookRequest.bookName}</td>
                        <td>{bookRequest.authorName}</td>
                        <td>{bookRequest.edition}</td>
                        <td>{bookRequest.publisher}</td>
                        <td>{bookRequest.language}</td>
                        <td>{bookRequest.requestDate}</td>
                      </tr>
                    </tbody>
                  )
                })}
              </Table>
            </div>
          )}
        </div>
      </div>

      <FooterComponent></FooterComponent>
    </div>
  )
}

export default BookRequestsPage
