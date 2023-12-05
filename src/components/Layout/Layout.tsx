import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Layout: FC = () => {
  return (
    <>
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
