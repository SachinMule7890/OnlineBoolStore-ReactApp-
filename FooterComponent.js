import { FaFacebookSquare } from 'react-icons/fa'
import { FaTwitterSquare } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import { FaInstagramSquare } from 'react-icons/fa'

function FooterComponent(props) {

  
  return (
    // <div
    //   className={
    //     props.position === 'absolute'
    //       ? props.page === 'Home'
    //         ? 'footer footer-home footer-absolute'
    //         : 'footer footer-absolute'
    //       : 'footer'
    //   }
    // >
    //   <p className='copyright'>© 2022 BT-BookStore | Follow us on</p>
    //   <ul className='footer-list'>
    //     <li className='footer-item'>
    //       <a href='#' target='_blank' rel='noreferrer'>
    //         <FaFacebookSquare />
    //       </a>
    //     </li>
    //     <li className='footer-item'>
    //       <a href='#' target='_blank' rel='noreferrer'>
    //         <FaTwitterSquare />
    //       </a>
    //     </li>
    //     <li className='footer-item'>
    //       <a href='#' target='_blank' rel='noreferrer'>
    //         <FaLinkedin />
    //       </a>
    //     </li>
    //     <li className='footer-item'>
    //       <a href='#' target='_blank' rel='noreferrer'>
    //         <FaInstagramSquare />
    //       </a>
    //     </li>
    //   </ul>
    // </div>

    <div>
      <footer className="bg-light text-center text-white">
  {/* Grid container */}
  <div className="container p-4 pb-0">
    {/* Section: Social media */}
    <section className="mb-4">
      {/* Facebook */}
      <a
        className="btn text-white btn-floating m-1"
        style={{ backgroundColor: "#3b5998" }}
        href="https://www.facebook.com/"
        role="button"
 
      >
        <i className="fab fa-facebook-f" ></i>
      </a>
      {/* Twitter */}
      <a
        className="btn text-white btn-floating m-1"
        style={{ backgroundColor: "#55acee" }}
        href="#!"
        role="button"
        
      >
        <i className="fab fa-twitter" />
      </a>
      {/* Google */}
      <a
        className="btn text-white btn-floating m-1"
        style={{ backgroundColor: "#dd4b39" }}
        href="#!"
        role="button"
      >
        <i className="fab fa-google" />
      </a>
      {/* Instagram */}
      <a
        className="btn text-white btn-floating m-1"
        style={{ backgroundColor: "#ac2bac" }}
        href="#!"
        role="button"
      >
        <i className="fab fa-instagram" />
      </a>
      {/* Linkedin */}
      <a
        className="btn text-white btn-floating m-1"
        style={{ backgroundColor: "#0082ca" }}
        href="#!"
        role="button"
      >
        <i className="fab fa-linkedin-in" />
      </a>
      {/* Github */}
      <a
        className="btn text-white btn-floating m-1"
        style={{ backgroundColor: "#333333" }}
        href="#!"
        role="button"
      >
        <i className="fab fa-github" />
      </a>
    </section>
    {/* Section: Social media */}
  </div>
  {/* Grid container */}
  {/* Copyright */}
  <div
    className="text-center p-3"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
  >
    © 2023 Copyright: 
    <a className="text-white" href="https://mdbootstrap.com/">
      BookStore.com
    </a>
  </div>
  {/* Copyright */}
</footer>

    </div>
  )
}

export default FooterComponent
