import React from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { Navigate, useNavigate } from "react-router";

const SideBar = () => {

  const {logOut} = useAuth()
  const navigate = useNavigate()

  const handleLogout = ()=>{
    logOut()
    navigate("/", { replace: true })
  }

  return (
    <aside className="side-nav">
      <div className="side-nav__inner">
        <div className="side-nav__brand-block">
          <div className="side-nav__logo">
            <span className="material-symbols-outlined">auto_stories</span>
          </div>
          <div>
            <span className="side-nav__plan-name">Memora</span>
            <span className="side-nav__plan-tier">The Brain</span>
          </div>
        </div>

        <nav className="side-nav__nav">
          <a href="#" className="active">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Overview</span>
          </a>
          
          {/* <a href="#">
            <span className="material-symbols-outlined">settings</span>
            <span>Settings</span>
          </a> */}
        </nav>
      </div>

      <div className="side-nav__footer">
        <a href="#">
          <span className="material-symbols-outlined">help</span>
          <span>Help Center</span>
        </a>
        <a onClick={handleLogout} href="#" className="danger">
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </a>
      </div>
    </aside>
  );
};

export default SideBar;
