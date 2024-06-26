import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../css/ContactUs.css";

import NavbarCom from "../Components/NavbarCom/NavbarCom";
import FooterComponent from "../Components/FooterComponent";

// import Dipak from "../img/Dipak.jpg";
// import Pramod from "../img/Pramod.jpg";
// import Janhavi from "../img/Janhavi.jpg";
// import Vrushali from "../img/Vrushali.jpg";

function ContactUs() {
  return (
    <>
      <NavbarCom />
      <div>
        <div className="contact-us-container">
          {/* <img
            className="contact-us-container"
            src="../img/bgimage.jpg"
            alt="bgimg"
            style={{ width: "100vh", height: "100vh" }}
          /> */}
          <h1>Contact Us</h1>
          <p>Online Book Store</p>
          <ul>
            <li>Email: onlinebookstore@gmail.com</li>
            <li>Phone: 9823439280</li>
            <li>Address: AEC, Chikhli, 443201, Maharashtra</li>
          </ul>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}

export default ContactUs;
