import React, { useEffect, useState } from "react";
import NavbarCom from "../Components/NavbarCom/NavbarCom";
import axios from "axios";
import { BASE_URL } from "../Constants";
import FooterComponent from "../Components/FooterComponent";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

import "../css/Modal.css";

function UserOrders() {
  
  const [allOrders, setallOrders] = useState([]);
  //const [showOrders, setshowOrders] = useState(false);
 
  let loggedIn = false;
  let idUser = localStorage.getItem("user_id");
  if (idUser) {
    loggedIn = true;
  }

  // const handleCloseOrders = () => setshowOrders(false);
  // const handleShowOrders = () => {
  //   setshowOrders(true);
  //   showAllOrders();
  // };

  const showAllOrders = () => {
    debugger;
    axios
      .get(`${BASE_URL}/users/allorders/${idUser}`)
      .then((res) => {
        debugger;
        console.log(" Orders" + res);
        setallOrders(res.data);
      })
      .catch((err) => console.log("Orders not fetched"));
  };

  

  useEffect(() => {
    showAllOrders();
  }, []);

  return (
    <div>
      <NavbarCom />

      <section style={{ backgroundColor: "#eee" }}>
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
                    <a href="/user/profile">User</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Order
                  </li>
                  <li>
                    <div style={{ textAlign: "center", marginLeft: "100px" }}>
                      {/* <Button
                        type="button"
                        className="btn btn-success btn-rounded"
                        onClick={handleShowOrders}
                      >
                        Show All Orders
                      </Button>
                      <Modal show={showOrders} onHide={handleCloseOrders} dialogClassName="my-modal">
                        <Modal.Header closeButton>
                          <Modal.Title> Orders</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                          <Table striped bordered hover>
                            <tbody>
                              <tr>
                                <td>Sr No.</td>
                                <td colSpan={4}>Item Details</td>
                                <td>Order Date</td>
                                <td>Delivery Date</td>
                                <td>Total Amount</td>
                                <td>Order Status</td>
                              </tr>
                              {allOrders.map((order,index) => 
                              {
                                return (
                                  
                                  <tr key={index}>
                                    <td>{index+1}</td>
                                    <td colSpan={4}>
                                    <Table striped bordered hover>
                                            <thead>
                                              <tr >
                                                <th>Book Name</th>
                                                <th>Price</th>
                                                <th>Ordered Quantity</th>
                                                <th>Total Item Price</th>
                                              </tr>
                                            </thead> 
                                      {order.orderItemList.map(
                                        (item, index) => {
                                        return (
                                          
                                            <tbody>
                                              <tr>
                                                <td>{item.book.bookName}</td>
                                                <td>{item.book.price}</td>
                                                <td>{item.orderBookQty}</td>
                                                <td>
                                                  {item.orderBookQty *
                                                    item.book.price}
                                                </td>
                                              </tr>
                                            </tbody>
                                          
                                        )
                                        }
                                       )}
                                       </Table>
                                    </td>
                                    <td>{order.orderDate}</td>
                                    <td>{order.deliveryDate}</td>
                                    <td>{order.totalOrderAmount}</td>
                                    <td>{order.orderStatus}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </Table>
                        </Modal.Body>
                        <Modal.Footer></Modal.Footer>
                      </Modal> */}
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>

{allOrders.length >0 ? ( <div style={{margin:"0px 50px"}}>
        <h2 style={{textAlign:"center", margin:"20px"}}>Orders</h2>
        {/* <Modal show={showOrders} onHide={handleCloseOrders} dialogClassName="my-modal">
                        <Modal.Header closeButton>
                          <Modal.Title> Orders</Modal.Title>
                        </Modal.Header>

                        <Modal.Body> */}
        <Table striped bordered hover>
          <tbody>
            <tr>
              <th>Sr No.</th>
              <th colSpan={4}>Item Details</th>
              <th>Order Date</th>
              <th>Delivery Date</th>
              <th>Total Amount</th>
              <th>Order Status</th>
            </tr>
            {allOrders.map((order, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td colSpan={4}>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>Book Name</th>
                          <th>Price</th>
                          <th>Ordered Quantity</th>
                          <th>Total Item Price</th>
                        </tr>
                      </thead>
                      {order.orderItemList.map((item, index) => {
                        return (
                          <tbody>
                            <tr>
                              <td>{item.book.bookName}</td>
                              <td>{item.book.price}</td>
                              <td>{item.orderBookQty}</td>
                              <td>{item.orderBookQty * item.book.price}</td>
                            </tr>
                          </tbody>
                        );
                      })}
                    </Table>
                  </td>
                  <td>{order.orderDate}</td>
                  <td>{order.deliveryDate}</td>
                  <td>{order.totalOrderAmount}</td>
                  <td>{order.orderStatus}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        {/* </Modal.Body>
                        <Modal.Footer></Modal.Footer>
                      </Modal> */}
      </div>):
      (
        <h2 style={{textAlign:"center", margin:"99px"}}>No orders placed yet</h2>
      )}
     

      <div>
        <FooterComponent></FooterComponent>
      </div>
    </div>
  );
}

export default UserOrders;
