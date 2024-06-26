import React from "react";
import "../css/AboutUs.css";
import home from "../img/home.jpg";
import FooterComponents from "../Components/FooterComponent";
import NavbarCom from "../Components/NavbarCom/NavbarCom";

const AboutUs = () => {
  return (
    <>
      <NavbarCom />
      <br></br>
      <br></br>
      <div className="about-us-container">
        <div className="about-us-header">
          <h1>About Us</h1>
          <p>Welcome to book store!!!</p>
        </div>
        <div className="about-us-content">
          <img src={home} alt="Book store" />
          <div className="about-us-text">
            <p>
              We are passionate about books and believe that reading can truly
              enrich people's lives. Our mission is to provide our customers
              with the best selection of books at affordable prices.
            </p>
            <p>
              Our store is located in the heart of the city and has been serving
              book lovers for over 20 years. We have a wide range of genres,
              including fiction, non-fiction, children's books, and more. Our
              knowledgeable staff is always on hand to help you find the perfect
              book.
            </p>
            <p>
              In addition to selling books, we also host author events and book
              clubs. We love connecting with our customers and fostering a love
              of reading in our community.
            </p>
            <p>
              Thank you for visiting our store and supporting independent
              booksellers. We look forward to helping you find your next great
              read!
            </p>
          </div>
        </div>
        <div>
          <br></br>
          <br></br>
          <section id="counts" className="counts">
            <div className="container">
              <div className="row no-gutters">
                <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                    <i className="bi bi-emoji-smile" />
                    <span
                      data-purecounter-start={0}
                      data-purecounter-end={232}
                      data-purecounter-duration={1}
                      className="purecounter"
                    />
                    <p>
                      <strong>Happy Clients</strong>
                      <br></br>Our goal is to make happy clients.
                    </p>
                    {/* <a href="#">Find out more »</a> */}
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                    <i className="bi bi-journal-richtext" />
                    <span
                      data-purecounter-start={0}
                      data-purecounter-end={521}
                      data-purecounter-duration={1}
                      className="purecounter"
                    />
                    <p>
                      <strong>Genuine Content</strong> <br></br> Promise of
                      genuine reading content.
                    </p>
                    {/* <a href="#">Find out more »</a> */}
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                    <i className="bi bi-headset" />
                    <span
                      data-purecounter-start={0}
                      data-purecounter-end={1463}
                      data-purecounter-duration={1}
                      className="purecounter"
                    />
                    <p>
                      <strong>Hours Of Support</strong> <br></br>
                      24×7 Support
                    </p>
                    {/* <a href="#">Find out more »</a> */}
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 d-md-flex align-items-md-stretch">
                  <div className="count-box">
                    <i className="bi bi-people" />
                    <span
                      data-purecounter-start={0}
                      data-purecounter-end={15}
                      data-purecounter-duration={1}
                      className="purecounter"
                    />
                    <p>
                      <strong>Service Guarantee</strong> <br></br>Don't worry
                      about book qyality we take care of your books
                    </p>
                    {/* <a href="#">Find out more »</a> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <FooterComponents />
    </>
  );
};

export default AboutUs;
