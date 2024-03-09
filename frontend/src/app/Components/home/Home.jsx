
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
            Go to Dashboard  <i class="fa-solid fa-arrow-right"></i>
          </h2>
        </div>
        </div>
        
        

        

      </div>
      <div className='footer-page1'>
        <div className="both-book1">
          <h2 style={{textAlign:"center"}}>Frequently Booked</h2>
          <div className="frequently-booked1">
            <div><i class="fa-solid fa-tablets"></i>Thyroid</div>
            <div><i class="fa-solid fa-sitemap"></i>Liver</div>
            <div><i class="fa-solid fa-droplet"></i>Blood</div>
            <div><i class="fa-regular fa-cubes-stacked"></i>Diabetes</div>
            <div><img src="https://icons8.com/icon/92124/kidney" alt="" />Kindey</div>
            <div><i class="fa-solid fa-pills"></i>Vitamin</div>
          </div>
        </div>
      </div>
      <div className='footer-page2'>
        <div className="both-book2">
          <h2 style={{textAlign:"center"}}>Why Choose US</h2>
          <div className="frequently-booked2">
            <div><i class="fa-solid fa-truck-ramp-box"></i>Inverntory Demand Forecasting</div>
            <div><i class="fa-solid fa-bars-progress"></i>Effective Inventory Management System</div>
            <div><i class="fa-solid fa-arrow-trend-up"></i>Accurate Prediction of Stockout</div>

          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Home;
