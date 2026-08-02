import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const StoreLayout = () => {
  return (
    <div className="font-body-md text-body-md overflow-x-hidden bg-surface text-on-surface min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default StoreLayout;
