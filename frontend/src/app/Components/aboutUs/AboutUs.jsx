import React from "react";
import Layout from "../../layout/Layout";
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
const AboutUs = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      <>
        <button onClick={toggleDrawer}>--</button>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="left"
          className="bla bla bla"
        >
          <button onClick={toggleDrawer}>--</button>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>
          <div>Hello World</div>

        </Drawer>
      </>
    </>
  );
};

export default AboutUs;
