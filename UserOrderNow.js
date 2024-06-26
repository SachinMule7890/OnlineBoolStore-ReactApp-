import React, { useEffect, useState } from "react";
import NavbarCom from "../Components/NavbarCom/NavbarCom";
import axios from "axios";
import { BASE_URL } from "../Constants";
import FooterComponent from "../Components/FooterComponent";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import { useNavigate } from 'react-router-dom'
import '../css/Modal.css'

function UserOrderNow() 
{
  
  const [order, setOrder] = useState("");
  
  let loggedIn = false;
  let idUser = localStorage.getItem("user_id");
  if (idUser) {
    loggedIn = true;
  }

  const navigate = useNavigate();
  const navigateToOrderAddress = () =>{
    navigate('/user/orderaddress')
  }

  
  const getOrderPlaced = () => {
    debugger;
    const orderId = sessionStorage.getItem("orderId");
    axios
      .get(`${BASE_URL}/users/orders/${orderId}`)
      .then((res) => {
        debugger;
        console.log(" Order" + res);
        setOrder(res.data);
      })
      .catch((err) => console.log("Order not fetched"));
  };

  useEffect(() => {
    getOrderPlaced();
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
                className="bg-light rounded-3 p-3 mb-4">
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
                      <Button
                        type="button"
                        className="btn btn-warning btn-rounded"
                        onClick={navigateToOrderAddress}
                      >
                        Select Delivery Address
                      </Button>

                      
                    </div>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </section>
     

      <div>
        {order.message !== null ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "blue",
              margin: "80px",
            }}
          >
            <h5 style={{ textAlign: "center", lineHeight: "1.5rem" }}>
              {order.message}
            </h5>
          </div>
        ) :
        (
          <section style={{ margin: "0px 100px 10px 150px" }}>
             <div>
        <h2 style={{ textAlign: "center", margin: "0.5rem 2rem 2rem" }}>
          Order Details
        </h2>
      </div>
            <table className="table table-responsive table-hover">
              <thead>
                <tr>
                  <th scope="col">Items</th>
                  <th scope="col">Item Price</th>
                  <th scope="col">Ordered Quantity</th>
                  <th scope="col">Total Item Price</th>
                </tr>
              </thead>
              <tbody>
                {order.orderItemList.map((orderItem, index) => {
                  return (
                    <tr key={index}>
                      <td>{orderItem.book.bookName}</td>
                      <td>{orderItem.book.price}</td>
                      <td>{orderItem.orderBookQty}</td>
                      <td>{orderItem.orderBookQty * orderItem.book.price}</td>
                      {/* <td>{orderItem.orderItemTotalPrice}</td> */}
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <th style={{color:"red"}} colSpan={3}>Total Amount</th>
                <th style={{color:"red"}}>{order.totalOrderAmount}</th>
                {/* </tbody>  */}
              </tfoot>
            </table>
          </section>
        ) 
        }
      </div>
  

      <div>
        <FooterComponent></FooterComponent>
      </div>
    </div>
  )
}


export default UserOrderNow;
