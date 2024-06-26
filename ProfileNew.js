import axios from 'axios'
import React, { useEffect, useState } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import NavbarCom from '../Components/NavbarCom/NavbarCom'
import { BASE_URL } from '../Constants'
import FooterComponent from '../Components/FooterComponent'
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router-dom'

import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import InputGroup from 'react-bootstrap/InputGroup'
import { LinkContainer } from 'react-router-bootstrap'
import { FaUser } from 'react-icons/fa'
import { FaUnlock } from 'react-icons/fa'

function ProfileNew() {
  const [profile, setProfile] = useState('')
  
  const [show, setShow] = useState(false)
  
  // const [inputs, setInputs] = useState({ name: '', email: '', password: '' ,mobile:''})
  // const [validated, setValidated] = useState(false)
  // const [error, setError] = useState(false)
  const [profileToUpdate, setProfileToUpdate] = useState('') 
  
  const navigate = useNavigate()
  let isLoggedIn = false
  let updateProfilebuttonClicked = false
  const user_id = localStorage.getItem('user_id')
  if (user_id != null) {
    isLoggedIn = true
  }

  

  

  var handleChange = (e) => {
    
    setProfileToUpdate({
      ...profileToUpdate,
      [e.target.name]: e.target.value,
    })
    
    // var copy = {...inputs};
    // copy[e.target.name] = e.target.value;
    // setInputs(copy);
  }

  

  const handleClose = () => setShow(false)
  
  const handleShow = () => setShow(true)
 
  const getProfile = () => {
    debugger;
    axios
      .get(`${BASE_URL}/users/profile/${user_id}`)
      .then((res) => {setProfile(res.data);
        setProfileToUpdate(res.data)})
      .catch((err) => alert('Profile not found'))
  }

  useEffect(() => {
    getProfile()
   
   // setProfileToUpdate({...profile})
  }, [])
  console.log(profile)
  

  
     

     
      
      
      
      const handleSubmitUpdatedProfile = (e)=>
      {
      //   const profileToUpdate={...profile};
        console.log(profile);
      // console.log(profileToUpdate);
        //updateProfilebuttonClicked = true
        axios.put(`${BASE_URL}/users/profile/${user_id}`,profileToUpdate)
        .then((res)=>{setProfileToUpdate(res.data);
        setProfile(res.data);
        //let userName = profile.userName;
       // localStorage.setItem('user_username',userName)
        localStorage.setItem('user_username',res.data.userName)
        //setProfile(res.data);

      })
        .catch((err)=>alert('Profile not updated'))

        handleClose();

      }

      // if(!updateProfilebuttonClicked)
      // {
      //   setProfileToUpdate(profile);
      // }


      
      

      
  

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
                    <a href='/'>Home</a>
                  </li>
                  <li className='breadcrumb-item'>
                    <a href='/user/profile'>User</a>
                  </li>
                  <li className='breadcrumb-item active' aria-current='page'>
                    User Profile
                  </li>
                  <li style={{ marginLeft: '100px' }}>
                    <button type='button' className='btn btn-info btn-rounded' onClick={handleShow}>
                      Update Profile
                    </button>
                    <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update Profile</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td> Name</td>
                  <td><input type="text" name="userName" value={profileToUpdate.userName} onChange={handleChange}/></td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td><input type="text" name="email" value={profileToUpdate.email} onChange={handleChange} pattern='^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}'/></td>
                </tr>
                <tr>
                  <td>Mobile</td>
                  <td><input type="text" name="mobile" value={profileToUpdate.mobile} onChange={handleChange}/></td>
                </tr>

                <tr>
                  <td>Password</td>
                  <td><input type="password" name="password_old" value={profileToUpdate.password} onChange={handleChange}/></td>
                </tr>

                <tr>
                  <td>Confirm Password</td>
                  <td><input type="password" name="password" value={profileToUpdate.password} onChange={handleChange}/></td>
                </tr>
              </tbody>
            </Table>





          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' className="text-center" onClick={handleSubmitUpdatedProfile}>
              Update
            </Button>
            
          </Modal.Footer>
        </Modal>
                  </li>

                  <li style={{ marginLeft: '40px' }}>
                    <LinkContainer to="/user/address">
                    <button type='button' className='btn btn-info btn-rounded' >
                       Show Address
                    </button>
                    </LinkContainer>
                    {/* <Modal show={showAddress} onHide={handleCloseAddress}>
          <Modal.Header closeButton>
            <Modal.Title>Address</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td> Plot No</td>
                  <td><input type="text" name="plotNo" value={address.plotNo} onChange={handleChangeAddress}/></td>
                </tr>
                <tr>
                  <td>  Street</td>
                  <td><input type="text" name="street" value={address.street} onChange={handleChangeAddress}/></td>
                </tr>
                <tr>
                  <td>  City</td>
                  <td><input type="text" name="street" value={address.city} onChange={handleChangeAddress}/></td>
                </tr>
                <tr>
                  <td>  Pincode</td>
                  <td><input type="text" name="pincode" value={address.pincode} onChange={handleChangeAddress}/></td>
                </tr>

                <tr>
                  <td>  State</td>
                  <td><input type="text" name="state" value={address.state} onChange={handleChangeAddress}/></td>
                </tr>

                <tr>
                  <td>  Country</td>
                  <td><input type="text" name="country" value={address.country} onChange={handleChangeAddress}/></td>
                </tr>

              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleSubmitUpdatedAddress}>
              Update
            </Button>
            
          </Modal.Footer>
        </Modal> */}
                  </li>
                </ol>
              </nav>
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-4'>
              <div className='card mb-4'>
                <div className='card-body text-center'>
                  <img
                    src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp'
                    alt='avatar'
                    className='rounded-circle img-fluid'
                    style={{ width: 150 }}
                  />
                  <h5 className='my-3'>{profile.userName}</h5>
                </div>
              </div>
            </div>
            <div className='col-lg-8'>
              <div className='card mb-4'>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'> Name</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>{profile.userName}</p>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'>Email</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>{profile.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'>Mobile</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>{profile.mobile}</p>
                    </div>
                  </div>
                  <hr />
                  {/* <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'>Mobile</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>(098) 765-4321</p>
                    </div>
                  </div>
                  <hr />
                  <div className='row'>
                    <div className='col-sm-3'>
                      <p className='mb-0'>Address</p>
                    </div>
                    <div className='col-sm-9'>
                      <p className='text-muted mb-0'>
                        Bay Area, San Francisco, CA
                      </p>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterComponent></FooterComponent>
    </div>
  )
}

export default ProfileNew
