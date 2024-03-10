import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Bounce, Flip, Slide, ToastContainer, Zoom } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
      <ToastContainer transition={Flip}  position="top-center" theme="colored" closeOnClick autoClose={700}/>
    </>
  );
};

export default Layout;
