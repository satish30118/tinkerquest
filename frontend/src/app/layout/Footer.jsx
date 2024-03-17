import React from "react";
import "../assets/css/footer.css";
export default function Footer() {
  return (
    <p>
      <div className="footer-page">
        <div className="fp1">
          <h1>Quick Link</h1>
          <div>Partner With Us</div>
          <div>FAQs</div>
          <div>About Us</div>
          <div>Our Labs</div>
        </div>
        <div className="fp2">
          <div><i class="fa-brands fa-instagram"></i></div>
          <div><i class="fa-brands fa-facebook"></i></div>
          <div><i class="fa-brands fa-linkedin"></i></div>
          <div><i class="fa-brands fa-youtube"></i></div>
        </div>


      </div>
      <div>
        <p>CopyRight &copy; 2024 All Right Reserve</p>
      </div>
    </p>
  );
}
