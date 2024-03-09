import React from 'react'
import Layout from '../../layout/Layout';
import "./home.css"
import himg from '../../assets/image/bg.jpg'


const Home = () => {
  


  return (

    <Layout>
      <div className="home-page">
        <div className="h-bg">
          <img src={himg} alt="" />
        </div>

        <div className="h-text">
          <h2 style={{fontFamily: "Poppins"}}>
            <p className="em">EMPOWERING</p>
            PEOPLE TO IMPROVE THEIR LIVES
          </h2>
          <div className="contact-details">
          <h2 id='book-now' >
            Book Now  <i class="fa-solid fa-arrow-right"></i>
          </h2>
        </div>
        </div>
        

        

      </div>
    </Layout>
  )
}

export default Home
