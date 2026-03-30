import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import "../styles/dashboard.scss";
import { useSave } from "../hooks/useSave";
import ItemsContainer from "../components/ItemsContainer";
import { useSelector } from "react-redux";
import DashboardHome from "../components/DashboardHome";
import { Outlet } from "react-router";

const Dashboard = () => {
  const { getAllSavedItems, getSmartResurface } = useSave();
  

  useEffect(() => {
    getAllSavedItems();
    getSmartResurface()
  }, []);

  return (
    <>
      <Navbar />

      <div className="layout">
        <SideBar />

        <Outlet/>
      </div>
    </>
  );
};

export default Dashboard;
