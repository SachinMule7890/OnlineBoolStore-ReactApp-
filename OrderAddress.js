import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
//import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import FooterComponent from "../Components/FooterComponent";
import NavbarCom from "../Components/NavbarCom/NavbarCom";
import { BASE_URL } from "../Constants";
import Modal from 'react-bootstrap/Modal'
import Table from 'react-bootstrap/Table'
import { json } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from 'react-router-dom'
function OrderAddress()
{
    const [address, setAddress] = useState([]);
    const [orderAddress, setOrderAddress] = useState('');
    const [showAddAddress, setShowAddAddress] = useState(false);
    const handleCloseAddAddress = () => setShowAddAddress(false);
    const [addressToAdd,setAddressToAdd] = useState({plotNo:'', street:'',city:'',pincode:'',state:'',country:'',appUser:{userId:''}});
const navigate = useNavigate()
    const handleShowAddAddress = () => {
        // debugger;
         setShowAddAddress(true);
     };

    let isLoggedIn = false;

  const user_id = localStorage.getItem("user_id");
  if (user_id != null) {
    isLoggedIn = true;
  }


    const getAddress = () => {
        axios
          .get(`${BASE_URL}/users/addressbyuserid/${user_id}`)
          .then((res) => {
            setAddress(res.data);
           
          })
          .catch((err) => alert("Address not found"));
      }


      useEffect(() => {
        getAddress();
      }, []);

      const addAddress = () => {
        debugger
        //let p=addressToAdd.plotNo;
        addressToAdd.appUser.userId = localStorage.getItem("user_id")
        console.log(addressToAdd)
         setAddressToAdd(addressToAdd)
        axios.post(`${BASE_URL}/users/address`, addressToAdd)
        .then((res)=>{console.log(res.data)
            setAddressToAdd(res.data)
            address.push(addressToAdd)
            setAddress(address)
            
        })
        .catch((err)=>alert("Address not added"))
        handleCloseAddAddress();
       // window.location.reload();
      }

      const handleChangeAddAddress = (e) => {
        setAddressToAdd({
          ...addressToAdd,
          [e.target.name]: e.target.value,
        })
    
      }
      
      const setDeliveryAddress =(deliveryAddressToSet) =>{
       
        const orderId = sessionStorage.getItem("orderId");
        console.log("deliveryAddressToSet", deliveryAddressToSet)
        console.log("OrderId",orderId)

        axios
          .get(`${BASE_URL}/users/orderaddress/${orderId}/${deliveryAddressToSet}`)
          .then((res) => {
            debugger
            setOrderAddress(res.data);
            sessionStorage.setItem('orderAddressId', res.data.customerAddressId)
            debugger
            console.log(orderAddress)
            navigate('/user/orderdetails')
           
          })
          .catch((err) => alert("Delivery address not set"));


      }
    

      return (
        <div>
            <div>
        <NavbarCom></NavbarCom>
      </div>
      <section>
      <section style={{ backgroundColor: "#eee"}}>
          <div className="container py-5">
            <div className="row">
              <div className="col">
                <nav
                  aria-label="breadcrumb"
                  className="bg-light rounded-3 p-3 mb-4"
                >
                  <ol className="breadcrumb mb-0">
                    <li className="breadcrumb-item">
                      <a href="/">Home</a>
                    </li>
                    <li className="breadcrumb-item">
                      <a href="/user/address">User</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Order Address
                    </li>
                    <li style={{ marginLeft: "100px" }}>
                      <button
                        type="button"
                        className="btn btn-info btn-rounded"
                       onClick={handleShowAddAddress}
                      >
                        Add Address
                      </button>
                      <Modal show={showAddAddress} onHide={handleCloseAddAddress}>
          <Modal.Header closeButton>
            <Modal.Title> Address</Modal.Title>
          </Modal.Header>
          
          <Modal.Body>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td> Plot No</td>
                  <td><input type="text" name="plotNo" value={addressToAdd.plotNo} onChange={handleChangeAddAddress}/></td>
                </tr>
                <tr>
                  <td>  Street</td>
                  <td><input type="text" name="street" value={addressToAdd.street} onChange={handleChangeAddAddress}/></td>
                </tr>
                <tr>
                  <td>  City</td>
                  <td><input type="text" name="city" value={addressToAdd.city} onChange={handleChangeAddAddress}/></td>
                </tr>
                <tr>
                  <td>  Pincode</td>
                  <td><input type="text" name="pincode" value={addressToAdd.pincode} onChange={handleChangeAddAddress}/></td>
                </tr>

                <tr>
                  <td>  State</td>
                  <td><input type="text" name="state" value={addressToAdd.state} onChange={handleChangeAddAddress}/></td>
                </tr>

                <tr>
                  <td>  Country</td>
                  <td><input type="text" name="country" value={addressToAdd.country} onChange={handleChangeAddAddress}/></td>
                </tr>

                <tr>
                   {/* <td>  appUser</td>  */}
                  <td><input hidden="true" type="text" name="appUser" value={addressToAdd.appUser.userId} onChange={handleChangeAddAddress}/></td>
                </tr>

              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='warning' onClick={addAddress}>
              Add Address
            </Button>
            
          </Modal.Footer>
        </Modal> 

                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </section>


        <div>
        <div>
            {address.length > 0 ? (<section style={{margin:"0px 100px 10px 150px"}}>
          <div>
            <h2 style={{ textAlign: "center", margin: "0.5rem 2rem 2rem" }}>
               Select Delivery Address 
            </h2>
          </div>

          <table className="table table-responsive table-hover">
            <thead>
              <tr>
                <th scope="col">Plot No</th>
                <th scope="col">Street</th>
                <th scope="col">City</th>
                <th scope="col">Pincode</th>
                <th scope="col">State</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              {address.map((address1, index) => 
              {
                return (
                  <tr key={index}>
                    <td>{address1.plotNo}</td>
                    <td>{address1.street}</td>
                    <td>{address1.city}</td>
                    <td>{address1.pincode}</td>
                    <td>{address1.state}</td>
                    <td>{address1.country}</td>
                    <td>
                      <input
                        type="radio"
                       // className="btn btn-info btn-rounded"
                       // onClick={()=>{handleShowAddress(address1.customerAddressId)}}
                        //onClick={() => {editAddress(address1.customerAddressId)}}
                        name="selectedAddress"
                        value={address1.customerAddressId}
                        
                        onChange={()=>{setDeliveryAddress(address1.customerAddressId)}}
                      >
                       
                      </input>


                    </td>
                   
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>):
        (<div
            style={{ display: 'flex', justifyContent: 'center', color: 'blue', margin:'80px' }}
          >
            <h5 style={{textAlign:"center", lineHeight:"1.5rem"}}>Address not yet added. <br/>Please add address details.</h5>
          </div>)}
        
        </div>
        </div>
      </section>
      <div>
        <FooterComponent></FooterComponent>
      </div>
        </div>
      );
    
}

export default OrderAddress;