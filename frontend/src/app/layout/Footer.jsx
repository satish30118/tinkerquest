import React from 'react';
import '../assets/css/footer.css'
export default function Footer() {
  return (
    <>
      <div className='footer-page1'>
        <div className="both-book1">
          <h2>Frequently Booked</h2>
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
          <h2>Why Choose US</h2>
          <div className="frequently-booked2">
            <div><i class="fa-solid fa-truck-ramp-box"></i>Inverntory Demand Forecasting</div>
            <div><i class="fa-solid fa-bars-progress"></i>Effective Inventory Management System</div>
            <div><i class="fa-solid fa-arrow-trend-up"></i>Accurate Prediction of Stockout</div>

          </div>
        </div>
      </div>




      
    </>
  )
}
