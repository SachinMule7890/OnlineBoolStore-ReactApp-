import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import caro1 from '../../img/caro1.jpg'
import caro2 from '../../img/caro2.jpg'
import caro3 from '../../img/caro3.jpg'

function Corousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          //style={{ backgroundSize: '100% auto' }}
          className='d-block w-100'
          src={caro1}
          alt='First slide'
        />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>

      <Carousel.Item>
        <img
          className='d-block w-100 h-50'
          src={caro2}
          alt='Second slide'
          //width='100%'
        />
        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>

      <Carousel.Item>
        <img className='d-block w-100 h-100' src={caro3} alt='Third slide' />

        {/* <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
    // <div id='carouselExample' class='carousel slide'>
    //   <div class='carousel-inner'>
    //     <div class='carousel-item active'>
    //       <img src={img1} class='d-block w-100' alt='...' />
    //     </div>
    //     <div class='carousel-item'>
    //       <img src={img2} class='d-block w-100' alt='...' />
    //     </div>
    //     <div class='carousel-item'>
    //       <img src={img3} class='d-block w-100' alt='...' />
    //     </div>
    //   </div>
    //   <button
    //     class='carousel-control-prev'
    //     type='button'
    //     data-bs-target='#carouselExample'
    //     data-bs-slide='prev'
    //   >
    //     <span class='carousel-control-prev-icon' aria-hidden='true'></span>
    //     <span class='visually-hidden'>Previous</span>
    //   </button>
    //   <button
    //     class='carousel-control-next'
    //     type='button'
    //     data-bs-target='#carouselExample'
    //     data-bs-slide='next'
    //   >
    //     <span class='carousel-control-next-icon' aria-hidden='true'></span>
    //     <span class='visually-hidden'>Next</span>
    //   </button>
    // </div>
    // <div
    //   id='carouselExampleInterval'
    //   class='carousel slide'
    //   data-bs-ride='carousel'
    // >
    //   <div class='carousel-inner'>
    //     <div class='carousel-item active' data-bs-interval='1000'>
    //       <img src={img1} class='d-block w-100' alt='...' />
    //     </div>
    //     <div class='carousel-item' data-bs-interval='2000'>
    //       <img src={img3} class='d-block w-100' alt='...' />
    //     </div>
    //     <div class='carousel-item'>
    //       <img src={img2} class='d-block w-100' alt='...' />
    //     </div>
    //   </div>
    //   <button
    //     class='carousel-control-prev'
    //     type='button'
    //     data-bs-target='#carouselExampleInterval'
    //     data-bs-slide='prev'
    //   >
    //     <span class='carousel-control-prev-icon' aria-hidden='true'></span>
    //     <span class='visually-hidden'>Previous</span>
    //   </button>
    //   <button
    //     class='carousel-control-next'
    //     type='button'
    //     data-bs-target='#carouselExampleInterval'
    //     data-bs-slide='next'
    //   >
    //     <span class='carousel-control-next-icon' aria-hidden='true'></span>
    //     <span class='visually-hidden'>Next</span>
    //   </button>
    // </div>
  )
}

export default Corousel
